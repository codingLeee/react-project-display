/*
 * @Author: lxx 
 * @Date: 2018-09-06 15:50:23 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-12 10:52:19
 * 教师考勤报表-原始数据组件
 */

import React from 'react';
import { Select, Table, Pagination, DatePicker, Input, message } from 'antd';
import { _x } from './../../../js/index';
import { SVG, Container } from './../../common';
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

const { Column } = Table;
const Request = _x.util.request.request;
const Option = Select.Option;
const dateFormat = 'YYYY/MM/DD';
const Format = _x.util.date.format;

export default class Oringinal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colList: [],
      openTrgList: [],
      typeList: [],
      teacherList: [],
      classList: [],
      eventList: [],
      colIndex: '0',
      openIndex: '0',
      typeIndex: '0',
      teaIndex: '0',
      classIndex: '0',
      eventIndex: '0',
      startTime: Format(new Date(), 'yyyy/MM/dd'),
      endTime: Format(new Date(), 'yyyy/MM/dd'),
      courPage: 1,
      inputValue: '',
      params: {
        "startTime": '', //开始时间//
        "endTime": '', //结束时间//
        "trgName": '', //学院名称
        "orgId": "all", //机构id 如果为所有传 "all" //
        "type": "all", // 如果为所有传 "all"//
        "teacherId": "all", //教教师id 如果为所有传 "all"//
        "courseId": "all", //课程id 如果为所有传 "all"//
        "eventTypeId": "all", //违纪类型id,如果为所有传"all"//
        "pageSize": 20, //每页显示多少条
        "pageIndex": 1, //当前页
      },
      repData: [],
      total: 0,
      loading: true,
      indexNum: 0
    }
  }
  componentDidMount() {
    let colList = G.trgList ? G.trgList : [],
      openTrgList = G.openTrgList ? G.openTrgList : [],
      typeList = G.typeList ? G.typeList : [],
      eventList = G.eventList ? G.eventList : [];
    this.setState({
      colList,
      openTrgList,
      typeList,
      eventList
    });
    // this.getClassroomData(colList[0].trgId);
    colList.length && this.getTeacherData(colList[0].trgId);
    colList.length && this.getClassData(openTrgList[0].orgId, typeList[0].id);
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
  }

  /**
   * 获取报表数据
   */
  getDataList(params) {
    this.setState({
      loading: true
    })
    Request('api/web/tea_report/get_original_report', params, (res) => {
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
   * 获取授课老师数据
   */
  getTeacherData(trgId) {
    this.setState({
      loading: true
    })
    let param = {
      trgId: trgId,
    }
    Request('api/web/common/get_teacher_trgId', param, (res) => {
      let data = res.data;
      if (res.result && data) {
        this.setState({
          teacherList: data,
          teaIndex: '0'
        })
      } else {
        data = [{
          courseName: null,
          id: "all",
          name: null,
          teacherName: "全部老师"
        }]
        this.setState({
          teacherList: data,
          teaIndex: '0'
        })
      }
      let params = this.state.params;
      params.teacherId = data[0].teacherId;
      params.pageIndex = 1;
      if (this.state.indexNum) {
        // 获取报表数据
        this.getDataList(params);
      }
      this.setState({
        indexNum: 1
      })
    }, () => {
      let data = [{
        courseName: null,
        id: "all",
        name: null,
        teacherName: "全部老师"
      }]
      this.setState({
        teacherList: data,
        teaIndex: '0'
      })
      message.warning('获取数据失败');
    })
  }

  /**
   * 获取课程数据
   */
  getClassData(orgId, courseType) {
    this.setState({
      loading: true
    })
    let param = {
      orgId: orgId,
      courseType: courseType,
      teacherId: ''
    }
    Request('api/web/public/get_all_course', param, (res) => {
      let data = res.data;
      if (res.result && data) {
        this.setState({
          classList: data,
          classIndex: '0',
        })
      } else {
        let data = [{
          courseName: "全部课程",
          id: "all",
          name: null,
          teacherName: null,
        }];
        this.setState({
          classList: data,
          classIndex: '0',
        })
      }
      let params = this.state.params;
      params.orgId = orgId;
      params.type = courseType;
      params.courseId = data[0].id;
      params.pageIndex = 1;
      this.setState({
        courPage: 1,
      })
      // 更新入参
      this.updateDataParams(params);
      // 获取报表数据
      this.getDataList(params);
    }, () => {
      let data = [{
        courseName: "全部课程",
        id: "all",
        name: null,
        teacherName: null,
      }];
      this.setState({
        classList: data,
        classIndex: '0',
      })
      message.warning('获取数据失败');
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
    // 获取报表数据
    this.getTeacherData(colList[ind].trgId);
  }

  /**
   * 授课老师选择
   */
  onChangeTeacher = (ind) => {
    let teacherList = this.state.teacherList;
    this.setState({
      teaIndex: ind,
      courPage: 1
    });
    let params = this.state.params;
    params.teacherId = teacherList[ind].teacherId;
    params.pageIndex = 1;
    // 获取报表数据
    this.getDataList(params);
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
      // 获取报表数据
      this.getDataList(params);
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
      // 获取报表数据
      this.getDataList(params);
    } else {
      message.warning('结束时间不能小于开始时间');
      this.setState({
        endTime: Format(new Date(params.endTime), 'yyyy/MM/dd')
      });
    }
  }

  /**
   * 开课机构
   */
  onChangeOrg = (ind) => {
    let openTrgList = this.state.openTrgList;
    this.setState({
      openIndex: ind
    });
    let params = this.state.params;
    params.orgId = openTrgList[ind].orgId;
    params.pageIndex = 1;
    // 更新入参
    this.updateDataParams(params);
    // 获取授课老师数据
    this.getClassData(openTrgList[ind].orgId, params.type);
  }

  /**
   * 课程类型选择
   */
  onChangeType = (ind) => {
    let typeList = this.state.typeList;
    this.setState({
      typeIndex: ind
    });
    let params = this.state.params;
    params.type = typeList[ind].id;
    params.pageIndex = 1;
    // 更新入参
    this.updateDataParams(params);
    // 获取授课老师数据
    this.getClassData(params.orgId, typeList[ind].id);
  }

  /**
   * 全部课程选择
   */
  onChangeClass = (ind) => {
    let classList = this.state.classList;
    this.setState({
      classIndex: ind
    });
    let params = this.state.params;
    params.courseId = classList[ind].id;
    params.pageIndex = 1;
    // 更新入参
    this.updateDataParams(params);
    // 获取报表数据
    this.getDataList(params);
  }

  /**
   * 异常类型选择
   */
  onChangeEvent = (ind) => {
    let eventList = this.state.eventList;
    this.setState({
      eventIndex: ind
    });
    let params = this.state.params;
    params.eventTypeId = eventList[ind].eventTypeId;
    params.pageIndex = 1;
    // 更新入参
    this.updateDataParams(params);
    // 获取报表数据
    this.getDataList(params);
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
    // 获取报表数据
    this.getDataList(params);
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
      // 获取报表数据
      this.getDataList(params);
    }
  }

  /**
   * 报表导出
   */
  downloadFile = () => {
    Request('api/web/tea_report/export_original_report', this.state.params, (res) => {
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

    let state = this.state;

    return (
      <div className="zn-bg" ref={(ref) => this.node = ref}>
        <div className="lxx-g-flex lxx-g-re-header">
          <div className="lxx-hd-g-lf lxx-m-flex">
            <div id="lxx-select" style={{ marginBottom: 10 }}>
              <span>
                {/* {G.isVer === '1' ? '机构' : '教师'}： */}
                机构：
              </span>
              {/* 学院 */}
              {
                // G.isVer === '1'
                // ? 
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
                // : ''
              }
              {/* 授课老师 */}
              <Select
                value={state.teaIndex}
                showSearch
                style={selStyle}
                onChange={this.onChangeTeacher}
                getPopupContainer={() => document.getElementById('lxx-second')}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                {
                  state.teacherList.map((item, index) => {
                    return <Option key={index} value={index.toString()} title={item.teacherName}>{item.teacherName}</Option>
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
            <div id="lxx-second" style={{ marginBottom: 10 }}>
              <span>课程：</span>
              {
                // G.isVer === '1'
                //   ? 
                <Container>
                  {/* 开课机构 */}
                  <Select
                    value={state.openIndex}
                    showSearch
                    style={selStyle}
                    onChange={this.onChangeOrg}
                    getPopupContainer={() => document.getElementById('lxx-second')}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    {
                      state.openTrgList.map((item, index) => {
                        return <Option key={index} value={index.toString()} title={item.orgName}>{item.orgName}</Option>
                      })
                    }
                  </Select>
                  {/* 课程类型 */}
                  <Select
                    value={state.typeIndex}
                    showSearch
                    style={selStyle}
                    onChange={this.onChangeType}
                    getPopupContainer={() => document.getElementById('lxx-second')}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    {
                      state.typeList.map((item, index) => {
                        return <Option key={index} value={index.toString()} title={item.name}>{item.name}</Option>
                      })
                    }
                  </Select>
                </Container>
                // : ''
              }
              {/* 全部课程 */}
              <Select
                value={state.classIndex}
                showSearch
                style={selStyle}
                onChange={this.onChangeClass}
                getPopupContainer={() => document.getElementById('lxx-second')}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                {
                  state.classList.map((item, index) => {
                    return <Option key={index} value={index.toString()} title={item.courseName}>{item.courseName}</Option>
                  })
                }
              </Select>
            </div>
            <div id="lxx-third">
              <span>异常：</span>
              {/* 异常类型 */}
              <Select
                value={state.eventIndex}
                showSearch
                style={selStyle}
                onChange={this.onChangeEvent}
                getPopupContainer={() => document.getElementById('lxx-third')}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                {
                  state.eventList.map((item, index) => {
                    return <Option key={index} value={index.toString()} title={item.eventName}>{item.eventName}</Option>
                  })
                }
              </Select>
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
            // columns={columns}
            pagination={false}
            loading={state.loading}
            rowKey="id"
            dataSource={state.repData}>
            {
              // G.isVer === '1'? 
              <Column title="学院" dataIndex="collegeName" key="collegeName" width={140}></Column>
              // : ''
            }
            <Column title="授课教师" dataIndex="teacherName" key="teacherName" width={140}></Column>
            <Column title="课程" dataIndex="courseName" key="courseName" width={140}></Column>
            <Column title="考勤异常类型" dataIndex="eventType" key="eventType" width={200}></Column>
            <Column title="发生时间" dataIndex="eventHappenTime" key="eventHappenTime" width={200}></Column>
          </Table>
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
