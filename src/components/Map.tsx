import React, { useRef, useEffect, useState } from 'react';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../pages/LoadingScreen';
import { Fab } from './Fab';

interface Props {
  markers?: Marker[];
}

export const Map = ({ markers }: Props) => {

  const [showPolyline, setShowPolyline] = useState(true);

  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
    routeLines } = useLocation();

  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollowUserLocation();
    }

  }, [])

  useEffect(() => {
    if (!following.current) return;

    const { latitude, longitude } = userLocation;
    mapViewRef.current?.animateCamera({
      center: { latitude, longitude }
    });
  }, [userLocation])



  const centerPosition = async () => {
    const location = await getCurrentLocation();

    following.current = true;

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
        onTouchStart={() => following.current = false}
      >

        {
          showPolyline && (
            <Polyline
              coordinates={routeLines}
              strokeColor='black'
              strokeWidth={3}
            />
          )
        }

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

      <Fab
        iconName='brush-outline'
        onPress={() => setShowPolyline( !showPolyline)}
        style={{
          position: 'absolute',
          bottom: 80,
          right: 20
        }}
      />
    </>
  )
}


