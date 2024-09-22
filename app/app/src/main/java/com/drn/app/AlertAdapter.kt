package com.drn.app

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import java.time.format.DateTimeFormatter

class AlertAdapter(private val alertList: List<AlertResponse>) : RecyclerView.Adapter<AlertAdapter.AlertViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AlertViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_alert, parent, false)
        return AlertViewHolder(view)
    }

    override fun onBindViewHolder(holder: AlertViewHolder, position: Int) {
        holder.bind(alertList[position])
    }

    override fun getItemCount(): Int = alertList.size

    class AlertViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(alertResponse: AlertResponse) {
            itemView.findViewById<TextView>(R.id.tvType).text = alertResponse.type
            itemView.findViewById<TextView>(R.id.tvLocation).text = alertResponse.location
            itemView.findViewById<TextView>(R.id.tvSeverity).text = "Severity: ${alertResponse.severity}"
            itemView.findViewById<TextView>(R.id.tvDescription).text = alertResponse.description
            val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")
            itemView.findViewById<TextView>(R.id.tvCreatedDate).text = alertResponse.createdAt.format(formatter)
        }
    }
}