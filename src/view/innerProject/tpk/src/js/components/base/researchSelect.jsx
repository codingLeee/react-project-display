/*
 * @Author: JudyC 
 * @Date: 2017-09-12 14:57:27 
 * @Last Modified by: JudyC
 * @Last Modified time: 2017-10-13 11:19:45
 */
import React, { Component } from 'react';
import {Select} from 'antd';
import '../../../css/components/base/researchSelect.css';

const Option = Select.Option;

class ResearchSelect extends Component{
  render(){
    return (
      <div className="cjy-rselect-slctBox">
        {
          this.props.text == null
          ? ''
          :<span className="cjy-rselect-slctSp">{this.props.text}<span>：</span></span>
        }
        <Select value={this.props.defaultValue} style={{ width: this.props.width }} onChange={this.handleChange.bind(this)}>
          {
            this.props.selectData.map((item, index) => (
              <Option key={index} value={item.value}>{item.text}</Option> 
            ))
          }
        </Select>
      </div>
    );
  }

  handleChange(value){
    this.props.handleSelect(value);
  }
}

export default ResearchSelect;