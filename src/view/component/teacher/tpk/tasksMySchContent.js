/*
 * @Author: 蒲飞 
 * @Date: 2017-09-15 16:04:44 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-13 11:23:04
 * 我的任务-我的任务表-课表
 */
import React, { Component } from 'react';
import TasksMySchContentItem from './tasksMySchContentItem';
import './../../../../css/admin/mj_researchClassTable.css';
import './../../../../css/teacher/mj_tasksMySchContent.css';

class TasksMySchContent extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
    let classInfo=this.props.curriculumall;
    let lessonOrderMax =this.props.lessonOrderMax;//总节次
    let classDataArray = [];
    for(let i=0;i<lessonOrderMax;i++){
      classDataArray[i]=[]
      for(var j=0;j<7;j++){
        classDataArray[i][j]=[]
      }
    }
    classInfo.map((item,index)=>{
      classDataArray[item[0].lessonOrder - 1][item[0].weekday - 1] = item;//只获取一条数据
    })
    return (      
      <div className="pf-r-schedulecontent">
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
                <TasksMySchContentItem key={index} text={`第${Number(index + 1).toChinese()}节`} color="grey"></TasksMySchContentItem>
              ))
            }
          </div>          
          <div className="cjy-rct-classTable">          
            {
              classDataArray.map((item,index)=>{
                return(
                classDataArray[index].map((item,index)=>{
                  return (item.length == 0
                  ? (<TasksMySchContentItem text="" color="dsbd"></TasksMySchContentItem>)
                  : (<TasksMySchContentItem key={item[0].id}  data={classDataArray} classname={item[0].className} curriculumallId={item[0].curriculumallId} coursename={item[0].courseName} status={item[0].status} 
                    color={item[0].type} colors={this.props.colors} classInfo={item} type={item[0].type} actureStartTime={item[0].actureStartTime}></TasksMySchContentItem>))
                  
                })
              )})
            }
          </div>
        </div>
      </div>
    );
  }
}


export default TasksMySchContent;
