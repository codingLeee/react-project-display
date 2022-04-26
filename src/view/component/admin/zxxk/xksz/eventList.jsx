/*
 * @Author: JC.Liu 
 * @Date: 2019-02-27 09:44:45 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-02-27 09:48:18
 * 事件列表
 */
import React, { Component } from 'react';
import { Button,Input,Table,Message,Pagination } from 'antd';
import {SVG,ModalTip} from '../../../../../base.jsx';
import '../../../../../css/admin/ws_planSetting.scss';
import {AddEvent} from './addEvent.jsx';
import util from '../../../../../js/_x/index';
const Request = util.util.request.request;
const Search = Input.Search;
export default class EventList extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible:false,
      pageIndex:1,
      pageSize:20,
      data:[],
      total:0
    };
  }
  componentDidMount(){
    this.getEvenList()
  }
  /**
  * @desc  打开新增弹框
  */
  addEvent(){
    this.setState({visible:true});
  }
  /**
  * @desc  关闭新增弹框
  */
  cancelEvent(){
    this.setState({visible:false});
  }
  /**
   *翻页跳转
   *
   * @param {number} pageIndex 分页码
   * @memberof LL_Warining
   */
  jumpPage(pageIndex) {
    this.setState({pageIndex})
    this.getEvenList(pageIndex);
  }
  /**
   * @desc 获取事件列表
   * @param {number} pageIndex 页码
   * @param {number} pageSize 每页多少条
   */
  getEvenList(pageIndex,pageSize){
    Request('api/web/patrol_event/list', {
      pageIndex:pageIndex || this.state.pageIndex,
      pageSize:pageSize || this.state.pageSize
    },(res) => {
      this.setState({
        data:res.data,
        total:res.total
      })
    })
  }
  itemRender(current, type, originalElement) {
    if (type === 'prev') {
      return <a className='ll-PageChange'>上一页</a>;
    } if (type === 'next') {
      return <a className='ll-PageChange'>下一页</a>;
    }
    return originalElement;
  }
  render() {
    let {visible,data,total,pageIndex,pageSize} = this.state;
    const columns = [{
      title: '事件名称',
      dataIndex: 'eventName'
    },{
      title: '扣分',
      align:'center',
      dataIndex: 'deductScore',
    },{
      title: '事件说明',
      dataIndex: 'eventDescription',
    },{
      title: '事件类型',
      dataIndex: 'roleEventType',
      render:(text) => (
        text == '1' ? <span>学生违纪</span> : <span>教师违纪</span>
      )
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
    return (
      <div className="ws-planSetting">
        <div className="ws-fore-oper">
          <Button className="ws-button-green" onClick={this.addEvent.bind(this)}>新增事件</Button>
        </div>
        <Table rowKey={record => record.eventTypeId} columns={columns} dataSource={data} pagination={false} />
        <div className='ll-buttom'>
          <span className='ll-buttomSpan'>
            每页20条数据，共{total}条
          </span>
          <Pagination
            current={pageIndex}
            pageSize={pageSize}
            total={total}
            className='ll-PageStyle ll-Pg'
            itemRender={this.itemRender.bind(this)}
            hideOnSinglePage={true}
            onChange={this.jumpPage.bind(this)}
            centered={false}
          />
        </div>
        <AddEvent cancelEvent={this.cancelEvent.bind(this)} visible={visible}/>
      </div>
    )
  }
}

