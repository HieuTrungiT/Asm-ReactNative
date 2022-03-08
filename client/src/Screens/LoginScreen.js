// In App.js in a new project

import React, { useState } from 'react'
import { View, Image, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import AnimatedCheckbox from 'react-native-checkbox-reanimated'

const imgLogo = require('../img/LogoApp.png')

function LoginScreen({ navigation }) {
    const [checked, setChecked] = useState(false)
    const [accoutUsser, setAccoutUsser] = useState('');
    const [password, setPassword] = useState('');
    const handleCheckboxPress = () => {
        setChecked(prev => {
            return !prev
        })
    }

    return (
        <ScrollView>
            <View style={{ flex: 1, flexDirection: 'column' }}>

                <View style={{ flex: 1.5, }}>
                    <Image style={{ height: 200, width: 330, alignSelf: 'center', marginTop: 10 }} source={imgLogo} />
                    <View style={{ padding: 10, marginLeft: 20, marginRight: 20, borderRadius: 13, flexDirection: 'column' }}>
                        <TextInput
                            style={Styles.input}
                            placeholder="Tài khoản"
                            keyboardType="default"
                            onChangeText={setPassword}
                        />
                        <TextInput
                            style={Styles.input}
                            placeholder="Mật khẩu"
                            keyboardType="default"
                            secureTextEntry
                            onChangeText={setPassword}

                        />
                        <View style={{ justifyContent: "center", flexDirection: 'row', justifyContent: 'flex-end', marginLeft: 15, marginRight: 15, }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: "center" }}>
                                <Pressable onPress={handleCheckboxPress} style={Styles.checkbox}>
                                    <AnimatedCheckbox
                                        checked={checked}
                                        highlightColor="#CC263D"
                                        checkmarkColor="#ffffff"
                                        boxOutlineColor="#CC263D"
                                    />
                                </Pressable>
                                <Text>Lưu mật khẩu</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', alignSelf: 'stretch', marginTop: 100 }}>
                    <View style={{
                        flexDirection: "row",
                        flex: 1,
                        marginBottom: 10
                    }}>
                        <TouchableOpacity style={{
                            marginLeft: 35,
                            flex: 1
                        }}
                            onPress={() => navigation.navigate('SignUp')}>
                            <Text style={{ width: 'auto', }}>Tạo tài khoản mới?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flex: 1, marginRight: 35
                        }}>
                            <Text style={{ width: 'auto', alignSelf: 'flex-end' }}>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeStack')} style={{ borderRadius: 13, alignItems: 'center', backgroundColor: 'gray', width: '80%', padding: 15, marginLeft: 20, marginRight: 20 }}>
                        <Text style={[Styles.h2, Styles.fontWeightBold, { color: 'white' }]}>Đăng nhập</Text>
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
            </View>
        </ScrollView>
    )
}

const Styles = StyleSheet.create({

    fontWeightBold: { fontWeight: 'bold' },
    h1: { fontSize: 24, }, h2: { fontSize: 18, }, h3: { fontSize: 13, }, h4: { fontSize: 12, }, h5: { fontSize: 9.7, },
    input: {
        color: 'black',
        width: 'auto',
        borderBottomWidth: 1.5,
        borderBottomColor: 'black',
        margin: 15,
        marginTop: 15,
        marginBottom: 15,
        paddingBottom: 7,
        paddingLeft: 5

    },
    checkbox: {
        width: 20,
        height: 20
    }
})
export default LoginScreen;