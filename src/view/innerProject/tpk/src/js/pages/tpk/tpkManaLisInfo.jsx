/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-12 16:41:36
 * 听评课-管理员部分-随堂听任务-听课详情
 */
import React, { Component } from 'react';

import ListenDetTab from '../../components/listenDetTab';
import BreadCrumb from '../../components/base/breadCrumb.js';

const data = ['听评课','随堂听任务','听课详情'];

class TpkManaLisInfo extends Component{
  render(){
    const date = this.props.match.params.id;
    const teaName = this.props.match.params.teacher;
    const teaId = this.props.match.params.teaId;
    // console.log(id);
    return (
      <div>
        <BreadCrumb data={data}></BreadCrumb> 
        <ListenDetTab teaName={teaName} teaId={teaId}></ListenDetTab>
      </div>
    );
  }
}

export default TpkManaLisInfo;