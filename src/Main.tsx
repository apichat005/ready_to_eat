import React , {useCallback} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ImageBackground, Image } from 'react-native';
import {bakery} from '../assets/list';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

const Home = ({navigation}) => {
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

    return (
        <View style={styles.container}>
            <Image source={bakery} style={{ width: 162, height: 120, objectFit: 'contain' }} />
            <Text style={styles.title}>Ready to eat</Text>
            <Text style={{ marginTop: 30 , fontFamily: 'SukhumvitSet-Text' }}>
                {
                    `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
                }
            </Text>
            <TouchableOpacity style={{ backgroundColor: '#FF8D00', width: '100%', padding: 12, borderRadius: 50, marginTop: 70 }}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontFamily: 'SukhumvitSet-SemiBold' }}>เข้าสู่ระบบ</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 20,
        backgroundColor: '#FFF9EB'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        // color: '#E07D08',
        marginTop: 15,
        fontFamily: 'SukhumvitSet-SemiBold'
    }
});
