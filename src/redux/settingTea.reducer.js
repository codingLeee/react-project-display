
let init = {
    getData: {},
    examineSetting: {
        "stateFlag": "1",//"审定设置：0为关闭，1为开启"
        "inputTime": "1" // "时间设置，单位为天"
    },
   
};

const LL_GETSETTING = 'LL_GETSETTING'
const LL_EXSMINESETTING = 'LL_EXSMINESETTING'

export const ll_settingTea = (state = init, action) => {
    switch (action.type) {
        case LL_GETSETTING:
            return {
                ...state,
                getData: action.dat
            }
       
        case LL_EXSMINESETTING:
            return {
                ...state,
                examineSetting: action.data
            }

        default:
            return {
                ...state
            }
    }
}

export const ll_getSetting = () => {
    return dispatch => {
        return new Promise((resolve) => {
            let data = {
                data: {},
            };

        })
    }

}


export const ll_examineSetting = (obj) => {
    console.log('examineSetting', obj)
    return dispatch => {
        return new Promise((resolve) => {
            dispatch({
                type: LL_EXSMINESETTING,
                data: obj
            })
            let data = {
                data: obj,
            };

        })
    }
}

