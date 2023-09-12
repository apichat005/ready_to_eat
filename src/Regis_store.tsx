import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, ScrollView, Image, Alert , NativeModules } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { isLoaded, isLoading, useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Data {
    store_name: string,
    name: string,
    phone: string,
    email: string,
    type: string,
}

const Regis_store = ({ navigation }) => {

    const [image, setImage] = useState([]);
    const [image_upload , setImage_upload]  = useState([]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const [isLoading, setLoading] = useState(false);
    const bottomSheet = useRef() as React.MutableRefObject<BottomSheet>;
    const [show, setShow] = useState(true)
    const [showPassword, setShowPassword] = useState(true)
    const [showConfirm, setShowConfirm] = useState(true)
    const [data, setData] = useState({
        store_name: '',
        name: '',
        phone: '',
        email: '',
        type: '',
        password: '',
        confirm: '',
    })

    useEffect(() => {
        // เช็คสิทธิ์การเข้าถึง location
        const getPermission = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
            }
        }
        getPermission();
        const getLocation = async () => {
            let location = await Location.getCurrentPositionAsync({});
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
        }
        getLocation();
    })

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            // allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            selectionLimit: 2,
        });

        if (!result.canceled) {
            setImage(result.assets.map((item) => item.uri));
            var data = []
            result.assets.map((item) => {
                data.push({
                    uri: item.uri,
                    type: item.type,
                    name: item.fileName
                })
            })
            setImage_upload(data);
        }
    };

    // save data
    const saveData = () => {
        if (data.password !== data.confirm) {
            Alert.alert('รหัสผ่านไม่ตรงกัน')
            return
        } else if (data.password.length < 6) {
            Alert.alert('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร')
            return
        } else {
            setLoading(true);
            var formData = new FormData();
            formData.append('store_name', data.store_name);
            formData.append('name', data.name);
            formData.append('phone', data.phone);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('latitude', latitude.toString());
            formData.append('longitude', longitude.toString());
            formData.append('status', 's');
            
            image_upload.forEach(element => {
                formData.append('image[]', element);
            });

            fetch('http://apichatapi.ddns.net:8888/prompt_gin_api/public/api/regis_store', {
                method: 'POST',
                body: formData
            }).then(res=> res.json())
            .then(res=> {
                if(res.status == 200){
                    setLoading(false);
                    AsyncStorage.setItem('data', JSON.stringify(res.data));
                    NativeModules.DevSettings.reload();
                    Alert.alert('สมัครสมาชิกสำเร็จ');
                    // navigation.navigate('Login');
                }else{
                    setLoading(false);
                    Alert.alert('สมัครสมาชิกไม่สำเร็จ');
                }
            }).catch(err=> {
                alert(err);
            })
        }
    }


    return (
        <SafeAreaProvider style={{ backgroundColor: '#FFF9EB' }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <View style={{ padding: 20, paddingTop: 0, paddingBottom: 10 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="chevron-left" size={20} color="#FF8D00" style={{ top: 4 }} />
                            <Text style={{ fontSize: 18, fontFamily: 'SukhumvitSet-Bold', color: '#FF8D00', marginLeft: 5 }}> ย้อนกลับ</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, fontSize: 25, fontFamily: 'SukhumvitSet-Bold', color: '#FF8D00' }}>สมัครสมาชิก</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'SukhumvitSet-Bold', color: '#5E605E' }}>ข้อมูลร้านค้า</Text>
                </View>
                <ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <TextInput style={styles.form_control} placeholder="ชื่อร้านค้า"
                        onChangeText={(val) => setData({
                            ...data,
                            store_name: val
                        })}
                    />
                    <TextInput style={styles.form_control} placeholder="ชื่อ - นามสกุล"
                        onChangeText={(val) => setData({
                            ...data,
                            name: val
                        })}
                    />
                    <TextInput style={styles.form_control} placeholder="เบอร์โทรศัพท์"
                        keyboardType="numeric"
                        maxLength={10}
                        onChangeText={(val) => setData({
                            ...data,
                            phone: val
                        })}
                    />
                    <TextInput style={styles.form_control} placeholder="อีเมล์"
                        onChangeText={(val) => setData({
                            ...data,
                            email: val
                        })}
                    />
                    <View>
                        <TextInput style={styles.form_control} placeholder="รหัสผ่าน"
                            secureTextEntry={showPassword}
                            onChangeText={(val) => setData({
                                ...data,
                                password: val
                            })}
                        />
                        <TouchableOpacity
                            style={{ position: 'absolute', right: 0 }}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Icon name={showPassword ? 'eye' : 'eye-slash'} size={18} color="#61677A" style={{ position: 'relative', right: 15, top: 23 }} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TextInput style={styles.form_control} placeholder="ยืนยันรหัสผ่าน"
                            secureTextEntry={showConfirm}
                            onChangeText={(val) => setData({
                                ...data,
                                confirm: val
                            })}
                        />
                        <TouchableOpacity
                            style={{ position: 'absolute', right: 0 }}
                            onPress={() => setShowConfirm(!showConfirm)}
                        >
                            <Icon name={showConfirm ? 'eye' : 'eye-slash'} size={18} color="#61677A" style={{ position: 'relative', right: 15, top: 23 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        backgroundColor: 'white',
                        borderWidth: 0.8,
                        borderColor: '#FF8D00',
                        marginTop: 10,
                        borderRadius: 10
                    }}>
                        <TouchableOpacity onPress={pickImage} style={styles.uploadimage}>
                            <Icon name="camera" size={30} color="#FF8D00" style={{ top: 0, marginRight: 10, textAlign: 'center' }} />
                            <Text style={{ color: '#5E605E', fontFamily: 'SukhumvitSet-SemiBold', textAlign: 'center', marginTop: 5 }}>อัพโหลดรูปภาพ</Text>
                        </TouchableOpacity>
                        <View style={styles.imageGrid}>
                            {
                                image.map((item, index) => (
                                    <>
                                        <View>
                                            <Image source={{ uri: item }} style={styles.imageItemGrid} />
                                            <TouchableOpacity style={{ position: 'relative', top: 0, right: 0, zIndex: 1, padding: 5 }}
                                                onPress={() => {
                                                    let newImage = image.filter((item, i) => i != index);
                                                    let newImage_upload = image_upload.filter((item, i) => i != index);
                                                    setImage(newImage);
                                                }}
                                            >
                                                <View style={{ flexDirection: 'row', justifyContent: 'center',width: 'auto' }}>
                                                    <Icon name="times" size={20} color="#FF8D00" />
                                                    <Text style={{ color: '#FF8D00', fontFamily: 'SukhumvitSet-SemiBold', textAlign: 'center', marginLeft: 10, marginTop: -3, fontSize: 16 }}>ลบ</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                ))
                            }
                        </View>
                    </View>

                    <MapView style={styles.map}
                        showsUserLocation={true}
                        provider={PROVIDER_GOOGLE}
                        region={{
                            latitude: latitude != null ? latitude : 13.7563,
                            longitude: longitude != null ? longitude : 100.5018,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                    />
                </ScrollView>
                <View style={{ padding: 20, paddingTop: 0, paddingBottom: 10 }}>
                    <TouchableOpacity style={{ backgroundColor: '#FF8D00', width: '100%', padding: 12, borderRadius: 50, marginTop: 10 }}
                        onPress={() => saveData()}
                    >
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontFamily: 'SukhumvitSet-SemiBold' }}>
                            ลงทะเบียน
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Regis_store;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#FFF9EB',
    },
    form_control: {
        width: '100%',
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: '#FF8D00',
        backgroundColor: '#FCFCFC',
        textAlign: 'left',
        paddingLeft: 20,
        fontSize: 14,
        fontFamily: 'SukhumvitSet-Text'
    },
    form_select: {
        width: '100%',
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: '#FF8D00',
        backgroundColor: '#FCFCFC',
        textAlign: 'left',
        paddingLeft: 20,
        fontSize: 14,
        fontFamily: 'SukhumvitSet-Text'
    },
    uploadimage: {
        width: '100%',
        padding: 14,
        backgroundColor: '#FCFCFC',
        fontSize: 16,
        borderRadius: 10,
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        width: '100%',
    },
    imageItemGrid: {
        width: 160,
        height: 100,
        objectFit: 'cover',
        borderRadius: 10,
    },
    map: {
        marginTop: 10,
        width: '100%',
        height: 300,
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: '#FF8D00',
    },
});
