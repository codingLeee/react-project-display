/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 09:58:48 
 * @Last Modified by: yrj
 * @Last Modified time: 2019-03-26 13:30:30
 * 听评课-教师部分-我的教研课-我的教研本
 */
import React, { Component } from 'react';
import { Breadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom';
import {G } from './../../../../js/g';
import Diary from './../../../component/diary';

class TpkTeachResearchComment extends Component {
  constructor(props) {
    super(props);    
    this.state={
      teacherId:G.baseinfo.teacherid,
      curriculumallId:''
    }
   };
   componentWillMount(){
    if(this.props.match.params.teacherId&&this.props.match.params.curriculumallId){
      this.setState({
        curriculumallId:this.props.match.params.curriculumallId
      })
    }else{
      this.setState({
        teacherId:G.baseinfo.teacherid,
        curriculumallId:''
      })
    }
  }  
  
  
  
  render() {
    return (
      <div>
        <div className="pf-t-breadcrumb">
          <Link to='/teacher/tpk/wdjyk' className='pf-t-breadbutton'>
            <Button type="primary" size='large'>返回</Button>
          </Link>
          <span className='pf-t-breadtitle'>当前位置：</span>
          <div className='pf-t-bread'>
            <Breadcrumb separator=">">
              <Breadcrumb.Item>我的教研课</Breadcrumb.Item>
              <Breadcrumb.Item>我的教研本</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <Diary teacherId={this.state.teacherId}  type={'research'} curriculumallId={this.state.curriculumallId}></Diary>
      </div>
    );
  }
}

export default TpkTeachResearchComment;