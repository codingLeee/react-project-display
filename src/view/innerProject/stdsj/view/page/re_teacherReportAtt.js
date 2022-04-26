/*
 * @Author: lxx 
 * @Date: 2018-08-28 13:54:07 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-12 10:39:03
 * 教师考勤报表-考勤异常类型报表
 */
import React from 'react';
import TopMenu from './../components/base/topMenu';
import ReportMenu from './../components/base/reportMenu';
import { Container } from './../common';
import Unusual from '../components/report/unusual';
import PerfectScrollbar from 'react-perfect-scrollbar';

class TeaReportAtt extends React.Component {
  render() {
    // return (
    //   <Container>
    //     <TopMenu />
    //     <ReportMenu />
    //     <PerfectScrollbar>
    //       <div className='zq-report-container'>
    //         <Unusual />
    //       </div>
    //     </PerfectScrollbar>
    //   </Container>
    // );
    return (
      <div className='zq-report-container'>
        <Unusual />
      </div>
    );
  }
}

export default TeaReportAtt;