package com.drn.app

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.enableEdgeToEdge
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.recyclerview.widget.RecyclerView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class MainActivity : ComponentActivity() {
    companion object {
        private const val REQUEST_LOCATION_PERMISSION = 234
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val sharedPreferences = getSharedPreferences("com.drn.app", MODE_PRIVATE)
        val token = sharedPreferences.getString("token", null)
        if (token == null) {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }
        val recyclerView = findViewById<RecyclerView>(R.id.recyclerView)
        val retrofit = Retrofit.Builder()
            .baseUrl("https://lp8081.mahmudul.com.bd")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
        val service = retrofit.create(APIService::class.java)
        service.getAlerts().enqueue(object : Callback<List<AlertResponse>> {
            override fun onResponse(
                call: Call<List<AlertResponse>>,
                response: Response<List<AlertResponse>>
            ) {
                if (response.isSuccessful) {
                    val alertList = response.body()
                    if (alertList != null) {
                        val alertAdapter = AlertAdapter(alertList)
                        recyclerView.adapter = alertAdapter
                    }
                }
            }

            override fun onFailure(call: Call<List<AlertResponse>>, t: Throwable) {
                Log.e("MainActivity", "An error occurred", t)
            }
        })

        if (ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            ActivityCompat.requestPermissions(
                this,
                arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
                REQUEST_LOCATION_PERMISSION
            )
        } else {
            startService(Intent(this, LocationService::class.java))
        }
    }
}
