import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
const height = Dimensions.get('window').height;

export default function CustomHead({ title }) {

    return (
        <View style={styles.header}>

            <Text
                style={styles.text}
            >
                {title}
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: height / 8,
        backgroundColor: '#4CB963',
        justifyContent: 'center'
    },

    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff'
    }
})