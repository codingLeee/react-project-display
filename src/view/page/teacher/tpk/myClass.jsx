/*
 * @Author: MinJ
 * @Date: 2017-09-11 18:06:49 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-13 15:54:22
 * 听评课-教师部分-我的教研课
 */
import React, { Component } from 'react';
import ResearchMyTeachInfo from './../../../component/teacher/tpk/researchMyTeachInfo.js';
import ResearchMySearchTeachInfo from './../../../component/teacher/tpk/researchMySearchTeachInfo.js';

export class MyClass extends Component {
  render() {
    return (
      <div>
        <ResearchMyTeachInfo></ResearchMyTeachInfo>
        <ResearchMySearchTeachInfo></ResearchMySearchTeachInfo>
      </div>
    );
  }
}