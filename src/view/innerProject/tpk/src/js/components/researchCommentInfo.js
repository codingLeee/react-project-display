/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:01:16 
 * @Last Modified by: 蒲飞
 * @Last Modified time: 2017-10-11 18:25:35
 * 教研点评笔记本
 */
import React, { Component } from 'react';
import Diary from '../../js/components/base/diary';
import _x from '../base/_x/api/api';
import { Global } from '../../js/base/g';
import '../../css/components/researchCommentInfo.css';

class ResearchCommentInfo extends Component{
  constructor(){
    super();
    this.state={
      techClass:[],//班级信息
      devalue:'',//班级默认第一个班级名称
      classID:''//班级第一个班级id
    };
    this.teacherId=Global.baseinfo.teacherid;
    this.getClassData = this.getClassData.bind(this);
    //this.getNoteData = this.getNoteData.bind(this);
  };

  componentWillMount(){
    this.getClassData();
    //this.getNoteData();
  };

  getClassData(){ 
    let req = {
      teacherId:this.teacherId
    };
    _x.util.request('/teacherJob/selectMyTechClass',req,function(ret){
      if(ret.result){
        let resData = ret.data;
        let devalue='';
        if(resData.techClass.length){
          devalue=resData.techClass[0].className;
        }else{
          devalue=''
        }
        
        this.setState({
         techClass:resData.techClass||[],
         devalue:devalue||'',
         classID:resData.techClass[0].classID||''
        });
      }
    }.bind(this));
  };

  // getNoteData(){ 
  //   let req = {
  //     teacherId:this.teacherId,
  //     classID:"888888_CZ_3_2018_3"
  //   };
  //   _x.util.request('/teacherJob/selectMyAllNote',req,function(ret){
  //     if(ret.result){
  //       let resData = ret;
  //       console.log(resData);
  //     }
  //   }.bind(this));
  // };

  render(){
    return (
      <div>
        <div className="pf-r-curricululinfo">
          <Diary techClass={this.state.techClass} defaultValue={this.state.devalue} classID={this.state.classID}></Diary>
        </div>
      </div>      
    );
  }
}

export default ResearchCommentInfo;
