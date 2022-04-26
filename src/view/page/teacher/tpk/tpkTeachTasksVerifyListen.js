/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 09:44:10 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-13 15:45:49
 * 听评课-教师部分-我的任务-处理听课申请页面
 */
import React, { Component } from 'react';
import { Breadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom';
import TasksVerifyListenTable from './../../../component/teacher/tpk/tasksVerifyListenTable';


class TpkTeachTasksVerifyListen extends Component {
  render() {
    return (
      <div>
        <div className="pf-t-breadcrumb">
          <Link to='/teacher/tpk/wdrw' className='pf-t-breadbutton'>
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