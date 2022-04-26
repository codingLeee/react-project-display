/*
 * @Author: 蒲飞 
 * @Date: 2017-09-19 18:59:11 
 * @Last Modified by: zhengqi
 * @Last Modified time: 2017-10-17 12:45:22
 * 我的教研课--教研课查询--查询的内容---每一周的教研课数据
 */
import React, { Component } from 'react';
import _ from 'lodash';
import SearchContentWeekCourse from '../components/searchContentWeekCourse';
import '../../css/components/researchContentWeek.css';

class ResearchContentWeek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      week: this.props.data,//所属周次
      allCourse: [],//本周次所有教研课
    };
  };

  render() {
    const week = this.props.data;
    return (
      <div className="pf-r-searchcontentscroll">
        <div name={'week' + week} id={'week' + week} className="pf-r-searchcontentcards">
          <div className="pf-r-searchcontentweek">
            <div className="pf-r-searchline">
              <div className="pf-r-searchcircle"></div>
              <div className="pf-r-searchbigcircle"></div>
            </div>
            <span className="pf-r-searchcontenttitle">第{Number(week).toChinese()}周</span>
          </div>
          {
            this.props.allCourse.map((course, index) => {
              if (course.weeks == week) {
                return <SearchContentWeekCourse key={index} data={course} statusType={this.props.statusType} selectedColor={this.props.selectedColor} flag={this.props.flag}></SearchContentWeekCourse>
              }

            })
          }
        </div>
      </div>

    );
  }
}

export default ResearchContentWeek;