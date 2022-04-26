/*
 * @Author: lxx 
 * @Date: 2018-08-28 10:04:28 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-22 10:32:14
 * 课堂秩序报表-学院报表
 */
import React from 'react';
import CollegeTable from '../components/report/college_table';

class ClsReportCol extends React.Component {
  render() {
    return (
      <div className='zq-report-container'>
        <CollegeTable />
      </div>
    );
  }
}

export default ClsReportCol;