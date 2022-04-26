/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-12 16:41:14
 * 听评课-管理员部分-随堂听任务-听课员详情(完成情况)
 */
import React, { Component } from 'react';

import ListenerFiniTab from '../../components/listenerFiniTab';
import BreadCrumb from '../../components/base/breadCrumb.js';

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