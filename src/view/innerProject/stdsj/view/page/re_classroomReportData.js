/*
 * @Author: lxx 
 * @Date: 2018-08-28 13:57:34 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-11 11:04:49
 * 课堂秩序报表-原始数据
 */
import React from 'react';
import TopMenu from './../components/base/topMenu';
import ReportMenu from './../components/base/reportMenu';
import { Container } from './../common';
import InitDataTable from '../components/report/initData_table';
import PerfectScrollbar from 'react-perfect-scrollbar';

class ClsReportData extends React.Component {
  render() {
    // return (
    //   <Container>
    //     <TopMenu />
    //     <ReportMenu />
    //     <PerfectScrollbar>
    //       <div className='zq-report-container'>
    //         <InitDataTable comp="课堂秩序原始数据"></InitDataTable>
    //       </div>
    //     </PerfectScrollbar>
    //   </Container>
    // );
    return (
      <div className='zq-report-container'>
        <InitDataTable comp="课堂秩序原始数据"></InitDataTable>
      </div>
    );
  }
}

export default ClsReportData;