/*
 * @Author: MinJ 
 * @Date: 2017-09-11 18:04:43 
 * @Last Modified by: xiangting
 * @Last Modified time: 2019-03-27 10:16:08
 * 听评课-管理员部分-随堂任务-听课本
 */
import React, { Component } from 'react';

import BreadCrumb from '../components/base/breadCrumb.js';
// import ResearchCommentInfo from '../components/researchCommentInfo.js';
import Diary from '../components/base/diary.js';

class ListenNote extends Component {
  render() {
    const name = this.props.match.params.name;
    const data = ['听评课', '随堂听任务', '听课员详情', `${name||'-'}的听课本`];
    var date = this.props.match.params.id;
    return (
      <div>
        <BreadCrumb data={data}></BreadCrumb>
        <div style={{marginTop:'20px'}}>
          <Diary teacherId={this.props.match.params.teaId} type={'listen'} curriculumallId='0'></Diary>
        </div>
      </div>
    );
  }
}

export default ListenNote;