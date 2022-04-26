/*
 * @Author: JC.Liu 
 * @Date: 2019-02-23 22:34:10 
 * @Last Modified by: xiangting
 * @Last Modified time: 2019-03-25 10:46:03
 * 教学检查 - 课程查课
 */
import util from './../js/_x/index';
import {message} from 'antd'
const Request = util.util.request.request;
const LESSONORDER = 'LESSONORDER';
const TEACHINGORG = 'TEACHINGORG';
const CHECKCLASS = 'CHECKCLASS';
const RANKDATA = 'RANKDATA';
const CHECKCLASSLOADING = 'CHECKCLASSLOADING';
const BUILDLIST = 'BUILDLIST';

const init = {
    checkClassData: [],
    lessonOrder: [],
    teachingOrg: [],
    rankList: [],
    totalNum: 0,
    buildList: []
}

export function checkClass(state = init, action) {
    switch (action.type) {
        case LESSONORDER:
            return { ...state, ...action };
        case TEACHINGORG:
            return { ...state, ...action };
        case CHECKCLASS:
            return { ...state, ...action };
        case RANKDATA:
            return { ...state, ...action };
        case CHECKCLASSLOADING:
            return { ...state, ...action };
        case BUILDLIST:
            return { ...state, ...action };
        default:
            return state
    }
}


/**
 * @description 获取页面数据
 * @param {object} params       入参
 */
export function getCheckClassData(params) {
    return dispatch => {
        this.checkClassLoading(true)
        Request('api/web/coursecheck/getCurriAll', params, (res) => {
            this.checkClassLoading(false)
            if (res.result) {
                dispatch({
                    type: CHECKCLASS,
                    checkClassData: res.data,
                    totalNum: res.data.totalNum
                })
            }else{
                message.error(res.message)
            }
        })
    }
}

/**
 * @description 获取节次信息
 */
export function getLessonOrder() {
    return dispatch => {
        return new Promise((resolve, reject) => {
            this.checkClassLoading(true)
            Request('api/web/coursecheck/getLessonOrder', {}, (res) => {
                this.checkClassLoading(false)
                resolve(res)
                if (res.result) {
                    dispatch({
                        type: LESSONORDER,
                        lessonOrder: res.data.selectAllLessonOrder
                    })
                }else{
                    message.error(res.message)
                }
            })
        })
    }
}

/**
 * @description 获取机构信息
 */
export function getTeachingOrg() {
    return dispatch => {
        return new Promise((resolve, reject) => {
            this.checkClassLoading(true)
            Request('api/web/teacommon/teaching_org', {}, (res) => {
                this.checkClassLoading(false)
                resolve(res)
                if (res.result) {
                    dispatch({
                        type: TEACHINGORG,
                        teachingOrg: res.data
                    })
                }else{
                    message.error(res.message)
                }
            })
        })
    }
}

/**
 * @description 获取上课地点
 */
export function getBuildList() {
    return dispatch => {
        return new Promise((resolve, reject) => {
            this.checkClassLoading(true)
            Request('api/web/teacommon/buildList', {}, (res) => {
                this.checkClassLoading(false)
                resolve(res)
                if (res.result) {
                    dispatch({
                        type: BUILDLIST,
                        buildList: res.data
                    })
                }else{
                    message.error(res.message)
                }
            })
        })
    }
}

/**
 * @description 获取排名列表
 * @param {object} params       入参
 */
export function getRankListData(params) {
    return dispatch => {
        this.checkClassLoading(true)
        Request('api/web/coursecheck/get6BasicInfo', params, (res) => {
            this.checkClassLoading(false)
            if (res.result) {
                dispatch({
                    type: RANKDATA,
                    rankList: res.data
                })
            }else{
                message.error(res.message)
            }
        })
    }
}

export function checkClassLoading(param) {
    return dispatch => {
        dispatch({
            type: CHECKCLASSLOADING,
            isLoading: param
        })
    }
}