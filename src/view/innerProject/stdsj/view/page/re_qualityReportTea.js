/*
 * @Author: lxx 
 * @Date: 2018-08-28 13:57:34 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-12 10:05:15
 * 课堂质量报表-教师报表
 */
import React from 'react';
import TopMenu from './../components/base/topMenu';
import ReportMenu from './../components/base/reportMenu';
import { Container } from './../common';
import WjsjTable from '../components/report/wjsj_table';
import PerfectScrollbar from 'react-perfect-scrollbar';

class QuaReportTea extends React.Component {
  render() {
    // return (
    //   <Container>
    //     <TopMenu />
    //     <ReportMenu />
    //     <PerfectScrollbar>
    //       <div className='zq-report-container'>
    //         <WjsjTable comp="课堂质量教师报表"></WjsjTable>
    //       </div>
    //     </PerfectScrollbar>
    //   </Container>
    // );
    return (
      <div className='zq-report-container'>
        <WjsjTable comp="课堂质量教师报表"></WjsjTable>
      </div>
    );
  }
}

export default QuaReportTea;