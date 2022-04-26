/*
 * @Author: 蒲飞 
 * @Date: 2017-09-11 18:06:49 
 * @Last Modified by: 蒲飞
 * @Last Modified time: 2017-09-13 16:46:25
 * 听评课-教师部分-我的教研课
 */
import React, { Component } from 'react';
import ResearchMyTeachInfo from '../../components/researchMyTeachInfo'
import ResearchMySearchTeachInfo from '../../components/researchMySearchTeachInfo'

class TpkTeacherResearch extends Component{
  render(){
    return (
      <div>
        <ResearchMyTeachInfo></ResearchMyTeachInfo>
        <ResearchMySearchTeachInfo></ResearchMySearchTeachInfo>
      </div>
    );
  }
}

export default TpkTeacherResearch;