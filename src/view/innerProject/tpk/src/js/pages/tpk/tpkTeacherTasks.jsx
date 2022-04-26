/*
 * @Author: 蒲飞 
 * @Date: 2017-09-11 18:11:47 
 * @Last Modified by: 蒲飞
 * @Last Modified time: 2017-09-12 19:46:55
 * 听评课-教师部分-我的任务
 */
import React, { Component } from 'react';
import TasksMyInfo from '../../components/tasksMyInfo'
import TasksMySchedule from '../../components/tasksMySchedule'

class TpkTeacherTasks extends Component{
  render(){
    return (
      <div>
      <TasksMyInfo></TasksMyInfo>
      <TasksMySchedule></TasksMySchedule>
      </div>
    );
  }
}

export default TpkTeacherTasks;