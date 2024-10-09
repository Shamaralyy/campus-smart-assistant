import request from "../utils/request";

export function searchStudentByNameES(keyword) {
    return request({
        url: '/searchStudentByNameES',
        method: 'get',
        data: {
            keyword
        }
    })
}