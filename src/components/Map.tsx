import React, { useRef, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../pages/LoadingScreen';
import { Fab } from './Fab';

interface Props {
  markers?: Marker[];
}

export const Map = ({ markers }: Props) => {

  const { hasLocation, initialPosition, getCurrentLocation, followUserLocation, userLocation } = useLocation();

  const mapViewRef = useRef<MapView>();

  useEffect(() => {
    followUserLocation();
    return () => {
      //TODO: cancelar el movimiento
    }

  }, [])

  useEffect(() => {
    const {latitude, longitude} = userLocation;
    mapViewRef.current?.animateCamera({
      center: { latitude, longitude}
    }); 
  }, [userLocation])



  const centerPosition = async () => {
    const location = await getCurrentLocation();

    mapViewRef.current?.animateCamera({
      center: {
        latitude: location.latitude,
        longitude: location.longitude
      }
    })
  }

  if (!hasLocation) {
    return <LoadingScreen />
  }

  return (
    <>
      <MapView
        ref={(el) => mapViewRef.current = el!}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        showsUserLocation
        style={{ flex: 1 }}
        region={{
          latitude: initialPosition!.latitude, // El signo de admiracion quiere decir que ahimsiempre va a tener informacion
          longitude: initialPosition.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {/* <Marker
        image={require('../assets/custom-marker.png')}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324
          }}
          title='Esto es un titulo'
          description='Esto es una descripcion del marcador'
        /> */}
      </MapView>

      <Fab
        iconName='compass-outline'
        onPress={centerPosition}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20
        }}
      />
    </>
  )
}


