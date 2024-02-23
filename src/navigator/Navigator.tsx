import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MapScreen from '../pages/MapScreen';
import { PersmissionsScreen } from '../pages/PermissionsScreen';
import { useSelector } from 'react-redux';
import { LoadingScreen } from '../pages/LoadingScreen';


const Stack = createNativeStackNavigator();

export const Navigator = () => {

  const permissions = useSelector((state: any) => state.permissions.permissionState)

  if (permissions === 'unavailable') {
    return <LoadingScreen />
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: 'white'
        }
      }}>

        {
          (permissions === 'granted')
          ? <Stack.Screen name="MapScreen" component={MapScreen} />
          : <Stack.Screen name="PersmissionsScreen" component={PersmissionsScreen} />
        }
    </Stack.Navigator>
  );
}
