/*
 * @Author: lxx 
 * @Date: 2018-09-11 09:48:31 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-12 10:34:35
 * 教师考勤-学院报表
 */

import React from 'react';
import { Select, Table, Pagination, DatePicker, Input, message } from 'antd';
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
const Option = Select.Option;
const dateFormat = 'YYYY/MM/DD';
const Format = _x.util.date.format;

export default class College extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colList: [],
      colIndex: '0',
      startTime: Format(new Date(), 'yyyy/MM/dd'),
      endTime: Format(new Date(), 'yyyy/MM/dd'),
      courPage: 1,
      inputValue: '',
      params: {
        "startTime": '', //开始时间//
        "endTime": '', //结束时间//
        "trgName": "",//学院名称
        "courseOrder": 0,//1表示升序，-1表示降序
        "numberOrder": 0, //1表示升序，-1表示降序
        "pageSize": 20,//每页显示多少条
        "pageIndex": 1,//当前页
      },
      repData: [],
      total: 0,
      loading: true
    }
  }

  componentDidMount() {
    let colList = G.trgList ? G.trgList : [];
    this.setState({
      colList,
    });
    let params = this.state.params;
    params.startTime = new Date(this.state.startTime).setHours(0, 0, 0, 0);
    params.endTime = new Date(this.state.endTime).setHours(23, 59, 59, 59);
    params.trgName = colList.length ? colList[0].trgName : "";
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
    Request('api/web/tea_report/get_academy_report', params, (res) => {
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
   * 筛选机构
   */
  onChangeCol = (ind) => {
    let colList = this.state.colList;
    this.setState({
      colIndex: ind
    });
    let params = this.state.params;
    params.trgName = colList[ind].trgName;
    params.pageIndex = 1;
    this.setState({
      courPage: 1,
    })
    // 更新入参
    this.updateDataParams(params);
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
    let columnKey = sorter.columnKey,
      order = sorter.order, orKey;
    order === 'ascend' ? orKey = 1 : orKey = -1;
    if (columnKey === 'courseNumber') {
      params.courseOrder = orKey;
      params.numberOrder = 0;
    } else if (columnKey === 'unusualNumber') {
      params.numberOrder = orKey;
      params.courseOrder = 0;
    }
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
    Request('api/web/tea_report/export_academy_report', this.state.params, (res) => {
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
      title: '学院',
      dataIndex: 'gradeName',
      width: 200,
    }, {
      title: '课程数',
      dataIndex: 'courseNumber',
      width: 140,
      sorter: true,
    }, {
      title: '考勤异常数',
      dataIndex: 'unusualNumber',
      width: 140,
      sorter: true,
    }];

    let state = this.state;

    return (
      <div className="zn-bg" ref={(ref) => this.node = ref}>
        <div className="lxx-g-flex lxx-g-re-header">
          <div className="lxx-hd-g-lf lxx-m-flex">
            <div id="lxx-select">
              <span>机构：</span>
              <Select
                value={state.colIndex}
                showSearch
                style={selStyle}
                onChange={this.onChangeCol}
                getPopupContainer={() => document.getElementById('lxx-select')}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                {
                  state.colList.map((item, index) => {
                    return <Option key={index} value={index.toString()} title={item.trgName}>{item.trgName}</Option>
                  })
                }
              </Select>
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
            key="table"
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
