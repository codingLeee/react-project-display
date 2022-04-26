/*
 * @Author: zhengqi 
 * @Date: 2017-09-14 19:06:21 
 * @Last Modified by: zhengqi
 * @Last Modified time: 2017-09-15 09:00:38
 */

import React, { Component } from 'react';
import { Row, Col, Radio } from 'antd';
// import ListenTeaCon from '../components/listenTeaCon';
import ListenPerName from '../components/listenPerName';
import '../../css/components/listenPermisTea.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const data = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'K', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
class ListenPermisTea extends Component {

  render() {
    return (
      <div className='zq-lpt-container'>
        <p>权限所属老师</p>
        <div className='zq-lpt-identificationKey'>
          <Row>
            <Col span={4}><span className='iconfont zq-lpt-star'>&#xe614;</span></Col>
            <Col span={20} className='zq-lpt-letter'>
              <RadioGroup defaultValue={0} size="large">
                {
                  data.map((value, index) => (
                    <RadioButton value={index}>{value}</RadioButton>
                  ))
                }
              </RadioGroup>
            </Col>
          </Row>
        </div>
        <ListenPerName />
      </div>
    );
  }
}

export default ListenPermisTea;