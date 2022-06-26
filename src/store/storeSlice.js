import {
    createSlice
} from "@reduxjs/toolkit";

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
        },

        appendFeed: (state, action) => {
            state.feedData = Object.assign(state.feedData, action.payload)
        },
    }
})

export const {
    setUserData
} = userSlice.actions;

export const {
    setFeed,
    appendFeed
} = feedSlice.actions;

export const selectUserData = (state) => state.user.userData;
export const selectFeedData = (state) => state.feed.feedData;

export const userReducer = userSlice.reducer;
export const feedReducer = feedSlice.reducer;