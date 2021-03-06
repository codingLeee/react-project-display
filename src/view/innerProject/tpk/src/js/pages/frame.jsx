import React, { Component } from 'react';
import { Layout } from 'antd';
import TopMenu from '../components/base/topMenu';
import SubMenu from '../components/base/subMenu';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Global } from  '../base/g';

import TpkTeacherTasks from '../pages/tpk/tpkTeacherTasks';
import TpkTeachTasksApplyListen from '../pages/tpk/tpkTeachTasksApplyListen';
import TpkTeachTasksVerifyListen from '../pages/tpk/tpkTeachTasksVerifyListen';
import TpkTeacherResearch from '../pages/tpk/tpkTeacherResearch';
import TpkTeachResearchComment from '../pages/tpk/tpkTeachResearchComment';
import TpkTeacherListen from '../pages/tpk/tpkTeacherListen';
import TpkTeachListenComment from '../pages/tpk/tpkTeachListenComment';

//mj start
import TpkManaLisTasks from '../pages/tpk/tpkManaLisTasks';
import TpkManaOverListenerInfo from './tpk/tpkManaOverListenerInfo';
import TpkManaDetListenerInfo from './tpk/tpkManaDetListenerInfo';
import TpkManaLisInfo from './tpk/tpkManaLisInfo';
import ListenNote from '../components/listenNote';

import TpkManaLisSet from './tpk/tpkManaLisSet';
//mj end

import TpkResearchTaskPage from './tpk/tpkResearchTaskPage';
import TpkResearchPlanDetail from './tpk/tpkResearchPlanDetail';
import TpkResearchLessonDetail from './tpk/tpkResearchLessonDetail';
import TpkResearchersDetail from './tpk/tpkResearchersDetail';
import TpkResearchSetup from './tpk/tpkResearchSetup';
import TpkResearchBook from './tpk/tpkResearchBook';

import '../../css/frame.css';

const { Header, Content } = Layout;
class Frame extends Component {
  render() {
    // console.log(Global.baseinfo.role);
    return (
      <Layout className='xt-layout'>
        <Header className='xt-layout-header'>
          <TopMenu title={Global.baseinfo.systemname}></TopMenu>
          <Route path='/:func' component={SubMenu}/>
        </Header>
        <Content className='xt-content'>
          <div className='xt-viewbox'>
          <Switch>

            <Route path='/tasks/tpkTeachTasksApplyListen' component={TpkTeachTasksApplyListen} />
            <Route path='/tasks/tpkTeachTasksVerifyListen' component={TpkTeachTasksVerifyListen} />
            <Route path='/myResearch/tpkTeachResearchComment/:teacherId/:curriculumallId' component={TpkTeachResearchComment} />
            <Route path='/myListen/tpkTeachListenComment/:teacherId/:curriculumallId' component={TpkTeachListenComment} />

            <Route path='/tasks' component={TpkTeacherTasks} />            
            <Route path='/myResearch' component={TpkTeacherResearch} />            
            <Route path='/myListen' component={TpkTeacherListen} />
            

            {/*mj start  */}
            <Route path='/lisTasks/TpkManaOverListenerInfo' component={TpkManaOverListenerInfo} />   {/* ????????????????????????????????????????????? */}
            <Route path='/lisTasks/TpkManaDetListenerInfo' component={TpkManaDetListenerInfo} />    {/* ????????????????????????????????????????????????????????? */}
            <Route path='/lisTasks/TpkManaLisInfo/:id:teacher/:teaId' component={TpkManaLisInfo} />    {/* ???????????????????????????????????? */}
            <Route path='/lisTasks/ListenNote/:id:teaId/:name' component={ListenNote}/>    {/* ??????????????? */}
            <Route path='/lisTasks' component={TpkManaLisTasks} />     {/* ????????????????????? ******/}

            <Route path='/lisSet' component={TpkManaLisSet} />     {/* ?????????????????? ******/}
            {/*mj end  */}

            {/* ?????????--?????????--?????????????????? */}
            <Route path='/reTasks/rePlanDe' component={TpkResearchPlanDetail} />
            <Route path='/reTasks/reLessonDe/:passData?' component={TpkResearchLessonDetail} />
            <Route path='/reTasks/rePerDe' component={TpkResearchersDetail} />
            <Route path='/reTasks/reBook/:teaId/:name' component={TpkResearchBook} />
            {/* ?????????--?????????--?????????????????? */}
            <Route path='/reTasks' component={TpkResearchTaskPage} />
            <Route path='/reSetup' component={TpkResearchSetup} />

            <Redirect to={Global.baseinfo.role == 3 ? "/tasks" : Global.baseinfo.role === 2 ? "/reSetup" : "/reTasks"} />
          </Switch>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Frame;