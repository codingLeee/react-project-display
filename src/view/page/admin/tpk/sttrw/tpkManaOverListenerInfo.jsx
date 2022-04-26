/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-07 14:26:44
 * 听评课-管理员部分-随堂听任务-听课员详情(开展情况)
 */
import React, { Component } from 'react';

import ListenerOverTab from './../../../../component/admin/tpk/listenerOverTab';
import BreadCrumb from './../../../../component/breadCrumb.js';

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