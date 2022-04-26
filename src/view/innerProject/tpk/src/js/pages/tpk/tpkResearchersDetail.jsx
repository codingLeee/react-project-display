/*
 * @Author: JudyC 
 * @Date: 2017-09-12 10:52:10 
 * @Last Modified by: JudyC
 * @Last Modified time: 2017-10-27 16:54:47
 * 教研员详情页
 */
import React, { Component } from 'react';
import BreadCrumb from '../../components/base/breadCrumb.js';
import ResearchSelect from '../../components/base/researchSelect';
import ResearchSearch from '../../components/base/researchSearch';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { info } from '../../components/base/modal'
import _x from '../../base/_x/api/api.js';
import '../../../css/pages/tpkResearchersDetail.css';

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
        <Link to={`/reTasks/reLessonDe/reId=${record.key}&reName=${record.researcher}`} className="cjy-rd-aBox"><i className="iconfont cjy-rd-lookup" title='详情'>&#xe62f;</i></Link>
        <Link to={`/reTasks/reBook/${record.key}/${record.researcher}`} className="cjy-rd-aBox"><i className="iconfont" title='教研本'>&#xe6a7;</i></Link>
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
      planData:[],  //教研计划
      loading:false,      //表格加载中
      current:1
    };
    this.planSele='';  //所选教研计划
    this.total = 0;
    this.reName = '';
  }

  componentDidMount() {
    this.getPlan();
  }

  getPlan() {
    _x.util.request('/research_lesson/all_plan_name_id', {}, function (ret) {
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
          planData:planData1
        })
        this.getData(1);
      }
    }.bind(this));
  }

  getData(n) {
    this.setState({
      loading:true,
      current:n
    });
    var req = {
      pageNumber: n,//查询的页数，从1开始
      pageSize: 20,//页面大小
      id: this.planSele,//教研计划的id
      keyword: this.reName//搜索教研员的姓名
    };
    _x.util.request('/research_lesson/teacher/all', req, function (ret) {
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
      }else{
        info('提示框',ret.message,2000);
      }
      this.setState({
        loading:false
      });
    }.bind(this));
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
          <Table columns={columns} dataSource={this.state.tableData} pagination={{ pageSize: 20, total: this.total, onChange: this.onChange.bind(this), itemRender: itemRender,current:this.state.current }} loading={this.state.loading} />
          <div className="cjy-rd-numInfo">每页20条,共{this.total}条数据</div>
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
    this.planSele =value
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