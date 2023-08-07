import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ImageBackground, Image, Platform, ScrollView } from 'react-native';
import {
    SafeAreaView,
    SafeAreaProvider
} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { bakery, banner1, banner2, banner3, cookie, cake, drink, milk, teaCup, bubbleTea } from '../assets/list';
import Swiper from 'react-native-swiper'
import './config'

const Home_customer = ({ navigation }) => {
    const width = Dimensions.get('window').width;
    // check platform
    const isWeb = Platform.OS === 'web';
    const isAndroid = Platform.OS === 'android';
    const isIOS = Platform.OS === 'ios';

    const data = [
        {
            title: "Aenean leo",
            body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
            imgUrl: "https://picsum.photos/id/11/200/300",
        },
        {
            title: "In turpis",
            body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
            imgUrl: "https://picsum.photos/id/10/200/300",
        },
        {
            title: "Lorem Ipsum",
            body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
            imgUrl: "https://picsum.photos/id/12/200/300",
        },
    ];

    return (
        <SafeAreaProvider style={{ backgroundColor: '#FFF9EB' }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <View style={styles.flex}>
                    <View style={{ paddingLeft: 15, flexDirection: 'row', marginTop: 10 }}>
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
                            onPress={() => navigation.navigate('Profile_customer')}
                        >
                            <Icon name="user" size={26} color="#FF8D00" style={{ top: 10, marginLeft: 18 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{ paddingTop: 0, marginTop: -35 }}>
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
                            <TouchableOpacity style={styles.grid_item} onPress={() => navigation.navigate('Product_customer')}>
                                <Image source={bakery} style={styles.Image} />
                                <View style={styles.lableImage}>
                                    <Text style={styles.lableTextImage}>
                                        ขนมปัง
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.grid_item} onPress={() => navigation.navigate('Product_customer')}>
                                <Image source={cookie} style={styles.Image} />
                                <View style={styles.lableImage}>
                                    <Text style={styles.lableTextImage}>
                                        คุกกี้
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.grid_item} onPress={() => navigation.navigate('Product_customer')}>
                                <Image source={cake} style={styles.Image} />
                                <View style={styles.lableImage}>
                                    <Text style={styles.lableTextImage}>
                                        เค้ก
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.grid_b}>
                            <TouchableOpacity style={styles.grid_item} onPress={() => navigation.navigate('Product_customer')}>
                                <Image source={drink} style={styles.Image} />
                                <View style={styles.lableImage}>
                                    <Text style={styles.lableTextImage}>
                                        นำ้ผลไม้
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.grid_item} onPress={() => navigation.navigate('Product_customer')}>
                                <Image source={milk} style={styles.Image} />
                                <View style={styles.lableImage}>
                                    <Text style={styles.lableTextImage}>
                                        นม
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.grid_item} onPress={() => navigation.navigate('Product_customer')}>
                                <Image source={teaCup} style={styles.Image} />
                                <View style={styles.lableImage}>
                                    <Text style={styles.lableTextImage}>
                                        ชา
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.grid_item} onPress={() => navigation.navigate('Product_customer')}>
                                <Image source={bubbleTea} style={styles.Image} />
                                <View style={styles.lableImage}>
                                    <Text style={styles.lableTextImage}>
                                        ชานม
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            {/* <View style={styles.fab}>
                <TouchableOpacity
                    style={styles.fab_button}
                >
                    <Icon name="plus" size={26} color="black" />
                </TouchableOpacity>
            </View> */}

            <View style={isIOS ? styles.navigation_ios : styles.navigation_android}>
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
            </View>
        </SafeAreaProvider>
    )
}
export default Home_customer;

const styles = StyleSheet.create({
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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