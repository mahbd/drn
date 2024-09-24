package com.drn.app

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import android.widget.Toast
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
        private const val REQUEST_CODE_POST_NOTIFICATION = 1
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
            .baseUrl(APIService.BASE_URL)
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
                    Log.d("MainActivity", "Alerts: ${alertList?.size}")
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

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.TIRAMISU) {
            if (ActivityCompat.checkSelfPermission(
                    this,
                    Manifest.permission.POST_NOTIFICATIONS
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                ActivityCompat.requestPermissions(
                    this,
                    arrayOf(Manifest.permission.POST_NOTIFICATIONS),
                    REQUEST_CODE_POST_NOTIFICATION
                )
            } else {
                startService(Intent(this, AlertService::class.java))
            }
        } else {
            startService(Intent(this, AlertService::class.java))
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == REQUEST_CODE_POST_NOTIFICATION) {
            if ((grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED)) {
                startService(Intent(this, AlertService::class.java))
            } else {
                Toast.makeText(this, "Please grant notification permission", Toast.LENGTH_SHORT).show()
                finish()
            }
        } else if (requestCode == REQUEST_LOCATION_PERMISSION) {
            if ((grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED)) {
                startService(Intent(this, LocationService::class.java))
            } else {
                Toast.makeText(this, "Please grant location permission", Toast.LENGTH_SHORT).show()
                finish()
            }
        }
    }
}
