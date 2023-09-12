import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, Platform, Image, Alert, FlatList, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome5'
import * as ImagePicker from 'expo-image-picker';
import BottomSheet from "react-native-gesture-bottom-sheet";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { List } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'


const AddProduct = ({ navigation }) => {
    const bottomSheet = useRef() as React.MutableRefObject<BottomSheet>;
    const [data, setData] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalVisible2, setModalVisible2] = useState<boolean>(false);
    const [modalVisible3, setModalVisible3] = useState<boolean>(false);
    const [modalVisible4, setModalVisible4] = useState<boolean>(false);
    const [modalVisible5, setModalVisible5] = useState<boolean>(false);
    const [modalVisible6, setModalVisible6] = useState<boolean>(false);
    const [product_name, setProduct_name] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [price, setPrice] = useState<string>();
    const [amount, setAmount] = useState<string>();
    const [date, setDate] = useState<string>();
    const [time, setTime] = useState<string>();
    const [dateStart, setDateStart] = useState<string>();
    const [timeStart, setTimeStart] = useState<string>();
    const [dateEnd, setDateEnd] = useState<string>();
    const [timeEnd, setTimeEnd] = useState<string>();
    const [category, setCategory] = useState<any[]>([]);
    const [categorySelect, setCategorySelect] = useState<string>();
    const [image, setImage] = useState<string[]>([]);
    const [image_upload, setImage_upload] = useState<string[]>([]);


    useEffect(() => {
        fetchCategory();
        AsyncStorage.getItem('data').then((value) => {
            setData(JSON.parse(value));
        })
    }, [])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            // allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            selectionLimit: image.length < 2 ? 2 - image.length : 0,
        });

        if (!result.canceled) {
            setImage([...image, ...result.assets.map((item) => item.uri)]);
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

    const date_format = (date) => {
        let format_date = date.split('/');
        format_date = `${format_date[0]}-${format_date[1]}-${format_date[2]}`;
        return format_date;
    }

    // fetch category
    const fetchCategory = async () => {
        await fetch('http://apichatapi.ddns.net:8888/prompt_gin_api/public/api/product_type')
            .then(res => res.json())
            .then(res => {
                setCategory(res);
            }
            ).catch(err => {
                console.log(err);
            })
    }

    // save product
    const saveProduct = () => {
        var formData = new FormData();
        formData.append('product_name', product_name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('amount', amount);
        formData.append('date', date);
        formData.append('time', time);
        formData.append('dateStart', dateStart);
        formData.append('timeStart', timeStart);
        formData.append('dateEnd', dateEnd);
        formData.append('timeEnd', timeEnd);
        formData.append('category', categorySelect);
        formData.append('useraccount', data[0].id);
        image_upload.forEach(element => {
            formData.append('image[]', element);
        });


        fetch('http://apichatapi.ddns.net:8888/prompt_gin_api/public/api/new_product', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'mode': 'no-cors'
            },
            body: formData
        }).then(res => {
            if (res.status == 200) {
                return res.json();
            } else {
                alert('เพิ่มสินค้าไม่สำเร็จ');
            }
        })
            .then(res => {
                if (res.status == 200) {
                    Alert.alert('เพิ่มสินค้าสำเร็จ', '', [], { cancelable: true });
                    navigation.goBack();
                }
            }).catch(err => {
                alert(err);
                
            })
    }
    // add product


    return (
        <SafeAreaProvider style={{ backgroundColor: '#FFF9EB' }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}
                edges={['right', 'top', 'left', 'bottom']}
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
                        เพิ่มสินค้า
                    </Text>
                    <Text style={{ fontFamily: 'SukhumvitSet-Text', fontSize: 14 }}>
                        ข้อมูลสินค้า
                    </Text>
                    <ScrollView>
                        <TextInput style={styles.form_control}
                            placeholder="ชื่อสินค้า"
                            autoComplete='off'
                            value={product_name}
                            onChangeText={(text) => setProduct_name(text)}
                        />
                        <TextInput style={[styles.form_control, { height: 100, paddingTop: 10 }]}
                            placeholder="รายละเอียดสินค้า"
                            multiline={true}
                            autoComplete='off'
                            numberOfLines={4}
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                        />
                        <TouchableOpacity style={[styles.form_control, { paddingTop: 12, paddingBottom: 12 }]}
                            onPress={() => bottomSheet.current.show()}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: 'SukhumvitSet-Text', fontSize: 14, color: categorySelect == null ? 'silver' : 'black' }}>

                                    {
                                        categorySelect ?
                                            category.find((item) => item.pro_type_id === categorySelect)?.pro_type_name
                                            :
                                            'หมวดหมู่สินค้า'
                                    }
                                </Text>
                                <Icon name="chevron-down" size={20} color="#FF8D00" style={{ top: 2 }} />
                            </View>
                        </TouchableOpacity>
                        <BottomSheet
                            hasDraggableIcon
                            ref={bottomSheet}
                            height={500}
                            onOpen={() => console.log("opened")}
                            onClose={() => console.log("closed")}
                            title="Select your option"
                            subTitle="Choose your option wisely"
                            wrapperStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                        >
                            <ScrollView
                                style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}
                            >
                                <Text style={{ fontSize: 14, fontFamily: 'SukhumvitSet-SemiBold', color: 'silver', textAlign: 'center' }}>หมวดหมู่สินค้า</Text>
                                {
                                    category.map((item, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                style={{
                                                    paddingTop: 10,
                                                    paddingBottom: 10,
                                                    borderBottomWidth: 0.2,
                                                    borderBottomColor: 'silver',
                                                }}
                                                onPress={() => {
                                                    setCategorySelect(item.pro_type_id);
                                                    bottomSheet.current.close();
                                                }}
                                            >
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10 }}>
                                                    <Text style={{ fontSize: 15, fontFamily: 'SukhumvitSet-Text' }}>{item.pro_type_name}</Text>
                                                    {
                                                        categorySelect === item.pro_type_id ? <Icon name="check" size={20} color="#FF8D00" /> : null
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </ScrollView>
                        </BottomSheet>
                        <View style={styles.grid}>
                            <TextInput style={[styles.form_control, { width: '49%' }]}
                                placeholder="ราคาสินค้า"
                                keyboardType='number-pad'
                                value={price}
                                onChangeText={(text) => setPrice(text)}
                            />
                            <TextInput style={[styles.form_control, { width: '49%' }]}
                                placeholder="จำนวนสินค้า"
                                keyboardType='number-pad'
                                value={amount}
                                onChangeText={(text) => setAmount(text)}
                            />
                        </View>

                        <View style={[styles.grid]}>
                            <TouchableOpacity style={[styles.form_control, { width: '49%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, paddingBottom: 8 }]}
                                onPress={() => setModalVisible(true)}
                            >
                                <Text style={{ fontFamily: 'SukhumvitSet-Text', fontSize: 14, color: date == null ? 'silver' : 'black' }}>
                                    {
                                        date ?
                                            getFormatedDate(date, 'DD/MM/YYYY') :
                                            'วันที่หมดอายุ'
                                    }
                                </Text>
                                <Icon name="calendar-alt" size={20} color="#FF8D00" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.form_control, { width: '49%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
                                onPress={() => setModalVisible2(true)}
                            >
                                <Text style={{ fontFamily: 'SukhumvitSet-Text', fontSize: 14, color: time == null ? 'silver' : 'black' }}>
                                    {
                                        time ?
                                            time :
                                            'เวลาหมดอายุ'
                                    }
                                </Text>
                                <Icon name="clock" size={20} color="#FF8D00" />
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            backgroundColor: 'white',
                            borderWidth: 0.8,
                            borderColor: '#FF8D00',
                            marginTop: 10,
                            borderRadius: 10
                        }}>
                            <TouchableOpacity onPress={pickImage} style={styles.uploadimage}
                                disabled={image.length < 2 ? false : true}
                            >
                                <Icon name="camera" size={30} color={image.length < 2 ? '#FF8D00' : 'silver'} style={{ top: 0, marginRight: 10, textAlign: 'center' }} />
                                <Text style={{ color: '#5E605E', fontFamily: 'SukhumvitSet-SemiBold', textAlign: 'center', marginTop: 5 }}>อัพโหลดรูปภาพ</Text>
                            </TouchableOpacity>

                            <FlatList
                                data={image}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 5, paddingRight: 5, paddingTop: 5, paddingBottom: 5 }}
                                            key={index}
                                        >
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image source={{ uri: item }} style={{ width: 50, height: 50, borderRadius: 10 }} />
                                                <Text style={{ fontFamily: 'SukhumvitSet-Text', fontSize: 14, color: '#000', marginLeft: 5, width: '75%' }}>
                                                    {item.split('/').pop().split('.')[0]}
                                                </Text>
                                            </View>
                                            <TouchableOpacity onPress={() =>
                                                Alert.alert(
                                                    "ลบรูปภาพ",
                                                    "คุณต้องการลบรูปภาพนี้ใช่หรือไม่",
                                                    [
                                                        {
                                                            text: "ยกเลิก",
                                                            style: "cancel"
                                                        },
                                                        {
                                                            text: "ลบ",
                                                            style: "destructive",
                                                            onPress: () => {
                                                                image.splice(index, 1)
                                                                image_upload.splice(index, 1)
                                                                setImage([...image])
                                                                setImage_upload([...image_upload])
                                                            }
                                                        }
                                                    ]
                                                )
                                            }>
                                                <Icon name="times" size={20} color="#FF8D00" style={{ top: 15, marginRight: 10, textAlign: 'center' }} />
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }}
                            />
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="percent" size={12} color="#FF8D00" style={{ top: 15, marginRight: 5 }} />
                            <Text style={{ fontFamily: 'SukhumvitSet-Bold', fontSize: 14, marginTop: 12, color: '#FF8D00' }}>
                                เริ่มต้น - สิ้นสุดโปรโมชั่น
                            </Text>
                        </View>
                        <View style={[styles.grid, { marginTop: -5 }]}>
                            {/* เริ่ม */}
                            <TouchableOpacity style={[styles.form_control, { width: '49%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
                                onPress={() => setModalVisible3(true)}
                            >
                                <Text style={{ fontFamily: 'SukhumvitSet-Text', fontSize: 14, color: dateStart == null ? 'silver' : 'black' }}>
                                    {
                                        dateStart ?
                                            getFormatedDate(dateStart, 'DD/MM/YYYY') :
                                            'วันที่เริ่มโปรโมชั่น'
                                    }
                                </Text>
                                <Icon name="calendar-alt" size={20} color="#FF8D00" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.form_control, { width: '49%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
                                onPress={() => setModalVisible4(true)}
                            >
                                <Text style={{ fontFamily: 'SukhumvitSet-Text', fontSize: 14, color: timeStart == null ? 'silver' : 'black' }}>
                                    {
                                        timeStart ?
                                            timeStart :
                                            'เวลาเริ่มโปรโมชั่น'
                                    }
                                </Text>
                                <Icon name="clock" size={20} color="#FF8D00" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.grid}>
                            <TouchableOpacity style={[styles.form_control, { width: '49%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
                                onPress={() => setModalVisible5(true)}
                            >
                                <Text style={{ fontFamily: 'SukhumvitSet-Text', fontSize: 14, color: dateEnd == null ? 'silver' : 'black' }}>
                                    {
                                        dateEnd ?
                                            getFormatedDate(dateEnd, 'DD/MM/YYYY') :
                                            'วันที่สิ้นสุดโปรโมชั่น'
                                    }
                                </Text>
                                <Icon name="calendar-alt" size={20} color="#FF8D00" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.form_control, { width: '49%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
                                onPress={() => setModalVisible6(true)}
                            >
                                <Text style={{ fontFamily: 'SukhumvitSet-Text', fontSize: 14, color: timeEnd == null ? 'silver' : 'black' }}>
                                    {
                                        timeEnd ?
                                            timeEnd :
                                            'เวลาสิ้นสุดโปรโมชั่น'
                                    }
                                </Text>
                                <Icon name="clock" size={20} color="#FF8D00" />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        style={{ backgroundColor: '#FF8D00', width: '100%', padding: 12, borderRadius: 50, marginTop: 10, marginBottom: 10 }}
                        onPress={() => saveProduct()}
                    >
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontFamily: 'SukhumvitSet-SemiBold' }}>เพิ่มสินค้า</Text>
                    </TouchableOpacity>
                </View>
                {/* วันที่หมดอายุ */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    style={styles.modalView}
                >
                    <View style={styles.centeredView}>
                        <DatePicker
                            style={{
                                borderRadius: 10,
                            }}
                            options={{
                                backgroundColor: '#090C08',
                                textHeaderColor: '#FFA25B',
                                textDefaultColor: '#F6E7C1',
                                selectedTextColor: '#fff',
                                mainColor: '#F4722B',
                                textSecondaryColor: '#D6C7A1',
                                borderColor: 'rgba(122, 146, 165, 0.1)',
                            }}
                            selected={date}
                            mode="date"
                            locale="th"
                            onDateChange={date => {
                                setDate(date_format(date));
                                setModalVisible(false);
                            }}
                        />
                    </View>
                </Modal>
                {/* เวลาที่หมดอายุ */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible2}
                    style={styles.modalView}
                >
                    <View style={styles.centeredView}>
                        <DatePicker
                            style={{
                                borderRadius: 10,
                            }}
                            options={{
                                backgroundColor: '#090C08',
                                textHeaderColor: '#FFA25B',
                                textDefaultColor: '#F6E7C1',
                                selectedTextColor: '#fff',
                                mainColor: '#F4722B',
                                textSecondaryColor: '#D6C7A1',
                                borderColor: 'rgba(122, 146, 165, 0.1)',
                            }}
                            selected={time}
                            mode="time"
                            locale="th"
                            onTimeChange={time => {
                                setTime(time);
                                setModalVisible2(false);
                            }}
                        />
                    </View>
                </Modal>
                {/* วันที่เริ่มต่้น */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible3}
                    style={styles.modalView}
                >
                    <View style={styles.centeredView}>
                        <DatePicker
                            style={{
                                borderRadius: 10,
                            }}
                            options={{
                                backgroundColor: '#090C08',
                                textHeaderColor: '#FFA25B',
                                textDefaultColor: '#F6E7C1',
                                selectedTextColor: '#fff',
                                mainColor: '#F4722B',
                                textSecondaryColor: '#D6C7A1',
                                borderColor: 'rgba(122, 146, 165, 0.1)',
                            }}
                            selected={dateStart}
                            mode="date"
                            locale="th"
                            onDateChange={date => {
                                setDateStart(date_format(date));
                                setModalVisible3(false);
                            }}
                        />
                    </View>
                </Modal>
                {/* เวลาที่เริ่มต้น */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible4}
                    style={styles.modalView}
                >
                    <View style={styles.centeredView}>
                        <DatePicker
                            style={{
                                borderRadius: 10,
                            }}
                            options={{
                                backgroundColor: '#090C08',
                                textHeaderColor: '#FFA25B',
                                textDefaultColor: '#F6E7C1',
                                selectedTextColor: '#fff',
                                mainColor: '#F4722B',
                                textSecondaryColor: '#D6C7A1',
                                borderColor: 'rgba(122, 146, 165, 0.1)',
                            }}
                            selected={timeStart}
                            mode="time"
                            locale="th"
                            onTimeChange={time => {
                                setTimeStart(time);
                                setModalVisible4(false);
                            }}
                        />
                    </View>
                </Modal>
                {/* วันที่สิ้นสุด */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible5}
                    style={styles.modalView}
                >
                    <View style={styles.centeredView}>
                        <DatePicker
                            style={{
                                borderRadius: 10,
                            }}
                            options={{
                                backgroundColor: '#090C08',
                                textHeaderColor: '#FFA25B',
                                textDefaultColor: '#F6E7C1',
                                selectedTextColor: '#fff',
                                mainColor: '#F4722B',
                                textSecondaryColor: '#D6C7A1',
                                borderColor: 'rgba(122, 146, 165, 0.1)',
                            }}
                            selected={dateEnd}
                            mode="date"
                            locale="th"
                            onDateChange={date => {
                                setDateEnd(date_format(date));
                                setModalVisible5(false);
                            }}
                        />
                    </View>
                </Modal>
                {/* เวลาที่สิ้นสุด */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible6}
                    style={styles.modalView}
                >
                    <View style={styles.centeredView}>
                        <DatePicker
                            style={{
                                borderRadius: 10,
                            }}
                            options={{
                                backgroundColor: '#090C08',
                                textHeaderColor: '#FFA25B',
                                textDefaultColor: '#F6E7C1',
                                selectedTextColor: '#fff',
                                mainColor: '#F4722B',
                                textSecondaryColor: '#D6C7A1',
                                borderColor: 'rgba(122, 146, 165, 0.1)',
                            }}
                            selected={timeEnd}
                            mode="time"
                            locale="th"
                            onTimeChange={time => {
                                setTimeEnd(time);
                                setModalVisible6(false);
                            }}
                        />
                    </View>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default AddProduct

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF9EB',
        paddingLeft: 10,
        paddingRight: 10,
        height: '100%'
    },
    form_control: {
        width: '100%',
        marginTop: 10,
        padding: 10,
        paddingLeft: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FF8D00',
        backgroundColor: '#FCFCFC',
        fontSize: 14,
        fontFamily: 'SukhumvitSet-Text'
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 7,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
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
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
        paddingLeft: 20,
        paddingRight: 20,
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
    datePicker: {
        width: 320,
        height: 260,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'SukhumvitSet-Text',
        fontSize: 16,
    },
    bottomSheetModal: {
        backgroundColor: '#FFF9EB',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
})