/*
 * @Author: JC.Liu 
 * @Date: 2019-03-06 19:55:40 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-07 09:22:38
 * 学生缺勤报表
 */
import React, { Component } from 'react'
import { Route, Switch, Redirect,withRouter } from 'react-router-dom';
import Yssj from './yssj';
import Xybb from './xybb';
@withRouter
class XscqbbIndex extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* 学院报表 */}
          <Route path="/admin/stdsj/xscqbb/xybb" component={Xybb} />
          {/* 原始数据 */}
          <Route path="/admin/stdsj/xscqbb/yssj" component={Yssj} />
          <Redirect to="/admin/stdsj/xscqbb/xybb" />
        </Switch>
      </div>
    )
  }
}

export default XscqbbIndex;