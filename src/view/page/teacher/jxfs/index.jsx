/*
 * @Author: JC.Liu 
 * @Date: 2019-02-26 12:02:58 
 * @Last Modified by: xiangting
 * @Last Modified time: 2019-03-06 16:59:32
 * 老师 - 教学检查
 */

import React, { Component } from 'react';
import Edutitle from '../../../component/teacher/jxfs/Edutitle';
import TeachingOrder from '../../../component/teacher/jxfs/teachingOrder';
import TeachingQuality from '../../../component/teacher/jxfs/teachingQuality';
import Timetable from '../../../component/teacher/jxfs/timetable';
import Search from '../../../component/teacher/jxfs/search'
import '../../../../css/teacher/jxfs.scss'
class JxfsIndex extends Component {
  render() {
    return (
      <div className='clearfix' style={{background:'#fff'}}>
        <Search/>
        <Edutitle />
        <TeachingOrder />
        <TeachingQuality />
        <Timetable />
      </div>
    )
  }
}

export default JxfsIndex;