/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: zhengqi
 * @Last Modified time: 2017-10-09 12:33:29
 * 听评课-管理员部分-随堂设置-授课员审批权限设置-权限所属教师名列表
 */
import React, { Component } from 'react';
import { Row, Col, Radio } from 'antd';
import '../../css/components/listenPerName.css'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class ListenPerName extends Component {
  render() {
    let check = this.props.curPerson ? this.props.curPerson.teacherId : '';
    return (
      <div className='zq-lpn-perName'>
        <RadioGroup value={check} size="large" onChange={this.props.handleOntTea}>
          {
            this.props.perLists.map((value, index) => (
              <RadioButton value={value.teacherId} key={index} datai={value}>
                {value.teacherName}
                <span className='zq-lpn-perNum'>{value.relaTeachers.length}</span>
              </RadioButton>
            ))
          }
        </RadioGroup>
      </div >
    );
  }
}

export default ListenPerName;