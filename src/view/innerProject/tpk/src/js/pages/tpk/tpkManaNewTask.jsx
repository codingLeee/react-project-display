/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-12 16:41:57
 * 听评课-管理员部分-随堂设置-新增任务指标
 */
import React, { Component } from 'react';

import BreadCrumb from '../../components/base/breadCrumb.js';
import ListenTaskStep from '../../components/base/listenTaskStep';
import ListenPlanName from '../../components/listenPlanName';
import ListenCheckCon from '../../components/listenCheckCon';
import ListenFreqSet from '../../components/listenFreqSet';

const data = ['听评课', '随堂听设置', '新增任务指标'];
const steps = [
  { title: '指标名', content: '取一个随堂听指标名称' },
  { title: '选择成员', content: '安排随堂课听课成员' },
  { title: '选择频次', content: '指定成员听课频率' }
];

class TpkManaNewTask extends Component {
  render() {
    const defaultData = this.props.location.state;
    // console.log(defaultData);
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