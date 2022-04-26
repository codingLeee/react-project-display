/*
 * @Author: Minj 
 * @Date: 2017-09-12 15:27:45 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-09-28 17:54:12
 * 指标详情
 */
import React, { Component } from 'react';
import { Modal } from 'antd';
import '../../css/components/listenTaskDetail.css';

class ListenTaskDetail extends Component {
  render() {
    var sele = this.props.sele;
    if (sele === '7') {
      sele = '每周';
    } else if (sele === '30') {
      sele = '每月';
    } else if (sele === '-1') {
      sele = '每学期';
    } else {
      sele = this.props.sele;
    }
    return (
      <div>
        <div className='mj-lts-modal'>
          <span className='mj-lts-modTitle'>听课员：</span>
          <div className='mj-lts-modName'>
            {
              this.props.perList.map((item, index) =>
                <span key={index}>{item.teacherName}</span>
              )
            }
          </div>
          <div className='mj-lts-clear'></div>
        </div>
        <div className='mj-lts-modTip'>{`指标情况：${sele} ${this.props.freque}次`}</div>
      </div>
    );
  }
}

export default ListenTaskDetail;