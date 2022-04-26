/*
 * @Author: JC.Liu 
 * @Date: 2019-02-27 09:44:45 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-02-27 09:48:18
 * 计划设置
 */
import React, { Component } from 'react';
import { Button,Input,Table,message } from 'antd';
import {SVG} from '../../../../../base.jsx'
import '../../../../../css/admin/ws_planSetting.scss';
import {AddPlan} from './addPlan.jsx';
const Search = Input.Search;
export default class PlanList extends Component {
  constructor(props){
    super(props);
    this.state = {
      newly:false
    };
  }
  /**
  * @desc  打开新增弹框
  */
  addPlan(){
    this.setState({newly:true});
  }
  /**
  * @desc  打开新增弹框
  */
  canCelPlan(){
    this.setState({newly:false});
  }
  render() {
    const columns = [{
      title: '计划名称',
      dataIndex: 'name'
    }, {
      title: '操作',
      width:150,
      align:'center',
      render: (text, record) => (
        <span className="ws-table-oper">
        
          <SVG type="icon-chakanxq" />
          <SVG type="bianji" />
          <SVG type="shanchu1" />
        </span>
      ),
    }];
    const data = [{
      id: '1',
      name: 'John Brown'
    }, {
      id: '2',
      name: 'Jim Green'
    }, {
      id: '3',
      name: 'Joe Black'
    }];
    let {newly} = this.state;
    return (
      <div>
        {
          newly ? <AddPlan canCelPlan={this.canCelPlan.bind(this)} /> :
          <div className="ws-planSetting">
            <div className="ws-fore-oper">
              <Button className="ws-button-green" onClick={this.addPlan.bind(this)}>新增计划</Button>
              <Search
                className="ws-search"
                placeholder="计划名称"
                onSearch={value => console.log(value)}
                style={{ width: 260,height:40 }}
              />
            </div>
            <Table rowKey={record => record.id} columns={columns} dataSource={data} pagination={false} />
          </div>
        }
      </div>
    )
  }
}

