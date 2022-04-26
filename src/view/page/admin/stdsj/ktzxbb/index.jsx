/*
 * @Author: JC.Liu 
 * @Date: 2019-03-06 19:38:49 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-25 11:13:46
 * 课堂秩序报表
 */
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Xybb from './xybb';
import Wjsjbb from './wjsjbb';
import Rwbb from './rwbb';
import Yssj from './yssj';
@withRouter
class KtzxbbIndex extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          {/* 学院报表 */}
          <Route path="/admin/stdsj/ktzxbb/xybb" component={Xybb} />
          {/* 违纪事件报表 */}
          <Route path="/admin/stdsj/ktzxbb/wjsjbb" component={Wjsjbb} />
          {/* 任务报表 */}
          <Route path="/admin/stdsj/ktzxbb/rwbb" component={Rwbb} />
          {/* 原始数据 */}
          <Route path="/admin/stdsj/ktzxbb/yssj" component={Yssj} />

          <Redirect to="/admin/stdsj/ktzxbb/xybb" />
        </Switch >
      </React.Fragment>
    )
  }
}

export default KtzxbbIndex;
