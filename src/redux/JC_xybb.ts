/*
 * @Author: JC.Liu 
 * @Date: 2019-03-24 12:58:35 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-24 15:26:22
 * 学院报表
 */
import * as Action from './JC_xybb_action.ts';
import _x from './../js/_x/index';
const Format = _x.util.date.format;

interface InitStateInterface {
  dataSource: []
  stime: string
  etime: string
}

const initState: InitStateInterface = {
  dataSource: [],
  stime: Format(new Date()),
  etime: Format(new Date()),
}


export const XybbReducer = (state = initState, action: Action.ActionBehavior) => {
  switch (action.type) {
    case Action.ActionTypes.TEACH:
      return {
        ...state,
        ...action
      }
    default:
      return {
        ...state,
      }
  }
}


