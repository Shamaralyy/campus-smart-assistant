import request from "../utils/request";

export function centreAPI(text) {
    return request({
        url: '/centre',
        method: 'post',
        data: {
            text
        }
    })
}