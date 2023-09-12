import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { bakery, banner1, banner2, banner3, cookie, cake, drink, milk, teaCup, bubbleTea, cookie2 } from '../assets/list';
import Icon from 'react-native-vector-icons/FontAwesome5';
import './config'

const List_product = ({ navigation, route }) => {

    const { type } = route.params;
    return (
        <SafeAreaProvider style={{ backgroundColor: '#FFF9EB' }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}
                edges={['right', 'top', 'left' , 'bottom']}
            >
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="chevron-left" size={20} color="#FF8D00" style={{ top: 4 }} />
                            <Text style={{ fontSize: 18, fontFamily: 'SukhumvitSet-Bold', color: '#FF8D00', marginLeft: 5 }}> ย้อนกลับ</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'SukhumvitSet-Bold', fontSize: 24, color: '#FF8D00' }}>
                        {type}
                    </Text>
                </View>
                <ScrollView style={styles.container}>
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
                                        950 ม.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {/* <View style={{position: 'absolute' , right:0 , top:0}}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Add_product')}
                    >
                        <View style={{ backgroundColor: '#FF8D00', width: 50, height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', bottom: 10, right: 10 , top:55 }}>
                            <Icon name="plus" size={20} color="white" />
                        </View>
                    </TouchableOpacity>
                </View> */}
            </SafeAreaView>
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
        backgroundColor: '#FFF9EB',
        paddingLeft: 10,
        paddingRight: 10,
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 10
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '48.5%',
        height: 160,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.06 : 0.9,
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
})