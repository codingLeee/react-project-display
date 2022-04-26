/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-10 17:16:56
 * 听评课-管理员部分-随堂设置-指标名
 */
import React, { Component } from 'react';
import { Input } from 'antd';
import { warning } from '../components/base/modal';

import '../../css/components/listenPlanName.css';

class ListenPlanName extends Component {
  render() {
    return (
      <div>
        <span className="mj-lpn-planName">随堂听计划名：</span>
        <Input className='mj-lgn-inp' value={this.props.defaultData} onChange={this.props.page1Data.bind(this)} maxLength='20' />
      </div>
    );
  }
}

export default ListenPlanName;