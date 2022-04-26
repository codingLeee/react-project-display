/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 09:42:54 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-13 15:09:59
 * 听评课-教师部分-我的任务-申请听课页面
 */
import React, { Component } from 'react';
import { Breadcrumb,Button} from 'antd';
import { Link } from 'react-router-dom';
import TasksApplyListenTable from './../../../component/teacher/tpk/tasksApplyListenTable';
import './../../../../css/teacher/mj_tpkTeachTasksApplyListen.css';


class TpkTeachTasksApplyListen extends Component{  
  render(){
    return (
      <div>
        <div className="pf-t-breadcrumb">
          <Link to='/tasks' className='pf-t-breadbutton'>
            <Button type="primary" size='large'>返回</Button>  
          </Link>
          <span className='pf-t-breadtitle'>当前位置：</span>
          <div className='pf-t-bread'>
            <Breadcrumb separator=">">
              <Breadcrumb.Item>我的任务</Breadcrumb.Item>
              <Breadcrumb.Item>申请听课</Breadcrumb.Item> 
            </Breadcrumb> 
          </div>
        </div>
        <TasksApplyListenTable></TasksApplyListenTable>
      </div>
    );
  }
}




export default TpkTeachTasksApplyListen;
