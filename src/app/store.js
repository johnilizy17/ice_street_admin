import { configureStore } from "@reduxjs/toolkit";
import driverReducer from "./features/auth/driverSlice";
import adminReducer from "./features/auth/adminSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
	reducer: {
		driver: driverReducer,
		admin: adminReducer,
		auth: authReducer,
	},
});
