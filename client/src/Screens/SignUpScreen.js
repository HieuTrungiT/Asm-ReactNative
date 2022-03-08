// In App.js in a new project
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { TextInput, RadioButton } from 'react-native-paper';

function SignUpScreen({ navigation }) {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateFormat, setDateFormat] = useState();
    const [showPass, setShowPass] = useState(false);
    // radio
    const [value, setValue] = React.useState('nam');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        let fDate =
            tempDate.getDate() +
            "/" +
            (tempDate.getMonth() + 1) +
            "/" +
            tempDate.getFullYear();
        setDateFormat(fDate);
        console.log(dateFormat);
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };
    const showTimepicker = () => {
        showMode('time');
    };
    const setOnOffMatKhau = () => {
        setShowPass(!showPass)
    }
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <ScrollView>
                <View style={{ flex: 1.5, }}>
                    {/* <Image style={{ height: 200, width: 200 ,}} source={imgLogo} /> */}
                    <Text style={{ alignSelf: "center", fontSize: 35, marginTop: 15 }}>Đăng kí</Text>
                    <View style={{ padding: 10, margin: 20, borderRadius: 13, borderWidth: 0.5, borderColor: 'gray', flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={{
                                    color: 'black',
                                    flex: 1,
                                    width: 'auto',
                                    margin: 5,
                                    padding: 0,
                                    marginBottom: 10,
                                    marginLeft: 15,
                                    marginRight: 10,
                                    fontSize: 12,
                                }}
                                mode="outlined"
                                label="Họ"
                                right={<TextInput.Affix text="/10" />}
                                placeholder="Họ"
                                keyboardType="default"
                            />
                            <TextInput
                                style={{
                                    color: 'black',
                                    flex: 1,
                                    width: 'auto',
                                    margin: 5,
                                    marginBottom: 10,
                                    marginRight: 15,
                                    marginLeft: 10,
                                    fontSize: 12
                                }}
                                placeholder="Tên"
                                keyboardType="default"
                                mode="outlined"
                                label="Tên"
                                right={<TextInput.Affix text="/10" />}
                            />
                        </View>
                        <TextInput
                            style={Styles.input}
                            placeholder="Tài khoản"
                            keyboardType="default"
                            mode="outlined"
                            label="Tài khoản"
                            right={<TextInput.Affix text="/30" />}

                        />
                        <TextInput
                            style={Styles.input}
                            placeholder="Mật khẩu"
                            keyboardType="default"
                            mode="outlined"
                         
                            secureTextEntry={showPass}
                            label="Mật khẩu"
                            right={<TextInput.Icon name="eye" onPress={setOnOffMatKhau} />}

                        />
                        <TextInput
                            style={Styles.input}
                            placeholder="Nhập lại mật khẩu"
                            keyboardType="default"
                            secureTextEntry={true}
                            mode="outlined"
                            label="Nhập lại mật khẩu"
                            right={<TextInput.Icon name="eye" />}

                        />

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    style={Styles.input}
                                    placeholder="dd/mm/yyy"
                                    keyboardType="default"
                                    mode="outlined"
                                    label="Năm sinh"
                                    value={dateFormat}
                                    right={<TextInput.Icon name="calendar-month" color="#CC263D" onPress={showDatepicker} />}
                                />

                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value} >
                                    <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'center', }}>
                                        <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                                            <RadioButton value="nam" color="#CC263D" />
                                            <Text>nam</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                                            <RadioButton value="nữ" color="#CC263D" />
                                            <Text>nữ</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                                            <RadioButton value="khác" color="#CC263D" />
                                            <Text>khác</Text>
                                        </View>
                                    </View>
                                </RadioButton.Group>
                            </View>

                        </View>



                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ borderRadius: 13, alignItems: 'center', backgroundColor: 'gray', width: '80%', padding: 15, marginLeft: 20, marginRight: 20 }}>
                        <Text style={[Styles.h2, Styles.fontWeightBold, { color: 'white' }]}>Đăng kí</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'gray', paddingTop: 10 }}>Bằng cách tạo tài khoản, bạn đồng ý với</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity>
                            <Text style={{ textDecorationLine: 'underline', marginBottom: 5, color: 'gray' }}>điều khoản sử dụng </Text>
                        </TouchableOpacity>
                        <Text style={{ marginBottom: 5, color: 'gray' }}> và  </Text>
                        <TouchableOpacity>
                            <Text style={{ textDecorationLine: 'underline', marginBottom: 10, color: 'gray' }}>chính sách bảo mật</Text>
                        </TouchableOpacity>


                    </View>
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        dateFormat="DD-MM-YYYY"
                    />
                )}
            </ScrollView>
        </View >
    );
}
const Styles = StyleSheet.create({

    fontWeightBold: { fontWeight: 'bold' },
    h1: { fontSize: 24, }, h2: { fontSize: 18, }, h3: { fontSize: 13, }, h4: { fontSize: 12, }, h5: { fontSize: 9.7, },
    input: {
        color: 'black',
        width: 'auto',
        margin: 15,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 12

    }
})
export default SignUpScreen;