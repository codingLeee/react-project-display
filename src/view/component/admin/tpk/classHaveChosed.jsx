/*
 * @Author: JudyC 
 * @Date: 2017-09-12 15:21:04 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-12 09:40:09
 */
import React, { Component } from 'react';
import { Table } from 'antd';
import { SVG } from './../../../../base';
import './../../../../css/admin/mj_classHaveChosed.css';

class ClassHaveChosed extends Component{
  constructor(props) {
    super(props);
    this.columns = [{
      title:'周次/周几/节次',
      dataIndex:'time'
    },{
      title:'名字',
      dataIndex:'name'
    },{
      title:'科目',
      dataIndex:'subject'
    },{
      title:'班级',
      dataIndex:'gradeClass'
    },{
      title:'人数',
      dataIndex:'num'
    },{
      title:'操作',
      dataIndex:'operation',
      render:(text,record)=>(
        <span>
          {/* <i className="iconfont" onClick={() =>this.onDelete(record.key)}>&#xe626;</i> */}
          <SVG type='shanchu1' onClick={() => this.onDelete(record.key)} />
        </span>
      )
    }];
  }
  
  onDelete = (key) => {
    this.props.handleDelHaveChose(key);
  };

  render(){
    return (
      <div className="cjy-chc-haveChoseBox">
        <div className="cjy-chc-headLine">
          <span className="cjy-chc-haveChoseSpan">{this.props.type==='listen'?'已选随堂听':'已选教研课'}</span>
          <div className="cjy-chc-amountBox">共&nbsp;<span>{this.props.dataSource.length}</span>&nbsp;节</div>
        </div>
        <Table showHeader={false} pagination={false} columns={this.columns} dataSource={this.props.dataSource}/>
      </div>
    );
  }
}

export default ClassHaveChosed;