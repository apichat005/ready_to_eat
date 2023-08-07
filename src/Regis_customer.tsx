import React, { useState , useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, FlatList , Platform} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFonts } from 'expo-font';
import BottomSheet from "react-native-gesture-bottom-sheet";
import * as Location from 'expo-location';
import MapView , { PROVIDER_GOOGLE } from 'react-native-maps';
import './config'

const Regis_customer = ({ navigation }) => {
    interface Data {
        id: number;
        label: string;
        value: string;
        old: number;
    }

    const bottomSheet = useRef() as React.MutableRefObject<BottomSheet>;
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    // check platform
    const isWeb = Platform.OS === 'web';
    const isAndroid = Platform.OS === 'android';
    const isIOS = Platform.OS === 'ios';

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

    const [old, setOld] = useState(0) // อายุ
    const OldList = [
        { id: 1, label: '0 - 9 ปี', value: '0 - 9 ปี' },
        { id: 2, label: '10 - 19 ปี', value: '10 - 19 ปี' },
        { id: 3, label: '20 - 29 ปี', value: '20 - 29 ปี' },
        { id: 4, label: '30 - 39 ปี', value: '30 - 39 ปี' },
        { id: 5, label: '40 - 54 ปี', value: '40 - 54 ปี' },
        { id: 6, label: '55 - ปีขึ้นไป', value: '55 - ปีขึ้นไป' }
    ]

    return (
        <SafeAreaProvider style={{ backgroundColor: '#FFF9EB' }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <View style={{ padding: 20, paddingTop: 0 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="chevron-left" size={20} color="#FF8D00" style={{ top: 4 }} />
                            <Text style={{ fontSize: 18, fontFamily: 'SukhumvitSet-Bold', color: '#FF8D00', marginLeft: 5 }}> ย้อนกลับ</Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={{ marginTop: 10, fontSize: 25, fontFamily: 'SukhumvitSet-Bold', color: '#FF8D00' }}>สมัครสมาชิก</Text>
                    <Text style={{ fontSize: 15, fontFamily: 'SukhumvitSet-Bold', color: '#5E605E' }}>ข้อมูลผู้ใช้งาน</Text>
                </View>
                <ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <TextInput style={styles.form_control} placeholder="ชื่อ - นามสกุล" />
                    <TextInput style={styles.form_control} placeholder="เบอร์โทรศัพท์" keyboardType="numeric" maxLength={10} />
                    <TextInput style={styles.form_control} placeholder="อีเมล์" />
                    <TouchableOpacity
                        style={styles.form_select}
                        onPress={() => bottomSheet.current.show()}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#5E605E', fontFamily: 'SukhumvitSet-Text' }}>
                                {old ? old : 'เลือกช่วงอายุ'}
                            </Text>
                            <Icon name="chevron-down" size={14} color="#5E605E" style={{ top: 4, marginRight: 5 }} />
                        </View>
                    </TouchableOpacity>

                    <BottomSheet hasDraggableIcon ref={bottomSheet} height={400}>
                        <Text style={{fontSize: 18,color:'#FF8D00',marginLeft:10,fontFamily:'SukhumvitSet-SemiBold'}}>
                            เลือกช่วงอายุ
                        </Text>
                            <FlatList
                                data={OldList}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#EAEAEA' }}
                                        onPress={() => {
                                            setOld(item.id)
                                            bottomSheet.current.close()
                                        }}
                                    >
                                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                            <Text style={{ fontFamily: 'SukhumvitSet-SemiBold' , fontSize:16 , marginLeft:2 }}>{item.label}</Text>
                                            {
                                                old == item.id ? <Icon name="check" size={16} color="#FF8D00" style={{ top: 4, marginRight: 5 }} /> : null
                                            }
                                        </View>
                                        
                                    </TouchableOpacity>
                                )}
                            />
                    </BottomSheet>

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
                <View style={{ padding: 20 }}>
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
    );
}
export default Regis_customer;

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
    map: {
        width: '100%',
        height: 200,
        marginTop: 10,
        borderRadius: 10
    }
});