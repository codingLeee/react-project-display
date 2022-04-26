/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-09-14 12:59:38
 * 听评课-管理员部分-教研设置-选择成员
 */
import React, { Component } from 'react';

import '../../css/components/listenCheckName.css';

class ReListenTea extends Component{
  render(){
    return (
      <div className='mj-lcn-nameCon'>
        <div className='mj-lcn-tit'>已选成员</div>
        <div className='mj-lcn-content'>
          <div className='mj-lcn-name'>
            姓名明
          </div>
        </div>
      </div>
    );
  }
}

export default ReListenTea;