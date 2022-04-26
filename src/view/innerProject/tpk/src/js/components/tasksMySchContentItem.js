/*
 * @Author: 蒲飞 
 * @Date: 2017-09-21 10:21:27 
 * @Last Modified by: 蒲飞
 * @Last Modified time: 2018-03-20 09:29:58
 */
import React, { Component } from 'react';
import _x from '../base/_x/api/api';
import { Global } from '../../js/base/g';
import { info,warning,confirm } from '../components/base/modal';
import _ from 'lodash';
import '../../css/components/tasksMySchContentItem.css';
import { pointerEnter } from '../base/_x/env/env';
//多与一条数据不同类型课匹配颜色方法
function whichColor(color,colorinfos){
  switch(color){
    case 1:
      return colorinfos[0];
      break;
    case 2:
     return colorinfos[1];
      break;
    case 3:
     return colorinfos[2];
      break;
    case 4:
     return colorinfos[3];
      break;
  }
}
//多余一条数据跳转链接处理方法
function whichHref(actureStartTime,type,curriculumallId,rootpath){
    var timestamp = Date.parse(new Date());
    let startTime=actureStartTime;
    if(startTime>timestamp){
      return ''
    }else{
      switch(type){
        case 1:
          return `${rootpath}/home#reflection/toMyTaskVideo3?curriculumallId=${curriculumallId}`;
          break;
        case 2:
        return `${rootpath}/home#reflection/toMyTaskVideo3?curriculumallId=${curriculumallId}`;
          break;
        case 3:
        return `${rootpath}/home#resr1/${curriculumallId}/1`;
          break;
        case 4:
        return `${rootpath}/home#resr1/${curriculumallId}/2`;
          break;
      };
    }    
}
//多余一条数据时间处理方法
function whichStartTime(actureStartTime){
  var date = new Date(actureStartTime);
  var Y = date.getFullYear() + '年';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
  var D = date.getDate() + '日 ';
  var h = (date.getHours()< 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
  var m = (date.getMinutes()< 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
  var s = (date.getSeconds()< 10 ? '0'+(date.getSeconds()) : date.getSeconds()); 
  return Y+M+D+h+m+s;
}
class TasksMySchContentItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      className:'',
      rootpath: '',//网站根路径,
      visible:false//弹出框显示与否
    }
    this.getbaseData=this.getbaseData.bind(this);
    this.handleHref=this.handleHref.bind(this);
  }
 
  componentWillMount(){
    this.getbaseData();
  };

  //获取基础数据
  getbaseData() {
    const _this = this;
    if (!Global.loaded) {
      _x.env.one(document, _x.env.loaded, function (event) {
        _this.setState({
          rootpath: event.detail.rootpath
        })
      });
    } else {
      this.setState({
        rootpath: Global.rootpath
      })
    }
  }

  handleHref(href,lessonStartTime){
      if(href){
        window.open(href);
      }else{
        info('提示框',`该课程尚未开始，请于${lessonStartTime}查看！`,3000);
      }           
  }
  menuMore(){
    this.setState({
      visible:true
    })
  }
  mouseLeave(){
    this.setState({
      visible:false
    })
  }

  render(){
    let classInfo=this.props.classInfo;
    let href='';
    var timestamp = Date.parse(new Date());
    let startTime=this.props.actureStartTime;
    //时间处理
    var date = new Date(startTime);
    var Y = date.getFullYear() + '年';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
    var D = date.getDate() + '日 ';
    var h = (date.getHours()< 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
    var m = (date.getMinutes()< 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
    var s = (date.getSeconds()< 10 ? '0'+(date.getSeconds()) : date.getSeconds()); 
    var lessonStartTime=Y+M+D+h+m+s;
    //跳转链接处理
    if(startTime>timestamp){
      href="";
    }else{
      switch(this.props.type){
        case 1:
          href=`${this.state.rootpath}/home#reflection/toMyTaskVideo3?curriculumallId=${this.props.curriculumallId}`;
          break;
        case 2:
          href=`${this.state.rootpath}/home#reflection/toMyTaskVideo3?curriculumallId=${this.props.curriculumallId}`;
          break;
        case 3:
          href=`${this.state.rootpath}/home#resr1/${this.props.curriculumallId}/1`;
          break;
        case 4:
          href=`${this.state.rootpath}/home#resr1/${this.props.curriculumallId}/2`;
          break;
      };
    }    
    let colorinfos=this.props.colors;
    let bgcolor='';
    //不同类型颜色处理
    switch(this.props.color){
      case 1:
        bgcolor=colorinfos[0];
        break;
      case 2:
        bgcolor=colorinfos[1];
        break;
      case 3:
        bgcolor=colorinfos[2];
        break;
      case 4:
        bgcolor=colorinfos[3];
        break;
    }
    return (
      <div>        
        {
          this.props.color === 'grey'
          ? <div className="cjy-ci-item cjy-ci-grey" style={{}}>{this.props.text}</div>
          : this.props.color === 'dsbd'
            ? <div className="cjy-ci-item cjy-ci-dsbd">{this.props.text}</div>
            :
            this.props.classInfo.length==1?(this.props.status === 0?
              <a onClick={this.handleHref.bind(this,href,lessonStartTime)}>
                <div className="cjy-ci-item" style={{backgroundColor:bgcolor}}>
                  <ul>
                    <li><span className='pf-t-myschcoursebig'>{this.props.classname}</span></li>
                    <li><span>{this.props.coursename}</span></li>
                  </ul>
                </div>
              </a>
              :<a onClick={this.handleHref.bind(this,href,lessonStartTime)}>
                <div className="cjy-ci-item pf-t-myschtable" style={{backgroundColor:bgcolor}}>
                  <ul>
                    <li><span className='pf-t-myschcoursebig'>{this.props.classname}</span></li>
                    <li><span>{this.props.coursename}</span></li>
                  </ul>
                <div className="pf-t-mySchFinish"><span>已完成</span></div>
                </div>
              </a>):(this.props.status===0?
                <div className="cjy-ci-item " style={{backgroundColor:bgcolor}} onMouseEnter={this.menuMore.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>
                <ul>
                    <li><span className='pf-t-myschcoursebig'>{this.props.classname}</span></li>
                    <li><span>{this.props.coursename}</span></li>
                  </ul>
                  {
                    this.state.visible?
                    <div className="pf-t-alltip">
                    {
                     this.props.classInfo.map((item,i)=>{
                      return  <div key={i} onClick={this.handleHref.bind(this,whichHref(item.actureStartTime,item.type,item.curriculumallId,this.state.rootpath),whichStartTime(item.actureStartTime))}
                       style={{backgroundColor:whichColor(item.type,this.props.colors)}}>{item.className}---{item.courseName}&nbsp;&nbsp;
                        <div className="pf-t-mySchFinishMore"><span>{item.status==0?'':'已完成'}</span></div>
                       </div>
                      })
                    }
                    </div>:
                    null
                  }
                </div>:
                <div className="cjy-ci-item " style={{backgroundColor:bgcolor}} onMouseEnter={this.menuMore.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>
                <div className="pf-t-mySchFinishSmall"><span>已完成</span></div>
                <ul style={{padding:0}}>
                    <li><span className='pf-t-myschcoursebig'>{this.props.classname}</span></li>
                    <li><span>{this.props.coursename}</span></li>
                  </ul>
                  {
                    this.state.visible?
                    <div className="pf-t-alltip">
                    {
                     this.props.classInfo.map((item,i)=>{
                      return  <div key={i} onClick={this.handleHref.bind(this,whichHref(item.actureStartTime,item.type,item.curriculumallId,this.state.rootpath),whichStartTime(item.actureStartTime))}
                       style={{backgroundColor:whichColor(item.type,this.props.colors)}}>{item.className}---{item.courseName}&nbsp;&nbsp;
                        <div className="pf-t-mySchFinishMore"><span>{item.status==0?'':'已完成'}</span></div>
                       </div>
                      })
                    }
                    </div>:
                    null
                  }
                </div>)
        }
      </div>
    );
  }
}

export default TasksMySchContentItem;