import React, { useState , useEffect, useCallback, useRef } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const config = () => {
    const [fontsLoaded] = useFonts({
        'SukhumvitSet-Bold': require('../assets/fonts/SukhumvitSet-Bold.ttf'),
        'SukhumvitSet-SemiBold': require('../assets/fonts/SukhumvitSet-SemiBold.ttf'),
        'SukhumvitSet-Text': require('../assets/fonts/SukhumvitSet-Text.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }
}

export default config;