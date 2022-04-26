/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:02:23 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-13 14:33:59
 * 我的教研评课
 */
import React, { Component } from 'react';
import { Row, Col, Icon, message } from 'antd';
import { Link } from 'react-router-dom';
import { SVG } from './../../../../base';
import { G } from './../../../../js/g';
import './../../../../css/teacher/mj_tasksMyTeachCom.css';

class TasksMyTeachCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleTodayHref = this.handleTodayHref.bind(this);
    this.handleFinishHref = this.handleFinishHref.bind(this);
  }
  static defaultProps = {
    myTeachCom: {
      todayComCnt: 0,
      noComFinishCnt: 0,
      noComStartCnt: 0
    },
    tadayComCnt: 0,
    noComFinishCnt: 0,
    noComFinishCntPath: '',
    tadayComCntPath: '',
    actureStartTimeToday: 0,
    actureStartTimeNoFinish: 0
  }

  handleTodayHref(hrefToday, startTimeToday, lessonStartTimeToday) {
    var timestamp = Date.parse(new Date());
    if (startTimeToday > timestamp) {
      message.info(`该课程尚未开始，请于${lessonStartTimeToday}查看！`, 3);
    } else {
      window.open(hrefToday);
    }
  }

  handleFinishHref(hrefFinish, startTimeFinish, lessonStartTimeFinish) {
    var timestamp = Date.parse(new Date());
    if (startTimeFinish > timestamp) {
      message.info(`该课程尚未开始，请于${lessonStartTimeFinish}查看！`, 3);
    } else {
      window.open(hrefFinish);
    }
  }

  render() {
    var hrefToday = `${G.rootpath}/home#resr1/${this.props.tadayComCntPath}/1`;
    var hrefFinish = `${G.rootpath}/home#resr1/${this.props.noComFinishCntPath}/1`;

    var startTimeToday = this.props.actureStartTimeToday;
    var startTimeFinish = this.props.actureStartTimeNoFinish;

    var dateToday = new Date(startTimeToday);
    var Y = dateToday.getFullYear() + '年';
    var M = (dateToday.getMonth() + 1 < 10 ? '0' + (dateToday.getMonth() + 1) : dateToday.getMonth() + 1) + '月';
    var D = dateToday.getDate() + '日 ';
    var h = (dateToday.getHours() < 10 ? '0' + (dateToday.getHours()) : dateToday.getHours()) + ':';
    var m = (dateToday.getMinutes() < 10 ? '0' + (dateToday.getMinutes()) : dateToday.getMinutes()) + ':';
    var s = (dateToday.getSeconds() < 10 ? '0' + (dateToday.getSeconds()) : dateToday.getSeconds());
    var lessonStartTimeToday = Y + M + D + h + m + s;

    var dateFinish = new Date(startTimeFinish);
    var YY = dateFinish.getFullYear() + '年';
    var MM = (dateFinish.getMonth() + 1 < 10 ? '0' + (dateFinish.getMonth() + 1) : dateFinish.getMonth() + 1) + '月';
    var DD = dateFinish.getDate() + '日 ';
    var hh = (dateFinish.getHours() < 10 ? '0' + (dateFinish.getHours()) : dateFinish.getHours()) + ':';
    var mm = (dateFinish.getMinutes() < 10 ? '0' + (dateFinish.getMinutes()) : dateFinish.getMinutes()) + ':';
    var ss = (dateFinish.getSeconds() < 10 ? '0' + (dateFinish.getSeconds()) : dateFinish.getSeconds());
    var lessonStartTimeFinish = YY + MM + DD + hh + mm + ss;


    return (
      <div>
        <div className="pf-tk-card">
          <div className="pf-tk-content">
            <div className="pf-tk-left">
              <span>我听的</span>
            </div>
            <div className="pf-tk-list">
              <Row align="middle">
                <Col span={12}>
                  <div className="pf-tk-gutter pf-tk-putterleft">今日待评教研课</div>
                </Col>
                <Col span={6}>
                  <div className="pf-tk-gutter pf-tk-bigsize">{this.props.tadayComCnt || 0}</div>
                </Col>
                <Col span={6}>
                  <div className="pf-tk-gutter pf-tk-icon">
                    {
                      this.props.tadayComCnt == 1 ?
                        <a onClick={this.handleTodayHref.bind(this, hrefToday, startTimeToday, lessonStartTimeToday)}>
                          {/* <i className='iconfont pf-t-iconstyle'>&#58889;</i> */}
                          <SVG type='icon-chakanxq' />
                        </a> :
                        <Link to="/teacher/tpk/wdjyk">
                          {/* <i className='iconfont pf-t-iconstyle'>&#58927;</i> */}
                          <SVG type='icon-chakanxq' />
                        </Link>
                    }
                  </div>
                </Col>
              </Row>
              <Row align="middle">
                <Col span={12}>
                  <div className="pf-tk-gutter pf-tk-putterleft">未完成的评课</div>
                </Col>
                <Col span={6}>
                  <div className="pf-tk-gutter pf-tk-bigsize">{this.props.noComFinishCnt || 0}</div>
                </Col>
                <Col span={6}>
                  <div className="pf-tk-gutter pf-tk-icon">
                    {
                      this.props.noComFinishCnt == 1 ?
                        <a onClick={this.handleFinishHref.bind(this, hrefFinish, startTimeFinish, lessonStartTimeFinish)}>
                          {/* <i className='iconfont pf-t-iconstyle'>&#58889;</i>*/}
                          <SVG type='icon-chakanxq' />
                        </a> :
                        <Link to="/teacher/tpk/wdjyk">
                          {/* <i className='iconfont pf-t-iconstyle'>&#58927;</i> */}
                          <SVG type='icon-chakanxq' />
                        </Link>
                    }
                  </div>
                </Col>
              </Row>
              <Row align="middle">
                <Col span={12}>
                  <div className="pf-tk-gutter pf-tk-putterleft">未开始的教研课</div>
                </Col>
                <Col span={6}>
                  <div className="pf-tk-gutter pf-tk-bigsize">{this.props.myTeachCom.noComStartCnt || 0}</div>
                </Col>
                <Col span={6}>
                  <div className="pf-tk-gutter pf-tk-icon">
                    <Link to="/teacher/tpk/wdjyk">
                      {/* <i className='iconfont pf-t-iconstyle'>&#58927;</i> */}
                      <SVG type='icon-chakanxq' />
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

export default TasksMyTeachCom;