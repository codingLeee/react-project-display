/*
 * @Author: JC.Liu 
 * @Date: 2019-03-12 11:14:50 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-12 11:28:50
 * 可视化中心路由
 */

import React, { Component } from 'react'
import { Route, Switch, Redirect, } from 'react-router-dom';
import ClassroomDis from './../../../../innerProject/stdsj/view/page/sh_classroomDis';
import ClassroomQua from './../../../../innerProject/stdsj/view/page/sh_classroomQua';
import ClassroomStu from './../../../../innerProject/stdsj/view/page/sh_classroomStu';
import ClassroomTea from './../../../../innerProject/stdsj/view/page/sh_classroomTea';
export default class Overview extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/*可视化中心-课堂秩序*/}
          <Route exact path="/overview/ktzx" component={ClassroomDis} />
          {/*可视化中心-课堂质量*/}
          <Route exact path="/overview/ktzl" component={ClassroomQua} />
          {/*可视化中心-学生出勤*/}
          <Route exact path="/overview/xscq" component={ClassroomStu} />
          {/*可视化中心-教师考勤*/}
          <Route exact path="/overview/jskq" component={ClassroomTea} />

          <Redirect to="/overview/ktzx" />
        </Switch>
      </div>
    )
  }
}

