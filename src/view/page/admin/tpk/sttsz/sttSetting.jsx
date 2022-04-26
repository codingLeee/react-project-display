/*
 * @Author: JC.Liu 
 * @Date: 2019-02-23 22:34:10 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-11 10:23:37
 * 听评课 - 随堂听设置
 */
import React, { Component } from 'react';
import { Route, Switch, Redirect, matchPath } from 'react-router-dom';
import TargetSetting from './targetSetting';
import PowerSetting from './powerSetting';
import TpkManaNewTask from './tpkManaNewTask';
export class SttSetting extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* 听课员任务指标设置 */}
          <Route path="/admin/tpk/sttsz/tkyrwzbsz" component={TargetSetting} />
           <Route path="/admin/tpk/sttsz/TpkManaNewTask" component={TpkManaNewTask} /> 
          {/* 授课员审批权限设置 */}
          <Route path="/admin/tpk/sttsz/skyspqxsz" component={PowerSetting} />
          <Redirect to="/admin/tpk/sttsz/tkyrwzbsz" />
        </Switch>
      </div>
    )
  }
}
