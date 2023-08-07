import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image, Platform } from 'react-native';
import { useFonts } from 'expo-font';
import { bakery , facebook , line , gmail }from '../assets/list';
import * as SplashScreen from 'expo-splash-screen';
import {
    SafeAreaView,
    SafeAreaProvider
  } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Login = ({ navigation }) => {
    const [show, setShow] = useState(true)
    const [isLoading , setLoading] = useState(true)
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
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF9EB' }}>
                <View style={styles.container}>
                    <View style={styles.flex}>
                        <Image source={bakery} style={{ width: 72, height: 72, objectFit: 'contain' }} />
                        <View style={{ marginLeft: 12, marginTop: 15 }}>
                            <Text style={{ fontSize: 20, color: '#E07D08', fontFamily: 'SukhumvitSet-SemiBold' }}>พร้อมกิน</Text>
                            <Text style={{ fontSize: 14, color: '#ABABAB', fontFamily: 'SukhumvitSet-SemiBold' }}>Ready to eat</Text>
                        </View>
                    </View>
                    <Text style={styles.title}>เข้าสู่ระบบ</Text>
                    <TextInput style={styles.form_control} placeholder="อีเมล หรือ กรอกเบอร์โทรศัพท์"/>
                    <TextInput style={styles.form_control} placeholder="รหัสผ่าน"
                        secureTextEntry={show}
                    />
                    <TouchableOpacity 
                        style={{ position: 'absolute', right: 0}}
                        onPress={() => setShow(!show)}
                    >
                        <Icon name={show ? 'eye' : 'eye-slash'} size={18} color="#61677A" style={{position:'relative',right:35,top:-4}} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn_login} onPress={() => navigation.navigate('Regis')}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 15, fontFamily: 'SukhumvitSet-SemiBold' }}>เข้าสู่ระบบ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ paddingTop: 5, marginTop: 10 }}
                        onPress={() => navigation.navigate('Home_customer')}
                    >
                        <Text style={{ color: '#515151', textAlign: 'center', fontSize: 15, fontFamily: 'SukhumvitSet-SemiBold' }}>ลืมรหัสผ่าน</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#61677A' }} />
                        <View>
                            <Text style={{ width: 50, textAlign: 'center', color: '#61677A', fontFamily: 'SukhumvitSet-SemiBold' }}>หรือ</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#61677A' }} />
                    </View>
                    
                    <View style={styles.other_login}>
                        <TouchableOpacity>
                            <Image source={facebook} style={{ width: 50, height: 50, objectFit: 'contain' }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={line} style={{ width: 50, height: 50, objectFit: 'contain' }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={gmail} style={{ width: 50, height: 50, objectFit: 'contain' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 20,
        backgroundColor: '#FFF9EB'
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        marginTop: 40,
        fontFamily: 'SukhumvitSet-Bold',
        color: '#515151'
    },
    form_control: {
        width: '100%',
        marginTop: 10,
        padding: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#FF8D00',
        backgroundColor: '#FCFCFC',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'SukhumvitSet-Text'
    },
    btn_login: {
        backgroundColor: '#FF8D00',
        width: '100%',
        padding: 10,
        borderRadius: 50,
        marginTop: 10
    },
    other_login: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'stretch',
        marginTop: 20
    }
});
