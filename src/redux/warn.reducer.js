import util from './../js/_x/index';

const Request = util.util.request.request;

let init = {
    tabs: {  //表头信息
        tab: '1',
        name: '调课换课'
    },
    tabMessage: {
        page: 1,
        tabRecord: {},
    },
    search: {
        dateTime: [], //时间筛选
        dropType: '0', //0全部 1未审定 2正常 3异常
        inputTeacherName: '', //老师名字
        festivals: '',//节次
        pageNowe: 1,
        pageSize: "20"

    },
    uidList: {
        checkedUidList: [],//[List类型]操作对象uid(课程id)"
        selectedRowKeys: []
    },
    img: {
        uid: '',
        pageNow: 1,
        pageSize: "20"
    }

};

const LL_TABS = 'LL_TABS';
const LL_PAGE = 'LL_PAGE';
const LL_IMG = 'LL_IMG';
const LL_SEARCH = 'LL_SEARCH';
const LL_UIDLIST = 'LL_UIDLIST';

export const ll_warn = (state = init, action) => {
    switch (action.type) {
        case LL_TABS:
            return {
                ...state,
                tabs: action.data
            }
        case LL_PAGE:
            return {
                ...state,
                tabMessage: action.data
            }
        case LL_IMG:
            return {
                ...state,
                img: action.data
            }
        case LL_SEARCH:
            return {
                ...state,
                search: action.data
            }
        case LL_UIDLIST:
            return {
                ...state,
                uidList: action.data
            }


        default:
            return {
                ...state
            }
    }
}


/**
 * tabs导航的key值和名字
 * @param {object} data 
 */
export const ll_tabs = (data) => {
    return dispatch => {
        console.log('shuju', data)

        dispatch({
            type: LL_TABS,
            data: data
        })

    }
}

/**
 * 控制页面信息切换
 * @param {Object} data 
 */
export const ll_Opear = (data) => {
    console.log('页面信息', data)
    return dispatch => {
        // return new Promise((resolve) => {
        //     let params = {
        //         data:data
        //     }
        //     Request('/api/web/coursecheck/getCurriAll', params, (res) => {

        //         if (res.result) {
        //             dispatch({
        //                 type: LL_PAGE,
        //                 data: data
        //             })
        //             resolve(res);
        //         }
        //     })

        // })
        dispatch({
            type: LL_PAGE,
            data: data
        })

    }

    //接口操作uid获取图片信息
}

/**
 * 搜索操作
 * @param {object} data 
 */
export const ll_search = (data) => {
    console.log('查询数据', data)
    return dispatch => {
        // return new Promise((resolve) => {
        //     let params = {
        //         data:data
        //     }
        //     Request('/api/web/coursecheck/getCurriAll', params, (res) => {

        //         if (res.result) {
        //             dispatch({
        //                 type: LL_SEARCH,
        //                 data: data
        //             })
        //             resolve(res);
        //         }
        //     })

        // })
        dispatch({
            type: LL_SEARCH,
            data: data
        })
        //搜索操作
    }
}

/**
 * 初始化search、uidlist
 */
export const ll_Initialization = () => {
    return dispatch => {
        dispatch({
            type: LL_SEARCH,
            data: {
                dateTime: [],
                dropType: '0',
                inputTeacherName: '',
                festivals: '',//节次
                pageNowe: 1,
                pageSize: "20"

            }
        })
        dispatch({
            type: LL_UIDLIST,
            data: {
                checkedUidList: [],//[List类型]操作对象uid(课程id)"
                selectedRowKeys: []
            }
        })
        //搜索操作
    }
}


/**
 * 批量选择id
 * @param {array} data 
 */
export const ll_uidList = (data) => {
    return dispatch => {
        dispatch({
            type: LL_UIDLIST,
            data: data
        })

    }
}


export const ll_ExaminationPass = (data) => {
    return new Promise((resolve, reject) => {
        let params = data
        Request('api/web/intelligent_patrol_course/allow', params, (res) => {
            if (res.result) {
                console.log('通过', res.data)
                resolve(res)
            } else {
                reject({ status: true })
            }
        })

    })
    // return dispatch => {
    //     console.log('批量通过', data)

    // }
}

export const ll_ExaminationError = (data) => {
    return new Promise((resolve, reject) => {
       
        Request('api/web/intelligent_patrol_course/fail', data, (res) => {
            if (res.result) {
                console.log('通过', res)
                resolve(res)
            } else {
                reject({ status: true })
            }
        })
    })
    // return dispatch => {
    //     console.log('批量不通过：', data)
    // }
}


export const ll_img = (data) => {
    console.log('图片', data)
    return dispatch => {
        console.log('图片信息', data)
        dispatch({
            type: LL_IMG,
            data: data
        })
    }
}

