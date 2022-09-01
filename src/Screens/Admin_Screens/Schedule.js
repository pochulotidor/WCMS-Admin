// Sschedule screen

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';  // react native componenets

//import CalendarPicker from 'react-native-calendar-picker';
import CalendarPicker from 'react-native-calendar-picker';
import firestore from '@react-native-firebase/firestore';


const { height, width } = Dimensions.get('window');

export default function Schedule({navigation}) {

    const [area, setArea] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const subscriber = firestore()
            .collection('schedule')
            .where('sched', '==', true)
            .onSnapshot(querySnapshot => {
                const sched = [];

                querySnapshot.forEach(documentSnapshot => {
                    sched.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setArea(sched);
                setLoading(false);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();

    }, []);

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View
            style={{
                backgroundColor: '#ffffff'
            }}
        >

            <Text
                style={{ fontSize: 25, fontWeight: 'bold', margin: 5 }}
            >
                Area Assignments
            </Text>

            <View
                style={{
                borderBottomWidth: 0.5
            }}
            >
                <CalendarPicker
                    startFromMonday={true}
                    allowRangeSelection={true}

                />

            </View>



            <FlatList
                style={{
                marginBottom:20
            }}
                data={area}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.wrapper}
                        onPress={() => navigation.navigate('Location', { Location: item.location, Initial: item.initial })}
                    >
                        <Text
                            style={styles.text}
                        >
                            {item.AreaName}
                        </Text>

                        <Text
                            style={styles.subtext}
                        >
                            Days: {item.day}
                        </Text>
                        <Text
                            style={styles.subtext}
                        >
                            Collector: {item.assignedTo}
                        </Text>
                    </TouchableOpacity>
                )}
            />



        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    container: {
        width: '100%',
        height: '70%',
        backgroundColor: '#ffffff',
        borderBottomWidth: 0.5
    },

    wrapper: {
        width: '100%',
        height: height / 7,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        marginBottom: 5,
        borderBottomWidth: 0.3
    },

    text: {
        fontSize: 20,
        marginLeft: 5,
        fontWeight: 'bold',
        color: '#191A19'
    },

    subtext: {
        fontSize: 12,
        marginLeft: 5,
        fontWeight: 'bold',
        color: '#191A19'

    }





})