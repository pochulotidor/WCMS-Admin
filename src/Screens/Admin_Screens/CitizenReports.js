import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { customStyleMap } from '../../styles';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import firestore from '@react-native-firebase/firestore';

export default function CitizenReports() {

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const subscriber = firestore()
            .collection('citizen_reports')
            .where('complete', '==', false)
            .onSnapshot(querySnapshot => {
                const reports = [];
                querySnapshot.forEach(documentSnapshot => {
                    reports.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                setReports(reports)
                setLoading(false);
            });
        return () => subscriber();
    }, [])

   
    if (loading) {
        return (
            <View
                style={{
                    alignItems: 'center', justifyContent: 'center', flex: 1 
                }}
            >
                <ActivityIndicator size="large" color="#4CB963" />
            </View>
        )
    }
    return (
        <View
            style={{
                justifyContent: 'center'
            }}
        >
            <FlatList
                data={reports}
                renderItem={({ item }) => (


                    <View
                        style={{ flex: 1, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}
                    >

                        <View
                            style={styles.reportCard}
                        >
                            <View
                                style={styles.cardHeader}
                            >

                                <Text
                                    style={styles.cardText}
                                >
                                    Date of report: {[item.reportTime.toDate().toString()]}
                                </Text>

                            </View>

                            <MapView
                                pitchEnabled={false}
                                rotateEnabled={false}
                                zoomEnabled={false}
                                scrollEnabled={false}
                                customMapStyle={customStyleMap}
                                style={styles.map}
                                provider={PROVIDER_GOOGLE}
                                maxZoomLevel={17.5} // 👈
                                loadingEnabled={true} // 👈
                                initialRegion={{
                                    latitude: item.loc.latitude,
                                    longitude: item.loc.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421
                                }}
                            >
                                <Marker
                                    coordinate={item.loc}
                                >




                                </Marker>
                            </MapView>
                        </View>

                    </View>







                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({

    reportCard: {
        width: '100%',
        height: 450,
        borderRadius: 15,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderTopWidth: 0.3
    },

    cardHeader: {
        height: '15%',
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        justifyContent: 'center'
    },


    cardText: {
        fontSize: 15,
        color: '#232323',
        marginLeft: 8,
        fontWeight: 'bold'
    },

    map: {

        width: '100%',
        height: '85%',


    },


})

