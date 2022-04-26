/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-19 14:51:24
 * 听评课-管理员部分-随堂设置-听课员任务指标设置
 */
import React, { Component } from 'react';
import { Input, Button, Table, Icon, Select, Popconfirm, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { confirm } from '../../components/base/modal';
import { info, success } from '../../components/base/modal';
import _x from '../../base/_x/api/api.js';

import TpkManaNewTask from './tpkManaNewTask';
import ListenTaskDetail from '../../components/listenTaskDetail';
import '../../../css/components/listenerOverTab.css';

class TpkManaLisTargetSet extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],   //表格数据
      visible: false,   //Modal是否出现
      clickData: {},    //表格一行的所有内容
      total: 0,    //表格数据总数
      loading: true
    };

    this.requestTab = this.requestTab.bind(this);
    this.handleShowDetail = this.handleShowDetail.bind(this);
    this.delcon = this.delcon.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.pageChange = this.pageChange.bind(this);
  }

  //表格数据请求
  requestTab(pages) {
    _x.util.request('/listenJob/listenMissionSetting', {
      'pageSize': 20,
      'curPage': pages
    }, function (ret) {
      if (ret.result) {
        const data = ret.data;
        var tabData = [];
        data.map((item, index) => {
          var nameList = '';
          var freque = '';
          if (item.frequency === '7') {
            freque = '每周';
          } else if (item.frequency === '30') {
            freque = '每月';
          } else {
            freque = '每学期';
          }
          for (var i = 0, len = item.teachIds.length; i < len; i++) {
            nameList = nameList + '/' + item.teachIds[i].teacherName;
          }
          nameList = nameList.slice(1);

          tabData.push({
            frequency: freque,
            planCnt: item.planCnt,
            planId: item.planId,
            planName: item.planName,
            nameList: nameList,   //字符串形式
            personList: item.teachIds,    //数组形式
            key: index,
            total: item.teachIds.length
          })
        })

        this.setState({
          dataSource: tabData,
          total: ret.total,
          loading: false
        });
      }
    }.bind(this));
  };
  componentDidMount() {
    this.requestTab(1);
  };

  //点击查看详情
  handleShowDetail(val) {
    this.setState({
      visible: true,
      clickData: val
    });
  };
  handleOk() {
    this.setState({
      visible: false,
    });
  };

  // 删除按钮
  delcon = (record) => {
    confirm('删除', '确定删除？', function (resolve) {
      // const dataSource = [...this.state.dataSource];
      // this.setState({
      //   dataSource: dataSource.filter(item => item.key !== key)
      // });
      const key = record.key;
      _x.util.request('/listenJob/listenMissionSettingDelete', {
        'planId': record.planId
      }, function (ret) {
        if (ret.result) {
          // info('提示', '删除成功', 2000);
          success('删除成功', 2000);
          this.requestTab(1);
        }
      }.bind(this));

      resolve();
    }.bind(this), function (resolve) {
      resolve();
    }.bind(this));
  };
  //改变页码
  pageChange(page, pageSize) {
    this.setState({
      loading: true,
      curPage: page
    });
    this.requestTab(page);
  }


  render() {
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
        title: '指标名',
        dataIndex: 'planName',
        key: 'planId',
        width: 240,
        render: (text) => (
          <span className='mj-tmts-overName' title={text}>{text}</span>
        )
      }, {
        title: '计划频率',
        dataIndex: 'frequency',
        width: 170
      }, {
        title: '计划次数',
        dataIndex: 'planCnt',
        width: 190,
        render: (text) => (
          <span>{text}次</span>
        )
      }, {
        title: '涉及人员',
        dataIndex: 'nameList',
        width: 370,
        render: (text, render) => (
          text.length > 28
            ?
            <span>
              <span className='mj-tmts-overflow' title={text}>{text}</span>
              <span className='mj-tmts-total'>(共{render.total}人)</span>
            </span>
            :
            <span className='mj-tmts-noverflow' title={text}>{text}</span>
        )
      }, {
        title: '操作项',
        key: 'action',
        width: 130,
        render: (text, record) => (
          <span>
            <i className='iconfont mj-lot-icon1' title='详情' onClick={() => this.handleShowDetail(record)}>&#xe62f;</i>
            <Link to={{ pathname: '/lisSet/TpkManaNewTask', state: record }}>
              <i className='iconfont mj-lot-icon2 mj-lot-icon3' title='编辑'>&#xe606;</i>
            </Link>
            <i className='iconfont mj-lot-icon2 mj-lot-icon3' title='删除' onClick={() => this.delcon(record)}>&#xe626;</i>
          </span>
        ),
      }
    ];

    const modalData = this.state.clickData;
    var perList = `${modalData.teachNames}`;
    perList = perList.split("/");

    return (
      <div className='mj-lot-tabCon'>
        {/* 新增 */}
        <div className='mj-lot-operate mj-tmlts-operate'>
          <Link to={'/lisSet/TpkManaNewTask'}>
            <Button type="primary" className='mj-tmts-btn'>新增任务指标</Button>
          </Link>
        </div>

        {/* 表格 */}
        <div className='mj-lot-tab'>
          <Table columns={columns} loading={this.state.loading} dataSource={this.state.dataSource} pagination={{ pageSize: 20, itemRender: itemRender, total: this.state.total, onChange: this.pageChange, current: this.state.curPage }} />
        </div>

        <div className='mj-lot-pageInfo'>每页20条，共{this.state.total}条数据</div>

        <Modal className='mj-lts-modalCon' title={this.state.clickData.planName} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleOk} okText="关闭">
          <ListenTaskDetail sele={this.state.clickData.frequency} freque={this.state.clickData.planCnt} perList={this.state.clickData.personList}></ListenTaskDetail>
        </Modal>
      </div>
    );
  }
}

export default TpkManaLisTargetSet;
