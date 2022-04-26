/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-12 16:42:03
 * 听评课-管理员部分-随堂听任务-听课员详情(开展情况)
 */
import React, { Component } from 'react';

import ListenerOverTab from '../../components/listenerOverTab';
import BreadCrumb from '../../components/base/breadCrumb.js';

class TpkManaOverListenerInfo extends Component{
  render(){
    const data = ['听评课','随堂听任务','听课员详情'];
    return (
      <div>
        <BreadCrumb data={data}></BreadCrumb> 
        <ListenerOverTab></ListenerOverTab>
      </div>
    );
  }
}

export default TpkManaOverListenerInfo;