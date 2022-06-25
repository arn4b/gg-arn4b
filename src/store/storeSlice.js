import {
    createSlice
} from "@reduxjs/toolkit";
import axios from 'axios'

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
    }
})

const feedSlice = createSlice({
    name: "feed",
    initialState: {
        feedData: null,
    },
    reducers: {
        setFeed: (state, action) => {
            state.feedData = action.payload
        }
    }
})

export const {
    setUserData
} = userSlice.actions;

export const {
    setFeed
} = feedSlice.actions;

export const selectUserData = (state) => state.user.userData;
export const selectFeedData = (state) => state.feed.feedData;

export const userReducer = userSlice.reducer;
export const feedReducer = feedSlice.reducer;