/*
 * @Author: lxx 
 * @Date: 2018-08-28 10:06:22 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-12 11:04:15
 * 报告中心-系统报告
 */
import React from 'react';
import TopMenu from './../components/base/topMenu';
import ReportMenu from './../components/base/reportMenu';
import {Container} from './../common';
import ReportSystem from './../components/report/znReportSystem'
import PerfectScrollbar from 'react-perfect-scrollbar';

class RepSystem extends React.Component {
  render() {
    // return (
    //   <Container>
    //   <TopMenu />
    //   <ReportMenu />
    //   <PerfectScrollbar>
    //     <div className='zq-report-container'>
    //           <ReportSystem/>
    //     </div>
    //   </PerfectScrollbar>
    // </Container>
    // );
    return (
      <div className='zq-report-container'>
            <ReportSystem/>
      </div>
    );
  }
}

export default RepSystem;
