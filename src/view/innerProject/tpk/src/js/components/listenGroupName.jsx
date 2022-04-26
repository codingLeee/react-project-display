/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-09-14 15:27:08
 * 听评课-管理员部分-随堂设置-指标名
 */
import React, { Component } from 'react';
import { Input } from 'antd';

import '../../css/components/listenGroupName.css';

class ListenGroupName extends Component{
  render(){
    return (
      <div>
        <span>随堂听计划名：</span>
        <Input className='mj-lgn-inp' />
      </div>
    );
  }
}

export default ListenGroupName;