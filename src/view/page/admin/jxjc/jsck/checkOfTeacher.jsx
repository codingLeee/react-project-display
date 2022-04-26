/*
 * @Author: JC.Liu 
 * @Date: 2019-02-23 22:34:10 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-19 11:16:20
 * 教学检查 - 教师查课
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Input } from 'antd';
import { SVG } from './../../../../../base';
import util from './../../../../../js/_x/index.js'
import Mj_TeaTable from './../../../../component/admin/jxjc/mj_teaTable';
import { requestCollege, chanSele,  } from './../../../../../redux/checkOfTeacher.reducer.js';
import './../../../../../css/admin/mj_cheTea.css';
const Search = Input.Search;
const Option = Select.Option;
const toChinese = util.util.number.toChinese;

@connect(state => state.checkOfTeaReducer, { requestCollege, chanSele,  })
export class CheckOfTea extends Component {
  constructor(props) {
    super(props);
    this.collegeChan = this.collegeChan.bind(this);
    this.teacherChan = this.teacherChan.bind(this);
  }
  componentDidMount() {
    this.props.requestCollege();
    // console.log(toChinese(2))
  }

  collegeChan() { }
  teacherChan() { }

  render() {
    const { collegeData, teaData, college, teacher, search, week, weekNow, weekNum, tableData } = this.props;
    // console.log(college)
    return (
      <div id='checkOfTeacher' className='mj-cot-content'>
        {/* 筛选 */}
        <div className='mj-cot-seleCon'>
          <div className='mj-cot-sele'>
              <Select
              getPopupContainer={() => document.getElementById('checkOfTeacher')}
              value={college}
              className='mj-cot-all mj-cot-college'
              onChange={(val) => this.props.chanSele('college', val)}>
              {
                collegeData.length ?
                  collegeData.map((item,index) => {
                    return <Option key={index} value={item.crgUid}>{item.crgName}</Option>
                  }) : null
              }
            </Select> 
            <Select
              getPopupContainer={() => document.getElementById('checkOfTeacher')}
              value={teacher}
              className='mj-cot-all'
              onChange={(val) => this.props.chanSele('teacher', val)}>
              {
                teaData.length ?
                  teaData.map(item => {
                    return <Option key={item.teacherId} value={item.teacherId}>{item.teacherName}</Option>
                  }) : null
              }
            </Select> 
          </div>
          <div className='mj-cot-search'>
            <Search
              placeholder="请输入教师姓名"
              onSearch={value => this.props.chanSele('search', value)}
              style={{ width: 200 }}
            />
          </div>
        </div>

        {/* 表格 */}
        <div className='mj-cot-tableCon'>
          {/* 选择 */}
          <div className='mj-cot-tableSele'>
            <div className='mj-cot-left' onClick={() => this.props.chanSele('weekNow', weekNow)}>
              <SVG type='dizhi' />
              <span>返回本周</span>
            </div>
            <div className='mj-cot-right'>
              <span onClick={() => this.props.chanSele('week', week - 1)}>
                <SVG type='zuo' />
              </span>
              {/* {console.log(week)} */}
              <span>{`第${toChinese(week)}周`}</span>
              <span onClick={() => this.props.chanSele('week', week + 1)}>
                <SVG type='you' />
              </span>
            </div>
          </div>
          {/* 课表 */}
          {
            tableData.length ?
              <Mj_TeaTable /> :
              <div className='mj-tt-none'>
                <SVG type='wushuju' />
                <p>暂无数据，请选择老师查询数据！</p>
              </div>
          }
        </div>
      </div>
    )
  }
}
