import request from "../utils/request";

export function uploadFileAPI(file, name, chunks, chunk) {
    return request({
        url: '/uploadFile',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: {
            file,
            name,
            chunks,
            chunk
        }
    })
}