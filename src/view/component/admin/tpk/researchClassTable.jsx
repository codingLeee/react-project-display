/*
 * @Author: JudyC 
 * @Date: 2017-09-12 15:17:26 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-14 14:29:29
 */
import React, { Component } from 'react';
import util from './../../../../js/_x/index.js';
const toChinese = util.util.number.toChinese;
import ClassItem from './classItem';
import './../../../../css/admin/mj_researchClassTable.css';

let classDataArray = [];

const classNumTotal =  15 ;

for(let i=0;i<classNumTotal;i++){
  classDataArray[i]=[];
  for(var j=0;j<7;j++){
    classDataArray[i][j]=[];
  };
};

class ResearchClassTable extends Component{

  componentWillReceiveProps() {
    for(let i=0;i<classNumTotal;i++){
      classDataArray[i]=[];
      for(var j=0;j<7;j++){
        classDataArray[i][j]=[];
      };
    };
  }

  render(){
    if(this.props.classInfo.length){
      this.props.classInfo.map((item)=>{
        classDataArray[item.lessonOrder - 1][item.dayOfWeek - 1] = item;
      })
    }else{
      for(let i=0;i<classNumTotal;i++){
        for(var j=0;j<7;j++){
          classDataArray[i][j]={};
        }
      }
    } 
    
    return (
      <div>
        <div className="cjy-rct-tableHead">
          <span className="cjy-rct-headSpan cjy-rct-headSpan1">
            <span className="cjy-rct-rightTop">星期</span>
            <span className="cjy-rct-leftBtm">节次</span>
          </span>
          <span className="cjy-rct-headSpan">星期一</span>
          <span className="cjy-rct-headSpan">星期二</span>
          <span className="cjy-rct-headSpan">星期三</span>
          <span className="cjy-rct-headSpan">星期四</span>
          <span className="cjy-rct-headSpan">星期五</span>
          <span className="cjy-rct-headSpan">星期六</span>
          <span className="cjy-rct-headSpan">星期日</span>
        </div>
        <div className="cjy-rct-table">
          <div className="cjy-rct-classNum">
            {
              classDataArray.map((item,index)=>(
                <ClassItem key={index} text={`第${toChinese(index + 1)}节`} color="grey"></ClassItem>
              ))
            }
          </div>
          <div className="cjy-rct-classTable">
            {
              classDataArray.map((item,index)=>{
                return(
                classDataArray[index].map((item,index)=>{
                  return (item.subjectShortName == null
                  ? (<ClassItem key={index} text="" color="dsbd"></ClassItem>)
                  : (<ClassItem key={item.id} text={`${item.subjectShortName}_${item.teacherName}`} color={item.status} classInfo={item} handleClassChange={this.handleClassChange.bind(this)}></ClassItem>))
                })
              )})
            }
          </div>
        </div>
      </div>
    );
  }
  handleClassChange(oprt,classInfo){
    this.props.handleClassChange(oprt,classInfo);
  };
}

export default ResearchClassTable;