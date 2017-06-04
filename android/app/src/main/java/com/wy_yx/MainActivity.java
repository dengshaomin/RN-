package com.wy_yx;

import android.content.pm.ActivityInfo;
import android.os.Bundle;

import com.cboy.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "WY_YX";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        super.onCreate(savedInstanceState);
    }
}
