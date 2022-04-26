/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 09:56:36 
 * @Last Modified by: yrj
 * @Last Modified time: 2019-03-27 09:49:36
 * 听评课-教师部分-我的随堂听-随堂听笔记本
 */
import React, { Component } from 'react';
import { Breadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom';
import Diary from './../../../component/diary';
import {G} from './../../../../js/g';

class TpkTeachListenComment extends Component {
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
          <Link to='/teacher/tpk/wdsst' className='pf-t-breadbutton'>
            <Button type="primary" size='large'>返回</Button>
          </Link>
          <span className='pf-t-breadtitle'>当前位置：</span>
          <div className='pf-t-bread'>
            <Breadcrumb separator=">">
              <Breadcrumb.Item>我的随堂听</Breadcrumb.Item>
              <Breadcrumb.Item>我的听课本</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <Diary teacherId={this.state.teacherId} type={'listen'} curriculumallId={this.state.curriculumallId}></Diary>
      </div>
    );
  }
}

export default TpkTeachListenComment;