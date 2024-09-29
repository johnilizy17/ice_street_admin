import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAdminProfile } from "services/admin-services";
import { loginUser } from "utils";

const initialState = {
	user: {},
};

export const fetchAdminProfile = createAsyncThunk(
	"portfolio/fetchAdminProfile",
	async (arg, { getState, rejectWithValue }) => {
		// const state = getState()
		try {
			const {
				data: { data: adminSession },
			} = await getAdminProfile();

			return adminSession;
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
		[fetchAdminProfile.pending]: (state) => {
			state.status = "loading";
		},
		[fetchAdminProfile.fulfilled]: (state, { payload }) => {
			// const { access_token, expires_in, user } = payload;
			// loginUser({ token: access_token, user, expires_in });
			// state.user = user;
			state.user = payload;
			state.status = "success";
		},
		[fetchAdminProfile.rejected]: (state) => {
			state.user = {};
			state.status = "failed";
		},
	},
});

export const { clearSession, setUser } = portfolioSlice.actions;

export default portfolioSlice.reducer;
