/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-11 13:11:30
 * 听评课-管理员部分-随堂设置-新增任务指标
 */
import React, { Component } from 'react';

import BreadCrumb from './../../../../component/breadCrumb.js';
import ListenTaskStep from './../../../../component/admin/tpk/listenTaskStep';

const data = ['听评课', '随堂听设置', '新增任务指标'];
const steps = [
  { title: '指标名', content: '取一个随堂听指标名称' },
  { title: '选择成员', content: '安排随堂课听课成员' },
  { title: '选择频次', content: '指定成员听课频率' }
];

class TpkManaNewTask extends Component {
  render() {
    const defaultData = this.props.location.state;
    return (
      <div>
        <BreadCrumb data={data}></BreadCrumb>
        {
          this.props.location.state
            ?
            <ListenTaskStep steps={steps} person={'mj'} defaultData={defaultData}></ListenTaskStep>
            :
            <ListenTaskStep steps={steps} person={'mj'}></ListenTaskStep>
        }
      </div>
    );
  }
}

export default TpkManaNewTask;