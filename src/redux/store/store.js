import { configureStore } from "@reduxjs/toolkit";
import permissionsSlice from "../Reducers/permissionsSlice";



export const store = configureStore({
    reducer: {
        permissions: permissionsSlice
    }
});


