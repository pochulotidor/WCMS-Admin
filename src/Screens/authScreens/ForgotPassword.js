//react libarary and react-native components.
import React, { useContext } from 'react';
import { View, Text, Image, TextInput, StyleSheet} from 'react-native';

//global stylesheet


//button components.
import Btn from '../../Components/button';
import { globalStyles } from '../../../src/styles/globalStyles';

//auth provider
import { AuthContext } from '../../Navigation/AuthProvider';

//formik and yup for form validation. 
import { Formik } from 'formik'; //import formik component
import * as yup from 'yup'; // importing yup library.

import * as Animatable from 'react-native-animatable';


const Validator = yup.object().shape({
    email: yup.string()
        .required('This field is required')
        .email('Invalid email address.'),
   

});

export default function Login({ navigation }) {

    const userInfo = {
        email: '',
       
    }

    const { resetPassword } = useContext(AuthContext);

    return (

        <Formik
            initialValues={userInfo}
            validationSchema={Validator}
            onSubmit={values => {
                const { email,} = values;
                resetPassword(email);
            }}
        >

            {({ values, handleChange, handleSubmit, handleBlur, touched, errors }) => {
                //console.log(values);
                const { email} = values;

                return (
                   
                        <Animatable.View
                            style={globalStyles.container}
                            animation='fadeInUpBig'
                        >
                            <View style={globalStyles.container}>
                                <React.Fragment>
                                    <View
                                        style={{ alignItems: 'center', justifyContent: 'center' }}
                                    >

                                        <Image
                                        style={{
                                            height: 90,
                                            width: 90
                                            }}
                                            source={require('../../assets/logoW.png')}
                                        />

                                        <Text
                                            style={styles.lgText}
                                        >
                                            Waste Collection Monitoring System
                                        </Text>
                                    </View>



                                    <TextInput
                                        style={styles.lgInputz}
                                        placeholder='Email'
                                        autoCapitalize='none'
                                        keyboardType='email-address'
                                        value={email}
                                        onChangeText={handleChange('email')}
                                    />

                                    {(errors.email && touched.email) &&

                                        <Text style={{ color: 'red', fontSize: 12 }}>{errors.email}</Text>

                                    }



                                    <Btn
                                        buttonName='Submit'
                                        onPress={() => {handleSubmit(); navigation.goBack();}}
                                    />

                                    <Btn
                                         buttonName='Login to your account'
                                        onPress={() => navigation.navigate('LoginScreen')}
                                    />

                                    
                                </React.Fragment>





                            </View>
                        </Animatable.View>
                  


                )
            }

            }

        </Formik>


    )
}

const styles = StyleSheet.create({
    lgImage: {
        height: 90,
        width: 90
    },

    lgText: {
        textAlign: 'center',
        color: '#4CB963',
        fontSize: 19,
        margin: 10
    },

    lgInputz: {
        color: '#000',
        borderBottomColor: '#4CB963',
        width: 300,
        height: 40,
        alignItems: 'center',
        borderBottomWidth: 1,
        margin: 5
    },
})