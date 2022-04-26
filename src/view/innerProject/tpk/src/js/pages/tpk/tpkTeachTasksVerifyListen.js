/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 09:44:10 
 * @Last Modified by: 蒲飞
 * @Last Modified time: 2017-10-17 09:34:56
 * 听评课-教师部分-我的任务-处理听课申请页面
 */
import React, { Component } from 'react';
import TasksVerifyListenTable from '../../components/tasksVerifyListenTable'
import { Breadcrumb,Button} from 'antd';
import { Link } from 'react-router-dom';


class TpkTeachTasksVerifyListen extends Component{
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
             <Breadcrumb.Item>待处理的申请</Breadcrumb.Item> 
            </Breadcrumb> 
          </div>
        </div>
        <TasksVerifyListenTable></TasksVerifyListenTable>
      </div>
    );
  }
}

export default TpkTeachTasksVerifyListen;