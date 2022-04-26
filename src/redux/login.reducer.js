/*
 * @Author: JC.Liu 
 * @Date: 2019-03-18 10:59:28 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-18 16:27:49
 * 用户信息验证 reducer
 */
import _ from 'lodash';
import { G } from './../js/g';

const initState = {
  
}

const reducerType = {
  LOGIN: "LOGIN"
}

export const LoginReducer = (state = initState, action) => {
  switch (action.type) {
    case reducerType.LOGIN:
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


export const saveUserInfo = (obj) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: reducerType.LOGIN,
        data: {
          ...obj
        }
      });
      resolve();
    })
  }
}
