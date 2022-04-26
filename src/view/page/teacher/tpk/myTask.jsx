/*
 * @Author: JC.Liu
 * @Date: 2017-09-11 18:11:47 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-14 09:35:07
 * 听评课-教师部分-我的任务
 */
import React, { Component } from 'react';
import TasksMyInfo from './../../../component/teacher/tpk/tasksMyInfo.js';
import TasksMySchedule from './../../../component/teacher/tpk/tasksMySchedule.js';

export class MyTask extends Component {
  render() {
    return (
      <div style={{width: '99%'}}>
         <TasksMyInfo></TasksMyInfo>
         <TasksMySchedule></TasksMySchedule>  
      </div>
    );
  }
}