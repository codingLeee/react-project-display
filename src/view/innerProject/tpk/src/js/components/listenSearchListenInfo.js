/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:00:18 
 * @Last Modified by: 蒲飞
 * @Last Modified time: 2017-10-20 17:12:36
 * 我的随堂听---随堂听详情+查询
 */
import React, { Component } from 'react';
import _x from '../base/_x/api/api';
import { Global } from '../../js/base/g';
import ResearchMySearchTitle from '../components/researchMySearchTitle';
import ListenSearchListenContent from '../components/listenSearchListenContent';
import '../../css/components/researchMySearchTeachInfo.css'

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
    // this.teacherId = '100001';
    this.teacherId = Global.baseinfo.teacherid;
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
    _x.util.request(path, { teacherId: this.teacherId }, function (ret) {
      if (ret.result) {
        ret.data.myListenLinkClass.unshift({ classID: '', className: '全部' });
        if (this._isMounted) {
          this.setState({
            classes: ret.data.myListenLinkClass
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
          document.getElementById(`weekindex${ arr.length - 1}`).scrollIntoView();
        }
        if(itemtop-520>=weekstop){
          document.getElementById(`weekindex${ arr.length - 1}`).scrollIntoView();
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
    _x.util.request('teacherJob/searchListenInfo', params, function (ret) {
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
    this.getconditionData('teacherJob/selectMyListenLinkClass');
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