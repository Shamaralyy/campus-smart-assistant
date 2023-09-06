import request from "../utils/request";

export function loginAPI(username,password) {
    return request({
        url: '/studentLogin',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            username,
            password
        }
    })
}

export function logout() {
    return request({
        url: '/logout',
        method: 'get'
    })
}