import axios from "axios";

export const formDataReq = axios.create({
  baseURL: 'https://Ice Street-vrvx.onrender.com',
  headers: { 'Content-Type': 'multipart/form-data' },
})

formDataReq.interceptors.request.use((config) => {
  let tokenData = localStorage.getItem("token")

 
 if (tokenData) {
    config.headers.common['Authorization'] = `Bearer ${tokenData}`
  }
  return config
})

formDataReq.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
   
    /*if (err.response && err.response.status === 401) {
      localStorage.clear()
    }*/
    return Promise.reject(err)
  },
)




