/*
 * @Author: JudyC 
 * @Date: 2017-09-11 17:31:34 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-11 15:16:33
 * 教研任务页，引入教研计划任务情况、教研课任务情况、教研员任务情况三个板块
 */
import React, { Component } from 'react';
import ResearchPlan from './../../../../component/admin/tpk/researchPlan';
import ResearchLesson from './../../../../component/admin/tpk/researchLesson';
import Researchers from './../../../../component/admin/tpk/researchers';
// import createBrowserHistory from 'history/createBrowserHistory';

export class TpkTeaTask extends Component {
  render() {
    return (
      <div>
        <ResearchPlan className="cjy-rp-researchPlan" />
        <ResearchLesson className="cjy-rp-researchLesson" />
        <Researchers className="cjy-rp-researchers" />
      </div>
    );
  }
}