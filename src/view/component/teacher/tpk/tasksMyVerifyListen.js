/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:02:27 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-13 16:40:39
 * 申请我的随堂听
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Icon, Button } from 'antd';
import util from './../../../../js/_x/index.js';
const Request = util.util.request.request;
import './../../../../css/teacher/mj_tasksMyVerifyListen.css';

class TasksMyVerifyListen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authSwitch: 0,//统一申请开关：0：关闭 1：打开
      hiddenStyle: {
        display: 'none'
      }
    };
  }

  static defaultProps = {
    myListen: {
      totalApplyCnt: 0,
      totalBeiListenCnt: 0,
      tadayApplyMyCnt: 0
    },
    bestLove: []
  }
  componentWillMount() {
    this.getData();
  };

  getData() {
    let req = {
      authSwitch: ''
    };
    // Request('/listenJob/listenAuthSetting',req,function(ret){
    let ret = {
      data: { authSwitch: 0 },
      message: null,
      result: true
    }
    if (ret.result) {
      let resData = ret.data;
      this.setState({
        authSwitch: resData.authSwitch,
        hiddenStyle: resData.authSwitch == 1 ? this.state.hiddenStyle : {
          display: 'block'
        }
      })
    }
    // }.bind(this));
  };

  render() {
    let bestloves = this.props.bestLove;
    let blove = '';
    blove = bestloves.join("、");
    return (
      <div>
        <div className="pf-tk-card">
          <div className="pf-tk-content">
            <div className="pf-tk-left">
              <span>听我的</span>
            </div>
            <div className="pf-tk-list pf-tk-lislist">
              <Row align="middle">
                <Col span={10} offset={2}>
                  <div className="pf-tk-verfont">累计申请</div>
                </Col>
                <Col span={10}>
                  <div className="pf-tk-verfont">累计被听</div>
                </Col>
              </Row>
              <Row align="middle">
                <Col span={10} offset={2}>
                  <div className="pf-tk-gutter pf-tk-bigsize">{this.props.myListen.totalApplyCnt || 0}</div>
                </Col>
                <Col span={10}>
                  <div className="pf-tk-gutter pf-tk-bigsize">{this.props.myListen.totalBeiListenCnt || 0}</div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className="pf-tk-gutter pf-tk-verfont pf-tk-textleft pf-tk-padding">最爱听我：{blove}</div>
                </Col>
              </Row>
              <Row align="middle">
                <Col span={10}>
                  <div className="pf-tk-gutter">待处理的申请</div>
                </Col>
                <Col span={6}>
                  <div className="pf-tk-gutter pf-tk-bigsize">{this.props.myListen.tadayApplyMyCnt || 0}</div>
                </Col>
                <Col span={2}>
                  <div className="pf-tk-gutter">个</div>
                </Col>
                <Col span={6}>
                  <div className="pf-tk-gutter pf-lis-button">
                    <Link to="/teacher/tpk/wdrw/tpkTeachTasksVerifyListen">
                      <Button type="primary" className="pf-t-greenbutton">去处理</Button>
                    </Link>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TasksMyVerifyListen;