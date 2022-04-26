import { combineReducers } from 'redux';
import { LoginReducer } from './login.reducer';
import { Edutitilereducer } from './Edutitilereducer';
import { getJxfsData } from './jxfs.reducer';
import { ll_setting } from './setting.reducer';
import { ll_settingTea } from './settingTea.reducer';
import { ll_warn } from './warn.reducer';
import { ll_warnTea } from './warnTea.reducer';
import { checkClass } from './checkClass.redux'
import { checkOfRoomReducer } from './checkOfRoom.reducer'

//lean_zxxk
import {
  modalChangeSwitch_reducer,
  fetchEchartsData_reducer,
  renderDataState_reducer
} from './lean-zxxk.reducer';
import { zq_xktj_reducer } from "./zq-xktj.reducer";

import { dsxkListReducer } from './xq-dsxk.reducer';

import { checkOfTeaReducer } from './checkOfTeacher.reducer.js';
import { CheckOfRangePicker } from './checkOfRangePicker';
import { xksz_reducer } from './ws-xksz.reducer';
// 生态大数据的reducers 
import { studentReducer } from './../view/innerProject/stdsj/redux/lxx.student.reducer';
import { znSystemReducer } from './../view/innerProject/stdsj/redux/zn.systemreducer';
import { menuReducer } from './../view/innerProject/stdsj/redux/zq.menu.reducer';
import { initReducer } from './../view/innerProject/stdsj/redux/zq-initComp-reducer';
import {XybbReducer } from './JC_xybb.ts';


const allReducers = combineReducers({
  LoginReducer,
  Edutitilereducer,
  modalChangeSwitch_reducer,
  fetchEchartsData_reducer,
  renderDataState_reducer,
  zq_xktj_reducer,
  checkOfTeaReducer,
  CheckOfRangePicker,
  ll_setting,
  ll_settingTea,
  ll_warn,
  ll_warnTea,
  getJxfsData,
  checkClass,
  studentReducer,
  znSystemReducer,
  menuReducer,
  initReducer,
  checkOfRoomReducer,
  dsxkListReducer,
  xksz_reducer,
  XybbReducer
})

export default allReducers;