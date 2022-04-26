/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-19 16:02:03
 * 听评课-管理员部分-随堂设置-教研组名称
 */
import React, { Component } from 'react';
import _ from 'lodash';
import { SVG } from './../../../../base';

import './../../../../css/admin/mj_listenGroupName.css';

class ListenGroupName extends Component {

  render() {
    return (
      this.props.groupCla === false ?
        (
          <div className='mj-lgn-GroupName' onClick={this.props.handleGroup.bind(this, this.props.datas,this.props.index)}>
            <div className='mj-lgn-iconCon'>
              {/* <i className='iconfont'>&#xe6a8;</i> */}
              <SVG type='zu' />
              <span>{this.props.datas.perNum}</span>
            </div>
            <p title={this.props.datas.groupName}>{this.props.datas.groupName}</p>
          </div>
        ) :
        (
          <div className='mj-lgn-GroupName' onClick={this.props.handleGroup.bind(this, this.props.datas,this.props.index)}>
            <div className='mj-lgn-iconCon'>
              {/* <i className='iconfont' style={{ color: '#27a5ff'}}>&#xe6a8;</i> */}
              <SVG type='zu' style={{ color: '#27a5ff' }} />
              <span style={{ color: '#27a5ff' }}>{this.props.datas.perNum}</span>
            </div>
            <p style={{ color: '#27a5ff' }}>{this.props.datas.groupName}</p>
          </div>
        )
    );
  }
}

export default ListenGroupName;