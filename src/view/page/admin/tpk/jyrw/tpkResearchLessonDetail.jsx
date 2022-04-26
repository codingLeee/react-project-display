/*
 * @Author: JudyC 
 * @Date: 2017-09-12 10:50:54 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-14 13:42:54
 * 教研课程详情页
 */
import React, { Component } from 'react';
import { Table, Input, message, Pagination } from 'antd';
import BreadCrumb from './../../../../component/breadCrumb.js';
import ResearchSelect from './../../../../component/admin/tpk/researchSelect';
import ResearchSearch from './../../../../component/admin/tpk/researchSearch';
// import {Global} from '../../base/g.js';
import { SVG } from './../../../../../base';
import util from './../../../../../js/_x/index.js';
const Request = util.util.request.request;
const toChinese = util.util.number.toChinese;
import './../../../../../css/admin/mj_tpkResearchLessonDetail.css';

const data = ['听评课', '教研任务', '教研课程详情'];

//课堂教研状态
const lessonStateData = [
  {
    value: '1',
    text: '全部课堂'
  }, {
    value: '2',
    text: '已完成'
  }, {
    value: '3',
    text: '未完成'
  }, {
    value: '4',
    text: '未开始'
  },
  // {
  //   value: '5',
  //   text: '进行中'
  // }
];

class TpkResearchLessonDetail extends Component {
  constructor() {
    super();
    this.state = {
      tableData: [],  //表格数据
      loading: false,      //表格加载中
      current: 1
    };
    // this.planStatus='';//计划下拉框value
    this.lessonStatus = '1';//课程状态下拉框value
    this.teaIpt = '';//授课教师输入框值
    // this.resIpt='';//教研员输入框值
    this.planData = [{  //教研计划
      value: '',
      text: '全部计划'
    }];
    this.total = 0; //总数据条数
    this.getData = this.getData.bind(this);
    this.getPlan = this.getPlan.bind(this);
    this.handlePlanSelect = this.handlePlanSelect.bind(this);
    this.handleLessonSelect = this.handleLessonSelect.bind(this);
    this.teaChange = this.teaChange.bind(this);
    this.search = this.search.bind(this);
    this.resChange = this.resChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toPlay = this.toPlay.bind(this);
    //表格构造
    this.columns = [
      {
        title: '所属教研计划',
        dataIndex: 'planName',
        width: 160,
        render: (text) => (
          <span title={text} className='cjy-trld-planName'>{text}</span>
        )
      }, {
        title: '教研课时间(周/星期/节次)',
        dataIndex: 'reTime',
        width: 240,
        render: (text) => (
          <span title={text} className='cjy-trld-planTime'>{text}</span>
        )
      }, {
        title: '教研课信息(地点/班级/老师/科目)',
        dataIndex: 'lessonInfo',
        width: 300,
        render: (text) => (
          <span title={text} className='cjy-trld-planInfo'>{text}</span>
        )
      }, {
        title: '教研员',
        dataIndex: 'researcher',
        width: 100
      }, {
        title: '课堂评分',
        dataIndex: 'score',
        width: 110
      }, {
        title: '教研课状态',
        dataIndex: 'lessonState',
        width: 130
      }, {
        title: '操作',
        dataIndex: 'operation',
        width: 60,
        render: (text, record) => (
          <span>
            <a href="javascript:;" className="cjy-rld-aBox" onClick={() => this.toPlay(record.key, record.lessonState)}>
              <SVG type='bofang1' />
            </a>
          </span>
        )
      }];
  }

  /**
   * 若为从教研员详情跳转过来教研员框须有初始值
   */
  componentWillMount() {
    const passData = this.props.match.params.passData;
    if (passData) {
      var para = passData.split('=');
      if (para[0] === 'reId') {
        var para = passData.split('&');
        this.resIpt = para[1].split('=')[1]
      }
    }
  }

  componentDidMount() {
    this.getPlan();
  }

  /**
   * 获取计划
   */
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
      var planName = ret.data;
      planName.map((item) => {
        this.planData.push({
          value: item.id,
          text: item.planName
        });
      });
      const passData = this.props.match.params.passData;
      if (passData == null) {
        this.planStatus = '';
        this.resIpt = '';
      } else {
        var para = passData.split('=');
        if (para[0] === 'planId') {
          this.planStatus = para[1];
          this.resIpt = '';
        } else if (para[0] === 'reId') {
          var para = passData.split('&');
          this.resIpt = para[1].split('=')[1]
          this.planStatus = '';
        }
      }
      this.getData(1);
    }
    // }.bind(this));
  }

  /**
   * 
   * @param {Number} n 页数
   * @param {String} id 计划id
   * @param {Number} type 课堂教研状态
   * @param {String} tea 授课教师
   * @param {String} res 教研员
   */
  getData(n, tea, res) {
    this.setState({
      loading: true,
      current: n
    });
    var req = {
      pageNumber: n,
      pageSize: 20,
      id: this.planStatus,
      type: this.lessonStatus,
      lecturer: this.teaIpt,
      researchTeacherName: this.resIpt
    }
    // Request('/research_lesson/plan_detail', req, function (ret) {
    let ret = {
      result: true,
      total: 2,
      data: [
        {
          className: "教学班java201",
          curriculumId: "082473d24ff2a7ef7e120210bfc42db9",
          dayOfWeek: 2,
          lessonOrder: 7,
          planName: "BBB",
          position: "201",
          researchNumber: 2,
          state: 3,
          subject: "JAVA",
          teacherName: "吴二",
          week: 1
        },
        {
          className: "教学班java201",
          curriculumId: "5ccd3a3edd3966f8910a031494dfe286",
          dayOfWeek: 1,
          lessonOrder: 7,
          planName: "BBB",
          position: "201",
          researchNumber: 2,
          state: 3,
          subject: "JAVA",
          teacherName: "吴二",
          week: 1
        }
      ]
    }
    if (ret.result) {
      this.total = ret.total;
      var lessonData = ret.data;
      var newTableData = [];
      lessonData.map((item) => {
        var reTime = `第${toChinese(item.week)}周/星期${item.dayOfWeek === 7 ? '日' : toChinese(item.dayOfWeek)}/第${toChinese(item.lessonOrder)}节`;
        var lessonInfo = `${item.position}/${item.className}/${item.teacherName}/${item.subject}`;
        var status = '';
        switch (item.state) {
          case 2:
            status = '已完成';
            break;
          case 3:
            status = '未完成';
            break;
          case 4:
            status = '未开始';
            break;
            // case 5:
            //   status = '进行中';
            break;
          default:
            status = '已完成';
        }
        newTableData.push({
          key: item.curriculumId,
          planName: item.planName,
          reTime: reTime,
          lessonInfo: lessonInfo,
          researcher: item.researchNumber,
          score: (item.score == null || item.score === 0) ? 0 : item.score.toFixed(1),
          lessonState: status
        });
      });
      this.setState({
        tableData: newTableData
      });
    } else {
      message.info('提示框', ret.message, 2000);
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
        <div className="cjy-rld-tableBox">
          <div className="cjy-rld-headLine">
            <ResearchSelect text={'教研计划'} defaultValue={this.planStatus} selectData={this.planData} width={'160px'} handleSelect={this.handlePlanSelect} />
            <div className="cjy-rld-slct2">
              <ResearchSelect text={'课堂教研状态'} defaultValue={this.lessonStatus} selectData={lessonStateData} width={'116px'} handleSelect={this.handleLessonSelect} />
            </div>
            <div className="cjy-rld-selBox">
              <Input maxLength={10} className="cjy-rld-teaIpt" placeholder="授课者" onChange={this.teaChange} />
              <ResearchSearch defaultValue={this.resIpt} placeholder={'教研员'} resChange={this.resChange} search={this.search} />
            </div>
          </div>
          <Table
            columns={this.columns}
            dataSource={this.state.tableData}
            pagination={false}
            loading={this.state.loading} />
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
          {/* <div className="cjy-rld-numInfo">每页20条,共{this.total}条数据</div> */}
        </div>
      </div>
    );
  }

  /**
   * 
   * @param {Number} page 页数
   * 页数改变函数
   */
  onChange(page) {
    this.getData(page);
  };

  /**
   * 教研计划下拉框变化
   */
  handlePlanSelect = (value) => {
    this.planStatus = value;
    this.getData(1);
  };

  /**
   * 课堂教研状态下拉框变化
   */
  handleLessonSelect = (value) => {
    this.lessonStatus = value;
    this.getData(1);
  }

  /**
   * 授课教师输入框变化
   */
  teaChange = (e) => {
    this.teaIpt = e.target.value;
  };

  /**
   * 教研员输入框变化
   */
  resChange = (value) => {
    this.resIpt = value;
  };

  /**
   * 查询按钮
   */
  search = () => {
    this.getData(1);
  }

  /**
   * 跳转播放页
   */
  toPlay = (curriculumId, lessonState) => {
    if (lessonState !== '未开始') {
      window.open(`${Global.rootpath}/home#resr2/${curriculumId}/1`);
    } else {
      message.info('提示框', '课程暂未开始,请在课程开始后观看');
    }
  }

}

export default TpkResearchLessonDetail;