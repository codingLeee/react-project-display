/*
 * @Author: junjie.lean 
 * @Date: 2019-03-01 09:42:12 
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-03-20 10:00:35
 */

import request from '../js/_x/util/request';
import _ from 'lodash';

const ajax = request.request;

const init = {

};



const xxxActionType = "LEAN_ACTION_TYPE";
/**
 * @description redux示例：reducer创建
 * @param {*} state 
 * @param {*} action 
 */
export const xxx_reducer = (state = init, action) => {
    switch (action.type) {
        case xxxActionType:
            return {
                ...state,
                ...action.data
            }
        default:
            return {
                ...state,
            }
    }
}


/**
 * @description redux示例：action创建
 */
export const xxx_action = () => {
    dispatch => {
        let action = {
            type: xxxActionType,
            data: {
                virtualReally: 1
            }
        }
        dispatch(action)
    }
}


const modalSwitch_modalON = "LEAN_ACTION_MODAL_TURN-ON";
const modalSwitch_modalOFF = "LEAN_ACTION_MODAL_TURN-OFF";

export const modalChangeSwitch_reducer = (state = init, action) => {
    switch (action.type) {
        case modalSwitch_modalON:
            return {
                modalVisibleState: true
            }
        case modalSwitch_modalOFF:
            return {
                modalVisibleState: false
            }
        default:
            return { ...state }
    }
}

/**
 * @description 切换新增事件模态框的显示和隐藏
 * @param {Boolean} state  true为开，false为关
 */
export const modalChangeSwitch_action = (state) => {
    if (Object.prototype.toString.call(state).slice(8, -1).toLowerCase() != 'boolean') {
        throw new Error('参数类型错误');
    }
    let action = {
        type: state ? modalSwitch_modalON : modalSwitch_modalOFF
    }
    return dispatch => {
        dispatch(action)
    }
}

const fetchEchartsData_getData = "LEAN_FETCHECHARTSDATA_GETDATA";

/**
 * @description 获取Echarts渲染数据
 * @param {*} state 
 * @param {*} action 
 */
export const fetchEchartsData_reducer = (state = init, action) => {
    switch (action.type) {
        case fetchEchartsData_getData:
            return {
                echartsData: action.data
            }
        default:
            return {
                ...state
            }
    }
}


export const fetchEchartsData_action = () => {
    //api/web/patrolJob/loop_data
    return dispatch => {
        ajax('api/web/patrolJob/loop_data', {}, (res) => {
            // console.log(res)
            let action = {
                type: fetchEchartsData_getData,
                data: res.data
            }

            action = {
                type: fetchEchartsData_getData,
                data: [
                    {
                        "title": "今日任务",
                        "task": 50,
                        "finish": 50,
                        "rate": 50
                    },
                    {
                        "title": "本周任务",
                        "task": 50,
                        "finish": 25,
                        "rate": 50
                    },
                    {
                        "title": "本月任务",
                        "task": 50,
                        "finish": 10,
                        "rate": 20
                    },
                    {
                        "title": "本学期任务",
                        "task": 50,
                        "finish": 0,
                        "rate": 0
                    }
                ],
            }
            dispatch(action)
        })

    }
}


const renderDataState_set = "LEAN_LISTRENDERDATASTATE_SET";
/**
 * @description 渲染列表视图显示控制
 * 
 */
export const renderDataState_reducer = (state = init, action) => {
    switch (action.type) {
        case renderDataState_set:
            return {
                ...state,
                renderDataState: action.renderDataState
            }
        default: {
            return {
                ...state,
            }
        }
    }
}
export const renderDataStateControl_action = (state = "") => {

    return dispatch => {
        dispatch({
            type: renderDataState_set,
            renderDataState: state
        })
    }
}


const deleteListItem_delete = "LEAN_LISTITEM_DELETE";

export const listItem_delete_action = (pr = "", scb = () => { }, fcb = () => { }) => {

    const singleDeleteMethod = "api/web/patrolJob/deleteEvent";
    const batchDeleteMethod = "api/web/patrolJob/deleteEventBatch";
    let ajaxPr = {
        eventId: pr
    }
    if (_.isString(pr)) {
        //单个删除

        return dispatch => {
            ajax(singleDeleteMethod, ajaxPr, (res) => {
                console.log(res)
                if (res && res.code == "200" && res.result == true) {
                    scb();
                    dispatch({
                        type: deleteListItem_delete
                    })
                } else {
                    fcb();
                    dispatch({
                        type: deleteListItem_delete
                    })
                }
            }, () => {

            })

        }
    } else if (_.isArray(pr)) {
        //批量F删除

        return dispatch => {
            ajax(batchDeleteMethod, ajaxPr, (res) => {
                console.log(res)
                if (res && res.code == "200" && res.result == true) {
                    scb();
                    dispatch({
                        type: deleteListItem_delete
                    })
                } else {
                    fcb();
                    dispatch({
                        type: deleteListItem_delete
                    })
                }
            }, () => {

            })
        }
    } else {
        throw new Error('lean:删除入参错误!')
    }

}

