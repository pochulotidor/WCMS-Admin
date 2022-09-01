import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {height, width} from '../../utils/Dimensions';

export default function Button({ buttonName, ...rest }) {
    return (
        <TouchableOpacity 
        style={styles.button}
        {...rest}
        >
            <Text
            style={styles.buttonText}
            >
                {buttonName}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#4CB963',
        width: width / 2,
        height: height / 20,
        marginTop:5

    },

    buttonText: {
        color: '#fff',
        fontSize: 15
    }
})

