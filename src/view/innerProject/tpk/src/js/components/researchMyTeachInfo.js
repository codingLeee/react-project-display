/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:01:34 
 * @Last Modified by: MinJ
 * @Last Modified time: 2018-03-27 12:52:49
 * 研课总体概况
 */
import React, { Component } from 'react';
import ResearchMyTeachComPlan from './researchMyTeachComPlan';
import ResearchMyTeachComCour from './researchMyTeachComCour';
import ResearchMyTeach from './researchMyTeach';
import _x from '../base/_x/api/api';
import { Global } from '../../js/base/g';
import {Row,Col} from 'antd';
import '../../css/components/tasksMyInfo.css'

class ResearchMyTeachInfo extends Component{
  constructor(){
    super();
    this.state={      
      myTeachComPlan:{},
      myTeachComCour:{},
      myTeach:{}          
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
    _x.util.request('/teacherJob/myTechInfo',req,function(ret){
      if(ret.result){
        let resData = ret.data;
        this.setState({        
          myTeachComPlan:resData.myTeachComPlan,
          myTeachComCour:resData.myTeachComCour,
          myTeach:resData.myTeach
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