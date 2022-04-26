/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:00:13 
 * @Last Modified by: yrj
 * @Last Modified time: 2019-03-27 08:42:27
 * 听课情况
 */
import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import './../../../../css/teacher/mj_listenMyListenInfo.css';

class ListenMyListenInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static defaultProps = {
    myListenInfo: {
      totalListen: 0
    },
    bestTeacher: []
  }

  render() {
    const bestTeach = this.props.bestTeacher;
    var mainStyle = {
      width: this.props.haveTask ? '' : '375px'
    };
    return (
      <div className="pf-l-card" style={mainStyle}>
        <p className="pf-l-cardtitle">听课情况</p>
        <div style={{ textAlign: 'center' }}>
          <p className="pf-l-listotaltitle">累计听课</p>
          <p className="pf-l-listotal">{this.props.myListenInfo.totalListen}</p>
          <Link to="/teacher/tpk/wdsst/tpkTeachListenComment/0/0">
            <Button type="primary" size="large" className="pf-t-greenbutton">我的听课本</Button>
          </Link>
        </div>
        <div className="pf-l-likelisten">
          <Row>
            <Col span={7}>
              <div className="pf-l-gutter">我最爱听:</div>
            </Col>
            <Col span={17}>
              <Row>
                <Col span={8}>
                  <div className="pf-l-gutter">{bestTeach[0]}</div>
                </Col>
                <Col span={8}>
                  <div className="pf-l-gutter">{bestTeach[1]}</div>
                </Col>
                <Col span={8}>
                  <div className="pf-l-gutter">{bestTeach[2]}</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ListenMyListenInfo;
