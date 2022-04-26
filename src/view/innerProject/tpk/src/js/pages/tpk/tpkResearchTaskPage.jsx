/*
 * @Author: JudyC 
 * @Date: 2017-09-11 17:31:34 
 * @Last Modified by: JudyC
 * @Last Modified time: 2017-09-20 18:58:48
 * 教研任务页，引入教研计划任务情况、教研课任务情况、教研员任务情况三个板块
 */
import React, { Component } from 'react';
import ResearchPlan from '../../components/researchPlan';
import ResearchLesson from '../../components/researchLesson';
import Researchers from '../../components/researchers';
import createBrowserHistory from 'history/createBrowserHistory';

class TpkResearchTask extends Component{
  render(){
    return (
      <div>
        <ResearchPlan className="cjy-rp-researchPlan"/>
        <ResearchLesson className="cjy-rp-researchLesson"/>
        <Researchers className="cjy-rp-researchers"/>
      </div>
    );
  }
}

export default TpkResearchTask;