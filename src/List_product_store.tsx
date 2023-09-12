import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, ScrollView, ActivityIndicator, ImageBackground, Modal, Alert, RefreshControl } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { bakery, banner1, banner2, banner3, cookie, cake, drink, milk, teaCup, bubbleTea, cookie2 } from '../assets/list';
import Icon from 'react-native-vector-icons/FontAwesome5';
import './config'
import Svg, { Circle, Rect } from 'react-native-svg';
import Location from '../assets/image/google-map-icon.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const List_product = ({ navigation, route }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [id, setId] = React.useState('')
    const [data, setData] = React.useState([])
    const [store_name, setStore_name] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchProduct(id)
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);


    const fetchProduct = (id) => {
        try {
            fetch('http://apichatapi.ddns.net:8888/prompt_gin_api/public/api/product_all/' + id)
                .then((response) => response.json())
                .then((res) => {
                    if (res.length > 0) {
                        setData(res)
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        AsyncStorage.getItem('data').then((value) => {
            if (value != null) {
                setData(JSON.parse(value));
                var id = JSON.parse(value)[0]['id'];
                var role = JSON.parse(value)[0]['role'];

                var formData = new FormData();
                formData.append('id', id);
                formData.append('role', role);

                fetch('http://apichatapi.ddns.net:8888/prompt_gin_api/public/api/account_detail', {
                    method: 'POST',
                    body: formData
                }).then(res => res.json())
                    .then(res => {
                        if (res.status == 200) {
                            setStore_name(res.data[0]['store_name']);
                        }
                    }).catch(err => {
                        console.log(err);
                    })

                fetchProduct(id)
            }
        })
    }, [])

    return (
        <SafeAreaProvider style={{ backgroundColor: '#FFF9EB' }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}
                edges={['right', 'top', 'left', 'bottom']}
            >
                <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="chevron-left" size={20} color="#FF8D00" style={{ top: 4 }} />
                            <Text style={{ fontSize: 18, fontFamily: 'SukhumvitSet-Bold', color: '#FF8D00', marginLeft: 5 }}> ย้อนกลับ</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView style={[styles.container, { height: '100%' }]}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <Text style={{ paddingLeft: 10, paddingRight: 10, marginTop: 8, fontSize: 20, fontFamily: 'SukhumvitSet-Bold', color: '#FF8D00' }}>
                        {store_name}
                    </Text>
                    <Image
                        source={banner1}
                        style={{
                            width: '100%',
                            height: 300,
                            resizeMode: 'cover',
                            borderRadius: 10,
                            marginTop: -33
                        }}
                    />
                    <View style={{ paddingLeft: 10, paddingRight: 10, marginTop: -32 }}>
                        <Text style={{
                            fontSize: 18,
                            fontFamily: 'SukhumvitSet-Bold',
                            color: '#FF8D00',
                            marginBottom: 8
                        }}>
                            รายการสินค้า
                        </Text>
                        <View style={styles.grid}>
                            {
                                data.map((item, index) => {
                                    return (
                                        <>
                                            <View style={styles.card}>
                                                <Image source={{ uri: 'http://apichatapi.ddns.net:8888/prompt_gin_api/public/api/products/' + item.pro_image }} style={styles.Image} />
                                                <View style={styles.card_footer}>
                                                    <View>
                                                        <Text style={{ fontSize: 16, color: '#515151', fontFamily: 'SukhumvitSet-SemiBold', left: 2 }}>
                                                            {item.product_name}
                                                        </Text>
                                                        <Text style={{ fontSize: 14, color: '#515151', fontFamily: 'SukhumvitSet-Bold', left: 2 }}>
                                                            {item.product_price} ฿
                                                        </Text>
                                                    </View>
                                                    <View >
                                                        <View style={{ position: 'absolute' }}>
                                                            <Image source={Location} style={{ width: 25, height: 25, resizeMode: 'contain', position: 'relative', right: 30 }} />
                                                        </View>
                                                        <View style={{ position: 'absolute' }}>
                                                            <Text style={{ color: '#656565', paddingTop: 5, fontFamily: 'SukhumvitSet-SemiBold', fontSize: 11, right: 90, top: 23 }}>
                                                                ลดราคาถึง {
                                                                    // time only format 24 hours
                                                                    new Date(item.promo_end).toLocaleTimeString('th-TH', {
                                                                        hour12: false,
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                    })
                                                                } น.
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </>
                                    )
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
                <View style={{ position: 'absolute', right: 0, bottom: 0 }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Add_product')}
                    >
                        <View style={{
                            backgroundColor: '#FF8D00',
                            width: 55,
                            height: 55,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            bottom: 40,
                            right: 20,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: Platform.OS === 'ios' ? 0.06 : 0.3,
                            shadowRadius: 3.84,
                            elevation: Platform.OS === 'ios' ? 0 : 0.5,
                        }}>
                            <Icon name="plus" size={20} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>


            <Modal
                animationType="slide"
                transparent={true}
                visible={isLoading}
                onRequestClose={() => {
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
        </SafeAreaProvider>
    )
}

export default List_product;

const styles = StyleSheet.create({
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        // flex: 1,
        // backgroundColor: '#FFF9EB',
        // paddingLeft: 10,
        // paddingRight: 10,
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 10
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
        elevation: Platform.OS === 'ios' ? 0 : 0.5,
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
    },
    Image: {
        width: '100%',
        height: 100,
        objectFit: 'cover',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
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
})