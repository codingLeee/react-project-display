/*
 * @Author: JudyC 
 * @Date: 2017-09-12 15:18:11 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-11 13:15:45
 */
import React, { Component } from 'react';
import './../../../../css/admin/mj_researchTeacherLine.css';

class ResearchTeacherLine extends Component{
  render(){
    return (
      <div className="cjy-rtl-spanBox">
        {
          this.props.data.map((item,index)=>(
            <div className="cjy-rtl-nameBox" key={index}>
              <span>{item.teacherName}</span>
              <i className="iconfont cjy-rtl-close" onClick={this.handleDeleteTea.bind(this,index,item.teacherId)}>&#xe60b;</i>
            </div>
          )
        )}
      </div>
    );
  }
  handleDeleteTea(n,teacherId){
    this.props.handleDelete(n,teacherId);
  }
}

export default ResearchTeacherLine;