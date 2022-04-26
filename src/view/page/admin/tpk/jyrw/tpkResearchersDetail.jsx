/*
 * @Author: JudyC 
 * @Date: 2017-09-12 10:52:10 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-14 13:55:45
 * 教研员详情页
 */
import React, { Component } from 'react';
import { Table, message, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { SVG } from './../../../../../base';
import util from './../../../../../js/_x/index.js';
const Request = util.util.request.request;
import BreadCrumb from './../../../../component/breadCrumb.js';
import ResearchSelect from './../../../../component/admin/tpk/researchSelect';
import ResearchSearch from './../../../../component/admin/tpk/researchSearch';
import './../../../../../css/admin/mj_tpkResearchersDetail.css';

const data = ['听评课', '教研任务', '教研员详情'];

const columns = [
  {
    title: '教研员',
    dataIndex: 'researcher',
    width: 340
  }, {
    title: '教学计划完成度',
    dataIndex: 'planPrgrs',
    width: 340
  }, {
    title: '教研课任务完成度',
    dataIndex: 'lessonPrgrs',
    width: 340
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: (text, record) => (
      <span>
        <Link to={`/admin/tpk/jyrw/reLessonDe/reId=${record.key}&reName=${record.researcher}`} className="cjy-rd-aBox">
          <SVG type='icon-chakanxq' />
        </Link>
        <Link to={`/admin/tpk/jyrw/reBook/${record.key}/${record.researcher}`} className="cjy-rd-aBox">
          <SVG type='jiaoyanben' />
        </Link>
      </span>
    ),
    width: 80
  }
];

class TpkResearchersDetail extends Component {
  constructor() {
    super();
    this.state = {
      tableData: [],
      planData: [],  //教研计划
      loading: false,      //表格加载中
      current: 1
    };
    this.planSele = '';  //所选教研计划
    this.total = 0;
    this.reName = '';
  }

  componentDidMount() {
    this.getPlan();
  }

  getPlan() {
    // Request('/research_lesson/all_plan_name_id', {}, function (ret) {
    let ret = {
      result: true,
      data: [
        { planName: "BBB", id: "6ce72d27-f5a6-4d46-869b-c2eb777e9656" },
        { planName: "55566", id: "a0740856-52b1-4b61-b7e6-2c805f9a8b78" },
        { planName: "教研计划A", id: "c9001e8e-7ee1-4bfd-a9e9-28334f643331" }
      ],
      total: 3
    }
    if (ret.result) {
      this.total = ret.total;
      var planName = ret.data;
      var planData1 = [];
      planData1.push({
        value: '',
        text: '全部计划'
      });
      planName.map((item) => {
        planData1.push({
          value: item.id,
          text: item.planName
        });
      });
      this.setState({
        planData: planData1
      })
      this.getData(1);
    }
    // }.bind(this));
  }

  getData(n) {
    this.setState({
      loading: true,
      current: n
    });
    var req = {
      pageNumber: n,//查询的页数，从1开始
      pageSize: 20,//页面大小
      id: this.planSele,//教研计划的id
      keyword: this.reName//搜索教研员的姓名
    };
    // Request('/research_lesson/teacher/all', req, function (ret) {
    let ret = {
      result: true,
      data: [
        { teacherName: "林忆莲", unfinishedLesson: 1, finished: 0, unfinished: 3, id: "2018007", finishedLesson: 3 },
        { teacherName: "林俊杰", unfinishedLesson: 0, finished: 0, unfinished: 6, id: "2018002", finishedLesson: 6 },
        { teacherName: "刘瑶", unfinishedLesson: 1, finished: 0, unfinished: 3, id: "2018001", finishedLesson: 3 },
        { teacherName: "金毛", unfinishedLesson: 0, finished: 0, unfinished: 6, id: "2018051", finishedLesson: 6 }
      ],
      total: 4
    }
    if (ret.result) {
      this.total = ret.total;
      var teaData = ret.data;
      //构造表格数据
      var newTableData = [];
      teaData.map((item) => {
        item.finished = item.finished == null ? 0 : item.finished;
        item.unfinished = item.unfinished == null ? 0 : item.unfinished;
        item.finishedLesson = item.finishedLesson == null ? 0 : item.finishedLesson;
        item.unfinishedLesson = item.unfinishedLesson == null ? 0 : item.unfinishedLesson;
        newTableData.push({
          key: item.id,
          researcher: item.teacherName,
          planPrgrs: `${item.finishedLesson}/${item.finishedLesson + item.unfinishedLesson}`,
          lessonPrgrs: `${item.finished}/${item.finished + item.unfinished}`
        });
      });
      this.setState({
        tableData: newTableData
      });
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
    return (
      <div>
        <BreadCrumb data={data} />
        <div className="cjy-rd-tableBox">
          <div className="cjy-rd-headLine">
            <ResearchSelect text={'教研计划'} defaultValue={this.planSele} selectData={this.state.planData} width={'160px'} handleSelect={this.handlePlanSelect.bind(this)} />
            <ResearchSearch defaultValue={this.resIpt} placeholder={'教研员'} resChange={this.resChange} search={this.search} />
          </div>
          <Table
            columns={columns}
            dataSource={this.state.tableData}
            pagination={false}
            loading={this.state.loading}
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

  onChange(page) {
    //数据请求
    this.getData(page);
  };

  //下拉框变化
  handlePlanSelect = (value) => {
    this.planSele = value
    this.getData(1);
  };

  /**
   * 教研员输入框变化
   */
  resChange = (value) => {
    this.reName = value;
  };

  /**
   * 查询按钮
   */
  search = () => {
    this.getData(1);
  }

}

export default TpkResearchersDetail;