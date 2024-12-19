import request from "../utils/request";

export function initStudent() {
    return request({
        url: '/initStudent',
        method: 'get',
    })
}

export function searchStudentByNameES(keyword) {
    return request({
        url: '/searchStudentByNameES?keyword=' + keyword,
        method: 'get',
    })
}