/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:02:21 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-13 14:36:20
 * 我的教研课
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Icon } from 'antd';
import { SVG } from './../../../../base';
import './../../../../css/teacher/mj_tasksMyTeach.css';

class TasksMyTeach extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  static defaultProps = {
    myTeach: {
      tadayCnt: 0,
      finishCnt: 0,
      noStartCnt: 0
    }
  }

  render() {
    return (
      <div>
        <div className="pf-tk-card">
          <div className="pf-tk-content">
            <div className="pf-tk-left">
              <span>听我的</span>
            </div>
            <div className="pf-tk-list">
              <Row align="middle">
                <Col span={12}>
                  <div className="pf-tk-gutter pf-tk-putterleft">今日教研课</div>
                </Col>
                <Col span={6}>
                  <div className="pf-tk-gutter pf-tk-bigsize">{this.props.myTeach.tadayCnt || 0}</div>
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
              <Row align="middle">
                <Col span={12}>
                  <div className="pf-tk-gutter pf-tk-putterleft">已完成的教研课</div>
                </Col>
                <Col span={6}>
                  <div className="pf-tk-gutter pf-tk-bigsize">{this.props.myTeach.finishCnt || 0}</div>
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
              <Row align="middle">
                <Col span={12}>
                  <div className="pf-tk-gutter pf-tk-putterleft">未开始的教研课</div>
                </Col>
                <Col span={6}>
                  <div className="pf-tk-gutter pf-tk-bigsize">{this.props.myTeach.noStartCnt || 0}</div>
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

export default TasksMyTeach;