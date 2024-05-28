package com.excoreactintegrationdemo

import android.content.Context
import com.google.android.gms.ads.identifier.AdvertisingIdClient
import kotlinx.coroutines.CoroutineExceptionHandler
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

internal object IfaUtils {
    private val exceptionHandler = CoroutineExceptionHandler { _, exception ->
    }
    private val scope = CoroutineScope(Dispatchers.IO)
    var ifa:String? = null

    fun getAdvertisingId(context: Context) {
        scope.launch(exceptionHandler) {
            val adInfo = AdvertisingIdClient.getAdvertisingIdInfo(context)
            val id = adInfo.id
            ifa = id
        }
    }
}