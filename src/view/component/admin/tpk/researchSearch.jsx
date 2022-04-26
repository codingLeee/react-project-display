/*
 * @Author: JudyC 
 * @Date: 2017-09-12 15:07:53 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-14 13:43:58
 * 查询组件
 * <ResearchSearch placeholder={'教研员'} resChange={this.resChange} search={this.search}/>
 */
import React, { Component } from 'react';
import {Input,Button} from 'antd';
import './../../../../css/admin/mj_researchSearch.css';

class ResearchSearch extends Component{
  constructor(){
    super();
    this.resChange = this.resChange.bind(this);
    this.search = this.search.bind(this);
  }
  render(){
    return (
      <div className="cjy-rs-selectBox">
        <Input 
        defaultValue={this.props.defaultValue?this.props.defaultValue:''} 
        placeholder={this.props.placeholder} 
        onChange={this.resChange} 
        maxLength={10}/>
        <Button onClick={this.search}>查询</Button>
      </div>
    );
  };

  /**
   * 
   * @param {Object} e 输入框内容改变时间
   */
  resChange(e){
    this.props.resChange(e.target.value);
  };

  /**
   * 点击查询事件
   */
  search = () => {
    this.props.search();
  }
}

export default ResearchSearch;