/*
 * @Author: JudyC 
 * @Date: 2017-09-12 10:48:48 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-14 13:53:32
 * 教研计划详情页
 */
import React, { Component } from 'react';
import { Table, message, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import BreadCrumb from './../../../../component/breadCrumb.js';
import { SVG } from './../../../../../base';
import util from './../../../../../js/_x/index.js';
const Request = util.util.request.request;
const toChinese = util.util.number.toChinese;
import ResearchSelect from './../../../../component/admin/tpk/researchSelect';
import './../../../../../css/admin/mj_tpkResearchPlanDetail.css';

const data = ['听评课', '教研任务', '教研计划详情']; //面包屑数据

class TpkResearchPlanDetail extends Component {
  constructor() {
    super();
    this.state = {
      tableData: [], //表格数据
      loading: false,      //表格加载中
      current: 1
    };
    this.planStatus = '1';//1：全部，2：已完成，3：未完成，4未开始：5进行中
    this.total = 0;     //总条数
    this.getData = this.getData.bind(this);
    this.handleStatusSelect = this.handleStatusSelect.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.getData(1);  //默认查询第一页
  };

  /**
   * 
   * @param {Number} n 查询页数
   */
  getData(n) {
    this.setState({
      loading: true,
      current: n
    });
    var req = {
      pageNumber: n,//查询的页数，从1开始
      pageSize: 20,//页面大小
      type: this.planStatus //1：全部，2：已完成，3：未完成，4未开始：5进行中
    }
    // Request('research_lesson/all_plan', req, function (ret) {
    let ret = {
      result: true,
      data: [
        {
          endWeek: 3,
          finished: 0,
          id: "6ce72d27-f5a6-4d46-869b-c2eb777e9656",
          lessonNumber: 10,
          notStart: 0,
          planName: "BBB",
          startWeek: 1,
          teacherNumber: 2,
          unfinished: 10
        }, {
          endWeek: 4,
          finished: 0,
          id: "a0740856-52b1-4b61-b7e6-2c805f9a8b78",
          lessonNumber: 4,
          notStart: 1,
          planName: "55566",
          startWeek: 1,
          teacherNumber: 2,
          unfinished: 3,
        }
      ],
      total: 50
    }
    if (ret.result) {
      this.total = ret.total;
      var resData = ret.data;
      var newTableData = [];
      resData.map((item, index) => {
        //判断计划状态，若只有finished为已完成，若只有notStart则为未开始，若有keeoOn则为未完成，其余都为进行中
        var status = '';
        item.finished = item.finished == null ? 0 : item.finished;
        item.unfinished = item.unfinished == null ? 0 : item.unfinished;
        item.notStart = item.notStart == null ? 0 : item.notStart;
        item.keepOn = item.keepOn == null ? 0 : item.keepOn;
        var total = item.finished + item.unfinished + item.notStart + item.keepOn;
        if (item.unfinished + item.keepOn > 0) {
          status = '未完成';
        } else if (item.finished === total) {
          status = '已完成'
        } else if (item.notStart === total) {
          status = '未开始'
        } else {
          status = '进行中'
        }
        newTableData.push({
          key: item.id,
          planName: item.planName,
          teacherNumber: item.teacherNumber,
          lessonNumber: item.lessonNumber,
          planState: status,
          ctnTime: `第${toChinese(item.startWeek)}周--->第${toChinese(item.endWeek)}周`,
          planPrgrs: [item.finished, item.keepOn + item.unfinished, item.notStart]
        })
      });
      this.setState({
        tableData: newTableData
      })
    } else {
      message.info(ret.message, 2);
    }
    this.setState({
      loading: false
    });
    // }.bind(this));
  };

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
    //计划状态数据
    const selectData = [
      {
        value: '1',
        text: '全部计划'
      }, {
        value: '2',
        text: '已完成'
      }, {
        value: '3',
        text: '未完成'
      }, {
        value: '4',
        text: '未开始'
      }, {
        value: '5',
        text: '进行中'
      }
    ];
    //表格列构造
    const columns = [
      {
        title: '计划名称',
        dataIndex: 'planName',
        width: 240,
        render: (text) => (
          <span title={text} className='cjy-trpd-planName'>{text}</span>
        )
      }, {
        title: '教研员数',
        dataIndex: 'teacherNumber',
        width: 110
      }, {
        title: '教研课程数',
        dataIndex: 'lessonNumber',
        width: 110
      }, {
        title: '计划状态',
        dataIndex: 'planState',
        width: 120
      }, {
        title: '计划持续时间',
        dataIndex: 'ctnTime',
        width: 220
      }, {
        title: '计划进度',
        dataIndex: 'planPrgrs',
        width: 200,
        render: (value) => {
          const obj = {
            children: value,
            props: {},
          };
          //进度条构造
          let total = 0;
          value.map((item) => (
            total += item
          ));
          const prgrsLength = [];
          value.map((item) => (
            prgrsLength.push(total === 0 ? (0 + 'px') : (item / total * 150 + 'px'))
          ));
          obj.children = <div><span className="cjy-rpd-finished" style={{ width: prgrsLength[0] }}></span><span className="cjy-rpd-ing" style={{ width: prgrsLength[1] }}></span><span className="cjy-rpd-unfinished" style={{ width: prgrsLength[2] }}></span></div>;
          return obj;
        }
      }, {
        title: '操作',
        dataIndex: 'operation',
        width: 100,
        render: (text, record, row) => (
          <span>
            <Link to={`/admin/tpk/jyrw/reLessonDe/planId=${record.key}`} className="cjy-rpd-aBox">
              <SVG type='icon-chakanxq' />
            </Link>
          </span>
        )
      }
    ];
    return (
      <div>
        <BreadCrumb data={data} back='/reTasks' />
        <div className="cjy-rpd-tableBox">
          <div className="cjy-rpd-headLine">
            <ResearchSelect text={'计划状态搜索'} defaultValue={this.planStatus} selectData={selectData} width={'130px'} handleSelect={this.handleStatusSelect} />
          </div>
          <Table
            columns={columns}
            dataSource={this.state.tableData}
            loading={this.state.loading}
            pagination={false}
          />
          <div className='ll-buttom'>
            <span className='ll-buttomSpan'>
              {`每页20条数据，共${this.total}条`}
            </span>
            <Pagination
              defaultCurrent={1}
              total={this.total}
              className='ll-PageStyle ll-Pg'
              itemRender={itemRender}
              pageSize={20}
              current={this.state.current}
              onChange={(page) => this.onChange(page)}
            />
          </div>
        </div>
      </div>
    );
  }

  /**
   * 
   * @param {Number} page 点击页数
   * 页数改变事件
   */
  onChange(page) {
    this.getData(page);
  };

  /**
   * 计划状态搜索框改变
   */
  handleStatusSelect = (value) => {
    this.planStatus = value;
    this.getData(1);
  };

}
export default TpkResearchPlanDetail;