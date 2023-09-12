import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
    SafeAreaView,
    SafeAreaProvider
} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const MemberType = ({ navigation }) => {

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

                    <Text style={{ marginTop: 10, fontSize: 25, fontFamily: 'SukhumvitSet-Bold', color: '#FF8D00' }}>ประเภทสมาชิก</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'SukhumvitSet-Bold', color: '#5E605E' }}>เลือกประเภทสมาชิก</Text>

                    <TouchableOpacity style={{ backgroundColor: '#FF8D00', width: '100%', padding: 12, borderRadius: 50, marginTop: 70 }}
                        onPress={() => navigation.navigate('Regis_customer')}
                    >
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontFamily: 'SukhumvitSet-SemiBold' }}>
                            ลูกค้าทั่วไป
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#FF8D00', width: '100%', padding: 12, borderRadius: 50, marginTop: 20 }}
                        onPress={() => navigation.navigate('Regis_store')}
                    >
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontFamily: 'SukhumvitSet-SemiBold' }}>
                            ร้านค้า
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default MemberType;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#FFF9EB',
    },
});