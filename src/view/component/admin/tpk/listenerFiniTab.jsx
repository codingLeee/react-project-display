/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-14 15:21:05
 * 听评课-管理员部分-随堂听任务-听课员详情(完成情况)-搜索及课表组件
 */
import React, { Component } from 'react';
import { Input, Button, Table, Icon, Select } from 'antd';
import { Link } from 'react-router-dom';
// import _x from '../base/_x/api/api.js';
import { SVG } from './../../../../base';
import util from './../../../../js/_x/index.js';
const Request = util.util.request.request;

import './../../../../css/admin/mj_listenerOverTab.css';

class ListenerFiniTab extends Component {
  constructor() {
    super();
    this.state = {
      inpVal: '',   //输入的听课员
      seleVal: 'all',   //点击的计划
      cliKey: '',   //    还未使用
      palns: [],    //请求的计划列表
      tabData: [],    //表格的数据
      total: 1,
      loading: true,   //显示加载中
      curPage: 1         //当前页数
    }
    this.seleChange = this.seleChange.bind(this);
    this.inpChange = this.inpChange.bind(this);
    this.search = this.search.bind(this);

    this.tabData = this.tabData.bind(this);
    this.onPressEnter = this.onPressEnter.bind(this);
    this.pageChange = this.pageChange.bind(this);
  }
  // 选择框
  seleChange(value) {
    this.setState({
      seleVal: value,
      loading: true,
      curPage: 1
    });

    this.tabData(this.state.inpVal, value, 1);
  }
  // 输入框
  inpChange(e) {
    this.setState({
      inpVal: e.target.value
    });
    // console.log(this.state.inpVal);
  }
  // 点击查询
  search() {
    this.setState({
      loading: true,
      curPage: 1
    });
    this.tabData(this.state.inpVal, this.state.seleVal, 1);
  }
  // 回车请求表格数据
  onPressEnter() {
    this.setState({
      loading: true,
      curPage: 1
    });
    this.tabData(this.state.inpVal, this.state.seleVal, 1);
  }
  // 页码改变
  pageChange(page, pageSize) {
    this.setState({
      loading: true,
      curPage: page
    });
    this.tabData(this.state.inpVal, this.state.seleVal, page);
  }

  componentDidMount() {
    // 请求计划列表
    // _x.util.request('/listenJob/listenPlanList', {}, function (ret) {
    //   if (ret.result) {
    // const data = ret.data;
    const data = [
      { planName: "huhulklk", planId: "7f5c84b9-c374-4247-ba1c-b6edaa00970c" },
      { planName: "eeeee", planId: "af9ad58f-63f9-4062-bced-36eaab9fba57" }
    ];
    this.setState({
      palns: data
    })
    //   }
    // }.bind(this));

    this.tabData(this.state.inpVal, this.state.seleVal, 1);
  };

  // 表格数据 请求
  tabData(name, id, pages) {
    // _x.util.request('/listenJob/listenFinishedTeachers',
    //   {
    //     'listenName': name,
    //     'planId': id,
    //     'pageSize': 20,
    //     'curPage': pages
    //   }, function (ret) {
    //     if (ret.result) {
    const ret = {
      data: [
        { finishedNum: 0, teacherId: "2018002", teacherName: "林俊杰", frequency: "7", planCnt: "1" },
        { finishedNum: 0, teacherId: "2018003", teacherName: "张惠妹", frequency: "7", planCnt: "1" }
      ],
      total: 9
    }
    for (var i = 0, len = ret.data.length; i < len; i++) {
      var frequ = ret.data[i].frequency;
      if (frequ === '7') {
        ret.data[i].frequency = '每周';
      } else if (frequ === '30') {
        ret.data[i].frequency = '每月';
      } else {
        ret.data[i].frequency = '每学期';
      }
      ret.data[i].key = i;
    }
    // console.log(ret.data);
    this.setState({
      tabData: ret.data,
      total: ret.total,
      loading: false
    })
    //   }
    // }.bind(this));
  }

  render() {
    // 分页样式
    function itemRender(current, type, originalElement) {
      if (type === 'prev') {
        return <a>上一页</a>;
      } else if (type === 'next') {
        return <a>下一页</a>;
      }
      return originalElement;
    }
    // table表头
    const columns = [
      {
        title: '听课员',
        dataIndex: 'teacherName',
        key: 'teacherid',
        width: 180
      }, {
        title: '计划频次',
        dataIndex: 'frequency',
        width: 286
      }, {
        title: '计划次数',
        dataIndex: 'planCnt',
        width: 226,
        render: (text) => (
          <span>{text}次</span>
        )
      }, {
      }, {
        title: '频次内完成听课数',
        dataIndex: 'finishedNum',
        width: 302,
        render: (text) => (
          <span>{text}次</span>
        )
      }, {
        title: '操作',
        width: 116,
        render: (text, record, index) => (
          <span>
            <Link to={`/admin/tpk/sttrw/TpkManaLisInfo/a${record.teacherName}/${record.teacherId}`}>
              {/* <i className='iconfont mj-lot-icon1' title='详情'>&#xe62f;</i> */}
              <SVG type='icon-chakanxq' />
            </Link>
            <Link to={`/admin/tpk/sttrw/ListenNote/b${record.teacherId}/${record.teacherName}`}>
              {/* <i className='iconfont mj-lot-icon2' title='听课本'>&#xe6a7;</i> */}
              <SVG type='jiaoyanben' />
            </Link>
          </span>
        ),
      }
    ];
    return (
      <div className='mj-lot-tabCon'>
        {/* 筛选 */}
        <div className='mj-lot-operate'>
          <div className='mj-lft-seleCon'>
            <span className='mj-lft-span'>计划筛选：</span>
            <Select className='mj-lft-sele' defaultValue={this.state.seleVal} onChange={this.seleChange}>
              <Select.Option key='all' value='all'>全部计划</Select.Option>
              {
                this.state.palns.map((item, index) => (
                  <Select.Option key={index} value={item.planId} title={item.planName}>{item.planName}</Select.Option>
                ))
              }
            </Select>
          </div>
          <Input className='mj-lot-input' placeholder='听课员' onChange={this.inpChange} onPressEnter={this.onPressEnter} />
          <Button onClick={this.search}>查询</Button>
        </div>

        <div className='mj-lot-tab'>
          <Table columns={columns} loading={this.state.loading} dataSource={this.state.tabData} pagination={{ pageSize: 20, itemRender: itemRender, total: this.state.total, onChange: this.pageChange, current: this.state.curPage }} />
        </div>

        <div className='mj-lot-pageInfo'>每页20条，共{this.state.total}条数据</div>
      </div>
    );
  }
}

export default ListenerFiniTab;