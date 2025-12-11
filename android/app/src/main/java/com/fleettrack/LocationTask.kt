package com.fleettrack

import android.content.Intent
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.bridge.Arguments
import com.facebook.react.jstasks.HeadlessJsTaskConfig

class LocationTask : HeadlessJsTaskService() {

    override fun getTaskConfig(intent: Intent?): HeadlessJsTaskConfig? {
        if (intent == null) return null

        val lat = intent.getDoubleExtra("lat", 0.0)
        val long = intent.getDoubleExtra("long", 0.0)

        val data = Arguments.createMap().apply {
            putDouble("lat", lat)
            putDouble("long", long)
        }

        return HeadlessJsTaskConfig(
            "BackgroundLocationTask",  // name of your JS task
            data,
            5000,     // timeout in ms
            true      // allow in foreground (important for Android 14+)
        )
    }
}