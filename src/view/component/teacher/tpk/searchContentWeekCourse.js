/*
 * @Author: 蒲飞 
 * @Date: 2017-09-20 10:41:43 
 * @Last Modified by: yrj
 * @Last Modified time: 2019-03-26 16:46:03
 * 我的教研课--教研课查询--查询的内容---每一天的教研课数据
 */
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import _ from 'lodash';
import { message } from 'antd';
import { G } from './../../../../js/g';
import env from './../../../../js/_x/index.js';
const { one, loaded } = env.env.env;
import util from './../../../../js/_x/index.js';
const toChinese = util.util.number.toChinese;
import './../../../../css/teacher/mj_searchContentWeekCourse.css';

class SearchContentWeekCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusClass: '',//教研课状态颜色类
      rootpath: ''//网站根路径
    };
    this.getbaseData = this.getbaseData.bind(this);
  };

  //获取基础数据
  getbaseData() {
    const _this = this;
    if (!G.loaded) {
      one(document, loaded, function (event) {
        _this.setState({
          rootpath: event.detail.rootpath
        })
      });
    } else {
      this.setState({
        rootpath: G.rootpath
      })
    }
  }

  //去评论，写笔记操作是否有效判断
  handleHref(flag, item) {
    var timestamp = Date.parse(new Date());
    let startTime = item.actureStartTime;
    var date = new Date(startTime);
    var Y = date.getFullYear() + '年';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
    var D = date.getDate() + '日 ';
    var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
    var lessonStartTime = Y + M + D + h + m + s;
    if (startTime > timestamp) {
      message.info(`该课程尚未开始，请于${lessonStartTime}之后${flag ? '去点评' : '写笔记'}！`, 2);
    } else {
      window.open(`${this.state.rootpath}/home#resr1/${item.curriculumallId}/${flag ? 1 : 2}`);
    }
  }

  componentDidMount() {
    this.getbaseData();
    this.setState({
      statusClass: this.props.selectedColor(this.props.data.status)
    });
  };
  render() {
    const item = this.props.data;
    const color = this.props.selectedColor(this.props.data.status);
    return (
      <div className={this.props.statusType[this.props.data.status - 1] ? "pf-r-searchcontentweekcourse" : 'pf-r-searchcontentweekcourse zq-r-weekcoursegray'}>
        <div className="pf-r-searchcourseline">
          <div className="pf-r-searchcourseweekinfo">{`星期${item.weekday === 7 ? '日' : toChinese(item.weekday)}`}</div>
          <div className={this.props.statusType[this.props.data.status - 1] ? color : 'zq-r-gray'}></div>
        </div>
        <div className="pf-r-searchcoursecard">
          <div className="pf-r-searchcourseinfo">
            <ul className=' mj-clearfix'>
              <li>{item.researchPlanName}</li>
              <li>{`第${item.lessonOrderNum}节`}</li>
              <li>{item.teacherName}</li>
              <li>{item.courseName}</li>
              <li>{item.SubjectName}</li>
            </ul>
          </div>
          <div className="pf-r-searchcoursehandle">
            {
              this.props.statusType[this.props.data.status - 1] ? '' : <div className='zq-r-cover'></div>
            }
            {(() => {
              if (this.props.flag) {
                return item.commentFlag ? (item.commentFlag === 1 ? <a onClick={this.handleHref.bind(this, true, item)} href='javascript:void(0)'>未点评</a> : <Link to={`/myResearch/tpkTeachResearchComment/${item.teacherId}/${item.curriculumallId}`}>查看点评</Link>) : '';
              } else {
                return item.commentFlag ? (item.commentFlag === 1 ? <a onClick={this.handleHref.bind(this, false, item)} href='javascript:void(0)'>写笔记</a> : <Link to={`/myListen/tpkTeachListenComment/${item.teacherId}/${item.curriculumallId}`}>查看笔记</Link>) : '';
              }
            })()
            }

          </div>
        </div>
      </div >
    );
  }
}

export default SearchContentWeekCourse;