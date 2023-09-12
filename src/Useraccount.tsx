import { ScrollView, StyleSheet, Text, TouchableOpacity, View, NativeModules } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Avatar, Button, Card, List, Divider } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'

function Useracccount({ navigation }) {
    const [data, setData] = useState<string[]>();
    const [name, setName] = useState<string>('');
    const logout = () => {
        AsyncStorage.removeItem('data');
        NativeModules.DevSettings.reload();
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
                            setName(res.data[0]['fullname']);
                        }
                    }).catch(err => {
                        console.log(err);
                    })
            }
        });
    }, []);

    if(!data && !name) {
        return null;
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

                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: '#ffe0b9',
                        paddingBottom: 10,
                        paddingLeft: 20,
                        borderRadius: 10,
                        marginTop: 10,
                        paddingTop: 2,
                    }}>
                        <Avatar.Text size={50} label="AT" style={{ backgroundColor: '#FF8D00', marginTop: 10, marginRight: 10 }} />
                        <View>
                            <Text style={{ marginTop: 10, fontSize: 18, fontFamily: 'SukhumvitSet-Bold', color: '#FF8D00' }}>
                                {name}
                            </Text>
                            <TouchableOpacity style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 2, backgroundColor: '#FF8D00', borderRadius: 50, flexDirection: 'row', justifyContent: 'center', width: 100 }}
                                onPress={() => navigation.navigate('Edit_profile_stores')}
                            >
                                <Icon name="edit" size={12} color="white" style={{ top: 2, marginRight: 5 }} />
                                <Text style={{ fontSize: 12, fontFamily: 'SukhumvitSet-Bold', color: 'white', textAlign: 'center' }}>
                                    แก้ไขข้อมูล
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ marginTop: 10, height: '100%' }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Edit_profile')}
                            style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 12, paddingBottom: 12, borderRadius: 10, marginTop: 5 }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="heart" size={18} color="#FF8D00" style={{ top: 2, marginRight: 5 }} />
                                    <Text style={{ fontFamily: 'SukhumvitSet-SemiBold', fontSize: 16, marginLeft: 2, color: '#FF8D00' }}>
                                        รายการที่ชอบ
                                    </Text>
                                </View>
                                <Icon name="chevron-right" size={16} color="#FF8D00" style={{ top: 4, marginRight: 5 }} />
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => navigation.navigate('Edit_profile')}
                            style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 12, paddingBottom: 12, borderRadius: 10, marginTop: 5 }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="lock" size={18} color="#FF8D00" style={{ top: 1, marginRight: 5 }} />
                                    <Text style={{ fontFamily: 'SukhumvitSet-SemiBold', fontSize: 16, marginLeft: 2, color: '#FF8D00' }}>เปลี่ยนรหัสผ่าน</Text>
                                </View>
                                <Icon name="chevron-right" size={16} color="#FF8D00" style={{ top: 4, marginRight: 5 }} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Edit_profile')}
                            style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 12, paddingBottom: 12, borderRadius: 10, marginTop: 5 }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="question-circle" size={18} color="#FF8D00" style={{ top: 2, marginRight: 5 }} />
                                    <Text style={{ fontFamily: 'SukhumvitSet-SemiBold', fontSize: 16, marginLeft: 2, color: '#FF8D00' }}>
                                        เกี่ยวกับ
                                    </Text>
                                </View>
                                <Icon name="chevron-right" size={16} color="#FF8D00" style={{ top: 4, marginRight: 5 }} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => logout()}
                            style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 12, paddingBottom: 12, borderRadius: 10, marginTop: 5 }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="sign-out-alt" size={18} color="#FF8D00" style={{ top: 2, marginRight: 5 }} />
                                    <Text style={{ fontFamily: 'SukhumvitSet-SemiBold', fontSize: 16, marginLeft: 2, color: '#FF8D00' }}>
                                        ออกจากระบบ
                                    </Text>
                                </View>
                                {/* <Icon name="chevron-right" size={16} color="#FF8D00" style={{ top: 4, marginRight: 5 }} /> */}
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Useracccount

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
    }
})