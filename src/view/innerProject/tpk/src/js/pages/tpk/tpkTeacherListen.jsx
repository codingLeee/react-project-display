/*
 * @Author: 蒲飞 
 * @Date: 2017-09-11 18:06:54 
 * @Last Modified by: 蒲飞
 * @Last Modified time: 2017-09-13 17:11:37
 * 听评课-教师部分-我的随堂听
 */
import React, { Component } from 'react';
import ListenMyInfo from '../../components/listenMyInfo';
import ListenSearchListenInfo from '../../components/listenSearchListenInfo';

class TpkTeacherListen extends Component{
  render(){
    return (
      <div>
        <ListenMyInfo></ListenMyInfo>
        <ListenSearchListenInfo></ListenSearchListenInfo>
      </div>
    );
  }
}

export default TpkTeacherListen;