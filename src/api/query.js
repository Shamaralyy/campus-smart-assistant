import request from "../utils/request";

export function addStudent2API(sId, sName, sAge, sSex, sPhone, sNum, sAdvisor) {
    return request({
        url: '/addStudent2',
        method: 'post',
        data: { sId, sName, sAge, sSex, sPhone, sNum, sAdvisor }
    })
}

export function deleteStudent2API(json) {
    return request({
        url: '/deleteStudent2',
        method: 'post',
        data: {
            json
        }
    })
}

export function selectAllStudentPaginateAPI(pageSize, pageNum) {
    return request({
        url: '/selectAllStudentPaginate',
        method: 'post',
        data: {
            pageSize,
            pageNum
        }
    })
}

export function updateStudent2API(sId, sNum, sName, sSex, sAge, sPhone, sAdvisor) {
    return request({
        url: '/updateStudent2',
        method: 'post',
        data: { sId, sNum, sName, sSex, sAge, sPhone, sAdvisor }
    })
}