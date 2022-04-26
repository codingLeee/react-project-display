/*
 * @Author: xq 
 * @Date: 2019-03-05 10:49:52 
 * @Last Modified by: xiangting
 * @Last Modified time: 2019-03-20 11:27:02
 * 定时巡课
 */
import util from './../js/_x/index';
import { G } from '../js/g';
const Request = util.util.request.request;

const GETLIST = 'GETLIST';   // 班级列表获取
const SELECTTREELIST = 'SELECTTREELIST'

const init = {
    dayFormat: '2019-99-99',      // string 当前时间
    strategyName: '初始化事件',   // string 事件名称
    lessonOrderId: '6789',        // string 课程Id
    pageNumber: '12',             // string 每页显示页数
    pageSize: '999',             // string 总页数
    type: '0',                   // string 标记状态，0为全部数据，1为标记数据，2为未标记数据
    roomList: [],                 // 班级列表（id和名称，复选功能）
    data: {}
};
export function dsxkListReducer(state = init, action) {
    switch (action.type) {
        case GETLIST:
            return {
                ...state,
                data: action.all,
                roomList: action.list
            };
        case SELECTTREELIST:
            return { ...state, ...action };
        default:
            return state;
    }
}

/**
 * 获取班级列表
 * @param {object}   para
 * @param {function} 回调函数
 */
export function ac_getDxxkList(para, scb = () => { }) {
    // 接口请求
    let params = para ? para : {};
    let param = {
        dayFormat: params.dayFormat || init.dayFormat,             // string 当前时间
        strategyName: params.strategyName || init.strategyName,   // string 事件名称
        lessonOrderId: params.lessonOrderId || init.lessonOrderId, // string 课程Id
        pageNumber: params.pageNumber || init.pageNumber,         // string 每页显示页数
        pageSize: params.pageSize || init.pageSize,               // string 总页数
        type: params.type || init.type                            // string 标记状态，0为全部数据，1为标记数据，2为未标记数据
    }
    console.log('redux拿到的入参: ', param)
    // Request('api/web/timingPatro/list',param,res=>{
    //   if (res.result) {
    // dispatch({
    //     type: GETLIST,
    //     all: data,
    //     list: list
    // });
    //   }
    // })
    let data = {
        pageIndex: 0,
        pageSize: 12,
        totalPages: 80,
        totalRecords: 155,
        pageDatas: [
            {
                classroomID: {
                    classroomId: '001',
                    classroomName: '高一班1',
                    deleteFlag: false
                },
                deleteflag: 0,
                photoAddr: '../../../../../icon/1.png',
                patrollerId: '6281_201502',
                status: 1
            },
            {
                classroomID: {
                    classroomId: '002',
                    classroomName: '高一班2',
                    deleteFlag: false
                },
                deleteflag: 0,
                photoAddr: '../../../../../icon/1.png',
                patrollerId: '6281_201502',
                status: 1
            },
            {
                classroomID: {
                    classroomId: '003',
                    classroomName: '高一班3',
                    deleteFlag: false
                },
                deleteflag: 0,
                photoAddr: '../../../../../icon/1.png',
                patrollerId: '6281_201502',
                status: 1
            },
            {
                classroomID: {
                    classroomId: '1004',
                    classroomName: '高一班4',
                    deleteFlag: true
                },
                deleteflag: 0,
                photoAddr: '../../../../../icon/1.png',
                patrollerId: '6281_201502',
                status: 1
            },
            {
                classroomID: {
                    classroomId: '005',
                    classroomName: '高一班5',
                    deleteFlag: true
                },
                deleteflag: 0,
                photoAddr: '../../../../../icon/1.png',
                patrollerId: '6281_201502',
                status: 1
            },
            {
                classroomID: {
                    classroomId: '006',
                    classroomName: '高一班6',
                    deleteFlag: true
                },
                deleteflag: 0,
                photoAddr: '../../../../../icon/1.png',
                patrollerId: '6281_201502',
                status: 1
            },
            {
                classroomID: {
                    classroomId: '007',
                    classroomName: '高一班7',
                    deleteFlag: true
                },
                deleteflag: 0,
                photoAddr: '../../../../../icon/1.png',
                patrollerId: '6281_201502',
                status: 1
            }
        ]
    }
    let list = data.pageDatas;
    for (let n = 0; n < list.length; n++) {
        list[n].checked = false;
    }
    G.dsxkList = list;
    return dispatch => {
        dispatch({
            type: GETLIST,
            all: data,
            list: list
        });
        scb()
    }
}

export function selectTreeList(param) {
    return dispatch => {
        Request('api/web/timingPatro/selectTreeList', param, res => {
            if (res.result) {
                dispatch({
                    type: SELECTTREELIST,
                    all: data,
                    list: list
                });
            }
        })
    }
}
