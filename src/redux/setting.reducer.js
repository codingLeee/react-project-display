import util from './../js/_x/index';
import { message } from 'antd';

const Request = util.util.request.request;
let init = {
    getDate:  [
        {
            "teaLateOpenFlag": "1", //教师迟到设置 0为关闭 1为开启
            "claAttRate": "60", //班级出勤率
            "warningUid": "fd58427d-463f-4662-8a6d-1b6b1b23d136", //警告id
            "teaAbsentOpenFlag": "1", //教师缺勤设置 0为关闭 1为开启
            "claAttOpenFlag": "1",//班级出勤设置 0为关闭 1为开启
            "claAttTimeFlag": "2",//班级出勤时间标志 0开课前，1开课时，2开课后
            "changeClaOpenFlag": "1",//调课换课设置 0为关闭 1为开启
            "claAttTime": "10"//班级出勤报警时间 
        },
        {
            "openFlag": "1",//审定设置时间（单位/天） 
            "time": "1", //审定设置：0为关闭 1为开启
            "examineUid": "290bfcd3-f0fc-4fbf-8581-2a9f10a0cc17"//审定设置id   
        }
    ],
    warnSetting: {},
    examineSetting: {},
    loading: false

};


const LL_GETSETTING = 'LL_GETSETTING'
const LL_WARNSETTING = 'LL_WARNSETTING'
const LL_EXSMINESETTING = 'LL_EXSMINESETTING'
const LL_LOADING = 'LL_LOADING;'

export const ll_setting = (state = init, action) => {
    switch (action.type) {
        case LL_GETSETTING:
            return {
                ...state,
                getDate: action.data
            }
        case LL_WARNSETTING:
            return {
                ...state,
                warnSetting: action.data
            }
        case LL_EXSMINESETTING:
            return {
                ...state,
                examineSetting: action.data
            }
        case LL_LOADING:
            return {
                ...state,
                loading: action.data
            }
        default:
            return {
                ...state
            }
    }
}

export const ll_getData = (data)=>{
    return dispatch => {
        dispatch({
            type:LL_GETSETTING,
            data
        })
    }
}
/**
 * 获取数据接口
 */
export const ll_getSetting = () => {
    // console.log(123)
    return dispatch => {
        return new Promise((resolve,reject) => {
            dispatch({
                type: LL_LOADING,
                data: true
            })
            Request('api/web/intelligent_patrol_course/common/getSetting', {}, (res) => {
                if (res.result && res.data && res.data.length) {
                    dispatch({
                        type: LL_LOADING,
                        data: false
                    })
                    dispatch({
                        type:LL_GETSETTING,
                        data:res.data
                    })
                    console.log('shuju', res.data)
                    resolve(res)

                } else {
                    dispatch({
                        type: LL_LOADING,
                        data: false
                    })
                    reject({ status: true })
                }
            })
        })


    }


}

/**
 * 报警设置
 * @param {object} obj 
 */
export const ll_warnSetting = (obj) => {
    console.log('obj', obj)
    return dispatch => {

        return new Promise((resolve, reject) => {
            dispatch({
                type: LL_LOADING,
                data: true
            })
            Request('api/web/intelligent_patrol_course/common/warning/setting', obj, (res) => {
                dispatch({
                    type: LL_LOADING,
                    data: false
                })
                if (res.result) {
                    dispatch({
                        type: LL_WARNSETTING,
                        data: obj
                    })
                    resolve(res)
                } else {
                   
                    reject({ status: true })
                }
            })


        })
    }
}



/**
 * 审定设置
 * @param {object} obj 
 */
export const ll_examineSetting = (obj) => {
    console.log('examineSetting', obj)
    return dispatch => {
        return new Promise((resolve,reject) => {
            dispatch({
                type: LL_LOADING,
                data: true
            })
            Request('api/web/intelligent_patrol_course/common/examine/setting', obj, (res) => {
                if (res.result) {
                    dispatch({
                        type: LL_LOADING,
                        data: false
                    })
                    dispatch({
                        type: LL_EXSMINESETTING,
                        data: obj
                    })
                    resolve(res);
                } else {
                    dispatch({
                        type: LL_LOADING,
                        data: false
                    })
                    reject({ status: true })
                }
            })


        })
    }
}

