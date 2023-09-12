import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ImageBackground, Image, Platform, ScrollView } from 'react-native';
import {
    SafeAreaView,
    SafeAreaProvider
} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { bakery, banner1, banner2, banner3, cookie, cake, drink, milk, teaCup, bubbleTea, cookie2 } from '../assets/list';
import Swiper from 'react-native-swiper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { useRoute } from '@react-navigation/native';

const Home_store = ({ navigation }) => {
    const [data, setData] = useState<String[]>([]);
    const [dataDetail, setDataDetail] = useState<String[]>([]);
    const width = Dimensions.get('window').width;
    // check platform
    const isWeb = Platform.OS === 'web';
    const isAndroid = Platform.OS === 'android';
    const isIOS = Platform.OS === 'ios';

    useEffect(() => {
        AsyncStorage.getItem('data').then((value) => {
            if (value != null) {
                setData(JSON.parse(value));
            }
        });
    }, []);

    const [fontsLoaded] = useFonts({
        'SukhumvitSet-Bold': require('../assets/fonts/SukhumvitSet-Bold.ttf'),
        'SukhumvitSet-SemiBold': require('../assets/fonts/SukhumvitSet-SemiBold.ttf'),
        'SukhumvitSet-Text': require('../assets/fonts/SukhumvitSet-Text.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaProvider style={{ backgroundColor: '#FFF9EB' }} >
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent', height: '100%' }}
                edges={['right', 'top', 'left']}
            >
                <View style={styles.flex}>
                    <View style={{ paddingLeft: 15, flexDirection: 'row' }}>
                        <Image source={bakery} style={{ width: 42, height: 42, objectFit: 'contain' }} />
                        <View>
                            <Text style={{ fontSize: 16, color: '#FF8D00', fontFamily: 'SukhumvitSet-Bold', marginLeft: 5 }}>พร้อมกิน</Text>
                            <Text style={{ fontSize: 14, color: '#515151', fontFamily: 'SukhumvitSet-Text', marginLeft: 5, position: 'relative', top: -2 }}>Ready to eat</Text>
                        </View>
                    </View>
                    <View style={{ paddingRight: 15, flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Cart_customer')}
                        >
                            <Icon name="bell" size={26} color="#FF8D00" style={{ top: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (data.length > 0) {
                                    navigation.navigate('Useraccount')
                                } else {
                                    navigation.navigate('Login')
                                }
                            }}
                        >
                            <Icon name="user" size={26} color="#FF8D00" style={{ top: 10, marginLeft: 18 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView >
                    <Swiper
                        autoplay
                        autoplayTimeout={5}
                        height={270}
                        dotStyle={{ marginBottom: 0 }}
                        dot={<View style={{ backgroundColor: 'rgba(0,0,0,0.2)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3 }} />}
                        activeDot={<View style={{ backgroundColor: '#FF8D00', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3 }} />}
                        style={{ position: 'relative', top: -30 }}
                    >
                        <View style={{ flex: 1 }}>
                            <Image source={banner1} style={{ width: '100%', height: 300, objectFit: 'cover' }} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Image source={banner2} style={{ width: '100%', height: 300, objectFit: 'cover' }} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Image source={banner3} style={{ width: '100%', height: 300, objectFit: 'cover' }} />
                        </View>
                    </Swiper>

                    <View style={{ paddingLeft: 15, paddingRight: 15, marginTop: 0, position: 'relative', top: -15 }}>
                        <Text style={{ fontSize: 16, color: '#FF8D00', fontFamily: 'SukhumvitSet-Bold' }}>
                            สินค้าที่เปิดขาย
                        </Text>
                        <View style={styles.grid}>
                            <View style={styles.card}>
                                <Image source={cookie2} style={styles.Image} />
                                <View style={styles.card_footer}>
                                    <View>
                                        <Text style={{ fontSize: 16, color: '#515151', fontFamily: 'SukhumvitSet-SemiBold' }}>คุกกี้</Text>
                                        <Text style={{ fontSize: 12, color: '#515151', fontFamily: 'SukhumvitSet-Text' }}>คงเหลือ 20 ชิ้น</Text>
                                    </View>
                                    <View>
                                        <Icon name="map" size={20} color="#FF8D00" style={{ textAlign: 'center' }} />
                                        <Text style={{ color: '#656565', paddingTop: 5, fontFamily: 'SukhumvitSet-Text', fontSize: 12 }}>
                                            950 ม.
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.card}>
                                <Image source={cookie2} style={styles.Image} />
                                <View style={styles.card_footer}>
                                    <View>
                                        <Text style={{ fontSize: 16, color: '#515151', fontFamily: 'SukhumvitSet-SemiBold' }}>คุกกี้</Text>
                                        <Text style={{ fontSize: 12, color: '#515151', fontFamily: 'SukhumvitSet-Text' }}>คงเหลือ 20 ชิ้น</Text>
                                    </View>
                                    <View>
                                        <Icon name="map" size={20} color="#FF8D00" style={{ textAlign: 'center' }} />
                                        <Text style={{ color: '#656565', paddingTop: 5, fontFamily: 'SukhumvitSet-Text', fontSize: 12 }}>
                                            1.2 กม.
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.card}>
                                <Image source={cookie2} style={styles.Image} />
                                <View style={styles.card_footer}>
                                    <View>
                                        <Text style={{ fontSize: 16, color: '#515151', fontFamily: 'SukhumvitSet-SemiBold' }}>คุกกี้</Text>
                                        <Text style={{ fontSize: 12, color: '#515151', fontFamily: 'SukhumvitSet-Text' }}>คงเหลือ 20 ชิ้น</Text>
                                    </View>
                                    <View>
                                        <Icon name="map" size={20} color="#FF8D00" style={{ textAlign: 'center' }} />
                                        <Text style={{ color: '#656565', paddingTop: 5, fontFamily: 'SukhumvitSet-Text', fontSize: 12 }}>
                                            1.2 กม.
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.card}>
                                <Image source={cookie2} style={styles.Image} />
                                <View style={styles.card_footer}>
                                    <View>
                                        <Text style={{ fontSize: 16, color: '#515151', fontFamily: 'SukhumvitSet-SemiBold' }}>คุกกี้</Text>
                                        <Text style={{ fontSize: 12, color: '#515151', fontFamily: 'SukhumvitSet-Text' }}>คงเหลือ 20 ชิ้น</Text>
                                    </View>
                                    <View>
                                        <Icon name="map" size={20} color="#FF8D00" style={{ textAlign: 'center' }} />
                                        <Text style={{ color: '#656565', paddingTop: 5, fontFamily: 'SukhumvitSet-Text', fontSize: 12 }}>
                                            1.2 กม.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </SafeAreaView>
            <SafeAreaView
                edges={['bottom']}
                style={{
                    backgroundColor: '#ffa73c',
                    justifyContent: 'center',
                    paddingTop: 15,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    paddingBottom: Platform.OS === 'ios' ? 5 : 15,
                }}
            >
                <View style={styles.navigationGrid}>
                    <TouchableOpacity style={[styles.navigationItem]} onPress={() => navigation.navigate('Home_store')}>
                        <Icon name="home" size={24} color="black" />
                        <Text style={styles.navigationText}>หน้าหลัก</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.navigationItem} onPress={() => navigation.navigate('List_product_store')}>
                        <Icon name="list" size={24} color="black" />
                        <Text style={styles.navigationText}>รายการสินค้า</Text>
                    </TouchableOpacity> */}
                    <View style={[styles.navigationItem]}>
                        <View 
                            style={{ position: 'absolute' }}
                        >
                            <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 50 , position: 'relative', top: -4 }}
                                onPress={() => navigation.navigate('List_product_store')}
                            >
                                <Icon name="plus-circle" size={40} color="#FF8D00"
                                    style={{
                                        padding: 6,

                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* <TouchableOpacity style={styles.navigationItem} onPress={() => navigation.navigate('Home_customer')}>
                        <Icon name="percent" size={24} color="black" />
                        <Text style={styles.navigationText}>โปรโมชั่น</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.navigationItem} onPress={() => navigation.navigate('Home_customer')}>
                        <Icon name="settings" size={24} color="black" />
                        <Text style={styles.navigationText}>ตั้งค่า</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
export default Home_store


const styles = StyleSheet.create({
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 10
    },
    grid_a: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 8,
    },
    grid_b: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 10
    },
    grid_item: {
        width: '23%',
        height: 100,
        backgroundColor: '#ffebd2',
        // backgroundColor: 'transparent',
        borderRadius: 10,
        padding: 10
    },
    lableImage: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        textAlign: 'center',
    },
    lableTextImage: {
        color: 'black',
        fontFamily: 'SukhumvitSet-SemiBold',
        textAlign: 'center',
        marginTop: 3
    },
    Image: {
        width: '100%',
        height: 100,
        objectFit: 'cover',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    navigationGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    navigationItem: {
        textAlign: 'center',
        alignItems: 'center'
    },
    navigationText: {
        fontFamily: 'SukhumvitSet-Text',
        fontSize: 12,
        marginTop: 2
    },
    fab: {
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    fab_button: {
        position: 'relative',
        right: 20,
        bottom: 100,
        backgroundColor: '#FF8D00',
        padding: 16,
        borderRadius: 50
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '48.5%',
        height: 160,
        // boxshadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.06 : 0.3,
        shadowRadius: 3.84,
        elevation: Platform.OS === 'ios' ? 0 : 1,
    },
    cardItem: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
    card_footer: {
        paddingTop: 8,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})