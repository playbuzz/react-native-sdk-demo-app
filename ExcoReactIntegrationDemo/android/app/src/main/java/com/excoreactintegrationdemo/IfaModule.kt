package com.excoreactintegrationdemo

import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class IfaModule(private val reactApplicationContext: ReactApplicationContext): ReactContextBaseJavaModule(reactApplicationContext) {
    override fun getName(): String {
        return "IfaModule"
    }

    override fun initialize() {
        IfaUtils.getAdvertisingId(reactApplicationContext)
    }

    // Expose getAdvertisingId method to JavaScript
    @ReactMethod
    fun getAdvertisingId(callback: Callback) {
        try {
            // Call your method to retrieve the Advertising ID here
            val advertisingId = IfaUtils.ifa
            // Invoke the success callback with the Advertising ID
            callback.invoke(advertisingId)
        } catch (e: Exception) {
            // Invoke the error callback with the exception message
            callback.invoke(e.message)
        }
    }

    override fun canOverrideExistingModule(): Boolean {
        return false
    }

    override fun onCatalystInstanceDestroy() {}

    override fun invalidate() {}
}