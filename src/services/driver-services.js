import axios from "axios";
import { authService } from "utils";

// Unauthenticated User
export const sendDriverPasswordResetLink = async ({ email }) => {
	return await axios.post(`auth/driver/forgot-password`, { email });
};
export const resetDriverPassword = async ({
	email,
	token,
	password,
	password_confirmation,
}) => {
	return axios.put(`auth/driver/reset-password`, {
		email,
		token,
		password,
		password_confirmation,
	});
};
export const loginDriver = async ({ email, password }) => {
	return await axios.post(`/auth/driver/login`, { email, password });

};
export const registerDriver = async ({
	email,
	password,
	password_confirmation,
	phone,
	first_name,
	last_name
}) => {
	console.log(email, password, password_confirmation ,phone,first_name,last_name)
	const resp = await axios.post(`/auth/driver/register`, {
		email,
		password,
		password_confirmation,
		first_name,
		last_name,
		phone,
	
	}, {
		headers: {
		  'content-type': 'application/json'
		}
	  });
	console.log(resp)
	return resp
};
export const verifyDriverPhoneNumber = async ({ otp }) => {
	return axios.post(`auth/driver/verify-phone-number`, { otp });
};
export const verifyDriverEmailAddress = async ({ otp }) => {
	return axios.post(`auth/driver/verify-email`, { otp });
};

// Authenticated User
export const getDriverProfile = async () => {
	return authService.get(`/user/profile`);
};
export const deleteDriverProfile = async () => {
	return authService.delete(`/user/profile`);
};
export const updateDriverProfile = async (values) => {
	return authService.put(`/user/profile`, values);
};
export const logoutDriverSession = async () => {
	return authService.get(`/driver/logout`);
};
export const refreshDriverToken = async () => {
	return authService.get(`/driver/refresh-token`);
};
export const changeDriverPassword = async ({
	current_password,
	password,
	password_confirmation,
}) => {
	return authService.put(`/driver/change-password`, {
		current_password,
		password,
		password_confirmation,
	});
};
