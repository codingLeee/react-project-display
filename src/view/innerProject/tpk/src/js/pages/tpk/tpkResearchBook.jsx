/*
 * @Author: JudyC 
 * @Date: 2017-10-11 14:30:15 
 * @Last Modified by: xiangting
 * @Last Modified time: 2019-03-27 10:14:29
 * 教研本页面
 */
import React, { Component } from 'react';
import BreadCrumb from '../../components/base/breadCrumb.js';
import Diary from '../../components/base/diary.js';

class TpkResearchBook extends Component {
  render() {
    const name = this.props.match.params.name;
    const data = ['听评课', '教研任务', '教研员详情', `${name||'-'}的教研本`];
    return (
      <div>
        <BreadCrumb data={data}></BreadCrumb>
        <div style={{ marginTop: '20px' }}>
          <Diary teacherId={this.props.match.params.teaId} type={'research'} curriculumallId='0'></Diary>
        </div>
      </div>
    );
  }
}

export default TpkResearchBook;