const queryStudentList = [
    /^查询学生表中所有学生$/,
    /^查询学生表中(.+)$/,
]

const queryCourseList = [
    /^查询课程表中所有课程$/,
    /^查询课程表中(.+)的任课情况$/,
]

const queryTeacherList = [
    /^查询课程表中(.+)学科的任课老师$/,
]

const queryScoreList = [
    /^查询成绩表中所有成绩$/,
    /^查询(.+)表中(.+)的成绩$/,
    /^查询(.+)表中(.+)学科的所有成绩$/,
    /^查询(.+)表中(.+)老师任教课程的成绩$/
];

const addList = [
    /^添加(.+)到(.+)表中$/
]

const deleteList = [
    /^删除(.+)表中(.+)$/,
    /^删除(.+)表中(.+)课程(.+)$/,
];

const updateList = [
    /^修改(.+)表$/
]

/**
 * 
 * @param {*} input 
 * @param {*} type 
 * type:   query + 查找类型 | add | delete | update
 * @returns 
 */


export function matchRegex(input, type) {

    const regexList = eval(type + 'List');

    for (let i = 0; i < regexList.length; i++) {
        let regex = regexList[i];
        if (regex.test(input)) {
            return true;
        }
    }
    return false;
}

