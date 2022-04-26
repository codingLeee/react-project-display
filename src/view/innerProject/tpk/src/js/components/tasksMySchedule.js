/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:02:18 
 * @Last Modified by: 蒲飞
 * @Last Modified time: 2018-03-20 10:03:35
 * 我的听评课表
 */
import React, { Component } from 'react';
import TasksMySchContent from './tasksMySchContent';
import _x from '../base/_x/api/api';
import { Global } from '../../js/base/g'
import { Button ,Spin} from 'antd';
import '../../css/components/tasksMySchedule.css';

class TasksMySchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isyellowselected: true,
      isorangeselected: true,
      ispurpleselected: true,
      isblueselected: true,
      weeks: 0,//切换上下周该展示的周次号
      curriculumall: [],
      lessonOrderMax: 0,
      totalWeek: 0,
      currentWeek: 1,
      toWeek:0,
      offset: 0,
      allWeeks: [],//当前学期的所有周次信息
      isabled: [false, false],//周次按钮的是否可用（默认false可用）
      isloading: true//是否加载（默认true加载）

    };
    this.teacherId = Global.baseinfo.teacherid;
    this.getWeekData = this.getWeekData.bind(this);
    this.handlePreWeek = this.handlePreWeek.bind(this);
    this.handleNextWeek = this.handleNextWeek.bind(this);
    this.onhandlechangeyellow = this.onhandlechangeyellow.bind(this);
    this.onhandlechangeoyrange = this.onhandlechangeorange.bind(this);
    this.onhandlechangepurple = this.onhandlechangepurple.bind(this);
    this.onhandlechangeblue = this.onhandlechangeblue.bind(this);
  }

  componentWillMount() {
    this.getWeekData();
    let req = {
      teacherId: this.teacherId,
      weeks: this.state.weeks + this.state.offset,
      offset: this.state.offset
    };
    this.getData(req);
  }

  //获取基础数据（周次）
  getWeekData() {
    const _this = this;
    if (!Global.loaded) {
      _x.env.one(document, _x.env.loaded, function (event) {
        _this.setState({
          allWeeks: event.detail.semester.weeks
        })
      });
    } else {
      this.setState({
        allWeeks: Global.semester.weeks
      })
    }
  }
//获取数据
  getData(req) {
    _x.util.request('/teacherJob/myTask', req, function (ret) {
      if (ret.result) {
        let resData = ret.data;
        let currmalls=resData.curriculumall;
        let classIndex=Object.keys(currmalls);
        // console.log(classIndex)
        let n=classIndex.length;
        let c=currmalls[classIndex[0]];
        let a=currmalls[Object.keys(currmalls).sort((a,b)=>a-b)[0]]
        let d=[];
        for(let i=0;i<n;i++){
          if(currmalls[classIndex[i]][0]){
          d.push(currmalls[classIndex[i]])//课表二维数据
          }else{
            d.push()
          }
        }
        this.setState({
          curriculumall: d||[],
          lessonOrderMax: resData.lessonOrderMax,
          totalWeek: resData.totalWeek,
          currentWeek: resData.currentWeek,
          weeks: req.weeks,
          offset: req.offset,
          isloading: false,
          toWeek:req.weeks?req.weeks:resData.currentWeek,
        });
        if(req.weeks==0){
          if (resData.currentWeek == 1) {
            this.setState({
              isabled: [true, false]
            });
          }else if (resData.currentWeek== resData.totalWeek) {
            this.setState({
              isabled: [false, true]
            });
          }else{
            this.setState({
              isabled: [false, false]
            });
          }
        }else{
          if (req.weeks == 1) {
            this.setState({
              isabled: [true, false]
            });
          }else if (req.weeks== resData.totalWeek) {
            this.setState({
              isabled: [false, true]
            });
          }else{
            this.setState({
              isabled: [false, false]
            });
          }
        }
      }
    }.bind(this));
  };
//点击上一周请求数据
  handlePreWeek() {
    let offset = this.state.offset - 1;
    let req = {};
    if (offset + this.state.currentWeek < 1) {
      return false;
    } else {
      if (offset + this.state.currentWeek == 1) {
        this.setState({
          isabled: [true, false]
        });
      } else {
        this.setState({
          isabled: [false, false]
        });
      }
      req = {
        teacherId: this.teacherId,
        weeks: offset + this.state.currentWeek,
        offset: offset
      };
      this.getData(req);
    };
  };
//点击下一周请求数据
  handleNextWeek() {
    var offset = this.state.offset + 1
    var req = {}
    if (offset + this.state.currentWeek > this.state.totalWeek) {
      return false;
    } else {
      if (offset + this.state.currentWeek == this.state.totalWeek) {
        this.setState({
          isabled: [false, true]
        });
      } else {
        this.setState({
          isabled: [false, false]
        });
      }
      req = {
        teacherId: this.teacherId,
        weeks: offset + this.state.currentWeek,
        offset: offset
      }
      // this.setState({
      //   isloading: true
      // })
    }
    this.getData(req);
  };
//黄色选中切换
  onhandlechangeyellow(e) {
    this.setState({
      isyellowselected: !this.state.isyellowselected
    })
  }
//橙色选中切换
  onhandlechangeorange(e) {
    this.setState({
      isorangeselected: !this.state.isorangeselected
    })
  }
//紫色选中切换
  onhandlechangepurple(e) {
    this.setState({
      ispurpleselected: !this.state.ispurpleselected
    })
  }
//蓝色选中切换
  onhandlechangeblue(e) {
    this.setState({
      isblueselected: !this.state.isblueselected
    })
  }


  render() {
    var weekIndex = this.state.weeks ? this.state.weeks - 1 : this.state.currentWeek - 1;
    var start = this.state.allWeeks.length ? this.state.allWeeks[weekIndex].start : '';
    var end = this.state.allWeeks.length ? this.state.allWeeks[weekIndex].end : '';
    const yellow = '#E1D123';
    const orange = '#FFA64C';
    const purple = '#887FFF';
    const blue = '#33AAFF';
    const gray = '#BCBCBC';
    const yellowc = this.state.isyellowselected ? yellow : gray;
    const orangec = this.state.isorangeselected ? orange : gray;
    const purplec = this.state.ispurpleselected ? purple : gray;
    const bluec = this.state.isblueselected ? blue : gray;
    let colors = [];
    colors = [yellowc, orangec, purplec, bluec];
    return (
      <div>
        <div className="pf-tk-schedule">
          <div className="pf-tk-title pf-tk-titlepadding">
            <span>我的听评课表</span>
          </div>
          <div className="pf-t-schedulecontainer">
            <div className="pf-t-schtitle">
              <Button size="large" className="pf-t-schbutton" onClick={this.handlePreWeek} disabled={this.state.isabled[0]}>上一周</Button>
              <Button size="large" className="pf-t-schbutton" onClick={this.handleNextWeek} disabled={this.state.isabled[1]}> 下一周</Button>
              <span className="pf-t-schdate">{`${new Date(start).format().split(' ')[0]} ~ ${new Date(end).format().split(' ')[0]}`}&nbsp;&nbsp;<span>(第{this.state.toWeek}周)</span></span>
              <div className="pf-t-schtypes">
                <ul className="pf-t-schtitltleft">
                  <li onClick={this.onhandlechangeyellow.bind(this)}><span className='pf-t-schtitletype' style={{ backgroundColor: yellowc }}></span><span className="pf-t-schtype">我的教研课</span></li>
                  <li onClick={this.onhandlechangeorange.bind(this)}><span className='pf-t-schtitletype' style={{ backgroundColor: orangec }}></span><span className="pf-t-schtype">我的随堂听</span></li>
                  <li onClick={this.onhandlechangepurple.bind(this)}><span className='pf-t-schtitletype' style={{ backgroundColor: purplec }}></span><span className="pf-t-schtype">教研评课</span></li>
                  <li onClick={this.onhandlechangeblue.bind(this)}><span className='pf-t-schtitletype' style={{ backgroundColor: bluec }}></span><span className="pf-t-schtype">随堂听课</span></li>
                </ul>
              </div>
            </div>
            {/*加载提示*/
          this.state.isloading ? <div className='pf-r-loading'><Spin /></div> : ''
            }
            <TasksMySchContent colors={colors} curriculumall={this.state.curriculumall} lessonOrderMax={this.state.lessonOrderMax} isloading={this.state.isloading}></TasksMySchContent> 
          </div>
        </div>
      </div>

    );
  }
};

export default TasksMySchedule;