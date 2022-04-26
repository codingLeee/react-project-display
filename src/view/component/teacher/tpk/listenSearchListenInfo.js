/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:00:18 
 * @Last Modified by: yrj
 * @Last Modified time: 2019-03-27 10:09:23
 * 我的随堂听---随堂听详情+查询
 */
import React, { Component } from 'react';
import { G } from './../../../../js/g';
import util from './../../../../js/_x/index.js';
import ResearchMySearchTitle from './researchMySearchTitle';
import ListenSearchListenContent from './listenSearchListenContent.jsx';
import './../../../../css/teacher/mj_researchMySearchTeachInfo.css';
const Request = util.util.request.request;
class ListenSearchListenInfo extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      weeks: [],//所有周次
      allCourse: [],//所以教研课
      classes: [],//班级
      result: false,//有无相关数据（默认false无）
      isloading: true,//是否加载（默认true加载）
      clickIndex: 0//周次点击的索引号
    };
    
    this.teacherId = G.baseinfo.teacherid;
    console.log(this.teacherId,'教师身份');
    this.t = '';
    this.isScroll = true;//是否允许滚动事件执行
    this.getconditionData = this.getconditionData.bind(this);
    this.getParams = this.getParams.bind(this);
    this.getData = this.getData.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  //获取筛选条件数据
  getconditionData(path) {
   
     Request(path, { teacherId: this.teacherId }, function (ret) {
    // let ret = {
    //   result: true,
    //   data: {
    //     myListenLinkClass: [
    //       { classID: "9387E84E4BFB55B98397A68A259B9495", className: "教学班ERP101" },
    //       { classID: "586AF7E24E1F06828871B2805B660248", className: "教学班马克思201" }
    //     ]
    //   }
    // }
    if (ret.result) {
      ret.data.listenClass.unshift({ CurClassID:'', CurClassName: '全部' });
      if (this._isMounted) {
        this.setState({
          classes: ret.data.listenClass
        });
      }
    } else {
    }
     }.bind(this));
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
      var arr = []
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
   Request('api/web/teacherJob/search_listen_info', params, function (ret) {

    console.log(ret.data);
    // let ret = {
    //   result: true,
    //   data: {
    //     teachCourse: [
    //       {
    //         actureStartTime: 1551840300000,
    //         classID: "586AF7E24E1F06828871B2805B660248",
    //         SubjectName className: "教学班马克思201",
    //         commentFlag: 0,
    //         courseId: "59b7de56fdf56e25f82cdd6523de61c9",
    //         courseName: "马克思思想政治与社会主主义现代化建设概论",
    //         curriculumallId: "4674fa61131436e0506ffc7a4b04af4a",
    //        lessonOrderNum  lessonOrder: 4,
    //         status: 4,
    //         teacherId: "2018015",
    //         teacherName: "王四",
    //         weekday: 3,
    //         weeks: 3
    //       },
    //       {
    //         actureStartTime: 1552348800000,
    //         classID: "9387E84E4BFB55B98397A68A259B9495",
    //         className: "教学班ERP101",
    //         commentFlag: 0,
    //         courseId: "a96da44c5e8eff7594295ea93f91e4bc",
    //         courseName: "ERP沙盘实践",
    //         curriculumallId: "278818588bbfd76d348f1a945b3048c7",
    //         lessonOrder: 1,
    //         status: 1,
    //         teacherId: "2018012",
    //         teacherName: "王一",
    //         weekday: 2,
    //         weeks: 4
    //       }
    //     ]
    //   }
    // }
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
     }.bind(this));
  }
  componentDidMount() {
    //初始化获取全部随堂听
    var params = {
      classID: '',  //班级Id
      courseName: '', //科目
      teacherId: this.teacherId
    }
    this.getData(params);
    this.getconditionData('api/web/teacherJob/select_my_listen_class');
  }

  componentWillMount() {
    this._isMounted = true;
  };
  componentWillUnmount() {
    this._isMounted = false;
  };

  render() {
    return (
      <div>
        <div className="pf-r-search">
          {/* flag标识--true为我的教研课，false为随堂听 */}

          <ResearchMySearchTitle classes={this.state.classes} getParams={this.getParams} flag={false}></ResearchMySearchTitle>
          <ListenSearchListenContent weeks={this.state.weeks} allCourse={this.state.allCourse} result={this.state.result} isloading={this.state.isloading} handleClicks={this.handleClick} handleScroll={this.handleScroll} clickIndex={this.state.clickIndex}></ListenSearchListenContent>
        </div>
      </div>

    );
  }
}

export default ListenSearchListenInfo;