/*
 * @Author: lxx 
 * @Date: 2018-09-11 10:57:07 
 * @Last Modified by: kyl
 * @Last Modified time: 2018-11-05 15:09:17
 * 教师考勤-考勤异常组件
 */

import React from 'react';
import { Table, Pagination, DatePicker, Input, message } from 'antd';
import { _x } from './../../../js/index';
import { SVG } from './../../common';
import G from './../../../js/g';
import moment from 'moment';

const selStyle = {
  width: 200,
  marginRight: 10
}
const spanStyle = {
  marginLeft: 5,
  color: '#3498DB',
  fontWeight: 'bold',
  fontSize: 16,
}

const Request = _x.util.request.request;
const dateFormat = 'YYYY/MM/DD';
const Format = _x.util.date.format;

export default class Unusual extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: Format(new Date(), 'yyyy/MM/dd'),
      endTime: Format(new Date(), 'yyyy/MM/dd'),
      courPage: 1,
      inputValue: '',
      params: {
        "startTime": '', //开始时间 //
        "endTime": '', //结束时间//
        "pageSize": 20,//每页显示多少条
        "pageIndex": 1,//当前页
        "sort": 0 //1为升序 -1 为降序
      },
      repData: [],
      total: 0,
      loading: true
    }
  }

  componentDidMount() {
    let params = this.state.params;
    params.startTime = new Date(this.state.startTime).setHours(0, 0, 0, 0);
    params.endTime = new Date(this.state.endTime).setHours(23, 59, 59, 59);
    // 更新入参
    this.updateDataParams(params);
  }

  /**
   * 更新参数
   */
  updateDataParams(params) {
    this.setState({
      params
    });
    // 获取报表数据
    this.getDataList(params);
  }

  /**
   * 获取报表数据
   */
  getDataList(params) {
    this.setState({
      loading: true
    })
    Request('api/web/tea_report/get_unusual_report', params, (res) => {
      if (res.data && res.data.totalElements && res.data.pageContent) {
        this.setState({
          repData: res.data.pageContent,
          total: res.data.totalElements,
          loading: false
        })
      } else {
        this.setState({
          repData: [],
          total: 0,
          loading: false
        })
      }
    })
  }

  /**
   * 开始时间选择
   */
  onPanelChange = (dateString) => {
    let params = this.state.params;
    let date = new Date(dateString).setHours(0, 0, 0, 0);
    if (date < params.endTime) {
      this.setState({
        startTime: Format(new Date(date), 'yyyy/MM/dd'),
        courPage: 1
      });
      params.startTime = date;
      params.pageIndex = 1;
      // 更新入参
      this.updateDataParams(params);
    } else {
      message.warning('开始时间不能大于结束时间');
      this.setState({
        startTime: Format(new Date(params.startTime), 'yyyy/MM/dd')
      });
    }
  }

  /**
   * 结束时间选择
   */
  onPanelChange1 = (dateString) => {
    let params = this.state.params;
    let date = new Date(dateString).setHours(23, 59, 59, 59);
    if (date > params.startTime) {
      this.setState({
        endTime: Format(new Date(date), 'yyyy/MM/dd'),
        courPage: 1,
      });
      params.endTime = date;
      params.pageIndex = 1;
      // 更新入参
      this.updateDataParams(params);
    } else {
      message.warning('结束时间不能小于开始时间');
      this.setState({
        endTime: Format(new Date(params.endTime), 'yyyy/MM/dd')
      });
    }
  }

  /**
   * 切换页码
   * @param { * } p 
   */
  handlePageChange = (p) => {
    let params = this.state.params;
    this.setState({
      courPage: p
    })
    params.pageIndex = p;
    // 更新入参
    this.updateDataParams(params);
    this.node.scrollIntoView();
  }

  /**
   * 输入框值
   */
  changeInput = (e) => {
    let val = e.target.value,
      isNum = /^[0-9]+$/.test(val);
    if (isNum) {
      this.setState({
        inputValue: Number(val)
      });
    } else if (!val) {
      return;
    } else {
      message.warning('请输入纯数字！');
    }

  }

  /**
   * 输入框回车回调
   */
  handleChangePage = () => {
    let p = this.state.inputValue,
      isMax = p > Math.ceil(this.state.total / 20);
    let params = this.state.params;
    if (p < 1) {
      message.warning('输入的页码有误!');
      this.setState({
        inputValue: ''
      })
      return;
    }
    if (isMax) {
      message.warning('输入的页码不能大于当前总页数!');
      this.setState({
        inputValue: ''
      })
    } else {
      this.setState({
        courPage: p,
        inputValue: ''
      })
      params.pageIndex = p;
      // 更新入参
      this.updateDataParams(params);
      this.node.scrollIntoView();
    }
  }

  /**
   * table改变
   */
  handleTableChange = (pagination, filters, sorter) => {
    let params = this.state.params;
    let order = sorter.order, orKey;
    order === 'ascend' ? orKey = 1 : orKey = -1;
    params.sort = orKey;
    params.pageIndex = 1;
    this.setState({
      courPage: 1
    })
    // 更新入参
    this.updateDataParams(params);
  }

  /**
   * 报表导出
   */
  downloadFile = () => {
    Request('api/web/tea_report/export_unusual_report', this.state.params, (res) => {
      if (res.result && res.data) {
        let downUrl = G.dataServices + res.data;
        var iframe = document.createElement("iframe");
        iframe.setAttribute("style", "display: none");
        iframe.setAttribute("src", downUrl);
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(iframe);
        message.warning(res.message);
      } else {
        message.warning(res.message);
      }
    })
  }

  render() {
    const columns = [{
      title: '考勤异常类型',
      dataIndex: 'unusualType',
      // width: 200,
    }, {
      title: '发生次数',
      dataIndex: 'unusualNumber',
      // width: 140,
      sorter: true,
    }];

    let state = this.state;

    return (
      <div className="zn-bg" ref={(ref) => this.node = ref}>
        <div className="lxx-g-flex lxx-g-re-header">
          <div className="lxx-hd-g-lf lxx-m-flex">
            <div>
              <span>时间：</span>
              <DatePicker
                allowClear={false}
                showToday={false} 
                placeholder="开始时间"
                value={state.startTime === '' ? null : moment(state.startTime, dateFormat)}
                format={dateFormat}
                className="kyl-crc-selectSj"
                style={{ width: "140px" }}
                onChange={this.onPanelChange} />
              <span>&nbsp;--&nbsp;</span>
              <DatePicker
                allowClear={false}
                showToday={false} 
                placeholder="结束时间"
                value={state.endTime === '' ? null : moment(state.endTime, dateFormat)}
                format={dateFormat}
                className="kyl-crc-selectSj"
                style={{ width: "140px" }}
                onChange={this.onPanelChange1} />
            </div>
          </div>
          <div onClick={this.downloadFile} style={{ cursor: 'pointer' }}>
            <SVG type="dcbb" color="#3498DB" width={20} height={19} />
            <span style={spanStyle}>导出报表</span>
          </div>
        </div>
        <div className="lxx-hd-g-rg">
          <Table
            className="zn-report-table"
            columns={columns}
            pagination={false}
            loading={state.loading}
            rowKey="id"
            dataSource={state.repData}
            onChange={this.handleTableChange} />
          {
            !state.total
              ? ''
              : <div className="kyl-kt-clear">
                <span className="kyl-kt-pageInfo">每页 20 条数据，共 {state.total} 条</span>
                <Input
                  className="kyl-kt-jumpZdPage"
                  disabled={!state.total || state.total < 20 ? true : false}
                  value={state.inputValue}
                  onChange={this.changeInput}
                  onPressEnter={this.handleChangePage} />
                <Pagination
                  className="kyl-kt-fy"
                  pageSize={20}
                  defaultCurrent={1}
                  current={state.courPage}
                  total={state.total}
                  onChange={this.handlePageChange} />
              </div>
          }
        </div>
      </div>

    );
  }
}
