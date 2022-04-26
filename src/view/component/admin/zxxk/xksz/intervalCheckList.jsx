
import React, { Component } from 'react';
import { Button,Input,Table,message } from 'antd';
import {SVG} from '../../../../../base.jsx'
import '../../../../../css/admin/ws_planSetting.scss';
import {AddInterval} from './addInterval.jsx';
const Search = Input.Search;
export default class IntervalCheckList extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible:false
    };
  }
  /**
  * @desc  打开新增弹框
  */
  addInterval(){
    this.setState({visible:true});
  }
  /**
  * @desc  关闭新增弹框
  */
  cancelInterval(){
    this.setState({visible:false});
  }
  render() {
    let {visible} = this.state;
    const columns = [{
        title: '巡课计划',
        dataIndex: 'plan'
      },{
        title: '巡课时间',
        dataIndex: 'time'
      },{
        title: '计划说明',
        dataIndex: 'explain'
      },{
        title: '操作',
        width:100,
        align:'center',
        render: (text, record) => (
          <span className="ws-table-oper">
            <SVG type="bianji" />
            <SVG type="shanchu1" />
          </span>
        ),
      }];
      
      const data = [{
        id: '1',
        plan:'吃饭',
        time:'开课后25分钟...',
        explain:'说明'
      }, {
        id: '2',
        plan:'睡觉',
        time:'开课后25分钟...',
        explain:'说明'
      }, {
        id: '3',
        plan:'上班',
        time:'开课后25分钟...',
        explain:'说明'
      }];
    return (
      <div className="ws-planSetting">
        <div className="ws-fore-oper">
          <Button className="ws-button-green" onClick={this.addInterval.bind(this)}>新增计划</Button>
          <Search
            className="ws-search"
            placeholder="计划名称"
            onSearch={value => console.log(value)}
            style={{ width: 260,height:40 }}
          />
        </div>
        <Table rowKey={record => record.id} columns={columns} dataSource={data} pagination={false} />
        <AddInterval cancelInterval={this.cancelInterval.bind(this)} visible={visible} />
      </div>
    )
  }
}

