/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 09:58:48 
 * @Last Modified by: 蒲飞
 * @Last Modified time: 2017-10-17 09:37:38
 * 听评课-教师部分-我的教研课-我的教研本
 */
import React, { Component } from 'react';
import Diary from '../../components/base/diary';
import { Breadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom';
import { Global } from '../../../js/base/g';

class TpkTeachResearchComment extends Component {
  constructor(props) {
    super(props);    
    this.state={
      teacherId:Global.baseinfo.teacherid,
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
        teacherId:Global.baseinfo.teacherid,
        curriculumallId:''
      })
    }
  }  
  
  
  
  render() {
    return (
      <div>
        <div className="pf-t-breadcrumb">
          <Link to='/myResearch' className='pf-t-breadbutton'>
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