/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:01:34 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-13 13:02:17
 * 研课总体概况
 */
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { G } from './../../../../js/g';
import util from './../../../../js/_x/index.js';
const Request = util.util.request.request;
import ResearchMyTeachComPlan from './researchMyTeachComPlan';
import ResearchMyTeachComCour from './researchMyTeachComCour';
import ResearchMyTeach from './researchMyTeach';
import './../../../../css/teacher/mj_tasksMyInfo.css';

class ResearchMyTeachInfo extends Component {
  constructor() {
    super();
    this.state = {
      myTeachComPlan: {},
      myTeachComCour: {},
      myTeach: {}
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
    // Request('/teacherJob/myTechInfo', req, function (ret) {
      let ret = {
        result: true,
        data: {
          myTeach: { totalMyCour: 2, fnishMyCour: 0, noStartMyCour: 0 },
          myTeachComCour: { totalCour: 0, fnishCour: 0, goCour: 0, noStartCour: 0 },
          myTeachComPlan: { totalPlan: 0, fnishPlan: 0, goPlan: 0, noStartPlan: 0 }
        }
      }
      if (ret.result) {
        let resData = ret.data;
        this.setState({
          myTeachComPlan: resData.myTeachComPlan,
          myTeachComCour: resData.myTeachComCour,
          myTeach: resData.myTeach
        })
      }
    // }.bind(this));
  };

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={24}>
            <div className="pf-tk-title">
              <span>教研课评总体概况</span>
            </div>
            <Row gutter={8}>
              <Col span={8}>
                <ResearchMyTeachComPlan myTeachComPlan={this.state.myTeachComPlan}></ResearchMyTeachComPlan>
              </Col>
              <Col span={8}>
                <ResearchMyTeachComCour myTeachComCour={this.state.myTeachComCour}></ResearchMyTeachComCour>
              </Col>
              <Col span={8}>
                <ResearchMyTeach myTeach={this.state.myTeach}></ResearchMyTeach>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ResearchMyTeachInfo;