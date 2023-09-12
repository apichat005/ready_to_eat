import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, ScrollView, Image, Alert, NativeModules, ImageBackground , Modal } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { isLoaded, isLoading, useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';

const Regis_store = ({ navigation }) => {
    const [id, setId] = useState(null);
    const [image, setImage] = useState([]);
    const [new_image, setNew_image] = useState([]);
    const [image_upload, setImage_upload] = useState([]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const [isLoading , setIsLoading] = useState(false);
    const [Loading, setLoading] = useState(false);
    const bottomSheet = useRef() as React.MutableRefObject<BottomSheet>;
    const [show, setShow] = useState(true)
    const [showPassword, setShowPassword] = useState(true)
    const [showConfirm, setShowConfirm] = useState(true)
    const [data, setData] = useState({
        store_name: '',
        name: '',
        phone: '',
        email: '',
        type: ''
    })

    const getDetail = () => {
        try {
            AsyncStorage.getItem('data').then((value) => {
                if (value != null) {
                    const res = JSON.parse(value);
                    setId(res[0]['id'])
                    var id = res[0]['id'];
                    var role = res[0]['role'];

                    // สร้างชุดข้อมูลใหม่เพื่อทำการอัพเดต
                    const newData = { ...data };

                    // อัพเดต phone และ email
                    newData.phone = res[0]['phone'];
                    newData.email = res[0]['email'];

                    var formData = new FormData();
                    formData.append('id', id);
                    formData.append('role', role);

                    fetch('http://apichatapi.ddns.net:8888/prompt_gin_api/public/api/account_detail', {
                        method: 'POST',
                        body: formData
                    }).then(res => res.json())
                        .then(res => {
                            if (res.status == 200) {
                                // อัพเดต store_name และ name
                                newData.store_name = res.data[0]['store_name'];
                                newData.name = res.data[0]['fullname'];
                                setData(newData); // อัพเดต state ด้วยข้อมูลใหม่
                            }
                        }
                        ).catch(err => {
                            alert(err);
                        })

                    fetch('http://apichatapi.ddns.net:8888/prompt_gin_api/public/api/image_store', {
                        method: 'POST',
                        body: formData
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.status == 200) {
                                setImage(res.data.map(item => item.sti_image));
                            }
                        }
                        ).catch(err => {
                            alert(err);
                        })
                }
            })
        } catch (err) {
            alert(err);
        }
    }

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
        getDetail()
    }, [])

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
            setNew_image(result.assets.map((item) => item.uri));
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
        setLoading(true);
        var formData = new FormData();
        formData.append('id', id);
        formData.append('store_name', data.store_name);
        formData.append('name', data.name);
        formData.append('phone', data.phone);
        formData.append('email', data.email);
        formData.append('latitude', latitude.toString());
        formData.append('longitude', longitude.toString());
        formData.append('status', 's');

        image_upload.forEach(element => {
            formData.append('image[]', element);
        });

        fetch('http://apichatapi.ddns.net:8888/prompt_gin_api/public/api/update_store', {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status == 200) {
                    setIsLoading(false);
                    AsyncStorage.setItem('data', JSON.stringify(res.data));
                    Alert.alert('อัพเดทข้อมูลสำเร็จ');
                    navigation.goBack();
                } else {
                    setIsLoading(false);
                    Alert.alert('อัพเดทข้อมูลไม่สำเร็จ');
                }
            }).catch(err => {
                alert(err);
            })
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
                    <Text style={{ marginTop: 10, fontSize: 25, fontFamily: 'SukhumvitSet-Bold', color: '#FF8D00' }}>
                        อัพเดทข้อมูลร้านค้า
                    </Text>
                    <Text style={{ fontSize: 15, fontFamily: 'SukhumvitSet-Bold', color: '#5E605E' }}>ข้อมูลร้านค้า</Text>
                </View>
                <ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <TextInput style={styles.form_control} placeholder="ชื่อ - นามสกุล"
                        value={data.name}
                        onChangeText={(val) => setData({
                            ...data,
                            name: val
                        })}
                    />
                    <TextInput style={styles.form_control} placeholder="เบอร์โทรศัพท์"
                        keyboardType="numeric"
                        maxLength={10}
                        value={data.phone}
                        onChangeText={(val) => setData({
                            ...data,
                            phone: val
                        })}
                    />
                    <TextInput style={styles.form_control} placeholder="อีเมล์"
                        value={data.email}
                        onChangeText={(val) => setData({
                            ...data,
                            email: val
                        })}
                    />
                    <TextInput style={styles.form_control} placeholder="ชื่อร้านค้า"
                        value={data.store_name}
                        onChangeText={(val) => setData({
                            ...data,
                            store_name: val
                        })}
                    />


                    <Text
                        style={{
                            marginTop: 10,
                            marginBottom: 3,
                            fontSize: 15,
                            fontFamily: 'SukhumvitSet-Bold',
                            color: '#5E605E'
                        }}
                    >
                        รูปภาพร้านค้า
                    </Text>
                    <Text style={{ marginBottom: 5, fontFamily: 'SukhumvitSet-Text', fontSize: 12 }}>
                        รูปภาพที่อัพโหลดจะถูกแสดงเป็นรูปภาพหลักของร้านค้า
                    </Text>
                    <View>
                        {
                            image.map((item, index) => {
                                return (
                                    <View>
                                        <ImageBackground source={{ uri: 'http://apichatapi.ddns.net:8888/prompt_gin_api/public/api/images/' + item }} style={{ width: '100%', height: 140, borderRadius: 10, alignItems: 'center' }}
                                            imageStyle={{ borderRadius: 6 }}
                                        >
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                style={{ zIndex: 1, padding: 5, top: 50, backgroundColor: '#000000d2', width: 100, borderRadius: 10 }}
                                                onPress={() => {
                                                    Alert.alert('ลบรูปภาพ', `คุณต้องการลบรูปภาพนี้ใช่หรือไม่\nหากทำการลบจะไม่สามารถกู้คืนได้`, [
                                                        {
                                                            text: 'ยกเลิก',
                                                            onPress: () => console.log('Cancel Pressed'),
                                                            style: 'cancel'
                                                        },
                                                        {
                                                            text: 'ตกลง',
                                                            onPress: () => {
                                                                var find = image.find((item, i) => i == index);
                                                                if (find) {
                                                                    var formData = new FormData();
                                                                    formData.append('image', find);
                                                                    formData.append('id', id);
                                                                    fetch('http://apichatapi.ddns.net:8888/prompt_gin_api/public/api/delete_image', {
                                                                        method: 'POST',
                                                                        body: formData
                                                                    }).then(res => res.json())
                                                                        .then(res => {
                                                                            if (res.status == 200) {
                                                                                let newImage = image.filter((item, i) => i != index);
                                                                                setImage(newImage);
                                                                            }
                                                                        }).catch(err => {
                                                                            alert(err);
                                                                        }
                                                                        )
                                                                }
                                                            }
                                                        }
                                                    ])
                                                }}
                                            >
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', width: 'auto' }}>
                                                    <Icon name="times" size={20} color="#FF8D00" />
                                                    <Text style={{ color: '#FF8D00', fontFamily: 'SukhumvitSet-SemiBold', textAlign: 'center', marginLeft: 10, marginTop: -3, fontSize: 16 }}>ลบ</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    </View>
                                )
                            })
                        }
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
                                new_image.map((item, index) => (
                                    <>
                                        <View>
                                            <Image source={{ uri: item }} style={styles.imageItemGrid} />
                                            <TouchableOpacity style={{ position: 'relative', top: 0, right: 0, zIndex: 1, padding: 5 }}
                                                onPress={() => {
                                                    Alert.alert('ลบรูปภาพ', 'คุณต้องการลบรูปภาพนี้ใช่หรือไม่', [
                                                        {
                                                            text: 'ยกเลิก',
                                                            style: 'cancel'
                                                        },
                                                        {
                                                            text: 'ตกลง',
                                                            onPress: () => {
                                                                let newImage = image.filter((item, i) => i != index);
                                                                let newImage_upload = image_upload.filter((item, i) => i != index);
                                                                setImage(newImage);
                                                                setImage_upload(newImage_upload);
                                                            }
                                                        }
                                                    ])

                                                }}
                                            >
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', width: 'auto' }}>
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
                        onPress={() => {
                            saveData();
                            isLoading ? setIsLoading(false) : setIsLoading(true);
                        }}
                    >
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontFamily: 'SukhumvitSet-SemiBold' }}>
                            อัพเดทข้อมูลร้านค้า
                        </Text>
                    </TouchableOpacity>
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
