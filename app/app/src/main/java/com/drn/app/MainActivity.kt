package com.drn.app

import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.activity.ComponentActivity
import androidx.activity.enableEdgeToEdge
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET

data class Post(
    val userId: Int,
    val id: Int,
    val title: String,
    val body: String
)

interface PostService {
    @GET("posts/1")
    fun getPost(): Call<Post>

}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val retroResponse = findViewById<TextView>(R.id.retroResponse)
        val retroButton = findViewById<Button>(R.id.retroButton)

        retroButton.setOnClickListener {
            val retrofit = Retrofit.Builder()
                .baseUrl("https://jsonplaceholder.typicode.com/")
                .addConverterFactory(GsonConverterFactory.create())
                .build()
            val service = retrofit.create(PostService::class.java)
            // make a post
            service.getPost().enqueue(object : Callback<Post> {
                override fun onResponse(call: Call<Post>, response: Response<Post>) {
                    if (response.isSuccessful) {
                        val post = response.body()
                        retroResponse.text = post?.title
                    } else {
                        retroResponse.text = response.errorBody().toString()
                    }
                }

                override fun onFailure(call: Call<Post>, t: Throwable) {
                    retroResponse.text = t.message
                }
            })
        }

    }
}
