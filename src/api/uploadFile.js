import request from "../utils/request";

export function uploadFileAPI(file) {
    return request({
        url: '/uploadFile',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: {
            file
        }
    })
}