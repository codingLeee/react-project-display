/*
 * @Author: JC.Liu 
 * @Date: 2019-03-06 19:30:43 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-12 10:48:32
 * 教师考勤报表
 */
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Xybb from './xybb';
import Jsbb from './jsbb';
import Kqyclxbb from './kqyclxbb';
import Yssj from './yssj';
@withRouter
class JskbbIndex extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* 学院报表 */}
          <Route exact path="/admin/stdsj/jskqbb/xybb" component={Xybb} />
          {/* 教师报表 */}
          <Route exact path="/admin/stdsj/jskqbb/jsbb" component={Jsbb} />
          {/* 考勤异常类型报表 */}
          <Route exact path="/admin/stdsj/jskqbb/kqyclxbb" component={Kqyclxbb} />
          {/* 原始数据 */}
          <Route exact path="/admin/stdsj/jskqbb/yssj" component={Yssj} />
          
          <Redirect to="/admin/stdsj/jskqbb/xybb" />
        </Switch>
      </div>
    )
  }
}

export default JskbbIndex;