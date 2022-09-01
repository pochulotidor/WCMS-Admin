//Root stack screen. the very root sscreens that will open once we open the app.

import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

//importing the screens.
import SplashScreen from '../Screens/authScreens/SplashScreen';
import LoginScreen from '../Screens/authScreens/LoginScreen';
import ForgotPassword from '../Screens/authScreens/ForgotPassword';



const Stack = createStackNavigator();

const RootStack = () => {
    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='SplashScreen'
                component={SplashScreen}
            />


            <Stack.Screen
                name='LoginScreen'
                component={LoginScreen}
            />


            <Stack.Screen
                name='ForgotPassword'
                component={ForgotPassword}
            />

          

        </Stack.Navigator>


    );

}

export default RootStack;