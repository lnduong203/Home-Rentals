import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
        setUserProfile: (state, action) => {
            state.user = action.payload;
        },
        setListings : (state, action) => {
            state.listings = action.payload.listings
        },
        setTripList : (state, action) => {
            state.user.tripList = action.payload
        },
        setWishList : (state, action) => {
            state.user.wishList = action.payload
        },
        setPropertyList : (state, action) => {
            state.user.propertyList = action.payload
        },
    },
});

export const { login, logout, setListings , setTripList, setWishList, setPropertyList, setUserProfile} = userSlice.actions;
export default userSlice.reducer;
