/*
 * @Author: JC.Liu 
 * @Date: 2019-03-06 19:30:19 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-25 11:15:25
 * 课堂秩序报表 - 学院报表
 */
import React, { Component } from 'react'
// import ClsReportCol from './../../../../innerProject/stdsj/view/page/re_classroomReportCol';
import * as XybbCom from './../../../../component/admin/bigData/ktzxbb/xybb.tsx';
export default class Xybb extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <ClsReportCol /> */}
        <XybbCom.XybbCom />
      </React.Fragment>
    )
  }
}
