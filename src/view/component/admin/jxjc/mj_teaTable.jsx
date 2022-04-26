/*
 * @Author: MinJ
 * @Date: 2019-03-01 10:57:50
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-19 11:16:20
 * 教学检查 - 教师查课 - 课表
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import util from './../../../../js/_x/index.js';
import './../../../../css/admin/mj_cheTeaTable.css';
const toChinese = util.util.number.toChinese;

@connect(state => state.checkOfTeaReducer, {})
export default class Mj_TeaTable extends Component {
  render() {
    const { tableLesson, tableData, tableTitle } = this.props;
    // console.log(tableData)
    return (
      <div>
        {/* 头部 */}
        <div className='mj-tt-headCon mj-clearfix'>
          <div className='mj-tt-headSpan'>
            <span>星期</span>
            <span>节次</span>
          </div>
          {
            tableTitle.length ?
              tableTitle.map((item, index) => {
                return <div key={index} className='mj-tt-title'>
                  <span>{item.weekday}</span>
                  <span>{item.date}</span>
                </div>
              }) : null
          }
        </div>
        <div className='mj-tt-tableCon mj-clearfix'>
          {/* 节次 */}
          <div className='mj-tt-lessonCon'>
            {
              tableLesson.length ?
                tableLesson.map(item => {
                  return <div key={item}>{`第${toChinese(item)}节`}</div>
                }) : null
            }
          </div>
          {/* 内容 */}
          <div className='mj-tt-lessons mj-clearfix'>
            {
              tableData.length ?
                tableData.map((item, index) => {
                  return <div
                    key={index}
                    className={
                      item ?
                        item.ifClick === 2 ? 'mj-tt-lesson mj-tt-now' :
                          item.ifClick === 0 ? 'mj-tt-lesson mj-tt-no' : 'mj-tt-lesson mj-tt-oblique'
                        : 'mj-tt-lesson'
                    }>
                    <p className='mj-ellip'>{item ? item.course : null}</p>
                    <p className='mj-ellip'>{item ? item.adress : null}</p>
                  </div>
                }) : null
            }
          </div>
        </div>
      </div>
    )
  }
}
