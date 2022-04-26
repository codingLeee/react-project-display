/*
 * @Author: JC.Liu 
 * @Date: 2019-02-23 22:34:10 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-15 09:53:36
 * 在线巡课 - 巡课设置
 */
import React, { Component } from 'react';
import { Route, Switch, Redirect, matchPath } from 'react-router-dom';
import PlanSetting from './planSetting';
import EventSetting from './eventSetting';
import Static from './static';
import IntervalSetting from './intervalCheckSetting';
export class XkSetting extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* 计划设置 */}
          <Route path="/admin/zxxk/xksz/jhsz" component={PlanSetting} />
          {/* 事件设置 */}
          <Route path="/admin/zxxk/xksz/sjsz" component={EventSetting} />
          {/* 巡课统计 */}
          <Route path="/admin/zxxk/xksz/xktj" component={Static} />
          {/* 定时巡课设置 */}
          <Route path="/admin/zxxk/xksz/dsxksz" component={IntervalSetting} />
          <Redirect to="/admin/zxxk/xksz/jhsz" />
        </Switch>
      </div>
    )
  }
}
