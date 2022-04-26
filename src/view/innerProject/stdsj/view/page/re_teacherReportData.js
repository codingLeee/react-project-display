/*
 * @Author: lxx 
 * @Date: 2018-08-28 13:54:07 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-12 10:50:15
 * 教师考勤报表-原始数据
 */
import React from 'react';
import TopMenu from './../components/base/topMenu';
import ReportMenu from './../components/base/reportMenu';
import { Container } from './../common';
import Oringinal from '../components/report/oringinal.jsx';
import PerfectScrollbar from 'react-perfect-scrollbar';


// 原始数据
class TeaReportData extends React.Component {
  render() {
    // return (
    //   <Container>
    //     <TopMenu />
    //     <ReportMenu />
    //     <PerfectScrollbar>
    //       <div className='zq-report-container'>
    //         <Oringinal />
    //       </div>
    //     </PerfectScrollbar>
    //   </Container>
    // );
    return (
      <div className='zq-report-container'>
        <Oringinal />
      </div>
    );
  }
}

export default TeaReportData;