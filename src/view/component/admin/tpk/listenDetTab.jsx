/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: xiangting
 * @Last Modified time: 2019-03-26 11:07:02
 * 听评课-管理员部分-随堂听任务-听课详情
 */
import React, { Component } from 'react';
import { Input, Button, Table, Icon, Select, message, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';
// import _x from '../base/_x/api/api.js';
import env from './../../../../js/_x/index.js';
// import { Global } from '../../js/base/g.js';
import { G } from './../../../../js/g.js';
import { SVG } from './../../../../base';
import util from './../../../../js/_x/index.js';

import './../../../../css/admin/mj_listenerOverTab.css';

const Request = util.util.request.request;
const toChinese = util.util.number.toChinese;
const one = env.env.one;
const loaded = env.env.loaded;
const InputGroup = Input.Group;
const Option = Select.Option;

class ListenDetTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seleFirValue: '1',    //开始周次
      seleSecValue: '1',    //结束周次
      lisState: '0',      //听课状态
      inpVal: this.props.teaName,          //输入框的值
      weeks: [],      //周次
      total: 0,       //数据总数
      tabData: [],     //表格数据
      loading: true,     //显示加载中
      curPage: 1        //当前页数
    };

    this.reuestTab = this.reuestTab.bind(this);
    this.seleFirChange = this.seleFirChange.bind(this);
    this.seleSecChange = this.seleSecChange.bind(this);
    this.stateChange = this.stateChange.bind(this);
    this.inpChange = this.inpChange.bind(this);
    this.search = this.search.bind(this);
    this.onPressEnter = this.onPressEnter.bind(this);
    this.pageChange = this.pageChange.bind(this);
    this.toPlay = this.toPlay.bind(this);
  };

  componentDidMount() {
    const _this = this;
    if (!G.loaded) {
      one(document, loaded, function (event) {
        // console.log(event.detail);
        _this.setState({
          weeks: event.detail.semester.weeks,
          seleSecValue: String(event.detail.currentWeek)
        })

        this.reuestTab(this.props.teaId, this.state.seleFirValue, String(event.detail.currentWeek), this.state.lisState, 1);
      });
    } else {
      // console.log(Global.semester.weeks);
      this.setState({
        weeks: [1, 2, 3, 4, 5, 6],
        // weeks: G.semester.weeks,
        seleSecValue: String(G.currentWeek)
      })

      this.reuestTab(this.props.teaId, this.state.seleFirValue, String(G.currentWeek), this.state.lisState, 1);
    }
  };

  // 表格数据  输入老师
  reuestTab(teaName, startWeek, endWeek, lisStatus, pages) {
    // console.log(teaName + '::' + startWeek + '::' + endWeek + '::' + lisStatus + '::' +pages);
    _x.util.request('api/web/listenJob/listenTeacherDetail', {
      'teacherId': teaName,
      'startWeeks': startWeek,
      'endWeeks': endWeek,
      'listenStatus': lisStatus,
      'pageSize': 20,
      'curPage': pages
    }, function (ret) {
      if (ret.result) {
    // const data = [
    //   {
    //     actureEndTime: 1551929400000,
    //     actureStartTime: 1551926700000,
    //     className: "教学班马克思201",
    //     classroomName: "201",
    //     commentFinished: 0,
    //     courseName: "马克思思想政治与社会主主义现代化建设概论",
    //     curriculumallId: "0e3b04aad5a85ff20efd51f779bfcd78",
    //     jobStatus: 2,
    //     lessonOrder: 4,
    //     listenTeacherName: "金毛",
    //     teachTeacherName: "王四",
    //     weekday: 4,
    //     weeks: 3,
    //   }
    // ]
    const data = ret.data;
    var tabData = [];
    data.map((item, index) => {
      // var weekDay = item.weekday === 7 ? '日' : Number(item.weekday).toChinese();
      var lisTime = `第${toChinese(item.weeks)}周/星期${item.weekday === 7 ? '日' : toChinese(item.weekday)}/第${toChinese(item.lessonOrder)}节`;
      var lisInfo = `${item.classroomName ? item.classroomName : '--'}/${item.className ? item.className : '--'}/${item.teachTeacherName ? item.teachTeacherName : '--'}/${item.courseName ? item.courseName : '--'}`;
      // var lisTime = `第${Number(item.weeks).toChinese()}周/星期${item.weekday === 7 ? '日' : Number(item.weekday).toChinese()}/第${Number(item.lessonOrder).toChinese()}节`;
      // var lisInfo = `${item.classroomName}/${item.className}/${item.teachTeacherName}/${item.courseName}`;
      var status = '';
      var startTime = new Date(item.actureStartTime);
      // var nowTime = new Date();

      // if(startTime > nowTime){
      //   console.log('未开始');
      // }else{
      //   console.log('we');
      // }
      //数据库字段及值被占用   后台此处使用两个字段来返回状态
      if (item.jobStatus === 1) {
        status = '已申请';
      } else if (item.jobStatus === 3) {
        status = '已驳回';
      } else {
        if (item.commentFinished === 1) {
          status = '已完成';
        } else if (item.commentFinished === 0) {
          status = '未完成';
        }
      }

      tabData.push({
        listenName: item.listenTeacherName ? item.listenTeacherName : '--',
        key: index,
        curriculumallId: item.curriculumallId,
        teachTime: lisTime,
        teachInfo: lisInfo,
        listenStatus: status,
        startTime: startTime
      })
    })

    this.setState({
      total: 90,
      total: ret.total,
      tabData: tabData,
      loading: false
    })
      }
    }.bind(this));
  }

  // 第一个周次选择
  seleFirChange(value) {
    // console.log(value);
    // console.log(this.state.seleSecValue);
    if (parseInt(value) <= parseInt(this.state.seleSecValue)) {
      this.reuestTab(this.state.inpVal, value, this.state.seleSecValue, this.state.lisState, 1);
      this.setState({
        seleFirValue: value,
        loading: true,
        curPage: 1
      })
    } else {
      // warning('开始周需小于等于结束周', 2000);
      message.info('操作提示', '开始周需小于等于结束周', function (resolve) {
        resolve();
      });
      this.setState({
        // seleFirValue: value,
        loading: false,
        // curPage: 1
      })
    }
  }
  // 第二个周次选择
  seleSecChange(value) {
    // console.log(this.state.seleFirValue);
    // console.log(value);
    if (parseInt(this.state.seleFirValue) <= parseInt(value)) {
      this.reuestTab(this.state.inpVal, this.state.seleFirValue, value, this.state.lisState, 1);
      this.setState({
        seleSecValue: value,
        loading: true,
        curPage: 1
      })
    } else {
      // warning('开始周需小于等于结束周', 2000);
      message.info('操作提示', '开始周需小于等于结束周', function (resolve) {
        resolve();
      });
      this.setState({
        // seleFirValue: value,
        loading: false,
        // curPage: 1
      })
    }
  }
  // 听课状态选择
  stateChange(value) {
    this.setState({
      lisState: value,
      loading: true,
      curPage: 1
    })
    this.reuestTab(this.state.inpVal, this.state.seleFirValue, this.state.seleSecValue, value, 1);
  }
  // 查询框输入
  inpChange(e) {
    this.setState({
      inpVal: e.target.value
    })
  }
  // 查询按钮
  search() {
    // console.log(this.state.inpVal);
    this.setState({
      loading: true,
      curPage: 1
    });
    this.reuestTab(this.state.inpVal, this.state.seleFirValue, this.state.seleSecValue, this.state.lisState, 1);
  }
  //回车搜索
  onPressEnter() {
    this.setState({
      loading: true,
      curPage: 1
    });
    this.reuestTab(this.state.inpVal, this.state.seleFirValue, this.state.seleSecValue, this.state.lisState, 1);
  }
  //改变页码
  pageChange(page, pageSize) {
    this.setState({
      loading: true,
      curPage: page
    });
    this.reuestTab(this.state.inpVal, this.state.seleFirValue, this.state.seleSecValue, this.state.lisState, page);
  }
  // 播放跳转
  toPlay(record) {
    // console.log(record);
    var nowTime = new Date();

    if (record.startTime > nowTime) {
      // console.log('未开始');
      message.info('提示框', '课程暂未开始,请在课程开始后观看', function (resolve) {
        resolve();
      });
    } else {
      const id = record.curriculumallId;

      // window.open(`${Global.rootpath}/home#resr2/${id}/2`);
    }
  }

  render() {
    // console.log(this.state.tabData);
    // 分页样式
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
        title: '听课员',
        dataIndex: 'listenName',
        width: 100,
        render: (text) => (
          <span title={text} className='mj-ldt-inlineBlock'>{text}</span>
        )
      }, {
        title: '听课时间(周/星期/节次)',
        dataIndex: 'teachTime',
        width: 380,
        render: (text) => (
          <span className='mj-ldt-overTime' title={text}>{text}</span>
        )
      }, {
        title: '听课信息(地点/班级/老师/科目)',
        dataIndex: 'teachInfo',
        width: 390,
        render: (text) => (
          <span title={text} className='mj-ldt-overInfo'>{text}</span>
        )
      }, {
      }, {
        title: '听课状态',
        dataIndex: 'listenStatus',
        width: 160
      }, {
        title: '操作',
        width: 70,
        render: (text, record) => (
          <span>
            <a href="javascript:;" className="cjy-rld-aBox" onClick={() => this.toPlay(record)}>
              <SVG type='bofang1' />
            </a>
          </span>
        ),
      }
    ];

    return (
      <div id='ListenDetTab' className='mj-lot-tabCon'>
        {/* 筛选 */}
        <div className='mj-lot-operate'>
          {/* 时间筛选 */}
          <div className='mj-lft-seleCon'>
            <span className='mj-lft-span'>时间筛选：</span>
            <InputGroup compact className='mj-lft-sele mj-ldt-sele1'>
              <Select
                getPopupContainer={() => document.getElementById('ListenDetTab')}
                value={this.state.seleFirValue}
                onChange={this.seleFirChange}>
                {
                  this.state.weeks.map((item, index) => (
                    <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
                  ))
                }
              </Select>
            </InputGroup>
            <span className='mj-ldt-span'>~</span>
            <InputGroup compact className='mj-lft-sele mj-ldt-sele2'>
              <Select
                getPopupContainer={() => document.getElementById('ListenDetTab')}
                value={this.state.seleSecValue}
                onChange={this.seleSecChange}>
                {
                  this.state.weeks.map((item, index) => (
                    <Option key={index} value={item.id}>{item.name}</Option>
                  ))
                }
              </Select>
            </InputGroup>
          </div>
          {/* 听课状态 */}
          <div className='mj-lft-seleCon mj-ldt-seleCon'>
            <span className='mj-lft-span'>听课状态：</span>
            <InputGroup compact className='mj-lft-sele'>
              <Select
                getPopupContainer={() => document.getElementById('ListenDetTab')}
                defaultValue={this.state.lisState}
                onChange={this.stateChange}>
                <Option value={'0'}>全部</Option>
                <Option value={'1'}>已申请</Option>
                <Option value={'2'}>已驳回</Option>
                <Option value={'3'}>已完成</Option>
                <Option value={'4'}>未完成</Option>
              </Select>
            </InputGroup>
          </div>
          {/* 查询框 */}
          <Input className='mj-lot-input' placeholder='听课员' defaultValue={this.props.teaName} onChange={this.inpChange} onPressEnter={this.onPressEnter} />
          <Button onClick={this.search}>查询</Button>
        </div>

        <div className='mj-lot-tab'>
          <Table
            columns={columns}
            loading={this.state.loading}
            dataSource={this.state.tabData}
            pagination={false}
          />
          <div className='ll-buttom'>
            <span className='ll-buttomSpan'>
              {`每页20条数据，共${this.state.total}条`}
            </span>
            <Pagination
              defaultCurrent={1}
              total={this.state.total}
              className='ll-PageStyle ll-Pg'
              itemRender={itemRender}
              pageSize={20}
              current={this.state.curPage}
              onChange={(page) => this.pageChange(page)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ListenDetTab;