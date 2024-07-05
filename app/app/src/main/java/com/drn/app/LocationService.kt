package com.drn.app

import android.Manifest
import android.app.Service
import android.content.Intent
import android.content.pm.PackageManager
import android.location.Location
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.util.Log
import android.widget.Toast
import androidx.core.app.ActivityCompat
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class LocationService : Service() {
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private fun getLastLocation() {
        if (ActivityCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_COARSE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            return
        }
        fusedLocationClient.lastLocation
            .addOnSuccessListener { location: Location? ->
                if (location != null) {
                    onLocationChanged(location)
                } else {
                    Log.e("LocationService", "Failed to get location")
                }
            }
    }

    private val handler = Handler(Looper.getMainLooper())
    private val runnableCode = object : Runnable {
        override fun run() {
            getLastLocation()
            handler.postDelayed(this, 5000)
        }
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    override fun onCreate() {
        super.onCreate()
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
        handler.post(runnableCode)
    }

    override fun onDestroy() {
        super.onDestroy()
        // Remove callbacks and messages
        handler.removeCallbacks(runnableCode)
    }

    private fun onLocationChanged(location: Location) {
        Log.d("LocationService", "Location: ${location.latitude}, ${location.longitude}")
        val latitude = location.latitude
        val longitude = location.longitude
        val retrofit = Retrofit.Builder()
            .baseUrl("https://lp8081.mahmudul.com.bd")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
        val sharedPreferences = getSharedPreferences("com.drn.app", MODE_PRIVATE)
        val token = sharedPreferences.getString("token", null)
        if (token != null) {
            val service = retrofit.create(APIService::class.java)
            service.sendLocation(LocationRequest(latitude, longitude), "Bearer $token")
                .enqueue(object : Callback<LocationResponse> {
                    override fun onResponse(
                        call: Call<LocationResponse>,
                        response: Response<LocationResponse>
                    ) {
                        if (response.isSuccessful) {
                            Toast.makeText(
                                this@LocationService,
                                "Location sent successfully",
                                Toast.LENGTH_SHORT
                            ).show()
                            Log.d("LocationService", "Location sent successfully")
                        } else {
                            Log.e("LocationService", "Failed to send location")
                            Toast.makeText(
                                this@LocationService,
                                "Failed to send location",
                                Toast.LENGTH_SHORT
                            ).show()
                        }
                    }

                    override fun onFailure(call: Call<LocationResponse>, t: Throwable) {
                        Log.e("LocationService", "Failed to send location", t)
                        Toast.makeText(
                            this@LocationService,
                            "Something went wrong",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                })
        }
    }
}