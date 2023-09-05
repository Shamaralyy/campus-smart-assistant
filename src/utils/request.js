import axios from 'axios'

export default function request(config) {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_APP_BASE_API,
        timeout: 5000
    })

    instance.interceptors.request.use(function (config) {
        return config
    }, function (error) {
        return Promise.reject(error)
    })

    instance.interceptors.response.use(function(response) {
        return response
    },function(error) {
        console.error('error',error);
        if(error.response) {
            if(error.response.status == 500) {
                console.error('服务器发生错误 500')
            }
        }
        return Promise.reject(error)
    })

    return instance(config)
}