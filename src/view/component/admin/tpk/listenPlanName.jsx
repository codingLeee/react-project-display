/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-11 13:21:56
 * 听评课-管理员部分-随堂设置-指标名
 */
import React, { Component } from 'react';
import { Input } from 'antd';

import './../../../../css/admin/mj_listenPlanName.css';

class ListenPlanName extends Component {
  render() {
    return (
      <div>
        <span className="mj-lpn-planName">随堂听计划名：</span>
        <Input className='mj-lgn-inp' value={this.props.defaultData} onChange={this.props.page1Data.bind(this)} maxLength={20} />
      </div>
    );
  }
}

export default ListenPlanName;