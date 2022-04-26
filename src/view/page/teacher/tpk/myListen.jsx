/*
 * @Author: JC.Liu
 * @Date: 2017-09-11 18:06:54 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-13 14:06:54
 * 听评课-教师部分-我的随堂听
 */
import React, { Component } from 'react';
import ListenMyInfo from './../../../component/teacher/tpk/listenMyInfo.js';
import ListenSearchListenInfo from './../../../component/teacher/tpk/listenSearchListenInfo.js';

export class MyListen extends Component {
  render() {
    return (
      <div>
        <ListenMyInfo></ListenMyInfo>
         <ListenSearchListenInfo></ListenSearchListenInfo> 
      </div>
    );
  }
}