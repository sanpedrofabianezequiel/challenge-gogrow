import axios,{AxiosInstance as AxiosInstances,AxiosRequestConfig} from 'axios'

export const AxiosInstance = ():AxiosInstances => {
    return axios.create({
        baseURL: 'http://localhost:8080/api',
        headers: { 'Content-Type': 'application/json' }
    } as AxiosRequestConfig)
}