/*
 * @Author: JudyC 
 * @Date: 2017-09-12 10:53:47 
 * @Last Modified by: JudyC
 * @Last Modified time: 2017-10-12 16:27:51
 */
import React, { Component } from 'react';
import BreadCrumb from '../../components/base/breadCrumb.js';
import ListenTaskStep from '../../components/base/listenTaskStep';
import '../../../css/pages/tpkAddResearchPlan.css';

const steps=[{
  title:'计划名称',
  content:'取一个教研计划名称'
},{
  title:'选择听课',
  content:'安排教研课听课成员'
},{
  title:'选择课程',
  content:'安排成员听谁的课'
},{
  title:'选择评分老师',
  content:'安排评分老师'
}];

class TpkAddResearchPlan extends Component{
  componentWillMount(){
    const planId = this.props.match.params.planId;
    if(planId===undefined){
      this.data = ['听评课','教研计划管理','新增教研计划'];
    }else{
      this.data = ['听评课','教研计划管理','编辑教研计划'];
    }
  }
  render(){
    return (
      <div>
        <BreadCrumb data={this.data}/>
        <div className="cjy-arp-prgrsBox">
        <ListenTaskStep steps={steps} person={'cjy'}/>
        </div>
      </div>
    );
  }
}

export default TpkAddResearchPlan;