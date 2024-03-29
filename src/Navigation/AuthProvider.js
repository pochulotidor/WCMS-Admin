//autheticcation provider.

import React, { createContext, useState } from 'react'
import { Alert } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,

                //login wit email & password
                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password)
                    } catch (e) {
                        Alert.alert('Invalid email or password');
                        console.log(e);
                    }
                },
                

                //logout 
                logout: async => {
                    try {
                        auth().signOut();
                    } catch (e) {
                        console.log(e);
                    }
                },

                resetPassword: (email) => {
                    try {
                        auth().sendPasswordResetEmail(email);
                        Alert.alert('Password reset email sent!')
                    } catch (e) {
                        Alert.alert('Something went wrong!')
                    }
                }



            }}
        >
            {children}
        </AuthContext.Provider>
    )


}