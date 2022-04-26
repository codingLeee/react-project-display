/*
 * @Author: JC.Liu 
 * @Date: 2019-02-26 12:02:58 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-14 13:54:55
 * 管理员 - 听评课
 */

import React, { Component } from 'react';
import { Route, Switch, Redirect, } from 'react-router-dom';
import { TpkTeaTask, TpkTeaSetting, SttSetting, SttTask } from './../index';
import TpkManaOverListenerInfo from './sttrw/tpkManaOverListenerInfo';
import TpkManaLisInfo from './sttrw/tpkManaLisInfo';
import TpkManaDetListenerInfo from './sttrw/tpkManaDetListenerInfo';
import TpkResearchPlanDetail from './jyrw/tpkResearchPlanDetail';
import TpkResearchLessonDetail from './jyrw/tpkResearchLessonDetail';
import TpkResearchersDetail from './jyrw/tpkResearchersDetail';
import TpkResearchBook from './jyrw/tpkResearchBook';
import ListenNote from './../../../component/admin/tpk/listenNote';

class TpkIndex extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* 教研任务 */}
          <Route exact path="/admin/tpk/jyrw" component={TpkTeaTask} />
          <Route path="/admin/tpk/jyrw/rePlanDe" component={TpkResearchPlanDetail} />
          <Route path="/admin/tpk/jyrw/reLessonDe/:passData?" component={TpkResearchLessonDetail} />
          <Route path="/admin/tpk/jyrw/rePerDe" component={TpkResearchersDetail} />
          <Route path='/admin/tpk/jyrw/reBook/:teaId/:name' component={TpkResearchBook} />
          {/* 教研设置 */}
          <Route path="/admin/tpk/jysz" component={TpkTeaSetting} />

          {/* 随堂听任务 */}
          <Route exact path="/admin/tpk/sttrw" component={SttTask} />
          <Route exact path="/admin/tpk/sttrw/ListenNote/:id:teaId/:name" component={ListenNote} />
          {/* 听课员详情 */}
          <Route path="/admin/tpk/sttrw/TpkManaOverListenerInfo" component={TpkManaOverListenerInfo} />
          {/* 听课详情 id  teacher：老师姓名  teaId：老师id */}
          <Route path="/admin/tpk/sttrw/TpkManaLisInfo/:id:teacher/:teaId" component={TpkManaLisInfo} />
          <Route path='/admin/tpk/sttrw/TpkManaDetListenerInfo' component={TpkManaDetListenerInfo} />

          {/* 随堂听设置 */}
          <Route path="/admin/tpk/sttsz" component={SttSetting} />

          <Redirect to="/admin/tpk/jyrw" />
        </Switch>
      </div>
    )
  }
}

export default TpkIndex;