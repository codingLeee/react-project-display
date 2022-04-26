/*
 * @Author: lxx 
 * @Date: 2018-08-28 13:54:07 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-20 15:55:17
 * 学生出勤报表-原始数据
 */
import React from 'react';
import StuRepData from './../components/report/lxx_stuRepData';

class StuReportData extends React.Component {
  render() {
    return (
      <div className='zq-report-container'>
        <StuRepData />
      </div>
    );
  }
}

export default StuReportData;