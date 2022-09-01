import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { height, width } from '../../utils/Dimensions';

export default function HomeButton({ buttonName, iconName, ...rest }) {
    return (
        <TouchableOpacity
            style={styles.button}
            {...rest}
        >

            <View
            style={styles.buttonWrapper}
            >
                <FontAwesome5Icon
                style={styles.icon}
                name={iconName}
                color={'#fff'}
                size={20}
                />

                <Text style={styles.buttonText}>
                    {buttonName}
                </Text>
            </View>



        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height / 13,
        width: '43%',
        backgroundColor: '#4CB963',
        borderRadius: 20,
        marginHorizontal: 8,
        shadowColor: '#000000',
        shadowOffset: { width: 300, height: 50 },
        shadowOpacity: 10,
        elevation: 7,
      
    },

    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },


    icon: {
        fontWeight: 'bold',
        paddingRight: 15,

    },


    buttonText: {
        fontSize: 13,
        color: '#fff',

    },

})