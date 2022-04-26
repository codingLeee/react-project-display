/*
 * @Author: lxx 
 * @Date: 2018-08-28 13:54:07 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-12 10:33:38
 * 教师考勤报表-学院报表
 */
import React from 'react';
import TopMenu from './../components/base/topMenu';
import ReportMenu from './../components/base/reportMenu';
import {Container} from './../common';
import College from '../components/report/college';
import PerfectScrollbar from 'react-perfect-scrollbar';

class TeaReportCol extends React.Component {
  render() {
    // return (
    //   <Container>
    //     <TopMenu />
    //     <ReportMenu />
    //     <PerfectScrollbar>
    //       <div className='zq-report-container'>
    //         <College/>
    //       </div>
    //     </PerfectScrollbar>
    //   </Container>
    // );
    return (
      <div className='zq-report-container'>
        <College/>
      </div>
    );
  }
}

export default TeaReportCol;