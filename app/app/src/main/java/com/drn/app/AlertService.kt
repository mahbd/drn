package com.drn.app

import android.Manifest
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.util.Log
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class AlertService : Service() {
    private fun getNewAlerts() {
        val retrofit = Retrofit.Builder()
            .baseUrl(APIService.BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
        val service = retrofit.create(APIService::class.java)
        Log.d("AlertService", "Checking for new alerts")
        service.getAlerts().enqueue(object : Callback<List<AlertResponse>> {
            override fun onResponse(
                call: Call<List<AlertResponse>>,
                response: Response<List<AlertResponse>>
            ) {
                if (response.isSuccessful) {
                    val alertList = response.body()
                    Log.d("AlertService", "Alerts: ${alertList?.size}")
                    if (alertList != null) {
                        val sharedPreferences = getSharedPreferences("com.drn.app", MODE_PRIVATE)
                        val lastAlertId = sharedPreferences.getLong("lastAlertId", 0)
                        for (alert in alertList) {
                            if (alert.id <= lastAlertId) {
                                continue
                            }
                            if (onNewAlert(alert)) {
                                sharedPreferences.edit().putLong("lastAlertId", alert.id).apply()
                            }
                        }
                    } else {
                        Log.e("AlertService", "Failed to get alerts")
                    }
                } else {
                    Log.e("AlertService", "Failed to get alerts. Status code: ${response.code()}")
                }
            }

            override fun onFailure(call: Call<List<AlertResponse>>, t: Throwable) {
                Log.e("AlertService", "An error occurred", t)
            }
        })
    }

    private val handler = Handler(Looper.getMainLooper())
    private val runnableCode = object : Runnable {
        override fun run() {
            getNewAlerts()
            handler.postDelayed(this, 5000)
        }
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    override fun onCreate() {
        super.onCreate()
        handler.post(runnableCode)
    }

    override fun onDestroy() {
        super.onDestroy()
        handler.removeCallbacks(runnableCode)
    }

    private fun onNewAlert(alert: AlertResponse): Boolean {
        val title = "${alert.type} in ${alert.location}"
        val intent = Intent(this, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        }
        val pendingIntent: PendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_IMMUTABLE)

        val channelId = "alert_channel"
        val channel = NotificationChannel(
            channelId,
            "Alert Notifications",
            NotificationManager.IMPORTANCE_DEFAULT
        ).apply {
            description = "Channel for disaster alert notifications"
        }
        val notificationManager: NotificationManager =
            getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.createNotificationChannel(channel)

        val notificationBuilder = NotificationCompat.Builder(this, channelId)
            .setSmallIcon(R.drawable.ic_launcher_foreground)
            .setContentTitle(title)
            .setContentText(alert.description)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setContentIntent(pendingIntent)
            .setAutoCancel(true)

        with(NotificationManagerCompat.from(this)) {
            if (ActivityCompat.checkSelfPermission(
                    this@AlertService,
                    Manifest.permission.POST_NOTIFICATIONS
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                return false
            }
            notify(alert.id.toInt(), notificationBuilder.build())
        }
        return true
    }
}