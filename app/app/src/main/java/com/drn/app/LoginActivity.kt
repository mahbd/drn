package com.drn.app

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val emailEditText: EditText = findViewById(R.id.etEmail)
        val passwordEditText: EditText = findViewById(R.id.etPassword)
        val loginButton: Button = findViewById(R.id.btnLogin)

        loginButton.setOnClickListener {
            val email = emailEditText.text.toString()
            val password = passwordEditText.text.toString()

            val retrofit = Retrofit.Builder()
                .baseUrl("https://lp8081.mahmudul.com.bd")
                .addConverterFactory(GsonConverterFactory.create())
                .build()
            val service = retrofit.create(APIService::class.java)
            service.login(LoginRequest(email, password)).enqueue(object : Callback<LoginResponse> {
                override fun onResponse(
                    call: Call<LoginResponse>,
                    response: Response<LoginResponse>
                ) {
                    if (response.isSuccessful) {
                        Toast.makeText(this@LoginActivity, "Login successful", Toast.LENGTH_SHORT)
                            .show()
                        val token = response.body()
                        val sharedPreferences = getSharedPreferences("com.drn.app", MODE_PRIVATE)
                        if (token != null) {
                            sharedPreferences.edit().putString("token", token.token).apply()
                        }
                        val intent = Intent(this@LoginActivity, MainActivity::class.java)
                        startActivity(intent)
                        finish()
                    } else {
                        Toast.makeText(
                            this@LoginActivity,
                            "Invalid email or password",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                }

                override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                    Log.e("LoginActivity", "An error occurred", t)
                    Toast.makeText(this@LoginActivity, "An error occurred", Toast.LENGTH_SHORT)
                        .show()
                }
            })
        }
    }

    private fun validateInput(email: String, password: String): Boolean {
        return email.isNotEmpty() && android.util.Patterns.EMAIL_ADDRESS.matcher(email)
            .matches() && password.isNotEmpty()
    }
}