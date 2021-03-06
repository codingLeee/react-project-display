/*
 * @Author: lxx 
 * @Date: 2018-08-28 13:57:34 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-12 10:07:42
 * 课堂质量报表-课堂任务报表
 */
import React from 'react';
import TopMenu from './../components/base/topMenu';
import ReportMenu from './../components/base/reportMenu';
import { Container } from './../common';
import TaskTable from '../components/report/task_table';
import PerfectScrollbar from 'react-perfect-scrollbar';

class QuaReportTask extends React.Component {
  render() {
    // return (
    //   <Container>
    //     <TopMenu />
    //     <ReportMenu />
    //     <PerfectScrollbar>
    //       <div className='zq-report-container'>
    //         <TaskTable comp="课堂质量听课任务报表"></TaskTable>
    //       </div>
    //     </PerfectScrollbar>
    //   </Container>
    // );
    return (
          <div className='zq-report-container'>
            <TaskTable comp="课堂质量听课任务报表"></TaskTable>
          </div>
    );
  }
}

export default QuaReportTask;