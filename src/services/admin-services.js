import axios from "Api/axios/Admin/index"
import { formDataReq } from "./adminFormDataBaseUrl";
import { authService } from "utils";

// Unauthenticated User
export const sendAdminPasswordResetLink = async ({ email }) => {
	return axios.post(`auth/admin/forgot-password`, { email });
};
export const resetAdminPassword = async ({
	email,
	token,
	password,
	password_confirmation,
}) => {
	return axios.put(`auth/admin/reset-password`, {
		email,
		token,
		password,
		password_confirmation,
	});
};
export const loginAdmin = async ({ email, password }) => {
	const res = await axios.post(`login`, { email, password });
	return res
};

export const userData = async (prop) => {
	console.log(prop)
	const res = await axios.get(`user/${prop}`);
	return res
};

export const registerAdmin = async ({
	email,
	password,
	password_confirmation,
	first_name,
	last_name,
	phone,
}) => {

	console.log(email, password, password_confirmation, first_name, last_name, phone)
	const res = await axios.post(`auth/admin/register`, {
		email,
		password,
		password_confirmation,
		first_name,
		last_name,
		phone,
	},
		{
			headers: {
				'content-type': 'application/json'
			}
		});
	console.log(res, "resss")
	return res
};
export const verifyAdminPhoneNumber = async ({ otp }) => {
	return axios.post(`auth/admin/verify-phone-number`, { otp });
};
export const verifyAdminEmailAddress = async ({ otp }) => {
	return axios.post(`auth/admin/verify-email`, { otp });
};

// Authenticated User
export const getAdminProfile = async () => {
	// return axios.get(`/user/profile`);
};
export const deleteAdminProfile = async () => {
	// return axios.delete(`/user/profile`);
};

export const deleteAdminAccount = async (id) => {
	return axios.delete(`/admins/${id.id}`);
};

export const updateAdminProfile = async (values) => {
	// return axios.put(`/user/profile`, values);
};

export const deleteAdminAdvister = async (id) => {
	return axios.delete(`/admin/advertiser/delete/${id}`);
};
export const editAdminAdvister = async (id, data) => {
	return axios.put(`/admin/advertiser/update/${id}`, data);
};
export const logoutAdminSession = async () => {
	return axios.get(`/admin/logout`);
};
export const refreshAdminToken = async () => {
	return axios.get(`/admin/refresh-token`);
};
export const changeAdminPassword = async ({
	current_password,
	password,
	password_confirmation,
}) => {
	return axios.put(`/admin/change-password`, {
		current_password,
		password,
		password_confirmation,
	});
};
export const adminGetAllDrivers = async (id, type) => {
	const ans = await authService.get(`category?limit=${id}&type=${type}`)
	return ans;
};

export const adminSearchPackages = async (id) => {
	const ans = await authService.get(`packages/search?search=${id}`)
	return ans;
}

export const adminGetAllPayment = async (id, search) => {
	const ans = await authService.get(`payments?limit=${id}&search=${search}`)
	return ans;
};

export const adminGetAllUserPackage = async (id, search) => {
	const ans = await authService.get(`packages?limit=${id}&search=${search}`)
	return ans;
};



export const adminGetAllOffline = async (id, search) => {
	const ans = await authService.get(`payment/offline?limit=${id}&search=${search}`)
	return ans;
};

export const adminGetSinglePackage = async (id) => {
	const ans = await authService.get(`package/category/${id}`)
	return ans;
};


export const adminGetSingleOrder = async (id) => {
	const ans = await authService.get(`packages/${id}`)
	return ans;
};

export const adminPackagePayment = async (id) => {
	const ans = await authService.get(`/cart/package/${id}`)
	return ans;
};

export const updatePackagePayment = async (id, data) => {
	const ans = await authService.put(`/cart/package/${id}`, data)
	return ans;
};


export const adminGetSinglePackageById = async (id) => {
	const ans = await authService.get(`live/admin/${id}`)
	return ans;
};


export const adminGetProduct = async (search) => {
	const ans = await authService.get(`products?search=${search}`)
	return ans;
};


export const adminGetProductPage = async (limit) => {
	const ans = await authService.get(`products?limit=${limit}`)
	return ans;
};


export const adminGetAddPackage = async (data) => {
	const ans = await authService.post(`package-category`, data)
	return ans;
};

export const adminAddLivePackage = async (data) => {
	const ans = await authService.post(`live`, data)
	return ans;
};

export const adminUpdateLivePackage = async (id, data) => {
	const ans = await authService.put(`live/${id}`, data)
	return ans;
};


export const adminGetUpdatePackage = async (id, data) => {
	const ans = await authService.put(`package/category/${id}`, data)
	return ans;
};

export const adminGetDeletePackage = async (id) => {
	const ans = await authService.delete(`package/category/${id}`)
	return ans;
};

export const adminGetAllUser = async (id, search) => {
	const ans = await authService.get(`users?limit=${id}&search=${search}`)
	return ans;
};

export const adminGetAllTransaction = async (id, limit) => {
	const ans = await authService.get(`transactions/${id}?limit=${limit}`)
	return ans;
};


export const adminGetProductByID = async (id) => {
	const ans = await authService.get(`product/${id}`)
	return ans;
};

export const adminGetAllPoints = async (id) => {
	const ans = await authService.get(`/admin/driver/daily-points`)
	console.log(ans)
	return ans;
};

export const adminGetPageNumber = async (id) => {
	const ans = await authService.get(`/admin/drivers?page=${id}`)
	return ans;
};

export const adminUpdateDriverProfile = async ({ driver_id, values }) => {
	return axios.put(`/admin/drivers/${driver_id}`, values);
};
export const adminGetDriverProfile = async (driver_id) => {
	return axios.get(`user/${driver_id}`);
};

//Advert
export const adminGetAllAdverter = async (e, s) => {

	const ans = await authService.get(`products/adminAccess?limit=${e}`)
	return ans;
};

export const adminGetBanner = async () => {

	const ans = await authService.get(`/banner`)
	return ans;
};

export const admimDeleteProduct = async (e) => {

	const ans = await authService.delete(`product/${e}`)
	return ans;
};

export const admimDeleteHeader = async (e) => {

	const ans = await authService.delete(`header/${e}`)
	return ans;
};

export const admimDeleteBanner = async (e) => {

	const ans = await authService.delete(`banner/${e}`)
	return ans;
};

export const adminUpdateProductStatus = async (e, s) => {

	const ans = await authService.put(`product/status/${e}`, s)
	return ans;
};

export const adminGetAllPackages = async (e, s) => {

	const ans = await authService.get(`package-category?limit=${e}&search=${s}`)
	return ans;
};
export const adminCreateAdvert = async (data) => {

	const res = await authService.post(`category`, data);
	return res
};

export const adminUpdateCategory = async (data) => {

	const res = await authService.put(`category`, data);
	return res
};

export const adminAddBanner = async (data) => {

	const res = await authService.post(`banner`, data);
	return res
};


export const adminAddHeader = async (data) => {
	const res = await authService.post(`header`, data);
	return res
};

export const adminupdateHeader = async (data) => {
	const res = await authService.put(`header`, data);
	return res
};

export const adminGetHeader = async (data) => {
	const res = await authService.get(`header`, data);
	return res
};

export const adminUpdateBanner = async (data) => {
	const res = await authService.put(`banner`, data);
	return res
};

export const adminImageUpload = async (data) => {

	const formData = new FormData()
	formData.append("image", data.advert_file)
	const res = await axios.post(`/image/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
	return res
}

export const adminCreateProduct = async (data) => {

	const res = await axios.post(`product`, data);
	return res
};

export const adminUpdateProduct = async ({ displayImage, ...data }) => {

	const formData = new FormData()

	if (displayImage) {
		formData.append("image", data.advert_file)
		formData.append("itemName", data.itemName)
		formData.append("price", data.price)
		formData.append("discount", data.discount)
		formData.append("details", data.details)
		formData.append("spec", data.spec)
		formData.append("feature", data.feature)
		const res = await axios.put(`product/${data.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
		return res

	} else {
		const res = await axios.put(`product/${data.id}`, data);
		return res

	}
};


export const adminDeleteCategories = async (data) => {

	const res = await axios.delete(`category/${data}`);
	return res
};


export const adminCreateAdverter = async (data) => {
	return axios.post(`admin/advertiser/create`, data);
};


export const adminUpdateAdvert = async (data) => {
	const formData = new FormData()
	console.log(data)
	return axios.patch(`/admin/adverts/${data.id}`, data);
};

export const adminUpdateDriverTabInfo = async ({ driver_id, values }) => {
	return axios.put(`/admin/drivers/${driver_id}/tab`, values);
};
export const adminGetDriverTabInfo = async ({ driver_id }) => {
	const res = await authService.get(`/admin/drivers/tabs/${driver_id}`)
	console.log(res, "response of tab data")
	return authService.get(`/admin/drivers/tabs/${driver_id}`);
};
export const adminGetDriverHistory = async ({ driver_id }) => {
	return axios.get(`/admin/drivers/${driver_id}/history`);
};
export const adminGetDashboardSummary = async () => {
	return axios.get(`dashboard`);
};
export const adminGetSingleAdverts = async (id) => {

	return axios.get(`/admin/adverts/${id}`);
};

export const adminGetSingleAdverter = async (id) => {

	return axios.get(`/admin/advertiser/show/${id}`);
};


export const adminDeleteAdverts = async (id) => {

	return axios.delete(`/admin/adverts/${id}`);
};
export const adminGetAllAdverts = async () => {
	return axios.get(`/admin/adverts`);
};
export const adminGetAllAdmin = async () => {
	return axios.get(`/admin/admins`);
};
export const adminGetAllTrivia = async () => {
	return axios.get(`/admin/trivia`);
};
//Games category
export const adminAddGameCategory = async (formData) => {
	const ans = await formDataReq.post(`/admin/game/category/add`, formData)
	return ans
}

export const adminGetSingleGame = async (gameId) => {
	console.log(gameId, "game ID")
	return authService.get(`/admin/game/category/${gameId}`)
}
export const adminUpdateSingleGame = async (values) => {
	console.log(values, "game ID")
	return authService.post(`admin/game/category/update`, values)
}
export const adminUpdateSingleGameImage = async (formData) => {
	return formDataReq.post(`admin/game/category/update`, formData)
}

export const adminGetAllLivesCategory = async (id) => {
	return authService.get(`live/admin`)
}

export const adminDeleteLivesCategory = async (id) => {
	return authService.delete(`live/${id}`)
}


export const adminOnlineLivesCategory = async (id, state) => {
	return authService.put(`live/${id}`, state)
}

export const adminGetEachLeaderBoard = async (gameId) => {
	return authService.get(`/admin/game/leaderboard/${gameId}`)
}

export const adminDriverClaimReward = async (gameId) => {
	return authService.get(`/admin/game/rewarded/${gameId}`)
}

export const adminUploadCsvFile = async (formData) => {
	const ans = await formDataReq.post(`/admin/game/upload`, formData)
	return ans
}
export const adminExportDriversAsCsv = async () => {
	const ans = await authService.get(`/admin/export/drivers`)
	return ans
}
export const adminVerifyDriver = async (driver_id) => {
	const ans = await axios.post(`/admin/driver/account/verify/${driver_id}`)
	console.log(ans, "answerrrr")
	return ans
}

export const adminUnVerifyDriverAccount = async (driver_id) => {
	const ans = await authService.post(`/admin/driver/account/unverify/${driver_id}`)
	return ans
}

export const adminGetAnalytics = async ({ game_category_id }) => {
	const ans = await authService.post(`/admin/game/analytics`, { game_category_id })
	return ans
}

export const adminGetQRDetails = async ({ id }) => {
	const { data: { data } } = await authService.get(`/admin/adverts/links/${id}`)
	return data[0].advert_links
}

export const adminSearchForADriver = async ({ search, id }) => {
	console.log(search, "search")
	const data = await authService.post(`admin/driver/all/search?page=${id}`, { search })
	return data
}


//tab management api
export const adminAddTab = async (values) => {
	const data = await axios.post(`admin/tab`, values)
	return data
}
export const adminFetchAllTab = async () => {
	const data = await authService.get(`admin/tab`)
	return data
}

export const adminExportTabsAsCsv = async () => {
	const ans = await authService.get(`/admin/export/tabs`)
	return ans
}

export const adminFetchSingleTab = async ({ tabId }) => {
	console.log(tabId, "idddddddddd")
	const data = await authService.get(`admin/tab/${tabId}`)
	return data
}

//Survey endpoint
export const adminAddSurvey = async (values) => {
	const data = await axios.post(`admin/survey`, values)
	return data
}

export const adminGetAllSurvey = async () => {
	const data = await axios.get(`admin/survey`)
	return data
}

export const adminGetSingleSurveyResult = async (id) => {
	const data = await axios.get(`admin/survey/result/${id}`)
	return data
}
export const adminDeleteSurveyQuestion = async (id) => {
	const data = await axios.delete(`admin/survey/${id}`)
	return data
}

export const adminDownloadAllSurveyResponse = async () => {
	const ans = await authService.get(`/admin/export/surveys`)
	return ans
}
export const adminDownloadSingleSurveyResponse = async (id) => {
	const ans = await authService.get(`/admin/export/surveys/${id}`)
	return ans
}

export const getDriversPayoutInfo = async (value) => {
	return axios.get(`driver/payout`, value)

}

export const driversWithdrawals = async () => {
	return authService.get(`driver/payout/withdrawals`)
}
//
export const driversGetPoints = async () => {
	return authService.get(`driver/me/points`)
}