import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, ScrollView, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { isLoaded, isLoading, useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView , { PROVIDER_GOOGLE } from 'react-native-maps';

interface Data {
    store_name: string,
    name: string,
    phone: string,
    email: string,
    type: string,
}

const Regis_store = ({ navigation }) => {

    const [image, setImage] = useState([]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const [isLoading, setLoading] = useState(false);
    const bottomSheet = useRef() as React.MutableRefObject<BottomSheet>;
    const [data, setData] = useState({
        store_name: '',
        name:'',
        phone: '',
        email: '',
        type: '',
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
        }
    };


    const list = [
        { id: 1, value: 'A' },
        { id: 2, value: 'B' },
        { id: 3, value: 'C' },
        { id: 4, value: 'D' },
        { id: 5, value: 'E' },
    ]

    return (
        <SafeAreaProvider style={{ backgroundColor: '#FFF9EB' }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <View style={{ padding: 20, paddingTop: 0 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="chevron-left" size={20} color="#FF8D00" style={{ top: 4 }} onPress={() => navigation.navigate('login')} />
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
                    <TextInput style={styles.form_control} placeholder="เบอร์โทรศัพท์" keyboardType="numeric" maxLength={10}
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
                    <TouchableOpacity style={styles.form_select} onPress={() => bottomSheet.current.show()}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#5E605E', fontFamily: 'SukhumvitSet-Text' }}>
                                {data.type ? data.type : <Text style={{ color: 'silver' }}>เลือกประเภทร้านค้า</Text>}
                            </Text>
                            <Icon name="chevron-down" size={14} color="#5E605E" style={{ top: 4, marginRight: 5 }} />
                        </View>
                    </TouchableOpacity>
                    <BottomSheet hasDraggableIcon ref={bottomSheet} height={600}>
                        <Text style={{ fontSize: 18, color: '#FF8D00', marginLeft: 10, fontFamily: 'SukhumvitSet-SemiBold' }}>
                            เลือกประเภทร้านค้า
                        </Text>
                        <ScrollView>
                            <FlatList
                                data={list}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#EAEAEA' }}
                                        onPress={() => {
                                            setData({
                                                ...data,
                                                type: item.value
                                            })
                                            bottomSheet.current.close()
                                        }}
                                    >
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontFamily: 'SukhumvitSet-SemiBold', fontSize: 16, marginLeft: 2 }}>{item.value}</Text>
                                            {
                                                data.type == item.value ? <Icon name="check" size={16} color="#FF8D00" style={{ top: 4, marginRight: 5 }} /> : null
                                            }
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </ScrollView>
                    </BottomSheet>

                    <View style={{
                        backgroundColor: 'white', 
                        borderWidth: 0.8,
                        borderColor: '#FF8D00',
                        marginTop: 10,
                        borderRadius: 10
                    }}>
                        <TouchableOpacity onPress={pickImage} style={styles.uploadimage}>
                            <Icon name="camera" size={30} color="#FF8D00" style={{ top: 0, marginRight: 10, textAlign: 'center'}} />
                            <Text style={{ color: '#5E605E', fontFamily: 'SukhumvitSet-SemiBold', textAlign: 'center', marginTop: 5 }}>อัพโหลดรูปภาพ</Text>
                        </TouchableOpacity>
                        <View style={styles.imageGrid}>
                            {
                                image.map((item, index) => (
                                    <>
                                        <View>
                                        <Image source={{ uri: item }} style={styles.imageItemGrid}/>
                                        <TouchableOpacity style={{ position: 'relative', top: 0, right: 0, zIndex: 1, padding: 5 }}
                                            onPress={() => {
                                                let newImage = image.filter((item, i) => i != index);
                                                setImage(newImage);
                                            }}
                                        >
                                            <Icon name="times" size={20} color="#FF8D00" />
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
                <View style={{ padding: 20 , paddingTop:0 , paddingBottom: 10 }}>
                    <TouchableOpacity style={{ backgroundColor: '#FF8D00', width: '100%', padding: 12, borderRadius: 50, marginTop: 20 }}
                        onPress={() => navigation.navigate('Regis_customer')}
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
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#FFF9EB',
    },
    form_control: {
        width: '100%',
        marginTop: 10,
        padding: 10,
        borderRadius: 50,
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
        padding: 14,
        borderRadius: 50,
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
    },
    imageItemGrid: {
        width: '48.5%',
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
