/*
 * @Author: JC.Liu 
 * @Date: 2019-03-06 19:47:36 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-07 09:25:41
 * 课堂质量报表
 */
import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Xybb from './xybb';
import Yssj from './yssj';
import Jsbb from './jsbb';
import Tkrwbb from './tkrwbb';
@withRouter
class KtzlbbIndex extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* 学院报表 */}
          <Route exact path="/admin/stdsj/ktzlbb/xybb" component={Xybb} />
          {/* 教师报表 */}
          <Route exact path="/admin/stdsj/ktzlbb/jsbb" component={Jsbb} />
          {/* 听课任务报表 */}
          <Route exact path="/admin/stdsj/ktzlbb/tkrwbb" component={Tkrwbb} />
          {/* 原始数据 */}
          <Route exact path="/admin/stdsj/ktzlbb/yssj" component={Yssj} />
          <Redirect to="/admin/stdsj/ktzlbb/xybb" />
        </Switch>
      </div>
    )
  }
}
export default KtzlbbIndex;