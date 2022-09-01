// Login screen.

import React, { useContext } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,

} from 'react-native'; //RN components.


import Button from '../../Components/button'; //importing the custom button component.
import Inputs from '../../Components/inputs'; //importing the custom text input component.
import { globalStyles } from '../../styles/globalStyles';  //global styleSheet.

import { AuthContext } from '../../Navigation/AuthProvider';  //Authprovider.

import { Formik } from 'formik'; //import formik component
import * as yup from 'yup'; // importing yup library.

import * as Animatable from 'react-native-animatable'; //Animatable library.


//yup validator used for validation schema.
const Validator = yup.object().shape({
    email: yup.string()
        .required('This field is required')
        .email('Invalid email address.'),
    password: yup.string()
        .required('This field is required')
        .min(6, 'The password is too short.')
});


export default function Logincreen({ navigation }) {


    // setting email and password into object with its initial value
    const userInfo = {
        email: '',
        password: ''
    }

    const { login } = useContext(AuthContext); //calling the login from our AuthProvider that is required for loging in.
    



    return (

        <Formik
            initialValues={userInfo}
            validationSchema={Validator}
            onSubmit={values => {
                const { email, password } = values;
                login(email, password);
              
            }} // passing the values into the authprovider

        >

            {({ values, handleChange, handleSubmit, errors }) => {
                console.log(values);
                const { email, password } = values; // destructuring

                return (

                    <Animatable.View style={globalStyles.container}
                        animation='fadeInUpBig'>


                        <View style={globalStyles.container}>
                            <React.Fragment>


                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={require('../../assets/logoW.png')}
                                        style={styles.image}
                                        resizeMode='stretch' />
                                    <Text style={styles.text}>
                                        Admin Login
                                    </Text>
                                </View>

                                <Inputs
                                    placeholder='Email'
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                    value={email}
                                    onChangeText={handleChange('email')}

                                />

                                <Text style={{ color: 'red', fontSize: 12 }}>{errors.email}</Text>


                                <Inputs
                                    placeholder='Password'
                                    autoCapitalize='none'
                                    secureTextEntry={true}
                                    value={password}
                                    onChangeText={handleChange('password')}

                                />


                                <Text style={{ color: 'red', fontSize: 12 }}>{errors.password}</Text>


                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ForgotPassword')}
                                >
                                    <Text style={{
                                        color: '#4CB963',
                                        fontSize: 18,
                                        margin: 10,
                                    }}>
                                        Forgot Password?
                                    </Text>
                                </TouchableOpacity>

                                <Button
                                    buttonName='Login'
                                    onPress={handleSubmit}
                                />

                            </React.Fragment>
                        </View>


                    </Animatable.View>


                )

            }}

        </Formik> // ENd of FORMIK component.

    )
}




// STYLESHEET

const styles = StyleSheet.create({

    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#ffff'
    },
    image: {
        height: 90,
        width: 90,

    },

    text: {
        textAlign: 'center',
        color: '#4CB963',
        fontSize: 20,
        margin: 5
    },
    input: {

        color: '#000',
        borderBottomColor: '#4CB963',
        width: 300,
        height: 35,
        alignItems: 'center',
        borderBottomWidth: 1
    },



})
