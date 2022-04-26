/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:02:15 
 * @Last Modified by: yrj
 * @Last Modified time: 2019-03-27 10:48:39
 * 我的任务总体概况 
 */
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import util from './../../../../js/_x/index';
const Request = util.util.request.request;
import { G } from './../../../../js/g';
import TasksMyTeachCom from './tasksMyTeachCom';
import TasksMyTeach from './tasksMyTeach';
import TasksMyApplyListen from './tasksMyApplyListen';
import TasksMyVerifyListen from './tasksMyVerifyListen';
import './../../../../css/teacher/mj_tasksMyInfo.css';

class TasksMyInfo extends Component {
  constructor() {
    super();
    this.state = {
      myTeachCom: {},
      myTeach: {},
      myApplyListen: {},
      myListen: {},
      bestLove: [],
      noComFinishCnt: 0,
      tadayComCnt: 0,
      afterApplyCnt: 0,
      noComFinishCntPath: '',
      tadayComCntPath: '',
      afterApplyCntPath: '',
      actureStartTimeApply: 0,
      actureStartTimeNoFinish: 0,
      actureStartTimeToday: 0,
    };
    this.teacherId = G.baseinfo.teacherid;
  };

  componentWillMount() {
    this.getData();
  };

  getData() {
    let req = {
      teacherId: this.teacherId
    };
     Request('api/web/teacher_listen_job/myInfo',req,function(ret){
    // let ret = {
    //   result: true,
    //   data: {
    //     myApplyListen: {
    //       alreadyFinish: 0,
    //       frequency: 1,
    //       tadayApplyCnt: 1,
    //       twice: 7,
    //       afterApplyCnt: [
    //         { actureEndTime: 1552440900000, actureStartTime: 1552438200000, curriculumallId: "a655c9a885f24ffe12a01200dea24f8d", },
    //         { actureEndTime: 1552524000000, actureStartTime: 1552521600000, curriculumallId: "576461aed361b3fee1aa9c2626fa6d03" },]
    //     },
    //     myListen: { totalApplyCnt: 2, totalBeiListenCnt: 0, bestLove: [{ teacherId: "2018051", teacherName: "金毛", cnt: 2 }], },
    //     myTeach: { tadayCnt: 0, finishCnt: 0, noStartCnt: 0 },
    //     myTeachCom: { tadayComCnt: [], noComFinishCnt: [], noComStartCnt: 0 }
    //   }
    // }
    if (ret.result) {
      let resData = ret.data;
      let blove = [];
      let finish = [];
      let today = [];
      let apply = [];
      resData.myTeachCom.noComFinishCnt.map((data) => {
        finish.push(data)
      })
      let finishNum = 0;
      let finishPath = '';
      let startTimeFinish = 0;
      if (finish.length == 0) {
        finishNum = 0;
        startTimeFinish = 0;
      } else {
        finishNum = finish.length;
        if (finish.length == 1) {
          finishPath = finish[0].curriculumallId;
          startTimeFinish = finish[0].actureStartTime;
        }
      }


      resData.myTeachCom.tadayComCnt.map((data) => {
        today.push(data)
      })
      let todayNum = 0;
      let todayPath = '';
      let startTimeToday = 0;
      if (today.length == 0) {
        todayNum = 0;
        startTimeToday = 0;
      } else {
        todayNum = today.length;
        if (today.length == 1) {
          todayPath = today[0].curriculumallId;
          startTimeToday = today[0].actureStartTime;
        }
      }

      resData.myApplyListen.afterApplyCnt.map((data) => {
        apply.push(data)
      })
      let applyNum = 0;
      let applyPath = '';
      let startTimeApply = 0;
      if (apply.length == 0) {
        applyNum = 0;
        startTimeApply = 0;
      } else {
        applyNum = apply.length;
        if (apply.length == 1) {
          applyPath = apply[0].curriculumallId;
          startTimeApply = apply[0].actureStartTime;
        }
      }


      let bestLoves = resData.myListen.bestLove;
      bestLoves.map((item, index) => {
        blove.push(item.teacherName)
      })
      this.setState({
        noComFinishCntPath: finishPath,
        tadayComCntPath: todayPath,
        afterApplyCntPath: applyPath,
        noComFinishCnt: finishNum,
        tadayComCnt: todayNum,
        afterApplyCnt: applyNum,
        myTeachCom: resData.myTeachCom,
        myTeach: resData.myTeach,
        myApplyListen: resData.myApplyListen,
        myListen: resData.myListen,
        bestLove: blove,
        actureStartTimeApply: startTimeApply,
        actureStartTimeNoFinish: startTimeFinish,
        actureStartTimeToday: startTimeToday,
      })
    }
     }.bind(this));
  };

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <div className="pf-tk-title">
              <span>我的教研课</span>
            </div>
            <Row gutter={8}>
              <Col span={12}>
                <TasksMyTeachCom
                  myTeachCom={this.state.myTeachCom}
                  noComFinishCnt={this.state.noComFinishCnt}
                  noComFinishCntPath={this.state.noComFinishCntPath}
                  tadayComCnt={this.state.tadayComCnt}
                  tadayComCntPath={this.state.tadayComCntPath}
                  actureStartTimeNoFinish={this.state.actureStartTimeNoFinish}
                  actureStartTimeToday={this.state.actureStartTimeToday}>
                </TasksMyTeachCom>
              </Col>
              <Col span={12}>
                <TasksMyTeach myTeach={this.state.myTeach}></TasksMyTeach>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <div className="pf-tk-title">
              <span>我的随堂听</span>
            </div>
            <Row gutter={8}>
              <Col span={12}>
                <TasksMyApplyListen
                  myApplyListen={this.state.myApplyListen}
                  afterApplyCnt={this.state.afterApplyCnt}
                  afterApplyCntPath={this.state.afterApplyCntPath}
                  actureStartTime={this.state.actureStartTimeApply}>
                </TasksMyApplyListen>
              </Col>
              <Col span={12}>
                <TasksMyVerifyListen
                  myListen={this.state.myListen}
                  bestLove={this.state.bestLove}>
                </TasksMyVerifyListen>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TasksMyInfo;
