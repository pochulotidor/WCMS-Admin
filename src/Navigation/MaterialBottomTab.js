//MaterialBottomTab navigator


import React from 'react';

// Import the materialbottomtab componemt.
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// Screens for our material Bottom Tab navigator.
import Schedule from '../Navigation/scheduleStack';
import Monitor from '../Screens/Admin_Screens/Monitor';
import HomeNav from '../Navigation/homeNav'
import ProfileScreen from '../Navigation/profileStack';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; //responsible for the icons that we used.

const Tab = createMaterialBottomTabNavigator();

export default function MaterialbottomTab() {
    return (
        <Tab.Navigator

            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home';
                        size = focused ? 21 : 18;
                    } else if (route.name === 'Schedule') {
                        iconName = 'calendar-alt';
                        size = focused ? 21 : 18;
                    }
                    else if (route.name === 'Monitor') {
                        iconName = 'record-vinyl';
                        size = focused ? 21 : 18;
                    }
                    else if (route.name === 'Profile') {
                        iconName = 'user';
                        size = focused ? 21 : 18;
                    }
                    return (
                        <FontAwesome5
                            size={size}
                            name={iconName}
                            color={color}
                        />
                    )
                },






            })}

            activeColor='#fff'
            inactiveColor='#fff'
            barStyle={{ backgroundColor: '#4CB963' }}
        >
            <Tab.Screen
                name='Home'
                component={HomeNav}
            />

            <Tab.Screen
                name='Schedule'
                component={Schedule}
            />

            <Tab.Screen
                name='Monitor'
                component={Monitor}
            />

            <Tab.Screen
                name='Profile'
                component={ProfileScreen}
            />
        </Tab.Navigator>
    )
}