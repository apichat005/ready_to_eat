import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image, Platform, ActivityIndicator, Alert, Pressable, Modal, NativeModules } from 'react-native';
import { useFonts } from 'expo-font';
import { bakery, facebook, line, gmail, userimage } from '../assets/list';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(true)
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState('');

    const Check = () => {
        setIsLoading(true);
        var formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);

        fetch('http://apichatapi.ddns.net:8888/prompt_gin_api/public/api/login', {
            method: 'POST',
            body: formData
        }).then((response) => response.json())
            .then((res) => {
                setIsLoading(false);
                if (res.status == 200) {
                    AsyncStorage.setItem('data', JSON.stringify(res.data));
                    // AsyncStorage.getItem('data').then((value) => {
                        // var id = JSON.parse(value)[0]['id'];
                        // var role = JSON.parse(value)[0]['role'];

                        // var formData = new FormData();
                        // formData.append('id', id);
                        // formData.append('role', role);

                        // fetch('http://apichatapi.ddns.net:8888/prompt_gin_api/public/api/account_detail', {
                        //     method: 'POST',
                        //     body: formData
                        // }).then(res => res.json())
                        //     .then(res => {
                        //         if (res.status == 200) {
                        //             AsyncStorage.setItem('dataDetail', JSON.stringify(res.data))
                        //         }
                        //     }).catch(err => {
                        //         console.log(err);
                        //     })
                    // })

                    NativeModules.DevSettings.reload();
                } else {
                    Alert.alert('เกิดข้อผิดพลาด', 'อีเมล หรือ รหัสผ่าน ไม่ถูกต้อง');
                }
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            }
            );
    }

    return (
        <SafeAreaProvider style={{ backgroundColor: 'transporent' }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transporent' }}
                edges={['right', 'left']}
            >
                <View style={styles.container}>
                    <View style={styles.flex}>
                        <Image source={bakery} style={{ width: 72, height: 72, objectFit: 'contain' }} />
                        <View style={{ marginLeft: 12, marginTop: 15 }}>
                            <Text style={{ fontSize: 20, color: '#E07D08', fontFamily: 'SukhumvitSet-SemiBold' }}>พร้อมกิน</Text>
                            <Text style={{ fontSize: 14, color: '#ABABAB', fontFamily: 'SukhumvitSet-SemiBold' }}></Text>
                        </View>
                    </View>
                    <Text style={styles.title}>เข้าสู่ระบบ</Text>
                    <TextInput style={styles.form_control} placeholder="อีเมล หรือ กรอกเบอร์โทรศัพท์"
                        onChangeText={setEmail}
                        value={email}
                    />
                    <TextInput style={styles.form_control} placeholder="รหัสผ่าน"
                        secureTextEntry={show}
                        onChangeText={setPassword}
                        value={password}
                    />
                    <TouchableOpacity
                        style={{ position: 'absolute', right: 0 }}
                        onPress={() => setShow(!show)}
                    >
                        <Icon name={show ? 'eye' : 'eye-slash'} size={18} color="#61677A" style={{ position: 'relative', right: 35, top: Platform.OS === 'ios' ? -5 : -1 }} />
                    </TouchableOpacity>

                    <TouchableOpacity style={email == '' || password == '' ? styles.btn_login_disabled : styles.btn_login} onPress={Check}
                        disabled={email == '' || password == '' ? true : false}
                    >
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 15, fontFamily: 'SukhumvitSet-SemiBold' }}>เข้าสู่ระบบ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ paddingTop: 5, marginTop: 10 }}
                        onPress={() => /*navigation.navigate('Home_store')*/ { }}
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

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Regis')}
                            style={{ backgroundColor: '#61677A', padding: 0, borderRadius: 50, width: '100%', alignItems: 'center' }}
                        >
                            <Text style={{ fontFamily: 'SukhumvitSet-SemiBold', paddingTop: 12, paddingBottom: 12, marginLeft: 8, color: 'white' }}>
                                สมัครสมาชิก
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isLoading}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setIsLoading(!isLoading);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <ActivityIndicator size="large" color="#FF8D00" />
                            <Text style={{ textAlign: 'center', marginTop: 10, fontFamily: 'SukhumvitSet-SemiBold', color: 'white' }}>
                                กรุณารอสักครู่...
                            </Text>
                        </View>
                    </View>
                </Modal>
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
    btn_login_disabled: {
        backgroundColor: '#ffad49',
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
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
    },
    modalView: {
        margin: 20,
        backgroundColor: '#00000099',
        borderRadius: 20,
        padding: 30,
        paddingBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
});
