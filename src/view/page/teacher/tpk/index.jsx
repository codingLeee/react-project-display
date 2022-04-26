/*
 * @Author: JC.Liu 
 * @Date: 2019-02-26 12:02:58 
 * @Last Modified by: yrj
 * @Last Modified time: 2019-03-26 13:29:04
 * 老师 - 听评课
 */

import React, { Component } from 'react';
import { Route, Switch, Redirect, matchPath, withRouter } from 'react-router-dom';
import { MyClass, MyListen, MyTask } from './../index';
import TpkTeachTasksApplyListen from './tpkTeachTasksApplyListen.js';
import TpkTeachTasksVerifyListen from './tpkTeachTasksVerifyListen.js';
import TpkTeachResearchComment from './tpkTeachResearchComment.js';
import TpkTeachListenComment from './tpkTeachListenComment.js';

class TpkIndex extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* 我的任务 */}
          <Route exact path="/teacher/tpk/wdrw" component={MyTask} />
          <Route path="/teacher/tpk/wdrw/tpkTeachTasksApplyListen" component={TpkTeachTasksApplyListen} />
          <Route path="/teacher/tpk/wdrw/tpkTeachTasksVerifyListen" component={TpkTeachTasksVerifyListen} />
          {/* 我的教研课 */}
          <Route exact path="/teacher/tpk/wdjyk" component={MyClass} />
          <Route path="/teacher/tpk/wdjyk/tpkTeachResearchComment/:teacherId/:curriculumallId" component={TpkTeachResearchComment} />
          {/* 我的随堂听 */}
          <Route exact path="/teacher/tpk/wdsst" component={MyListen} />
          <Route path="/teacher/tpk/wdsst/tpkTeachListenComment/:teacherId/:curriculumallId" component={TpkTeachListenComment} />
          <Redirect to="/teacher/tpk/wdrw" />
        </Switch>
      </div>
    )
  }
}

export default TpkIndex;