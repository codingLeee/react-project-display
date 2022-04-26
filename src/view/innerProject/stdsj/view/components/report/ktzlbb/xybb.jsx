/*
 * @Author: JC.Liu 
 * @Date: 2019-03-21 11:24:40 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-22 13:33:22
 */
import React from 'react';
import { Select, Checkbox, DatePicker, Table, Pagination, Input, message } from 'antd';
import moment from 'moment';
import { SVG } from '../../../common';
import '../../../../css/college_table.css';
import _x from '../../../../js/_x/index';
import { G } from '../../../../../../../js/g';
const Option = Select.Option;
const Format = _x.util.date.format;
const Request = _x.util.request.request;
export default class Xybb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked3: true,             //课堂质量checked
      isChecked4: false,             //课堂质量checked
      selDate3: Format(new Date(), 'yyyy/MM/dd'),            //课堂质量结束时间
      selDate4: Format(new Date(), 'yyyy/MM/dd'),            //课堂质量结束时间
      jigouSel: [],                   //机构筛选
      jigouSelName: "",                //选择机构的名字
      collegeVal: "",                 //学院选择
      countOrder: 0,                 //1正序 0反序 -1 不选择
      scoreOrder: 0,                 // 1正序 0反序  -1 不选择
      page1: 1,                        //质量当前页数
      pageSize1: 20,                   //质量每页显示的条目
      zlTableData: {
        data: {}
      },                 //质量表格数据
      inputValue1: '',                   //质量分页框
      data1: [],
      loading: true,
    }
  }

  componentDidMount() {
    console.log("机构:", G.trgList);
    this.setState({
      jigouSel: G.trgList,
      collegeVal: G.trgList[0].gradeId,
      jigouSelName: G.trgList && G.trgList.length ? G.trgList[0].gradeName : "",
    }, () => {
      this.reqQuaTable();
    })
  }

  // 获取报表数据
  reqQuaTable = () => {
    let { collegeVal, isChecked3, isChecked4, selDate3, selDate4, countOrder, scoreOrder, page1, pageSize1 } = this.state
    this.setState({
      loading: true
    })

    let req = {
      "gradeId": collegeVal,//学院id// 默认传all
      "school": isChecked3 ? 1 : 0, //0不选中 1选中 学校
      "college": isChecked4 ? 1 : 0,//0不选中 1选中 学院
      "timeType": 0,// 0：自定义
      "startDate": new Date(selDate3).setHours(0, 0, 0, 0),//timestamp
      "endDate": new Date(selDate4).setHours(23, 59, 59, 59),
      "classOrder": countOrder, //1正序 0反序  课程数排序
      "scoreOrder": scoreOrder, // 1正序 0反序  评分数排序
      "pageIndex": page1,//页数
      "pageSize": pageSize1//每页条数
    };

    Request('api/web/teaching_score_report/get_academy_report', req, (res) => {
      if (res.result && res.data && res.data.length) {
        this.setState({
          zlTableData: res,
          loading: false,
          data1: res.data
        })
      } else {
        this.setState({
          loading: false,
          data1: []
        })
      }
    })
  }
  /** 
   * 课堂质量
   * 选择机构
   */
  clickJG1 = (e) => {
    this.setState({
      collegeVal: e,
      page1: 1
    }, () => {
      this.reqQuaTable()
    })
  }

  /**
   * 课堂质量
   * 选择日期
   */
  onPanelChange2 = (value, mode) => {
    //开始时间
    let selDate3 = new Date(value).getTime();
    let selDate4 = new Date(this.state.selDate4).getTime();
    if (selDate3 > selDate4) {
      message.warning('开始时间不能大于结束时间！');
      this.setState({
        selDate3: Format(new Date(this.state.selDate3), 'yyyy/MM/dd'),
        page1: 1
      })
    } else {
      this.setState({
        selDate3: Format(new Date(selDate3), 'yyyy/MM/dd'),
        page1: 1
      }, () => {
        this.reqQuaTable()
      })
    }
  }

  onPanelChange3 = (value, mode) => {
    //结束时间
    let selDate3 = new Date(this.state.selDate3).getTime();
    let selDate4 = new Date(value).getTime();
    if (selDate4 < selDate3) {
      message.warning('结束时间不能小于开始时间！');
      this.setState({
        selDate4: Format(new Date(this.state.selDate4), 'yyyy/MM/dd'),
        page1: 1
      })
    } else {
      this.setState({
        selDate4: Format(new Date(selDate4), 'yyyy/MM/dd'),
        page1: 1
      }, () => {
        this.reqQuaTable()
      })
    }
  }

  /**
   * 秩序 课程排序
   */
  handleTableChange = (pagination, filters, sorter) => {
    let order = sorter.order, orKey;
    order === 'ascend' ? orKey = 1 : orKey = -1;
    if (sorter.columnKey === 'courseNumber') {
      this.setState({
        countOrder: orKey,
        scoreOrder: 0,
        page1: 1
      }, () => {
        this.reqQuaTable()
      })
    } else {
      this.setState({
        countOrder: 0,
        scoreOrder: orKey,
        page1: 1
      }, () => {
        this.reqQuaTable()
      })
    }
  }
  /**
   * 秩序分页
   */
  jumpPage = (pageNumber) => {
    this.setState({
      page1: pageNumber
    }, () => {
      this.reqQuaTable();
      this.node.scrollIntoView();
    })
  }
  /**
     * 输入框值
     */
  changeInput = (e) => {
    let val = e.target.value,
      isNum = /^[0-9]+$/.test(val);
    if (isNum) {
      this.setState({
        inputValue1: Number(val)
      });
    } else {
      message.warning('请输入纯数字！');
    }
  }
  /**
     * 输入框回车回调
     */
  handleChangePage = () => {
    let p = this.state.inputValue1;
    if (p > Math.ceil(this.state.zxTableData.total / this.state.pageSize1)) {
      message.warning('输入的页码不能大于当前总页数!');
      return;
    }
    if (p <= 0) {
      message.warning('输入的页码有误!');
      return;
    }
    this.setState({
      page1: p,
    }, () => {
      this.reqQuaTable()
      this.node.scrollIntoView();
    })
  }

  /**
   * 导出课堂质量报表
   */
  dcTable1 = () => {
    let params = {
      "gradeId": this.state.collegeVal,//学院id// 默认传all
      "school": this.state.isChecked3 ? 1 : 0, //0不选中 1选中 学校
      "college": this.state.isChecked4 ? 1 : 0,//0不选中 1选中 学院
      "timeType": 0, //0：自定义
      "startDate": new Date(this.state.selDate3).setHours(0, 0, 0, 0), //开始时间 
      "endDate": new Date(this.state.selDate4).setHours(23, 59, 59, 59), //结束时间
      "classOrder": this.state.countOrder, //1正序 2反序
      "scoreOrder": this.state.scoreOrder, // 3正序 4反序  countorde和scoreOrder中只有一个有值，另一个为null
    }
    Request('api/web/class_score/export_score_college', params, (res) => {
      if (res.result && res.data) {
        var iframe = document.createElement("iframe");
        iframe.setAttribute("style", "display: none");
        iframe.setAttribute("src", G.serverUrl + res.data);
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(iframe);
        message.warning(res.message);
      } else {
        message.warning(res.message);
      }
    })
  }

  render() {
    const dateFormat = 'YYYY/MM/DD';
    const columns1 = [{
      title: '学院',
      dataIndex: 'collegeName',
      width: 140,
      align: 'left',
    }, {
      title: '课程数',
      dataIndex: 'courseNumber',
      width: 200,
      align: 'left',
      sorter: true,
    }, {
      title: '评分',
      dataIndex: 'score',
      width: 200,
      align: 'left',
      sorter: true,
    }];

    const dataSource = this.state.data1 && this.state.data1.map((item, index) => {
      return {
        key: index,
        ...item
      }
    })

    return (
      <div className="kyl-crc-tableBox" ref={(ref) => this.node = ref} >
        {/* 头部内容 */}
        < div className="kyl-crc-header"  >
          <div className="kyl-crc-HContent">
            <span>机构&nbsp;:&nbsp;</span>
            {/* 学院 */}
            <Select
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              value={this.state.jigouSelName}
              showSearch={true} style={{ minWidth: "11%" }}
              getPopupContainer={() => document.getElementsByClassName('kyl-crc-HContent')[0]}
              onChange={this.clickJG1}>
              {
                // 修改 3
                this.state.jigouSel && this.state.jigouSel.length ?
                  this.state.jigouSel.map((item, index) => (
                    <Option title={item.gradeName} key={index + "_1"} value={item.gradeId}>{item.gradeName}</Option>
                  ))
                  : null
              }
            </Select>
            <span className="kyl-crc-xkdw">听课安排&nbsp;:&nbsp;</span>
            <Checkbox checked={this.state.isChecked3} onChange={() => {
              this.setState({ isChecked3: !this.state.isChecked3 }, () => { this.reqQuaTable() })
            }}>
              学校
            </Checkbox>
            <Checkbox checked={this.state.isChecked4} onChange={() => {
              this.setState({ isChecked4: !this.state.isChecked4 }, () => { this.reqQuaTable() })
            }}>
              学院
            </Checkbox>
            <span className="kyl-crc-sj">时间&nbsp;:&nbsp;</span>
            <DatePicker
              allowClear={false}
              placeholder="开始时间"
              value={this.state.selDate3 === '' ? null : moment(this.state.selDate3, dateFormat)}
              format={dateFormat}
              className="kyl-crc-selectSj"
              style={{ width: "140px" }}
              showToday={false}
              onChange={this.onPanelChange2} />
            <span>&nbsp;--&nbsp;</span>
            <DatePicker
              allowClear={false}
              placeholder="结束时间"
              value={this.state.selDate4 === '' ? null : moment(this.state.selDate4, dateFormat)}
              format={dateFormat}
              className="kyl-crc-selectSj"
              style={{ width: "140px" }}
              showToday={false}
              onChange={this.onPanelChange3} />
            <span className="kyl-crc-dcbb" onClick={this.dcTable1}>
              <SVG type="dcbb" width={25} height={17} color="#3498db"></SVG>
              导出报表
                </span>
          </div>
        </div>
        {/* 表格内容 */}
        < div className="kyl-crc-body" >
          <div className="kyl-kt-clear">
            <Table
              key="table"
              className="zn-report-table"
              columns={columns1}
              pagination={false}
              loading={this.state.loading}
              onChange={this.handleTableChange}
              dataSource={dataSource} />
            {
              dataSource.length ?
                <div>
                  <span className="kyl-kt-pageInfo">每页20条数据，共{this.state.zlTableData.total}条</span>
                  <Input
                    className="kyl-kt-jumpZdPage"
                    onChange={this.changeInput}
                    disabled={!this.state.zlTableData.total || this.state.zlTableData.total < 20 ? true : false}
                    onPressEnter={this.handleChangePage} />
                  <Pagination className="kyl-kt-fy"
                    showQuickJumper
                    defaultCurrent={1}
                    current={this.state.page1}
                    total={this.state.zlTableData.total}
                    onChange={this.jumpPage}
                    pageSize={20}
                  />
                </div>
                : null
            }
          </div>
        </div>
      </div>
    );
  }
}
