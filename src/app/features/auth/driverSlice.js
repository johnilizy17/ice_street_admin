import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDriverProfile } from "services/driver-services";
import { loginUser } from "utils";

const initialState = {
	user: {},
	isOnboarded: true,
};

export const fetchDriverProfile = createAsyncThunk(
	"portfolio/fetchDriverProfile",
	async (arg, { getState, rejectWithValue }) => {
		// const state = getState()
		try {
			const {
				data: { data: driverSession },
			} = await getDriverProfile();

			return driverSession;
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return rejectWithValue(message);
		}
	}
);

export const portfolioSlice = createSlice({
	name: "portfolio",
	initialState,
	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload;
		},
		clearSession: (state, { payload }) => {
			state.user = {};
		},
	},
	extraReducers: {
		[fetchDriverProfile.pending]: (state) => {
			state.status = "loading";
		},
		[fetchDriverProfile.fulfilled]: (state, { payload }) => {
			// const { access_token, expires_in, user } = payload;
			// loginUser({ token: access_token, user, expires_in });
			// state.user = user;
			state.user = payload;
			state.status = "success";
		},
		[fetchDriverProfile.rejected]: (state) => {
			state.user = {};
			state.status = "failed";
		},
	},
});

export const { clearSession, setUser } = portfolioSlice.actions;

export default portfolioSlice.reducer;
