// Inside the home stack is the stack navigator of the screens
// that is involved on all the functionalities that can be seen inside the 
// home screen.

import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CitizenReports from '../Screens/Admin_Screens/CitizenReports';
import Home from '../Screens/Admin_Screens/activities'


//const Tab = createMaterialTopTabNavigator();
const Tab = createMaterialTopTabNavigator();

export default function HomeNav() {



    return (

        <Tab.Navigator
            initialRouteName="Activities"
            screenOptions={{
                tabBarActiveTintColor: '#fff',
                tabBarLabelStyle: { fontSize: 15 },
                tabBarStyle: { backgroundColor: '#4CB963' },
            }}
        >
            <Tab.Screen
                name="Activities"
                component={Home}
                
            />
            <Tab.Screen
                name="Citizen reports"
                component={CitizenReports}
            />
        </Tab.Navigator>
    )
}