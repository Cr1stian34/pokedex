import { configureStore } from "@reduxjs/toolkit";
import trainerNameSlice from "./slice/trainerName.slice";

export default configureStore({
    reducer: {
        trainerName: trainerNameSlice
    }
})