/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-08 11:10:06
 * 听评课-管理员部分-随堂听任务-听课员详情(完成情况)
 */
import React, { Component } from 'react';

import ListenerFiniTab from './../../../../component/admin/tpk/listenerFiniTab';
import BreadCrumb from './../../../../component/breadCrumb.js';

const data = ['听评课','随堂听任务','听课员详情'];

class TpkManaDetListenerInfo extends Component{
  render(){
    return (
      <div>
         <BreadCrumb data={data}></BreadCrumb> 
         <ListenerFiniTab></ListenerFiniTab>  
      </div>
    );
  }
}

export default TpkManaDetListenerInfo;