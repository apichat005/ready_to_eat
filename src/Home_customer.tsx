import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ImageBackground, Image, Platform, ScrollView } from 'react-native';
import {
    SafeAreaView,
    SafeAreaProvider
} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { bakery, banner1, banner2, banner3, cookie, cake, drink, milk, teaCup, bubbleTea } from '../assets/list';
import Swiper from 'react-native-swiper';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home_customer = ({ navigation }) => {
    const [data, setData] = useState<String[]>([]);
    const [dataDetail , setDataDetail] = useState<String[]>([]);
    const [fontsLoaded] = useFonts({
        'SukhumvitSet-Bold': require('../assets/fonts/SukhumvitSet-Bold.ttf'),
        'SukhumvitSet-SemiBold': require('../assets/fonts/SukhumvitSet-SemiBold.ttf'),
        'SukhumvitSet-Text': require('../assets/fonts/SukhumvitSet-Text.ttf'),
    });

    useEffect(() => {
        AsyncStorage.getItem('data').then((value) => {
            if (value != null) {
                setData(JSON.parse(value));
            }
        });

        AsyncStorage.getItem('dataDetail').then((value) => {
            if (value != null) {
                setDataDetail(JSON.parse(value));
            }
        }
        )
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const width = Dimensions.get('window').width;
    const isWeb = Platform.OS === 'web';
    const isAndroid = Platform.OS === 'android';
    const isIOS = Platform.OS === 'ios';

    return (
        <SafeAreaProvider style={{ backgroundColor: '#FFF9EB' }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}
                edges={['right', 'top', 'left']}
            >
                <View style={styles.flex}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={bakery} style={{ width: 42, height: 42, objectFit: 'contain' }} />
                        <View>
                            <Text style={{ fontSize: 16, color: '#FF8D00', fontFamily: 'SukhumvitSet-Bold', marginLeft: 5 }}>พร้อมกิน</Text>
                            <Text style={{ fontSize: 14, color: '#515151', fontFamily: 'SukhumvitSet-Text', marginLeft: 5, position: 'relative', top: -2 }}>Prompt gin</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Cart_customer')}
                            >
                                <Icon name="bell" size={26} color="#FF8D00" style={{ top: 10, marginRight: 15 }} />
                            </TouchableOpacity>
                            {/* <View style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#FF8D00', width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#FFF', fontSize: 10 }}>10</Text>
                            </View> */}
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                if (data.length > 0) {
                                    navigation.navigate('Useraccount')
                                } else {
                                    navigation.navigate('Login')
                                }
                            }}
                        >
                            <Icon name="user" size={26} color="#FF8D00" style={{ top: 10 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text>

                </Text>
                <ScrollView style={{ paddingTop: 0, zIndex: -1, marginTop: -35 }}>
                    <Swiper
                        autoplay
                        autoplayTimeout={3}
                        height={300}
                        dotStyle={{ marginBottom: 0 }}
                        dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                        activeDot={<View style={{ backgroundColor: '#FF8D00', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
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
                    <View style={{ paddingLeft: 5, paddingRight: 5 }}>
                        <View style={styles.grid_a}>
                            <TouchableOpacity style={styles.grid_item} onPress={() => navigation.navigate('List_product_customer',
                                {
                                    id: 1,
                                    type: 'ขนมปัง',
                                }
                            )}>
                                <Image source={bakery} style={styles.Image} />
                                <View style={styles.lableImage}>
                                    <Text style={styles.lableTextImage}>
                                        ขนมปัง
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.grid_item} onPress={() => navigation.navigate('Product_customer', {
                                id: 2,
                                type: 'คุกกี้',
                            })}>
                                <Image source={cookie} style={styles.Image} />
                                <View style={styles.lableImage}>
                                    <Text style={styles.lableTextImage}>
                                        คุกกี้
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.grid_item} onPress={() => navigation.navigate('Product_customer', {
                                id: 3,
                                type: 'เค้ก',
                            })}>
                                <Image source={cake} style={styles.Image} />
                                <View style={styles.lableImage}>
                                    <Text style={styles.lableTextImage}>
                                        เค้ก
                                    </Text>
                                </View>
                            </TouchableOpacity>
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
                    <TouchableOpacity style={styles.navigationItem} onPress={() => navigation.navigate('Home_customer')}>
                        <Icon name="home" size={24} color="black" />
                        <Text style={styles.navigationText}>หน้าหลัก</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navigationItem} onPress={() => navigation.navigate('Home_customer')}>
                        <Icon name="list" size={24} color="black" />
                        <Text style={styles.navigationText}>
                            รายการสินค้า
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navigationItem} onPress={() => navigation.navigate('Home_customer')}>
                        <Icon name="percent" size={24} color="black" />
                        <Text style={styles.navigationText}>โปรโมชั่น</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navigationItem} onPress={() => navigation.navigate('Home_customer')}>
                        <Icon name="settings" size={24} color="black" />
                        <Text style={styles.navigationText}>ตั้งค่า</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {/* <View style={isIOS ? styles.navigation_ios : styles.navigation_android}> */}
            {/* </View> */}
        </SafeAreaProvider>
    )
}
export default Home_customer;

const styles = StyleSheet.create({
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        paddingLeft: 15,
        paddingRight: 15
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
        padding: 10,
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
        height: 64,
        objectFit: 'contain',
    },
    navigation_ios: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 23,
        paddingTop: 20,
        backgroundColor: '#ffa73c',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

    },
    navigation_android: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        paddingTop: 20,
        backgroundColor: '#ffa73c',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
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
    }
})