/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:01:23 
 * @Last Modified by: yrj
 * @Last Modified time: 2019-03-27 10:06:03
 * 我的教研课--教研课详情+查询
 */
import React, { Component } from 'react';
import { G } from './../../../../js/g';
import util from './../../../../js/_x/index.js';
const Request = util.util.request.request;
import ResearchMySearchTitle from './researchMySearchTitle';
import ResearchMySearchContent from './researchMySearchContent';
import './../../../../css/teacher/mj_researchMySearchTeachInfo.css';

class ResearchMySearchTeachInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weeks: [],//所有周次
      allCourse: [],//所以教研课
      plans: [],//计划
      classes: [],//班级
      result: false,//有无相关数据（默认false无）
      isloading: true,//是否加载（默认true加载）
      clickIndex: 0//周次点击的索引号      
    };
    // this.teacherId = "100003";
    this.teacherId = G.baseinfo.teacherid;
    this.isScroll = true;//是否允许滚动事件执行
    this.getData = this.getData.bind(this);
    this.getconditionData = this.getconditionData.bind(this);
    this.getParams = this.getParams.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  //获取筛选条件数据
  getconditionData(path, flag) {
    // Request(path, { teacherId: this.teacherId }, function (ret) {
    //   if (ret.result) {
    if (flag) {
      let ret = {
        data: { researchPlan: [{ researchPlanName: "BBB", id: "6ce72d27-f5a6-4d46-869b-c2eb777e9656" }] }
      }
      ret.data.researchPlan.unshift({ id: '', researchPlanName: '全部' });
      if (this._isMounted) {
        this.setState({
          plans: ret.data.researchPlan
        });
      }
    } else {
      let ret = {
        data: { myTechLinkClass: [{ classID: "586AF7E24E1F06828871B2805B660248", className: "教学班马克思201" }] }
      }
      ret.data.myTechLinkClass.unshift({ classID: '', className: '全部' });
      if (this._isMounted) {
        this.setState({
          classes: ret.data.myTechLinkClass
        });
      }
    }
    //   } 
    // }.bind(this));
  };
  //根据条件查询
  getParams(val) {
    this.setState({
      isloading: true,
      clickIndex: 0
    });
    this.getData(val);
    document.getElementById('content').scrollTop = 0;
  };

  //周次的点击事件
  handleClick(index) {
    this.setState({
      clickIndex: index
    });
    this.isScroll = false;
  }

  //详情的滚动事件
  handleScroll() {
    if (this.isScroll) {
      var arr = [];
      var containertop = document.getElementById('content').scrollTop;
      var weekstop = document.getElementById('weeks').scrollTop;
      this.state.weeks.map((week, i) => {
        var itemtop = document.getElementById(`week${week}`).offsetTop - 100;
        if (itemtop <= containertop) {
          arr.push(itemtop);
        }
      });
      if (this.state.clickIndex !== arr.length - 1) {
        var itemtop = document.getElementById(`weekindex${arr.length - 1}`).offsetTop;
        if (itemtop <= weekstop) {
          document.getElementById(`weekindex${arr.length - 1}`).scrollIntoView();
        }
        if (itemtop - 520 >= weekstop) {
          document.getElementById(`weekindex${arr.length - 1}`).scrollIntoView();
        }

        this.setState({
          clickIndex: arr.length - 1
        });
      }
    } else {
      this.isScroll = true;
    }
  }

  //获取所有教研课数据
  getData(params) {
    // Request('teacherJob/searchTeachInfo', params, function (ret) {
    let ret = {
      result: true,
      data: {
        teachCourse: [
          {
            actureStartTime: 1551663900000,
            classID: "586AF7E24E1F06828871B2805B660248",
            className: "教学班马克思201",
            commentFlag: 0,
            courseId: "59b7de56fdf56e25f82cdd6523de61c9",
            courseName: "马克思思想政治与社会主主义现代化建设概论",
            curriculumallId: "ca03ecf65786e3528fda9dd7a077f950",
            lessonOrder: 3,
            researchPlanId: "6ce72d27-f5a6-4d46-869b-c2eb777e9656",
            researchPlanName: "BBB",
            status: 4,
            teacherId: "2018015",
            teacherName: "王四",
            weekday: 1,
            weeks: 3
          }
        ]
      }
    }
    if (ret.result) {
      //处理数据得到周次
      var weeksData = [], data = ret.data.teachCourse;
      for (var i = 0; i < data.length; i++) {
        if (i == 0) {
          weeksData.push(data[i].weeks)
        } else {
          if (data[i].weeks != data[i - 1].weeks) {
            weeksData.push(data[i].weeks)
          }
        }
      }
      if (this._isMounted) {
        this.setState({
          weeks: weeksData,
          allCourse: data,
          result: data.length ? true : false,
          isloading: false
        });
      }
    } else {
    }
    // }.bind(this));
  }

  componentDidMount() {
    //初始化获取全部教研课
    var params = {
      researchPlan: '', //计划Id
      classID: '',  //班级Id
      courseName: '', //科目
      teacherId: this.teacherId
    }
    this.getData(params);
    this.getconditionData('teacherJob/researchPlan', true);
    this.getconditionData('teacherJob /selectMyTechLinkClass', false);
  }

  componentWillMount() {
    this._isMounted = true;
  };
  componentWillUnmount() {
    this._isMounted = false
  };

  render() {
    return (
      <div>
        <div className="pf-r-search">
          {/* flag标识--true为我的教研课，false为随堂听 */}
          <ResearchMySearchTitle
            plans={this.state.plans}
            classes={this.state.classes}
            getParams={this.getParams}
            flag={true}>
          </ResearchMySearchTitle>
          <ResearchMySearchContent
            weeks={this.state.weeks}
            allCourse={this.state.allCourse}
            result={this.state.result}
            isloading={this.state.isloading}
            handleClicks={this.handleClick}
            handleScroll={this.handleScroll}
            clickIndex={this.state.clickIndex}>
          </ResearchMySearchContent>
        </div>
      </div>
    );
  }
}

export default ResearchMySearchTeachInfo;