package com.drn.app

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import java.time.LocalDateTime


data class LoginRequest(val email: String, val password: String)
data class LoginResponse(val token: String)
data class LocationRequest(val latitude: Double, val longitude: Double)
data class LocationResponse(val message: String)

data class AlertResponse(
    val id: Long,
    val type: String,
    val location: String,
    val severity: String,
    val description: String,
    val isActive: Boolean,
    val createdAt: LocalDateTime
)

interface APIService {
    companion object {
        const val BASE_URL = "https://drn.mahmudul.com.bd/"
    }
    @POST("/api/users/login")
    fun login(@Body loginRequest: LoginRequest): Call<LoginResponse>

    @POST("/api/users/update-location")
    fun sendLocation(
        @Body locationRequest: LocationRequest,
        @Header("Authorization") authToken: String,

        ): Call<LocationResponse>

    @GET("/api/alerts")
    fun getAlerts(): Call<List<AlertResponse>>
}