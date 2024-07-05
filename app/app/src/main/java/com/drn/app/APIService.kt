package com.drn.app

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

data class LoginRequest(val email: String, val password: String)
data class LoginResponse(val token: String)
data class LocationRequest(val latitude: Double, val longitude: Double)
data class LocationResponse(val message: String)

interface APIService {
    @POST("/api/users/login")
    fun login(@Body loginRequest: LoginRequest): Call<LoginResponse>

    @POST("/api/users/locations")
    fun sendLocation(
        @Body locationRequest: LocationRequest,
        @Header("Authorization") authToken: String,

        ): Call<LocationResponse>
}