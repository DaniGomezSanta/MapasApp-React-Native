import React, { useEffect } from 'react'
import { AppState, Platform } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { askLocationPermission, checkLocationPermission } from '../redux/Reducers/permissionsSlice'
import { openSettings } from 'react-native-permissions'
import BlackButton from '../components/BlackButton'

export const PersmissionsScreen = () => {

  const dispatch = useDispatch();

  const permissionAsk = useSelector((state: any) => state.permissions.permissionState)
  console.log(permissionAsk)

  const handleAskPermission = () => {
    if (permissionAsk === 'blocked' || permissionAsk === 'denied') {
      openSettings();
    }
  }

  useEffect(() => {
    dispatch(askLocationPermission() as any)
  }, [dispatch])


  useEffect(() => {
    checkLocationPermission();
    
    AppState.addEventListener('change', state => {
      if (state === 'active') return;
      dispatch(checkLocationPermission() as any);
    })

  }, [])



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Es necesario el uso del GPS para usar esta aplicación </Text>

      <BlackButton
        title='Permiso'
        onPress={() => handleAskPermission()}
      />

      <Text style={{ marginTop: 20 }}>
        {JSON.stringify(permissionAsk, null, 5)}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    width: 250,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20
  }
})

