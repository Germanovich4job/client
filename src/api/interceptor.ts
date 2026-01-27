import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"

export const http = axios.create({
  baseURL: "http://localhost:5000/api/",
  params: {},
  withCredentials: true,
})

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("accessToken")
    config.headers.Authorization = token
    return config
  },
)

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  error => {
    if (error.response?.status === 401) {
      console.error("error", error)
    }
    return Promise.reject(error)
  },
)
