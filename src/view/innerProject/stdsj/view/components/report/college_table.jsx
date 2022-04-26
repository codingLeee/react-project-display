/*
 * @Author: kyl 
 * @Date: 2018-08-28 13:18:23 
 * @Last Modified by: xiangting
 * @Last Modified time: 2019-03-25 12:59:20
 */

import React from 'react';
import { Select, Checkbox, DatePicker, Table, Pagination, Input, message } from 'antd';
import moment from 'moment';
import { SVG } from '../../common';
import '../../../css/college_table.css';
import _x from '../../../js/_x/index';
import { G } from '../../../../../../js/g';
const Request = _x.util.request.request;
const Option = Select.Option;
const Format = _x.util.date.format;
class CollegeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked1: true,             //课堂秩序checked
      isChecked2: false,             //课堂秩序checked
      selDate1: Format(new Date(), 'yyyy/MM/dd'),            //课堂秩序开始时间
      selDate2: Format(new Date(), 'yyyy/MM/dd'),            //课堂秩序结束时间
      jigouSel: [],                   //机构筛选
      college: [],                    //学院
      jigouSelName: "",                //选择机构的名字
      jigouSelVal: "",                //课堂秩序机构筛选
      collegeVal: "",                 //学院选择
      selObj: 0,                      //选择的对象  默认为全部0  老师2  学生1
      disNum: 0,                      //数量的排序  
      disPoints: 0,                   //分数的排序  
      countOrder: 0,                 //1正序 0反序 -1 不选择
      scoreOrder: 0,                 // 1正序 0反序  -1 不选择
      page: 1,                        //秩序当前页数
      pageSize: 20,                   //秩序每页显示的条目
      zxTableData: {},                 //秩序表格数据
      inputValue: '',                   //秩序分页框
      data: [],
      loading: true,
    }
  }

  componentDidMount() {
    this.setState({
      // 机构列表
      jigouSel: G.trgList || [],
      // 学院列表
      college: G.grdList || [],
      // 机构名字
      jigouSelName: G.trgList && G.trgList.length ? G.trgList[0].gradeName : "",
      // 学院ID
      jigouSelVal: G.trgList && G.trgList.length ? G.trgList[0].gradeId : "",
      // grdList 这个是普教的班级
      collegeVal: G.grdList && G.grdList.length ? G.grdList[0].trgId : "",
    }, () => {
      this.reqTable();
    })
  }
  /**
   * 课堂秩序
   */
  reqTable = () => {
    this.setState({
      loading: true
    })
    let { jigouSelVal, jigouSelName, isChecked1, isChecked2, selObj, pageSize, page, selDate1, selDate2, disNum, disPoints } = this.state;

    let params = {
      "gradeId": jigouSelVal, //String类型，学院ID//
      "gradeName": jigouSelName, //String类型，学院名字//
      "school": isChecked1 ? 1 : 0,//Integer类型，学校   0表示未选中，1表示选中//
      "college": isChecked2 ? 1 : 0,//Integer类型，学院   0表示未选中，1表示选中//
      "roleType": selObj,//Integer类型，1表示学生，2表示老师，0表示全部//
      "pageSize": pageSize,//每页显示条数//
      "pageIndex": page,//当前页//
      "startDate": new Date(selDate1).setHours(0, 0, 0, 0), //开始时间 
      "scoreOrder": disPoints,//String类型违纪扣分排序 0表示降序 1表示升序，没点击为-1//
      "endDate": new Date(selDate2).setHours(23, 59, 59, 59), //结束时间
      "numOrder": disNum,//String类型违纪次数排序 0表示降序 1表示升序,没点击为-1//
    }

    Request('api/web/classroom_order_report/get_academy_report', params, (res) => {
      if (res.result && res.data) {
        this.setState({
          zxTableData: res,
          loading: false
        }, () => {
          this.setState({
            data:res.data
          })
        })
      } else {
        this.setState({
          data: [],
          loading: false
        })
      }
    })
  }

  /** 
   * 课堂秩序
   * 选择机构
   */
  clickJG = (e) => {
    this.setState({
      jigouSelVal: e,
      page: 1
    }, () => {
      let  { jigouSel } = this.state;
      let jigouSelName = "";
      
      jigouSel&&jigouSel.length&&jigouSel.map((item,index)=>{
        if(item.trgId === e){
          jigouSelName = item.gradeName
        }
      });
      this.setState({
        jigouSelName
      },()=>{
        this.reqTable()
      });
    })
  }
  /** 
   * 课堂秩序
   * 选择事件
   */
  clickSJ = (e) => {
    this.setState({
      selObj: e,
      page: 1
    }, () => {
      this.reqTable()
    })
  }
  /**
   * 课堂秩序
   * 选择日期
   */
  onPanelChange = (value, mode) => {
    //开始时间
    let selDate1 = new Date(value).getTime();
    let selDate2 = new Date(this.state.selDate2).getTime();
    console.log(selDate1, selDate2);
    if (selDate1 > selDate2) {
      message.warning('开始时间不能大于结束时间！');
      this.setState({
        selDate1: Format(new Date(this.state.selDate1), 'yyyy/MM/dd'),
        page: 1
      })
    } else {
      this.setState({
        selDate1: Format(new Date(selDate1), 'yyyy/MM/dd'),
        page: 1
      }, () => {
        this.reqTable()
      })
    }
  }
  onPanelChange1 = (value, mode) => {
    //结束时间
    console.log(value._d, mode);
    let selDate1 = new Date(this.state.selDate1).getTime();
    let selDate2 = new Date(value).getTime();
    if (selDate2 < selDate1) {
      message.warning('结束时间不能小于开始时间！');
      this.setState({
        selDate2: Format(new Date(this.state.selDate2), 'yyyy/MM/dd'),
        page: 1
      })
    } else {
      this.setState({
        selDate2: Format(new Date(selDate2), 'yyyy/MM/dd'),
        page: 1
      }, () => {
        this.reqTable()
      })
    }
  }

  /**
   * 秩序排序
   */
  handleTableChange = (pagination, filters, sorter) => {
    let order = sorter.order, orKey;
    order === 'ascend' ? orKey = 1 : orKey = -1;
    if (sorter.columnKey === 'totalNumber') {
      this.setState({
        disNum: orKey,
        disPoints: 0,
        page: 1
      }, () => {
        this.reqTable();
      })
    } else {
      this.setState({
        disNum: 0,
        disPoints: orKey,
        page: 1
      }, () => {
        this.reqTable();
      })
    }
  }

  /**
   * 秩序分页
   */
  jumpPage = (pageNumber) => {
    this.setState({
      page: pageNumber
    }, () => {
      this.reqTable();
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
        inputValue: Number(val)
      });
    } else {
      message.warning('请输入纯数字！');
    }
  }
  /**
     * 输入框回车回调
     */
  handleChangePage = () => {
    let p = this.state.inputValue;
    if (p > Math.ceil(this.state.zxTableData.total / this.state.pageSize)) {
      message.warning('输入的页码不能大于当前总页数!');
      return;
    }
    if (p <= 0) {
      message.warning('输入的页码有误!');
      return;
    }
    this.setState({
      page: p,
    }, () => {
      this.reqTable();
      this.node.scrollIntoView();
    })
  }
  /**
   * 导出课堂秩序报表
   */
  dcTable = () => {
    let { selDate1, selDate2, jigouSelName, jigouSelVal, isChecked1, isChecked2, selObj, disNum, disPoints } = this.state;
    let params = {
      "startDate": new Date(selDate1).setHours(0, 0, 0, 0), //开始时间 
      "endDate": new Date(selDate2).setHours(23, 59, 59, 59), //结束时间
      "gradeName": jigouSelName, //String类型，学院名字//
      "gradeId": jigouSelVal, //String类型，学院ID//
      "school": isChecked1 ? 1 : 0,//Integer类型，学校   0表示未选中，1表示选中//
      "college": isChecked2 ? 1 : 0,//Integer类型，学院   0表示未选中，1表示选中//
      "roleType": selObj,//Integer类型，1表示学生，2表示老师，0表示全部//
      "numOrder": disNum,//String类型违纪次数排序 0表示降序 1表示升序,没点击为-1//
      "scoreOrder": disPoints,//String类型违纪扣分排序 0表示降序 1表示升序，没点击为-1//
    }

    Request('api/web/classroom_order_report/export_academy_report', params, (res) => {
      if (res.result && res.data) {
        // 使用iframe的方式在通窗口标签下下载报表
        var iframe = document.createElement("iframe");
        iframe.setAttribute("style", "display: none");
        iframe.setAttribute("src", G.serverUrl + decodeURI(res.data));
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
    const columns = [{
      title: '教学机构',
      dataIndex: 'collegeName',
      width: 140,
      align: 'left'
    }, {
      title: '违纪次数',
      dataIndex: 'totalNumber',
      width: 200,
      align: 'left',
      sorter: true,
    }, {
      title: '违纪扣分',
      dataIndex: 'deductScore',
      width: 200,
      align: 'left',
      sorter: true,
    }];
    let { data } = this.state;

    const dataSource = data.length ? data.map((item, index) => {
      return {
        key: index,
        ...item
      }
    })
    :[];


    return (
      <div className="kyl-crc-tableBox" ref={(ref) => this.node = ref} >
        {/* 头部内容 */}
        < div className="kyl-crc-header"  >
          <div className="kyl-crc-HContent">
            <span>教学机构：</span>
            <Select
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              value={this.state.jigouSelVal}
              getPopupContainer={() => document.getElementsByClassName('kyl-crc-HContent')[0]}
              showSearch={true}
              style={{ minWidth: "11%" }}
              onChange={this.clickJG}>
              {
                this.state.jigouSel && this.state.jigouSel.length ?
                  this.state.jigouSel.map((item, index) => (
                    <Option title={item.gradeName} key={index} value={item.gradeId}>{item.gradeName}</Option>
                  ))
                  : null
              }
            </Select>
            <div style={{ display: "inline-block" }}>
              <span className="kyl-crc-xkdw">巡课机构&nbsp;:&nbsp;</span>
              <Checkbox checked={this.state.isChecked1} onChange={() => {
                this.setState({ isChecked1: !this.state.isChecked1 }, () => {this.reqTable() })
              }}>学校</Checkbox>
              <Checkbox checked={this.state.isChecked2} onChange={() => {
                this.setState({ isChecked2: !this.state.isChecked2 }, () => {this.reqTable()})
              }}>学院</Checkbox>
            </div>
            <span className="kyl-crc-shij">事件：</span>
            <Select
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              defaultValue="0" showSearch={true} style={{ minWidth: "11%" }}
              getPopupContainer={() => document.getElementsByClassName('kyl-crc-HContent')[0]}
              onChange={this.clickSJ}>
              <Option title="全部对象" value="0">全部对象</Option>
              <Option title="教师" value="2">教师</Option>
              <Option title="学生" value="1">学生</Option>
            </Select>
            <span className="kyl-crc-sj">时间&nbsp;:&nbsp;</span>
            <DatePicker
              allowClear={false}
              placeholder="开始时间"
              value={this.state.selDate1 === '' ? null : moment(this.state.selDate1, dateFormat)}
              format={dateFormat}
              className="kyl-crc-selectSj"
              style={{ width: "140px" }}
              showToday={false}
              onChange={this.onPanelChange} />
            <span>&nbsp;--&nbsp;</span>
            <DatePicker
              allowClear={false}
              placeholder="结束时间"
              value={this.state.selDate2 === '' ? null : moment(this.state.selDate2, dateFormat)}
              format={dateFormat}
              className="kyl-crc-selectSj"
              style={{ width: "140px" }}
              showToday={false}
              onChange={this.onPanelChange1} />
            <span className="kyl-crc-dcbb" onClick={this.dcTable}>
              <SVG type="dcbb" width={25} height={17} color="#3498db"></SVG>
              导出报表
            </span>
          </div>
        </div>
        {/* 表格内容 */}
        < div className="kyl-crc-body" >
          <div className="kyl-kt-clear" >
            <Table
              key="table"
              className="zn-report-table"
              columns={columns}
              pagination={false}
              loading={this.state.loading}
              onChange={this.handleTableChange}
              dataSource={dataSource} />
            {
              dataSource.length ? <div>
                <span className="kyl-kt-pageInfo">每页20条数据，共{this.state.zxTableData.total}条</span>
                <Input
                  className="kyl-kt-jumpZdPage"
                  disabled={!this.state.zxTableData.total || this.state.zxTableData.total < 20 ? true : false}
                  onChange={this.changeInput}
                  onPressEnter={this.handleChangePage} />
                <Pagination className="kyl-kt-fy"
                  showQuickJumper
                  defaultCurrent={1}
                  current={this.state.page}
                  total={this.state.zxTableData.total}
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

export default CollegeTable;