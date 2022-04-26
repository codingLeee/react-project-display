/*
/*
 * @Author: ws 
 * @Date: 2019-03-20 15:53:00 
 * @Last Modified by: ws
 * @Last Modified time: 2019-03-20 15:53:00
 * 巡课设置
 */
import util from './../js/_x/index';
import {G} from '../js/g';
const Request = util.util.request.request;
const EVENLIST = 'EVENLIST';
const init = {
    evenList:[]
}

export function xksz_reducer(state = init, action) {
    switch (action.type) {
        case EVENLIST:
        return {
            ...state,
            evenList: action.data
        }
        default:
        return state;
    }
}
/**
 * @desc 获取事件列表
 * @param {number} pageIndex 页码
 * @param {number} pageSize 每页多少条
 */
export function getEvenList(pageIndex,pageSize){
    return (dispatch,getState) => {
        Request('api/web/patrol_event/list', {
            pageIndex:pageIndex || 1,
            pageSize:pageSize || 20
        }, (res) => {
            dispatch({
                type: EVENLIST,
                data: res.data
            })
        })
    }
}