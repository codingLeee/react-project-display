/*
 * @Author: JC.Liu 
 * @Date: 2019-02-23 22:34:10 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-25 11:13:30
 * 生态大数据
 */
import React, { Component } from 'react';
import { Route, Switch, Redirect, } from 'react-router-dom';
// 报告中心
import BgzxIndex from './bgzx/index';
// 教师考勤报表
import JskbbIndex from './jskqbb/index';
// 课堂秩序报表
import KtzxbbIndex from './ktzxbb';
// 课堂质量报表
import KtzlbbIndex from './ktzlbb/index';
// 学生出勤报表
import XscqbbIndex from './xscqbb/index';

export default class BigData extends Component {

  render() {
    return (
      <React.Fragment>
        <Switch>
          {/* 课堂秩序报表 */}
          <Route path="/admin/stdsj/ktzxbb" component={KtzxbbIndex} />
          {/* 课堂质量报表 */}
          <Route path="/admin/stdsj/ktzlbb" component={KtzlbbIndex} />
          {/* 学生出勤报表 */}
          <Route path="/admin/stdsj/xscqbb" component={XscqbbIndex} />
          {/* 教师考勤报表 */}
          <Route path="/admin/stdsj/jskqbb" component={JskbbIndex} />
          {/* 报告中心 */}
          <Route path="/admin/stdsj/bgzx" component={BgzxIndex} />

          {/* 可视化中心 */}
          <Route path="/admin/stdsj/bgzx" component={BgzxIndex} />

          <Redirect to="/admin/stdsj/ktzxbb" />
        </Switch >
      </React.Fragment>
    )
  }
}



