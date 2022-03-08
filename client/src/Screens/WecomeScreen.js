// In App.js in a new project

import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button, SafeAreaView, Image, ImageBackground } from 'react-native';
const imgIconLogo = require('../img/LogoApp.png');
const imgBackgoud = require('../img/Backgroud.jpg')

import * as Animatable from 'react-native-animatable';
// Screens
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
function WecomeScreen({ navigation }) {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground style={{ flex: 1, resizeMode: "cover" }} source={imgBackgoud}>

                <Animatable.View animation='zoomInDown'  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ position: "relative", width: 400, height: 400, resizeMode: 'contain', }} source={imgIconLogo} /></Animatable.View>

                <View style={{ width: '100%', height: "100%", position: 'absolute' }}>
                    <View style={{
                        flex: 1, flexDirection: 'column', justifyContent: 'flex-end',
                        alignItems: 'flex-end', paddingLeft: 30, paddingRight: 30
                    }}>

                        <Animatable.View animation="slideInUp" style={{ marginBottom: 20, width: '100%', justifyContent: 'center', alignItems: 'center', height: 'auto', flexDirection: 'column' }}>
                            <Text style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 30, color: 'white' }}>ĐI VÀ TRẢI NGHIỆM</Text>
                            <Text style={[Styles.h2], { color: 'white', letterSpacing: 2 }}>Chia sẻ những nơi bạn đặt chân tới</Text>
                            <Text style={[Styles.h2], { color: 'white', letterSpacing: 2 }}>Nhiều người biết hơn cảm xúc lan tỏa!!</Text>
                        </Animatable.View>

                        <Animatable.View animation="slideInUp" style={{ height: 'auto', flexDirection: 'row' }}>
                            <TouchableOpacity style={Styles.Button} onPress={() => navigation.navigate('SignUp')}>
                                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}
                                >Sign Up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.Button} onPress={() => navigation.navigate('Login')}>
                                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}
                                >Log in</Text>
                            </TouchableOpacity>
                        </Animatable.View>

                        <View style={{ paddingBottom: 20, width: '100%', justifyContent: 'center', alignItems: 'center', height: 'auto', flexDirection: 'column' }}>
                            <Text style={[Styles.h4], { color: 'gray' }}>Terms of Use | Privacy Policy</Text>
                        </View>
                    </View>
                </View>

            </ImageBackground>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    fontWeightBold: { fontWeight: 'bold' },
    h1: { fontSize: 24, }, h2: { fontSize: 18, }, h3: { fontSize: 13, }, h4: { fontSize: 12, }, h5: { fontSize: 9.7, },
    centerItem: {
        alignItems: "center",
        justifyContent: "center"
    },
    borderRadius: {
        borderRadius: 13,
    },
    Button: {
        flex: 1,
        height: "auto",
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 13,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        opacity: 0.7
    }
})
export default WecomeScreen;