// Splash screen

import React from 'react';
import { View, Text, Image, StyleSheet, } from 'react-native'; // react native components.

import * as Animatable from 'react-native-animatable';   // Animatable module used on its animation.



export default function SplashScreen({ navigation }) {
    setTimeout(() => {
        navigation.replace('LoginScreen');
    }, 5000
    );
    return (
        <View style={styles.container}>
            <Animatable.View
                animation='bounceIn'
                style={styles.imageContainer}>
                <Image
                    source={require('../../assets/logoG.png')}
                    style={styles.image}
                    resizeMode='stretch'
                />
                <Text style={styles.splashText}>
                    Waste Collection Monitoring System
                </Text>
            </Animatable.View>

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'

    },

    image: {
        width: 115,
        height: 115

    },
    splashText: {
        fontSize: 16,
        color: '#4CB963',
        textAlign: 'center',
        margin: 2

    },
})