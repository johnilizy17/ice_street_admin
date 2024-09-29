import axios from 'axios'

const server = axios.create({
  baseURL: 'https://massbuy-vrvx.onrender.com',
  headers: {'Content-Type': 'application/json', 'Accept': 'application/json' },
})

server.interceptors.request.use((config) => {
  let tokenData = localStorage.getItem("token")
 
 if (tokenData) {
    config.headers.common['Authorization'] = `Bearer ${tokenData}`
  }
  return config
})

server.interceptors.response.use(
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

export default server
