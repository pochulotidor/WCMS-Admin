import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../Screens/Admin_Screens/ProfileScreen';
import Stats from '../Screens/Admin_Screens/statistics';


export default function () {
    const Stack = createStackNavigator();

    return (

        <Stack.Navigator
            screenOptions={{ headerStyle: { backgroundColor: '#4CB963', }, headerTintColor: '#ffffff' }}
        >

            <Stack.Screen
                name='Profile screen'
                component={Profile}
                options={{ headerShown: false }}

            />


            <Stack.Screen
                name='Statistics'
                component={Stats}


            />

        </Stack.Navigator>

    )
}