// Monitoring screen.

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { customStyleMap } from '../../styles/index';
import { globalStyles } from '../../styles/globalStyles';
import Geolocation from "react-native-geolocation-service" // 👈
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; //responsible for the icons that we used.

export default function Monitor() {

    const [location, setLocation] = useState(null);
    const [reports, setReports] = useState([]);
    const [liveLocation, setLiveLocation] = useState([]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('realtime')
            .where('isActive', '==', true)
            .onSnapshot(querySnapshot => {
                const live = [];

                querySnapshot.forEach(documentSnapshot => {
                    live.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setLiveLocation(live);

            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);



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

                setReports(reports);

            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);



    const handlePermission = async () => {

        let permissionCheck = '';

        if (Platform.OS == 'android') {
            permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            if (
                permissionCheck === RESULTS.BLOCKED ||
                permissionCheck === RESULTS.DENIED
            ) {
                const permissionRequest = await request(
                    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                );
                permissionRequest === RESULTS.GRANTED
                    ? console.warn('Location permission granted.')
                    : console.warn('location permission denied.');
            }
        }

    };

    useEffect(() => {
        handlePermission()
    }, [])



    useEffect(() => { // 👈
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords
                setLocation({ latitude, longitude })
                console.log(latitude, longitude)
            },
            error => {
                console.log(error.code, error.message)
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
    }, [])



    return (

        <View
            style={globalStyles.container}
        >

            {location && (
                <MapView
                    customMapStyle={customStyleMap}
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    maxZoomLevel={17.5} // 👈
                  //  loadingEnabled={true} // 👈
                    paddingAdjustmentBehavior="automatic"
                    loadingIndicatorColor="#ffffff" // 👈
                    loadingBackgroundColor="#4CB963" // 👈
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}

                    showsUserLocation={false}
                    showsMyLocationButton={true}

                >
                    {reports ? reports.map((reports) => (
                        <Marker
                            key={reports.id}
                            coordinate={reports.loc}
                            title="Location of the report"
                            description={reports.reportTime.toDate().toString()}
                        >
                            <FontAwesome5
                                size={25}
                                name={"trash"}
                                color={'#950101'}
                            />
                        </Marker>
                    )) : null}

                    {liveLocation ? liveLocation.map((live) => (

                        <Marker
                            key={live.id}
                            coordinate={live.location}
                        >
                            <FontAwesome5
                                size={25}
                                name={"truck"}
                                color={"green"}
                            />

                        </Marker>

                    )): null}



                </MapView>

            )}

        </View>

    )
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})