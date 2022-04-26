/*
 * @Author: zhengqi 
 * @Date: 2017-09-19 09:35:47 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-11 14:00:04
 * 听评课-管理员部分-随堂设置-授课员审批权限设置-字母检索
 */
import React, { Component } from 'react';
import { Row, Col, Radio } from 'antd';
import '../../css/components/listenPerName.css'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const data = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class ListenSearchKey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isabled: false
    };
    // this.handleOnClick = this.handleOnClick.bind(this);
  }


  render() {
    return (
      <div>
        <div className='zq-lpn-identificationKey'>
          <Row>
            <Col span={3}></Col>
            <Col span={21} className='zq-lpn-letter'>
              <RadioGroup defaultValue={0} size="large" onChange={this.props.handleOnTeaKey}>
                {
                  data.map((value, index) => (
                    index === 0 ? 
                    <RadioButton value={value} key={index} className='iconfont'>&#xe614;</RadioButton> : 
                    <RadioButton value={value} key={index}>{value}</RadioButton>
                  ))
                }
              </RadioGroup>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ListenSearchKey;