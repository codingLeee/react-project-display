/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:02:12 
 * @Last Modified by: yrj
 * @Last Modified time: 2019-03-27 11:00:59
 * 我申请的随堂听 
 */
import React, { Component } from 'react';
import { Row, Col, Icon, Progress, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { SVG } from './../../../../base';
import util from './../../../../js/_x/index.js';
const Request = util.util.request.request;
import { G } from './../../../../js/g';
import './../../../../css/teacher/mj_tasksMyApplyListen.css';

class TasksMyApplyListen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authSwitch: 0,//统一申请开关：0：关闭 1：打开
      hiddenStyle: {
        display: 'none'
      }
    };
    this.handleHref = this.handleHref.bind(this);
  }

  static defaultProps = {
    myApplyListen: {
      tadayApplyCnt: 0,
      afterApplyCnt: 0,
      alreadyFinish: 0,
      frequency: 0,
      twice: 0
    },
    afterApplyCnt: 0,
    afterApplyCntPath: '',
    actureStartTime: 0
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

  handleHref(href, startTime, lessonStartTime) {
    var timestamp = Date.parse(new Date());
    if (startTime > timestamp) {
      message.info(`该课程尚未开始，请于${lessonStartTime}查看！`, 3);
    } else {
      window.open(href);
    }
    // if(href){
    //   window.open(href);
    // }else{
    //   info('提示框',`该课程尚未开始，请于${lessonStartTime}查看！`,3000);
    // }    
  }

  render() {
    let twice = '';
    if (this.props.myApplyListen.twice == 7) {
      twice = '每周';
    } else if (this.props.myApplyListen.twice == 30) {
      twice = '每月';
    } else if (this.props.myApplyListen.twice == -1) {
      twice = '每学期';
    } else {
      twice = '每周';
    }

    let href = `${G.rootpath}/home#resr1/${this.props.afterApplyCntPath}/2`;

    var timestamp = Date.parse(new Date());
    let startTime = this.props.actureStartTime;
    var date = new Date(startTime);
    var Y = date.getFullYear() + '年';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
    var D = date.getDate() + '日 ';
    var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
    var lessonStartTime = Y + M + D + h + m + s;

    let finishpercent = parseInt(this.props.myApplyListen.frequency);
    let finish = parseInt(this.props.myApplyListen.alreadyFinish);
    let finishNan = Math.round((finish / finishpercent) * 100);
    let progressPercent = finishNan ? finishNan > 100 ? 100 : finishNan : 0
    return (
      <div>
        <div className="pf-tk-card">
          <div className="pf-tk-content">
            <div className="pf-tk-left">
              <span>我听的</span>
            </div>
            <div className="pf-tk-list pf-tk-applist">
              <Row align="middle">
                <Col type="flex" span={8}>
                  <div className="pf-tk-gutter pf-tk-putterleft pf-tk-appgutter">今日随堂听</div>
                </Col>
                <Col span={9}>
                  <div className="pf-tk-gutter pf-tk-bigsize pf-tk-lissize">{this.props.myApplyListen.tadayApplyCnt || 0}</div>
                </Col>
                <Col span={7}>
                  <div className="pf-tk-gutter">
                    <Link to="/teacher/tpk/wdrw/tpkTeachTasksApplyListen">
                      <Button type="primary" className="pf-t-greenbutton">去申请</Button>
                    </Link>
                  </div>
                </Col>
              </Row>
              <Row align="middle">
                <Col span={8}>
                  <div className="pf-tk-gutter pf-tk-putterleft pf-tk-appgutter">待听的课</div>
                </Col>
                <Col span={9}>
                  <div className="pf-tk-gutter pf-tk-bigsize pf-tk-lissize">{this.props.afterApplyCnt || 0}</div>
                </Col>
                <Col span={7}>
                  <div className="pf-tk-gutter">
                    {
                      this.props.afterApplyCnt == 1 ?
                        <a onClick={this.handleHref.bind(this, href, startTime, lessonStartTime)}>
                          {/* <i className='iconfont pf-t-iconstyle'>&#58889;</i> */}
                          <SVG type='icon-chakanxq' />
                        </a> :
                        <Link to="/teacher/tpk/wdsst">
                          {/* <i className='iconfont pf-t-iconstyle'>&#58927;</i> */}
                          <SVG type='icon-chakanxq' />
                        </Link>
                    }
                  </div>
                </Col>
              </Row>
              <Row align="middle">
                <Col span={17}>
                  <div className="pf-tk-gutter pf-tk-putterleft pf-tk-appgutter pf-tk-nopadding">随堂听任务进度：{this.props.myApplyListen.alreadyFinish || 0}/{this.props.myApplyListen.frequency || 0}</div>
                </Col>
                <Col span={7}>
                  <div className="pf-tk-gutter pf-tk-appgutter pf-tk-nopadding">{twice}<span>{this.props.myApplyListen.frequency || 0}</span>次</div>
                </Col>
              </Row>

              <Row align="middle">
                <Col span={24}>
                  <div>
                    <Progress percent={progressPercent} showInfo={false} status="success" strokeWidth={20} type='line'></Progress>
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

export default TasksMyApplyListen;
