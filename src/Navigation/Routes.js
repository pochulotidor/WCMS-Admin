//Routes.js This is where the nesscesarry react-native firebase code is located and is the responsible for establisshing the connection.

import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';  //Container.
import auth from '@react-native-firebase/auth';    //import the module for Firebase auth
import { AuthContext } from './AuthProvider';      // AuthProvider

//importing the screens.
import AuthStack from '../Navigation/authStack';
import AppNavigation from './AppNavigation';


const Routes = () => {

    // Set an initializing state whilst Firebase connects
    const [user, setUser] = useState(AuthContext)
    const [initializing, setInitializing] = useState(true);

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount

    }, []);

    if (initializing) return null;


    return (
       
        <NavigationContainer>
           
            { user ?  <AppNavigation /> : <AuthStack />}

        </NavigationContainer>
    );
};

export default Routes;