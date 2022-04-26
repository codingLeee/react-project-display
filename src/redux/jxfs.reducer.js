
import util from './../js/_x/index';
const number = util.util.number
const Request = util.util.request.request;
const TEACHINGORDER = 'TEACHINGORDER';
const TEACHINGQUALITY = 'TEACHINGQUALITY';
const TIMETABLE = 'TIMETABLE';
const CURSEMESTERANDWEEKS = 'CURSEMESTERANDWEEKS';
const JXFSLOADING = 'JXFSLOADING';
const init = {
    teachingOrderData: {},
    teachingQualityData: {},
    timeTableData: [],
    semesterAndWeeks: {},
    isLoading: false
};

export function getJxfsData(state = init, action) {
    switch (action.type) {
        case TEACHINGORDER:
            return { ...state, ...action };
        case TEACHINGQUALITY:
            return { ...state, ...action };
        case TIMETABLE:
            return { ...state, ...action };
        case CURSEMESTERANDWEEKS:
            return { ...state, ...action };
        case JXFSLOADING:
            return { ...state, ...action };
        default:
            return state;
    }
}

export function teachingOrder(params) {
    return dispatch => {
        this.jxfsLoading(true)
        Request('api/web/TeachingReflection/classroomOrder', params, (res) => {
            this.jxfsLoading(false)
            if (res.result) {
                dispatch({
                    type: TEACHINGORDER,
                    // teachingOrderData: {
                    //     "totalScore": 0,
                    //     "classList": [],
                    //     "eventNum": 0
                    // }
                    teachingOrderData: res.data
                })
            }
        })
    }
}

export function teachingQuality(params) {
    return dispatch => {
        this.jxfsLoading(true)
        Request('api/web/TeachingReflection/teachQuality', params, (res) => {
            this.jxfsLoading(false)
            if (res.result) {
                dispatch({
                    type: TEACHINGQUALITY,
                    // teachingQualityData: {
                    //     "totalCommentNum": 0,
                    //     "avgScore": 0,
                    //     "totalResearchNum": 0,
                    //     "classList": []
                    // }
                    teachingQualityData: res.data
                })
            }
        })
    }
}

export function timeTable(params) {
    return dispatch => {
        this.jxfsLoading(true)
        Request('reflection/teachClassByWeeks', params, (res) => {
            this.jxfsLoading(false)
            if (res.result) {
                // let data = [{
                //     "typeStatus": 3,
                //     "timeStatus": 3,
                //     "eventNum": 3,
                //     "avgScoreCur": 3,
                //     "commentNumCur": 3,
                //     "noteNumCur": 3,
                //     "curriculumallId": {
                //         "curriculumallId": "38d888f9a2dcf078058b41ba5ce6e161",
                //         "className": "教学班马克思201",
                //         "weeks": 3,
                //         "weekday": 7,
                //         lessonOrder: 8
                //     }
                // }];
                // for (let i = 0; i < 7; i++) {
                //     let params = {}
                //     if (i % 7 === 0) {
                //         params = {
                //             "typeStatus": 1,
                //             "timeStatus": 1,
                //             "eventNum": 3,
                //             "avgScoreCur": 3,
                //             "commentNumCur": 3,
                //             "noteNumCur": 3,
                //             "curriculumallId": {
                //                 "curriculumallId": "38d888f9a2dcf078058b41ba5ce6e161",
                //                 "className": "教学班马克思201",
                //                 "weeks": 3,
                //                 "weekday": 1,
                //                 lessonOrder: 1
                //             }
                //         }
                //     } else if (i % 7 === 1) {
                //         params = {
                //             "typeStatus": 2,
                //             "timeStatus": 2,
                //             "eventNum": 3,
                //             "avgScoreCur": 3,
                //             "commentNumCur": 3,
                //             "noteNumCur": 3,
                //             "curriculumallId": {
                //                 "curriculumallId": "38d888f9a2dcf078058b41ba5ce6e161",
                //                 "className": "教学班马克思201",
                //                 "weeks": 3,
                //                 "weekday": 2,
                //                 lessonOrder: 2
                //             }
                //         }
                //     } else if (i % 7 === 2) {
                //         params = {
                //             "typeStatus": 3,
                //             "timeStatus": 3,
                //             "eventNum": 3,
                //             "avgScoreCur": 3,
                //             "commentNumCur": 3,
                //             "noteNumCur": 3,
                //             "curriculumallId": {
                //                 "curriculumallId": "38d888f9a2dcf078058b41ba5ce6e161",
                //                 "className": "教学班马克思201",
                //                 "weeks": 3,
                //                 "weekday": 3,
                //                 lessonOrder: 3
                //             }
                //         }
                //     } else if (i % 7 === 3) {
                //         params = {
                //             "typeStatus": 3,
                //             "timeStatus": 3,
                //             "eventNum": 3,
                //             "avgScoreCur": 3,
                //             "commentNumCur": 3,
                //             "noteNumCur": 3,
                //             "curriculumallId": {
                //                 "curriculumallId": "38d888f9a2dcf078058b41ba5ce6e161",
                //                 "className": "教学班马克思201",
                //                 "weeks": 3,
                //                 "weekday": 4,
                //                 lessonOrder: 4
                //             }
                //         }
                //     } else if (i % 7 === 4) {
                //         params = {
                //             "typeStatus": 1,
                //             "timeStatus": 1,
                //             "eventNum": 3,
                //             "avgScoreCur": 3,
                //             "commentNumCur": 3,
                //             "noteNumCur": 3,
                //             "curriculumallId": {
                //                 "curriculumallId": "38d888f9a2dcf078058b41ba5ce6e161",
                //                 "className": "教学班马克思201",
                //                 "weeks": 3,
                //                 "weekday": 5,
                //                 lessonOrder: 5
                //             }
                //         }
                //     } else if (i % 7 === 5) {
                //         params = {
                //             "typeStatus": 1,
                //             "timeStatus": 1,
                //             "eventNum": 3,
                //             "avgScoreCur": 3,
                //             "commentNumCur": 3,
                //             "noteNumCur": 3,
                //             "curriculumallId": {
                //                 "curriculumallId": "38d888f9a2dcf078058b41ba5ce6e161",
                //                 "className": "教学班马克思201",
                //                 "weeks": 3,
                //                 "weekday": 5,
                //                 lessonOrder: 5
                //             }
                //         }
                //     } else {
                //         params = {
                //             "typeStatus": 2,
                //             "timeStatus": 1,
                //             "eventNum": 3,
                //             "avgScoreCur": 3,
                //             "commentNumCur": 3,
                //             "noteNumCur": 3,
                //             "curriculumallId": {
                //                 "curriculumallId": "38d888f9a2dcf078058b41ba5ce6e161",
                //                 "className": "教学班马克思201",
                //                 "weeks": 3,
                //                 "weekday": 6,
                //                 lessonOrder: 6
                //             }
                //         }
                //     }
                //     data.push(params)
                // }
                let timeTableData = []
                for (let i = 1; i < 11; i++) {
                    let param = { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: [] }
                    res.data.map((item) => {
                        if (item.curriculumallId.lessonOrder === i) {
                            switch (item.curriculumallId.weekday) {
                                case 1:
                                    return param.Monday.push(item);
                                case 2:
                                    return param.Tuesday.push(item);
                                case 3:
                                    return param.Wednesday.push(item);
                                case 4:
                                    return param.Thursday.push(item);
                                case 5:
                                    return param.Friday.push(item);
                                case 6:
                                    return param.Saturday.push(item);
                                default:
                                    return param.Sunday.push(item);
                            }
                        }
                    })
                    param.key = i;
                    if (i === 10) {
                        param.section = '第十节'
                    } else {
                        param.section = '第' + number.toChinese(i) + '节'
                    }
                    timeTableData.push(param)
                }
                dispatch({
                    type: TIMETABLE,
                    timeTableData
                    // timeTableData: res.data
                })
            }
        })
    }
}

/**
 * @description 获取当前周及日期
 */
export function curSemesterAndWeeks() {
    return dispatch => {
        return new Promise((resolve) => {
            this.jxfsLoading(true)
            Request('semester/curSemesterAndWeeks', {}, (res) => {
                resolve(res)
                this.jxfsLoading(false)
                if (res.result) {
                    dispatch({
                        type: CURSEMESTERANDWEEKS,
                        semesterAndWeeks: res.data
                    })
                }
            })
        })
    }
}

/**
 * @description loading
 * @param {boolean} param 
 */
export function jxfsLoading(param) {
    return dispatch => {
        dispatch({
            type: JXFSLOADING,
            isLoading: param
        })
    }
}