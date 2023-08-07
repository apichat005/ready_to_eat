import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, ScrollView , Platform } from 'react-native';
import {
    SafeAreaView,
    SafeAreaProvider
} from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Regis = ({navigation}) => {
        // check platform
        const isWeb = Platform.OS === 'web';
        const isAndroid = Platform.OS === 'android';
        const isIOS = Platform.OS === 'ios';
        
    const [isChecked, setChecked] = useState(false);

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
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Icon name="chevron-left" size={20} color="#FF8D00" style={{ top: 4 }} />
                    <Text style={{ fontSize: 18, fontFamily: 'SukhumvitSet-Bold', color: '#FF8D00', marginLeft: 5 }}> ย้อนกลับ</Text>
                </View>
            </TouchableOpacity>

            <Text style={{ marginTop: 10, fontSize: 25, fontFamily: 'SukhumvitSet-Bold', color: '#FF8D00' }}>สมัครสมาชิก</Text>
            <Text style={{ fontSize: 15, fontFamily: 'SukhumvitSet-Bold', color: '#5E605E' }}>เงื่อนไขและข้อกำหนด</Text>
            <ScrollView>
                <Text>
                    {
                        `
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                `
                    }
                </Text>
            </ScrollView>
            {/* checkbox */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 5 }}>
                <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#FF8D00' : undefined}
                />
                <Text style={{ fontSize: 15, fontFamily: 'SukhumvitSet-Bold', color: '#5E605E' }}>ยอมรับเงื่อนไขและข้อกำหนด</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: isChecked ? '#FF8D00' : '#E5E5E5', width: '100%', padding: 12, borderRadius: 50, marginTop: 10, marginBottom: isIOS ? 0 : 15 }}
                onPress={() => navigation.navigate('Member_type')}
                disabled={!isChecked}
            >
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontFamily: 'SukhumvitSet-SemiBold' }}>ดำเนินการต่อ</Text>
            </TouchableOpacity>

        </View>
        </SafeAreaView>
        </SafeAreaProvider>
    )
}
export default Regis;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // textAlign: 'center',
        paddingTop: 0,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#FFF9EB',
    },
    paragraph: {
        fontSize: 15,
    },
    checkbox: {
        marginLeft: 0,
        marginRight: 10,
        marginTop: 0,
        borderColor: '#FF8D00',
        borderRadius: 5,
        width: 25,
        height: 25
    },
})