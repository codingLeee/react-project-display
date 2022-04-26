/*
 * @Author: JC.Liu 
 * @Date: 2019-02-26 12:02:58 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-02-26 15:33:09
 * 管理员 - 教学检查
 */

import React, { Component } from 'react';
import { Route, Switch, Redirect, } from 'react-router-dom';
import { CheckClass, CheckOfTea, CheckOfRoom } from './../index';

class JxjcIndex extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* 课程查课 */}
          <Route path="/admin/jxjc/kcck" component={CheckClass} />
          {/* 教师查课 */}
          <Route path="/admin/jxjc/jsck" component={CheckOfTea} />
          {/* 教室查课 */}
          <Route path="/admin/jxjc/jshick" component={CheckOfRoom} />
          {/* 智能巡课 */}
          <Redirect to="/admin/jxjc/kcck" />
        </Switch>
      </div>
    )
  }
}

export default JxjcIndex;