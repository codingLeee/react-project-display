/*
 * @Author: JC.Liu 
 * @Date: 2019-02-23 22:34:10 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-02-27 09:56:40
 * 在线巡课 - 智能巡课
 */
import React, { Component } from 'react';
import { Route, Switch, Redirect, matchPath } from 'react-router-dom';
import Warining from './warning';
import Setting from './setting';
export class XkIntellegence extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* 异常报警 */}
          <Route path="/admin/zxxk/znxk/ycbj" component={Warining} />
          {/* 设置 */}
          <Route path="/admin/zxxk/znxk/sz" component={Setting} />
          <Redirect to="/admin/zxxk/znxk/ycbj" />
        </Switch>
      </div>
    )
  }
}
