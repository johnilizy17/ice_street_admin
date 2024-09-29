import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	refreshingToken: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setRefreshingToken: (state, { payload }) => {
			state.refreshingToken = payload;
		},
		setIsOnboarded: (state, { payload }) => {
			state.isOnboarded = payload;
		},
	},
});

export const { setIsOnboarded, setRefreshingToken } = authSlice.actions;

export default authSlice.reducer;
