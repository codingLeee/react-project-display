/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:00:13 
 * @Last Modified by: 蒲飞
 * @Last Modified time: 2017-12-27 11:32:06
 * 听课情况
 */
import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import '../../css/components/listenMyListenInfo.css'

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
    var mainStyle={
      width:this.props.haveTask?'':'375px'
    };
    return (
      <div className="pf-l-card" style={mainStyle}>
        <p className="pf-l-cardtitle">听课情况</p>
        <p className="pf-l-listotaltitle">累计听课</p>
        <p className="pf-l-listotal">{this.props.myListenInfo.totalListen}</p>
        <Link to="/myListen/tpkTeachListenComment/0/0"><Button type="primary" size="large" className="pf-t-greenbutton">我的听课本</Button></Link>
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
