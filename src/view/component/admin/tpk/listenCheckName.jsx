/*
 * @Author: zhengqi 
 * @Date: 2017-09-15 11:31:05 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-11 14:06:44
 * 听评课-管理员部分-随堂设置-授课员审批权限设置-已关联的人员子组件
 */
import React, { Component } from 'react';
import { SVG } from './../../../../base';
import './../../../../css/admin/mj_listenCheckName.css';

class ListenCheckName extends Component {

  timeNum() {

  }

  render() {
    return (
      <ul className='zq-lcn-perChoName zq-clearfix'>
        {
          this.props.data.map((value, index) => {
            if (this.props.warningData.length) {
              for (var i = 0; i < this.props.warningData.length; i++) {
                if (this.props.warningData[i] == value.teacherId) {
                  return <li value={index} key={index} className='warning'>
                    <p title={value.teacherName}>{value.teacherName}</p>
                    {/*闵洁  */}
                    <span className='iconfont' data-warning={value.teacherId} onClick={this.props.handleOnDel} data-item={JSON.stringify(value)}>
                      <SVG type='quxiao' />
                    </span>
                  </li>
                } else {
                  if (i == this.props.warningData.length - 1) {
                    return <li value={index} key={index}>
                      <p title={value.teacherName}>{value.teacherName}</p>
                      <span className='iconfont' onClick={this.props.handleOnDel} data-item={JSON.stringify(value)}>
                        <SVG type='quxiao' />
                      </span>
                    </li>
                  }
                }
              }
            } else {
              return <li value={index} key={index}>
                <p title={value.teacherName}>{value.teacherName}</p>
                <span className='iconfont' onClick={this.props.handleOnDel} data-item={JSON.stringify(value)}>
                  <SVG type='quxiao' />
                </span>
              </li>
            }

          })

        }
      </ul>
    );
  }
}

export default ListenCheckName;