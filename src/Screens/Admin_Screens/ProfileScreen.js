// Sschedule screen

import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';  // react native componenets
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../Navigation/AuthProvider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';


const { height, width } = Dimensions.get('window');

export default function ProfileScreen({navigation}) {
    const { logout } = useContext(AuthContext);
    const { uid } = auth().currentUser;
    const [adminData, setAdminData] = useState();

    const getUser = async () => {
        try {
            const documentSnapshot = await firestore()
                .collection('admin')
                .doc(uid)
                .get();

            const userData = documentSnapshot.data();
            setAdminData(userData);
        } catch {
            //do whatever

        }
    };

    // Get user on mount
    useEffect(() => {
        getUser();
    }, []);


    return (
        <View>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center', backgroundColor: '#ffffff' }}
            >
                <View
                    style={styles.headerContainer}
                >
                    <View
                        style={styles.header}
                    >

                        <View style={styles.imagecontainer}>

                            <Image
                                style={{
                                    height: height / 7,
                                    width: width / 3

                                }}
                                source={require('../../assets/logoW.png')}
                                resizeMode='cover'
                            />

                        </View>

                        <Text
                            style={styles.profileText}
                        >
                            {adminData && adminData?.name}
                        </Text>

                    </View>
                </View>
                

                <View
                    style={styles.wrapper}
                >

                    <FontAwesome5
                        style={{ marginLeft: 5 }}
                        name='user-tag'
                        size={18}
                    />

                    <Text
                        style={{
                            marginLeft: 5,
                            fontSize: 18,
                            fontWeight: 'bold'
                        }}
                    >
                        Role : {adminData && adminData?.role}
                    </Text>

                </View>
                <View
                    style={styles.wrapper}
                >
                    <FontAwesome5
                        style={{ marginLeft: 5 }}
                        name='envelope'
                        size={18}
                    />
                    <Text
                        style={{
                            marginLeft: 5,
                            fontSize: 18,
                            fontWeight: 'bold'
                        }}
                    >
                        Email: {adminData && adminData?.email}
                    </Text>

                </View>
                <TouchableOpacity
                    style={styles.wrapper}
                    onPress={() => navigation.navigate('Statistics')}
                >
                    <FontAwesome5
                        style={{ marginLeft: 5 }}
                        name='chart-bar'
                        size={18}
                    />
                    <Text
                        style={{
                            marginLeft: 5,
                            fontSize: 18,
                            fontWeight: 'bold'
                        }}
                    >
                        See statistics
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.wrapper}
                    onPress={logout}
                >

                    <FontAwesome5
                        style={{ marginLeft: 5 }}
                        name='sign-out-alt'
                        size={18}
                    />
                    <Text
                        style={{
                            marginLeft: 5,
                            fontSize: 18,
                            fontWeight: 'bold'
                        }}
                    >
                        Logout
                    </Text>
                </TouchableOpacity>


            </ScrollView>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 5,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',


    },

    imagecontainer: {
        height: height / 6,
        width: width / 3,
        borderRadius: 180,
        borderWidth: 1,
        marginTop: 100,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    profileText: {
        fontSize: 22,
        fontWeight: 'bold'
    },

    header: {
        width: '100%',
        height: height / 5,
        backgroundColor: '#4CB963',
        alignItems: 'center'
    },

    headerContainer: {
        width: '100%',
        height: height / 3,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderBottomWidth: 1
    },

    wrapper: {
        height: height / 10,
        width: '100%',
        margin: 3,
        flexDirection: 'row',
        alignItems: 'center'
    }



})