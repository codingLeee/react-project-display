/*
 * @Author: zhengqi 
 * @Date: 2019-03-07 19:20:42 
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-03-20 10:06:33
 * 在线巡课-巡课统计
 */

import util from './../js/_x/index';
import _ from 'lodash';
const Request = util.util.request.request;

const ZQ_ACTION_GET = 'ZQ_ACTION_GET';
const ZQ_ACTION_CHANGE = 'ZQ_ACTION_CHANGE';

const init = {
  eventList: [],//发生事件
  renderData: [],//巡课数据
  allCkeckBtn: false,//全选按钮
}

/**
 * @description reducer创建
 * @param {*} state 
 * @param {*} action 
 */
export const zq_xktj_reducer = (state = init, action) => {
  switch (action.type) {
    case ZQ_ACTION_GET:
      return { ...state, ...action.data };
    case ZQ_ACTION_CHANGE:
      return { ...state, ...action.data };
    default:
      return state;
  }
}

/**
 * @description 获取发生事件列表
 */
export function getEventList() {
  return (dispatch) => {
    let eventList = [];
    for (let i = 0; i < 7; i++) {
      eventList.push({
        eventName: '教师迟到' + i,
        eventTypeId: '1212' + i,
        ghost: true,
      })
    }
    dispatch({
      type: ZQ_ACTION_GET,
      data: { eventList }
    })
  }
}


/**
 * @description 选择事件
 * @param {JSON} 当前操作时间
 */
export function handleEvents(eventItem) {
  return (dispatch, getState) => {
    let { eventList } = getState().zq_xktj_reducer;
    const index = _.findIndex(eventList, { eventTypeId: eventItem.eventTypeId });
    if (index !== -1) {
      eventList[index].ghost = !eventList[index].ghost;
    }
    dispatch({
      type: ZQ_ACTION_CHANGE,
      data: { eventList }
    })
  }
}

/**
 * @description 获取巡课数据列表
 */
export function getRenderData(scb = () => { }, fcb = () => { }) {
  return (dispatch) => {
    let renderData = [];
    for (let i = 0; i < 10; i++) {
      renderData.push({
        ccuid: i,
        collageName: "数学学院",
        className: "统计1班",
        teacherName: "黄芳",
        courseName: "JS基础",
        roleEventType: "老师",
        eventNameList: "上课玩王者荣耀",
        deductScore: "3",
        eventHappenTime: [new Date().getTime(), new Date().getTime() + 60 * 1000 * 60 * 2],
        recorderName: "胖老师",
        checkedState: false,
      })
    }
    //请求
    // if (true) {
    //   scb()
    // } else {
    //   fcb()
    // }
    console.log('模拟ajax请求')
    dispatch({
      type: ZQ_ACTION_GET,
      data: { renderData }
    })
  }
}

/**
 * @description  巡课数据列表多选勾选
 * @param {Boolean} 是否全选
 * @param {Number} 当前操作数据
 */
export function handleCheck(isAll, id, checked) {
  return (dispatch, getState) => {
    let { renderData, allCkeckBtn } = getState().zq_xktj_reducer;
    if (!isAll) {
      const index = _.findIndex(renderData, { ccuid: id });
      if (index !== -1) {
        renderData[index].checkedState = checked;
        const fillData = _.filter(renderData, { checkedState: checked });
        console.log(fillData);
        if (fillData.length === renderData.length) {
          allCkeckBtn = checked;
        } else {
          allCkeckBtn = false;
        }
      }
    } else {
      allCkeckBtn = checked;
      renderData.map(item => {
        item.checkedState = checked;
      })
    }
    dispatch({
      type: ZQ_ACTION_CHANGE,
      data: {
        renderData,
        allCkeckBtn
      }
    })
  }
}

