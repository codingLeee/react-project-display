/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-13 11:27:08
 * 听评课-管理员部分-随堂听任务-听课员详情(开展情况)-搜索及课表组件
 */
import React, { Component } from 'react';
import { Input, Button, Table, Icon } from 'antd';
import { Link } from 'react-router-dom';
import _x from '../base/_x/api/api.js';

import '../../css/components/listenerOverTab.css';

class ListenerOverTab extends Component {
  constructor() {
    super();
    this.state = {
      inpValue: '',  //输入框的值
      total: 0,     //数据总条数
      tabData: [],    //表格数据
      loading:true,   //显示加载中
      curPage:1         //当前页数
    };

    this.reuestTab = this.reuestTab.bind(this);
    this.valChange = this.valChange.bind(this);
    this.search = this.search.bind(this);
    this.onPressEnter = this.onPressEnter.bind(this);
    this.pageChange = this.pageChange.bind(this);
  };
  componentDidMount() {
    this.reuestTab('', 1);
  };
  // 听课员详情1  数据获取   开展情况
  reuestTab(name, pages) {
    _x.util.request('/listenJob/listenOverviewTeachers', {
      'listenName': name,
      'pageSize': 20,
      'curPage': pages
    }, function (ret) {
      if (ret.result) {
        for (var i = 0, len = ret.data.length; i < len; i++) {
          ret.data[i].key = i;
        }
        this.setState({
          total: ret.total,
          tabData: ret.data,
          loading:false
        });
      }
    }.bind(this));
  }

  // 获取input的值
  valChange(e){
    this.setState({ 
      inpValue: e.target.value
    });
  };
  // 查询点击
  search(){
    this.setState({
      loading:true,
      curPage:1
    });
    this.reuestTab(this.state.inpValue, 1);
  };
  onPressEnter(){
    this.setState({
      loading:true,
      curPage:1
    });
    this.reuestTab(this.state.inpValue, 1);
  }

  //页码切换
  pageChange(page, pageSize){
    this.setState({
      loading:true,
      curPage:page
    });
    this.reuestTab(this.state.inpValue, page);
  }

  render() {
    // 改变分页样式
    function itemRender(current, type, originalElement) {
      if (type === 'prev') {
        return <a>上一页</a>;
      } else if (type === 'next') {
        return <a>下一页</a>;
      }
      return originalElement;
    };
    //name: '第' + Number(week.name).toChinese() + '周',
    // table 表头
    const columns = [
      {
        title: '听课员',
        dataIndex: 'teacherName',
        key: 'teacherid',
        width: 220
      }, {
        title: '申请听课数',
        dataIndex: 'allNum',
        width: 338
      }, {
        title: '完成听课数',
        dataIndex: 'finishedNum',
        width: 338
      }, {
        title: '操作',
        width: 200,
        render: (text, record) => (
          <span>
            <Link to={`/lisTasks/TpkManaLisInfo/z${record.teacherName}/${record.teacherId}`}>
              <i className='iconfont mj-lot-icon1' title='详情'>&#xe62f;</i>
            </Link>
            <Link to={`/lisTasks/ListenNote/t${record.teacherId}/${record.teacherName}`}>
              <i className='iconfont mj-lot-icon2' title='听课本'>&#xe6a7;</i>
            </Link>
          </span>
        ),
      }
    ];

    return (
      <div className='mj-lot-tabCon'>
        <div className='mj-lot-operate'>
          <Input ref="listener" className='mj-lot-input' placeholder='听课员' onChange={this.valChange} onPressEnter={this.onPressEnter} />
          <Button onClick={this.search}>查询</Button>
        </div>

        <div className='mj-lot-tab'>
          <Table columns={columns} loading={this.state.loading} dataSource={this.state.tabData} pagination={{ pageSize: 20, itemRender: itemRender,total:this.state.total, onChange: this.pageChange }} />
        </div>

        <div className='mj-lot-pageInfo'>每页20条，共{this.state.total}条数据</div>
      </div>
    );
  }
}

export default ListenerOverTab;