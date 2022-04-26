/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-11 13:25:40
 * 听评课-管理员部分-随堂设置-频率设置
 */
import React, { Component } from 'react';
import { Input, Col, Select } from 'antd';

import './../../../../css/admin/mj_listenFreqSet.css';

const InputGroup = Input.Group;
const Option = Select.Option;

class ListenFreqSet extends Component {
  constructor(props) {
    super(props);
    var frequ = this.props.defaulFrequ;
    this.state = {
      frequ: frequ
    }
    this.seleChange = this.seleChange.bind(this);
    this.frequChange = this.frequChange.bind(this);
  }
  // 频率
  seleChange(val) {
    this.setState({
      frequ: val
    })
    this.props.page3Data1(val);
    // console.log(val + '傻逼');
  }
  // 渲染前返回(频率的事件是点击，进入时未点击)
  componentWillMount() {
    this.props.page3Data1(this.state.frequ);
  }
  // 频次
  frequChange(e) {
    this.props.page3Data2(e.target.value);
  }
  render() {
    // console.log(this.state.frequ);
    return (
      <div className='mj-lfs-freqCon'>
        <span className='mj-lfs-span'>设定听课频率：</span>
        <div className='mj-lfs-freq'>
          <InputGroup compact className='mj-lfs-sele'>
            <Select className='mj-lfs-sele' defaultValue={this.state.frequ} onChange={this.seleChange}>
              <Option value='7'>每周</Option>
              <Option value='30'>每月</Option>
              <Option value='-1'>每学期</Option>
            </Select>
          </InputGroup>

          <Input className='mj-lfs-inp' onChange={this.frequChange} value={this.props.defaultCount} maxLength={3} />
          <span className='mj-lfs-freSpan'>次</span>
        </div>
        <div className='mj-lfs-clear'></div>
      </div>
    );
  }
}

export default ListenFreqSet;