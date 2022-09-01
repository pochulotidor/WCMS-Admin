import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const { height, width } = Dimensions.get('window');

export default function Statistics() {

    const [overAll, setOverAll] = useState();
    const [overAllDist, setOverAllDist] = useState();
    const [reports, setReports] = useState();
    const [collected, setCollected] = useState();


    const DataOverall = () => {

        firestore()
            .collection('activity')
            .get()
            .then(querySnapshot => {
                //console.log('Total users: ', querySnapshot.size);
                const data = querySnapshot.size;


                setOverAll(data)
                /* querySnapshot.forEach(documentSnapshot => {
                     console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                 });*/
            });

    }

    const Collected = () => {

        firestore()
            .collection('citizen_reports')
            .where('complete', '==', true)
            .get()
            .then(querySnapshot => {
                //console.log('Total users: ', querySnapshot.size);
                const data = querySnapshot.size;


                setCollected(data)
                /* querySnapshot.forEach(documentSnapshot => {
                     console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                 });*/
            });

    }


    const DataReportsOverall = () => {

        firestore()
            .collection('citizen_reports')
            //.where('complete', '==', true)
            .get()
            .then(querySnapshot => {
                //console.log('Total users: ', querySnapshot.size);
                const data = querySnapshot.size;


                setReports(data)
                /* querySnapshot.forEach(documentSnapshot => {
                     console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                 });*/
            });

    }


    useEffect(() => {

        firestore()
            .collection('activity')
            .get()
            .then(querySnapshot => {
                const data = [];
                querySnapshot.forEach(documentSnapshot => {
                    data.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                setOverAllDist(data)

            });

    }, [])


    useEffect(() => {
        DataOverall();
        DataReportsOverall();
        Collected();
    }, [])

    return (
        <View
            style={{
            backgroundColor: '#ffffff'
        }}
        >

            <View
                style={styles.wrapper}
            >

                <Text
                    style={styles.warapperText}
                >
                    Total Activities: {overAll}
                </Text>

            </View>

            <View
                style={styles.wrapper}
            >

                <Text
                    style={styles.warapperText}
                >
                    Reports received: {reports}
                </Text>

            </View>

            <View
                style={styles.wrapper}
            >

                <Text
                    style={styles.warapperText}
                >
                    Reports collected: {collected}
                </Text>

            </View>

            <View
                style={styles.wrapper}
            >
                <Text
                    style={styles.warapperText}
                >
                    Total distance travelled: {parseFloat(overAllDist && overAllDist.reduce((total, currentvalue) => total = total + currentvalue.distance, 0)).toFixed(2)} km

                </Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: height / 10,
        width: '100%',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        backgroundColor: '#ffffff'
    },

    warapperText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5
    }
})