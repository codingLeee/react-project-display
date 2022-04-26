/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:00:27 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-13 13:59:05
 * 任务完成情况
 */
import React, { Component } from 'react';
import {Row,Col,Button} from 'antd';
import './../../../../css/teacher/mj_listenTaskFinish.css';

class ListenTaskFinish extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  static defaultProps = {
    taskFinish:{
    taskTotal:0,
    fnishTwice:0,
    twice:0
    }
  }
  render(){
    let twice='';
    if(this.props.taskFinish.twice==7){
      twice='每周';
    }else if(this.props.taskFinish.twice==30){
      twice='每月';
    }else if(this.props.taskFinish.twice==-1){
      twice='每学期';
    }else{
      twice='每周';
    }
    return (
      <div className="pf-l-card">
        <p className="pf-l-cardtitle">任务完成情况</p>
        <div className="pf-l-lisfinish">
          <Row>
            <Col span={8} offset={4}>
              <div className="pf-l-gutter pf-l-pullleft">任务数：</div>
            </Col>
            <Col span={9}>
              <div className="pf-l-gutter pf-l-pullright pf-l-smallpadding">{twice}<span className="pf-l-finishbigsize">{this.props.taskFinish.taskTotal}</span>次</div>
            </Col>            
          </Row>
        </div>
        <div className="pf-l-lisfinishtotal">
          <Row>
            <Col span={8} offset={4}>
              <div className="pf-l-gutter pf-l-pullleft">完成次数：</div>
            </Col>
            <Col span={9}>
              <div className="pf-l-gutter pf-l-pullright pf-l-smallpadding"><span className="pf-l-finishbigsize">{this.props.taskFinish.fnishTwice}</span>次</div>
            </Col>            
          </Row>
        </div>
      </div>
    );
  }
}

export default ListenTaskFinish;