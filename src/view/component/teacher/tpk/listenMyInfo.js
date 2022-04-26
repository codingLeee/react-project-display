/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:00:07 
 * @Last Modified by: yrj
 * @Last Modified time: 2019-03-26 13:49:12
 * 随堂听总体概况 
 */
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { G } from './../../../../js/g';
import ListenMyListenApply from './listenMyListenApply';
import ListenMyListenInfo from './listenMyListenInfo';
import ListenTaskFinish from './listenTaskFinish';
import ListenMyCourse from './listenMyCourse';
import util from './../../../../js/_x/index.js';
import './../../../../css/teacher/mj_tasksMyInfo.css';

const Request = util.util.request.request;

class ListenMyInfo extends Component {
  constructor() {
    super();
    this.state = {
      myListenApply: {},
      myListenInfo: {},
      taskFinish: {},
      myCourse: {},
      bestTeacher: [],
      haveTask: true,
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
     Request('api/web/teacherJob/my_listen_info',req,function(ret){
    // let ret = {
    //   result: true,
    //   data: {
    //     myCourse: { totalOrder: 2, orderNoFnish: 2, orderListen: 0 },
    //     myListenApply: { myListenApply: 8, agreeListen: 2, disagreeListen: 2 },
    //     myListenInfo: { totalListen: 0, bestTeacher: [] },
    //     taskFinish: { twice: 7, taskTotal: 1, fnishTwice: 0 }
    //   }
    // }
    if (ret.result) {
      let resData = ret.data;
      let bTeacher = [];
      let bestTeachers = resData.myListenInfo.bestTeacher;
      bestTeachers.map((item, index) => {
        bTeacher.push(item.teacherName)
      })
      this.setState({
        myListenApply: resData.myListenApply,
        myListenInfo: resData.myListenInfo,
        taskFinish: resData.taskFinish,
        myCourse: resData.myCourse,
        bestTeacher: bTeacher,
        haveTask: !resData.taskFinish.taskTotal == 0 ? true : false
      })
    }
    }.bind(this));
  };

  render() {
    console.log(this.props,'首页')
    return (
      <div>
        <Row gutter={16}>
          <Col span={24}>
            <div className="pf-tk-title">
              <span>随堂听总体概况</span>
            </div>
            {
              this.state.haveTask ?
                <Row gutter={8}>
                  <Col span={6}>
                    <ListenMyListenApply myListenApply={this.state.myListenApply} haveTask={this.state.haveTask}></ListenMyListenApply>
                  </Col>
                  <Col span={6}>
                    <ListenMyListenInfo myListenInfo={this.state.myListenInfo} bestTeacher={this.state.bestTeacher} haveTask={this.state.haveTask}></ListenMyListenInfo>
                  </Col>
                  <Col span={6}>
                    <ListenTaskFinish taskFinish={this.state.taskFinish} haveTask={this.state.haveTask}></ListenTaskFinish>
                  </Col>
                  <Col span={6}>
                    <ListenMyCourse myCourse={this.state.myCourse} haveTask={this.state.haveTask}></ListenMyCourse>
                  </Col>
                </Row> :
                <Row gutter={8}>
                  <Col span={8}>
                   {/*申请情况 */} <ListenMyListenApply myListenApply={this.state.myListenApply} haveTask={this.state.haveTask}></ListenMyListenApply>
                  </Col>
                  <Col span={8}>
                  {/*听课情况 */}<ListenMyListenInfo myListenInfo={this.state.myListenInfo} bestTeacher={this.state.bestTeacher} haveTask={this.state.haveTask}></ListenMyListenInfo>
                  </Col>
                  <Col span={6}>
                   {/*我的课 */} <ListenMyCourse myCourse={this.state.myCourse} haveTask={this.state.haveTask}></ListenMyCourse>
                  </Col>
                </Row>
            }
          </Col>
        </Row>
      </div>
    );
  }
}

export default ListenMyInfo;