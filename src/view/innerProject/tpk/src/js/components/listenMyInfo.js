/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:00:07 
 * @Last Modified by: 蒲飞
 * @Last Modified time: 2017-12-27 16:19:48
 * 随堂听总体概况 
 */
import React, { Component } from 'react';
import ListenMyListenApply from './listenMyListenApply';
import ListenMyListenInfo from './listenMyListenInfo';
import ListenTaskFinish from './listenTaskFinish';
import ListenMyCourse from './listenMyCourse';
import _x from '../base/_x/api/api';
import { Global } from '../../js/base/g';
import {Row,Col} from 'antd';
import '../../css/components/tasksMyInfo.css'

class ListenMyInfo extends Component{
  constructor(){
    super();
    this.state={      
      myListenApply:{},
      myListenInfo:{},
      taskFinish:{},          
      myCourse:{},
      bestTeacher:[],
      haveTask:true,      
    };
    this.teacherId=Global.baseinfo.teacherid;
  };

  componentWillMount(){
    this.getData();
  };

  getData(){ 
    let req = {
      teacherId:this.teacherId
    };
    _x.util.request('/teacherJob/myListenInfo',req,function(ret){
      if(ret.result){
        let resData = ret.data;
        let bTeacher=[];
        let bestTeachers=resData.myListenInfo.bestTeacher;
        bestTeachers.map((item,index)=>{
          bTeacher.push(item.teacherName)
        })
        this.setState({        
          myListenApply:resData.myListenApply,
          myListenInfo:resData.myListenInfo,
          taskFinish:resData.taskFinish,
          myCourse:resData.myCourse,
          bestTeacher:bTeacher,
          haveTask:!resData.taskFinish.taskTotal==0?true:false
        })
      }
    }.bind(this));
  };
  
  render(){
    return (
      <div>
        <Row gutter={16}>
          <Col span={24}>
            <div className="pf-tk-title">
              <span>随堂听总体概况</span>              
            </div>
            {
              this.state.haveTask?
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
            </Row>:
            <Row gutter={8}>            
            <Col span={8}>
              <ListenMyListenApply myListenApply={this.state.myListenApply} haveTask={this.state.haveTask}></ListenMyListenApply>
            </Col>
            <Col span={8}>
              <ListenMyListenInfo myListenInfo={this.state.myListenInfo} bestTeacher={this.state.bestTeacher} haveTask={this.state.haveTask}></ListenMyListenInfo>
            </Col>
            <Col span={6}>
              <ListenMyCourse myCourse={this.state.myCourse} haveTask={this.state.haveTask}></ListenMyCourse>
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