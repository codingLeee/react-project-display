/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-11 11:04:27
 * 听评课-管理员部分-随堂设置-授课员审批权限设置-备选教师名列表
 */
import React, { Component } from 'react';
import { Button } from 'antd';
import _ from 'lodash';
import './../../../../css/admin/mj_listenPerName.css';

class ListenPerName extends Component {
  render() {
    return (
      <div className='zq-lpn-perName'>
        {
          this.props.data.map((value, index) => {   //checkData 选择了的成员    teacherId 
            var index1 = _.findIndex(this.props.checkData, { teacherId: value.teacherId });
            if (index1 === -1 && ((this.props.curPerson ? this.props.curPerson.teacherId : '') !== value.teacherId)) {
              return <Button title={value.teacherName} onClick={this.props.handleOnChange} value={JSON.stringify(value)} key={index} disabled={false}>{value.teacherName}</Button>
            } else {
              return <Button title={value.teacherName} onClick={this.props.handleOnChange} value={JSON.stringify(value)} key={index} disabled={true}>{value.teacherName}</Button>
            }
          })
        }
      </div>
    );
  }
}

export default ListenPerName;