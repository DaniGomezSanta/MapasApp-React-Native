import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Platform } from "react-native";
import { PERMISSIONS, check, request } from "react-native-permissions";


const initialState = {
  permissionState: 'unvailable'
}


export const checkLocationPermission = createAsyncThunk('location/checkLocationPermission', async () => {

  let permissionStatus; 

  if (Platform.OS === 'ios') {
    permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  } else {
    permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  }
  return permissionStatus

})

export const askLocationPermission = createAsyncThunk('location/askLocationPermission', async () => {

  let permissionStatus; 

  if (Platform.OS === 'ios') {
    permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  } else {
    permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  }

  

  return permissionStatus
})

const permissionSlice = createSlice({
  name: 'themeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkLocationPermission.fulfilled, (state, action) => {
        state.permissionState = action.payload
      })
      .addCase(askLocationPermission.fulfilled, (state, action) => {
        state.permissionState = action.payload
      })
  }
})

export default permissionSlice.reducer;
