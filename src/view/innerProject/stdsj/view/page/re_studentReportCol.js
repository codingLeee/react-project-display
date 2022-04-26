/*
 * @Author: lxx 
 * @Date: 2018-08-28 13:54:07 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-12 10:10:25
 * 学生出勤报表-学院报表
 */
import React from 'react';
import TopMenu from './../components/base/topMenu';
import ReportMenu from './../components/base/reportMenu';
import { Container } from './../common';
import StuRepCol from './../components/report/lxx_StuRepCol';
import PerfectScrollbar from 'react-perfect-scrollbar';


class StuReportCol extends React.Component {
  render() {
    // return (
    //   <Container>
    //     <TopMenu />
    //     <ReportMenu />
    //     <PerfectScrollbar>
    //       <div className='zq-report-container'>
    //         <StuRepCol />
    //       </div>
    //     </PerfectScrollbar>
    //   </Container>

    // );
    return (
      <div className='zq-report-container'>
        <StuRepCol />
      </div>
    );
  }
}

export default StuReportCol;