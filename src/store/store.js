import { configureStore } from "@reduxjs/toolkit";
import { userReducer, feedReducer } from './storeSlice'

export default configureStore({
    reducer:{
        user: userReducer,
        feed: feedReducer
    }
})