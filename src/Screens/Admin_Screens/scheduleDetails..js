import React from 'react';
import { View,  StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polygon } from 'react-native-maps';
import { customStyleMap } from '../../styles/index';



export default function ScheduleDetails({ route }) {
    
    const { Location, Initial } = route.params;

    return (

        <View
            style={styles.coontainer}
        >
            <MapView
                customMapStyle={customStyleMap}
                style={styles.maps}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: Initial.latitude,  // 👈
                    longitude: Initial.longitude,// 👈
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                
            >
                <Polygon
                    coordinates={Location}
                    strokeWidth={5}
                    strokeColor='#4CB963'
                
                />
            </MapView>

        </View>


    )
}

const styles = StyleSheet.create({
    coontainer: {
        flex: 1
    },

    maps: {
        ...StyleSheet.absoluteFill

    }
})