/*
 * @Author: JudyC 
 * @Date: 2017-09-11 17:59:57 
 * @Last Modified by: JudyC
 * @Last Modified time: 2017-10-13 10:59:29
 * 教研员任务情况组件
 */
import React, { Component } from 'react';
import { Icon } from 'antd';
import ReactEcharts from 'echarts-for-react';
import ListenTeaInfo from '../components/base/listenTeaInfo';
import { Link } from 'react-router-dom';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import _x from '../base/_x/api/api';
import '../../css/components/researchers.css'
import '../../css/components/base/listenTeaInfo.css'

class Researchers extends Component{
  constructor(){
    super();
    this.state = {
      finished:0,   //已完成
      unfinished:0, //未完成数目
      top3:[],      //排名前3
      bottom3:[]    //排名后3
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount(){
   this.getData();
  };

  /**
   * 获取数据
   */
  getData(){
    _x.util.request('/research_lesson/teacher/catalog',{},function(ret){
      if(ret.result){
        var resData = ret.data;
        var top3 = resData.top3;
        var bottom3 = resData.bottom3;
        // 听课数最多补加
        if (top3.length < 3) {
          for (var i = 0,len=3-top3.length; i < len; i++) {
            top3.push({
              finished:'',
              id:"",
              teacherName:"",
              unfinished:'',
            });
          }
        }
        if (bottom3.length < 3) {
          for (var i = 0,len=3-bottom3.length; i < len; i++) {
            bottom3.push({
              finished:'',
              id:"",
              teacherName:"",
              unfinished:'',
            });
          }
        }
        this.setState({
          finished:resData.finished,
          unfinished:resData.unfinished,
          top3:top3,
          bottom3:bottom3
        })
      }
    }.bind(this));
  }

  render(){
    return (
      <div className="cjy-r-researchers">
        <div className="cjy-r-title cjy-r-clearfix">
          <span className="cjy-r-left">教研员任务情况</span>
          <Link to='/reTasks/rePerDe' className="cjy-r-toDetail"><Icon className="cjy-r-right" type="right"/></Link>
        </div>
        <div className="cjy-r-finishPercent">
          <ReactEcharts style={{width:'140px',height:'180px'}} option={this.getOption(this.state.finished,this.state.unfinished)} />
          <div className="cjy-r-textcenter">完成人员&nbsp;&nbsp;<span className="cjy-r-num">{this.state.finished}</span>人</div>
          <div className="cjy-r-textcenter">任务涵盖人员&nbsp;&nbsp;<span className="cjy-r-num">{this.state.finished + this.state.unfinished}</span>人</div>
        </div>
        <div className="cjy-r-teacherInfo">
          <div className="cjy-r-textleft">完成度较高的教研员</div>
          <div className="cjy-r-clearfix">
            {
              this.state.top3.map((item,index)=>(
                <ListenTeaInfo thePer={'cjy'} data={item} num={index} key={index} finished={item.finished} all={item.finished + item.unfinished}/>
              ))
            }
          </div>
          <div className="cjy-r-textleft">完成度较低的教研员</div>
          {
            this.state.bottom3.map((item,index)=>(
              <ListenTeaInfo thePer={'cjy'} data={item} num={index+3} key={index+3} finished={item.finished} all={item.finished + item.unfinished}/>
            ))
          }
        </div>
      </div>
    );
  };

  /**
   * 
   * @param {Number} n1 已完成
   * @param {Number} n2 未完成
   */
  getOption(n1,n2){
    var total = n1 + n2;
    var val = 0;
    if(total!==0){
      val = n1/total;
    }else{
      val = 0;
    }
    const option = {
      title:{
        text:'教研员任务完成度',
        textStyle:{
          fontWeight:'normal',
          fontSize:14,
          fontFamily:'微软雅黑',
          align:'center'
        },
        bottom:'0'
      },
      series: [{
        name: '来源',
        type: 'pie',
        hoverAnimation:false,
        clickable:false,
        radius: ['70%', '90%'],
        label: {
          normal: {
            show: false
          }
        },
        data: [{
          value: val,
          name: '已完成',
          itemStyle:{
            emphasis:{
              color:'#00cc88',           
            }
          },
          label: {  
            normal: {
              show: true,
              position: 'center',                
              fontWeight: 'normal',
              fontSize:20,
              formatter:'{d}%'
            }
          }
        },{
            value:1 - val,
            itemStyle:{
              emphasis:{
                color:'#ebebeb'            
              }
            },
            name:'未完成'
          }
        ]
      }],
      color:['#00cc88','#ebebeb']
    }
    return option;
  }
}

export default Researchers;