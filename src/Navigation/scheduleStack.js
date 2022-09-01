import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Sched from '../Screens/Admin_Screens/Schedule';
import Details from '../Screens/Admin_Screens/scheduleDetails.';

export default function ScheduleStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: '#4CB963',  } , headerTintColor: '#ffffff'}}
        >

            <Stack.Screen
                name='Schedule screen'
                component={Sched}
                options={{headerShown: false}}
        

            />

            <Stack.Screen
                name='Location'
                component={Details}

            />


        </Stack.Navigator>
    )
}