/*
 * @Author: JC.Liu 
 * @Date: 2019-03-06 19:30:19 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-12 10:08:30
 * 课堂质量报表 - 学院报表
 */
import React, { Component } from 'react'
import QuaReportCol from './../../../../innerProject/stdsj/view/page/re_qualityReportCol';

export default class Xybb extends Component {
  render() {
    return (
      <div>
        课堂质量报表 - 学院报表  该组件与课堂秩序报表-学院报表共用组件
        <QuaReportCol />
      </div>
    )
  }
}
