/*
 * @Author: JudyC 
 * @Date: 2017-09-11 17:57:39 
 * @Last Modified by: JudyC
 * @Last Modified time: 2017-10-13 10:57:23
 *  教研课任务情况组件
 */
import React, { Component } from 'react';
import { Icon, Radio } from 'antd';
import ReactEcharts from 'echarts-for-react';
import { Link } from 'react-router-dom';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import _x from '../base/_x/api/api';
import '../../css/components/researchLesson.css'

class ResearchLesson extends Component{
  constructor(){
    super();
    this.state={
      catalog:[],//Echarts数据
      finished:0,//已完成的数量
      unfinished:0,//未完成的
      notStart:0,//未开始的
      canClick:false//本周本月本学期是否可点击
    };
    this.timeType = '1';  //1本周，2 本月，3学期
    // this.canClick = true; //本周本月本学期是否可点击
    this.getData = this.getData.bind(this);
  };

  componentDidMount(){
    this.getData();
  };

  /**
   * 获取数据
   */
  getData(){
    this.setState({
      canClick:true
    });
    var req = {
      type:this.timeType
    };
    _x.util.request('/research_lesson/task/catalog',req,function(ret){
      this.setState({
        canClick:false
      });
      if(ret.result){
        var resData = ret.data;
        //重新构造数组
        var lessonNum = [];
        lessonNum.push({
          value:resData.finished,
          name:'已完成'
        });
        lessonNum.push({
          value:resData.notStart,
          name:'未开始'
        });
        lessonNum.push({
          value:resData.unfinished,
          name:'未完成'
        });
        this.setState({
          catalog:lessonNum,
          finished:resData.finished,
          notStart:resData.notStart,
          unfinished:resData.unfinished
        });
      }
    }.bind(this));
  };

  render(){
    return (
      <div className="cjy-rl-researchLesson">
        <div className="cjy-rl-title cjy-rl-clearfix">
          <span className="cjy-rl-left">教研课任务情况</span>
          <Link to='/reTasks/reLessonDe' className="cjy-rl-toDetail"><Icon className="cjy-rl-right" type="right"/></Link>
        </div>
        <Radio.Group className="cjy-rl-RadioGroup" value={this.timeType} onChange={this.changeType}>
          <Radio.Button value="1" disabled={this.state.canClick}>本周</Radio.Button>
          <Radio.Button value="2" disabled={this.state.canClick}>本月</Radio.Button>
          <Radio.Button value="3" disabled={this.state.canClick}>本学期</Radio.Button>
        </Radio.Group>
        <div className="cjy-rl-pie">
          <ReactEcharts style={{height:'170px'}} option={this.getOption(this.state.catalog)} />
        </div>
        <div className="cjy-rl-legend">
          <div className="cjy-rl-mt10"><span className="cjy-rl-box cjy-rl-finished"></span>&nbsp;已完成&nbsp;&nbsp;<div className="cjy-rl-sbox"><span className="cjy-rl-num">{this.state.finished}</span>个</div></div>
          <div className="cjy-rl-mt10"><span className="cjy-rl-box cjy-rl-unstart"></span>&nbsp;未开始&nbsp;&nbsp;<div className="cjy-rl-sbox"><span className="cjy-rl-num">{this.state.notStart}</span>个</div></div>
          <div className="cjy-rl-mt10"><span className="cjy-rl-box cjy-rl-unfinished"></span>&nbsp;未完成&nbsp;&nbsp;<div className="cjy-rl-sbox"><span className="cjy-rl-num">{this.state.unfinished}</span>个</div></div>
        </div>
      </div>
    );
  }

  /**
   * 本周本月本学期按钮切换
   */
  changeType = (e) => {
    this.timeType = e.target.value;
    this.getData();
  };

  /**
   * 
   * @param {Object} data Echarts数据
   */
  getOption(data){
    var Data = [];
    data.map(item=>{
      Data.push({
        value:item.value,
        name:item.name,
        labelLine:{
          normal:{
            show:true
          }
        },
        label:{
          normal:{
            show:true
          }
        }
      })
    });
    const option={
      series:[{
        type:'pie',
        hoverAnimation:false,
        // stillShowZeroSum:false,
        radius : '80%',
        center: ['50%', '55%'],
        data:Data
      }],
      color:['#00cc88','#ffb728','#f55450']
    };
    option.series[0].data.map(item=>{
      if (item.value == 0) {
        item.labelLine.normal.show = false;  
        item.label.normal.show = false;  
      }  
    })
    return option;
  };
}

export default ResearchLesson;