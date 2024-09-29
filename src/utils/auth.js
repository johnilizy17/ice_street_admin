import { createStandaloneToast } from "@chakra-ui/react";
import { setRefreshingToken } from "app/features/auth/authSlice";
import { clearSession, setUser } from "app/features/auth/driverSlice";
import { store } from "app/store";
import axios from "axios";
import moment from "moment";
import Router from "next/router";
import { refreshDriverToken } from "services/driver-services";
import theme from "../theme";
// import { parseCookies, setCookie, destroyCookie } from "nookies";
import {
	EXPIRED_TOKEN,
	SESSION_EXPIRED,
	INVALID_TOKEN,
	TOKEN_NOT_PARSED,
} from "./constants";

const toast = createStandaloneToast({
	theme,
	defaultOptions: {
		position: "top-right",
		status: "error",
		isClosable: true,
	},
});
// const toast = createStandaloneToast({theme: theme});

const displayError = (description) => {
	if (description) {
		toast({
			position: "top-right",
			title: "Error",
			description,
			status: "error",
			isClosable: true,
		});
	}
};

export const logoutUser = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expiry_time");
	localStorage.removeItem("remember_me");

	// destroyCookie(null, 'token')
	// destroyCookie(null, 'expiry_time')
	// destroyCookie(null, 'remember_me')

	const prevPath = Router.pathname;
	let redirectUrl = prevPath.match(/admin/g) ? "/auth/admin" : "/auth/driver";
	redirectUrl += `/login?redirect=${prevPath}`;
	Router.push(redirectUrl);
};
export const loginUser = ({
	token,
	expires_in,
	remember_me = false,
	user,
}) => {
	console.log(token, "the error")
	const expiry_time = moment().add(expires_in, "seconds");
	localStorage.setItem("token", token);
	localStorage.setItem("expiry_time", expiry_time);
	store.dispatch(setUser(user));

	// if (remember_me) {
	//     setCookie(null, 'token', token, {
	//         maxAge: 30 * 24 * 60 * 60,
	//         path: '/',
	//     })
	//     setCookie(null, 'expiry_time', expiry_time, {
	//         maxAge: 30 * 24 * 60 * 60,
	//         path: '/',
	//     })
	//     setCookie(null, 'remember_me', remember_me, {
	//         maxAge: 30 * 24 * 60 * 60,
	//         path: '/',
	//     })
	// }
};

export const authService = axios.create({ baseURL: "https://massbuy-vrvx.onrender.com" });
authService.interceptors.request.use(
	(config) => {
		let token,
			//expiry_time = null;

		// if (rememberMe) {
		//     token = cookieToken
		//     expiry_time = cookieExpiryTime
		// } else {
		expiry_time = localStorage.getItem("expiry_time");
		token = localStorage.getItem("token");
		// }

		console.log(expiry_time, 'expiry timee', token)
		const sessionExpired = expiry_time ? moment().isAfter(expiry_time) : true;


		if (token == null) {
			config.headers.common["Authorization"] = `Bearer ${token}`;
		    return config; 
		}
		
		
		if (!!!token || sessionExpired) {
			// logoutUser();
			// toast.closeAll();
			// displayError(SESSION_EXPIRED);
			// return Promise.reject(SESSION_EXPIRED);
		}
        config.headers.common["Authorization"] = `Bearer ${token}`;
		    return config; 
		
		
	},
	
	async (error) => {
		if (error.message == "Network Error") {
			displayError("Check your internet connection");
			return Promise.reject();
		}
	}
);

authService.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		const originalRequestConfig = error.config;
		if (error.message == "Network Error") {
			displayError("Check your internet connection");
			return Promise.reject();
		}
		if (error.response) {
			if (error.response.status === 401) {
				logoutUser();
				return Promise.reject();
			}
			if (error?.response?.data?.message) {
				switch (error.response.data.message) {
					case EXPIRED_TOKEN:
						const {
							auth: { refreshingToken },
						} = store.getState();
						if (!refreshingToken) {
							try {
								store.dispatch(setRefreshingToken(true));
								const {
									data: {
										data: { access_token, expires_in, user },
									},
								} = await refreshDriverToken();

								loginUser({ token: access_token, expires_in, user });
								originalRequestConfig.headers.common["Authorization"] =
									"Bearer " + access_token;
								return authService(originalRequestConfig);
							} catch (_error) {
								return Promise.reject(_error);
							} finally {
								store.dispatch(setRefreshingToken(false));
							}
						}
						displayError(SESSION_EXPIRED);
						logoutUser();
						break;
					case TOKEN_NOT_PARSED:
					case INVALID_TOKEN:
						displayError(INVALID_TOKEN);
						logoutUser();
						break;
					default:
						displayError(error.response.data.message);
						break;
				}
				return Promise.reject();
			}
			displayError("An error occured with your request");
			return Promise.reject(error.response.data);
		}

		displayError("An error occured with your request");
		return Promise.reject(error);
	}
);
