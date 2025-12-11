package com.fleettrack

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class LocationServiceModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "LocationServiceModule"

    @ReactMethod
    fun start() {
        val intent = Intent(reactContext, LocationService::class.java)
        reactContext.startForegroundService(intent)
    }
}
