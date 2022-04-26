/*
 * @Author: lxx 
 * @Date: 2018-08-28 13:54:07 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-13 09:29:10
 * 课堂秩序报表-违纪事件报表
 */
import React from 'react';
// import TopMenu from './../components/base/topMenu';
// import ReportMenu from './../components/base/reportMenu';
// import { Container } from './../common';
import WjsjTable from '../components/report/wjsj_table';
// import PerfectScrollbar from 'react-perfect-scrollbar';

class ClsReportRule extends React.Component {
  render() {
    // return (
    //   <Container>
    //     <TopMenu />
    //     <ReportMenu />
    //     <PerfectScrollbar>
    //       <div className='zq-report-container'>
    //         <WjsjTable comp="课堂秩序违纪事件报表"></WjsjTable>
    //       </div>
    //     </PerfectScrollbar>
    //   </Container>
    // );
    return (
      <div className='zq-report-container'>
        <WjsjTable comp="课堂秩序违纪事件报表"></WjsjTable>
      </div>
    );
  }
}

export default ClsReportRule;