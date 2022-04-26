/*
 * @Author: JudyC 
 * @Date: 2017-09-12 15:25:40 
 * @Last Modified by: JudyC
 * @Last Modified time: 2017-10-20 09:33:34
 */
import React, { Component } from 'react';
import {Table,Spin} from 'antd';
import _ from 'lodash';
import _x from '../base/_x/api/api.js';
import '../../css/components/researchClass.css';

class ResearchClass extends Component{
  constructor(){
    super();
    this.state = {
      teaData:[],//教师数据
      dataSource:[],//表格数据
      loading:true   //加载中
    };
    this.keyData = '';
    this.getTeaData = this.getTeaData.bind(this);
    this.getClassData = this.getClassData.bind(this);

    this.columns = [{
      title:'时间(周/星期/节次)',
      dataIndex:'time',
      width:260
    },{
      title:'授课老师',
      dataIndex:'name',
      width:150
    },{
      title:'授课科目',
      dataIndex:'subject',
      width:130
    },{
      title:'授课教室',
      dataIndex:'gradeClass',
      width:140
    }];
  };

  /**
   * 通过课程的id来获取本课程的详细数据
   * @param {Array} curriculumId 
   */
  getClassData(curriculumId){
    var req = curriculumId
    _x.util.request('/research_lesson/setting/get_curriculum_info',req,function(ret){
      if(ret.result){
        var newDataSource = [];
        ret.data.map((item,index)=>{
          newDataSource.push({
            key:index,
            time:`第${Number(item.weeks).toChinese()}周 星期${item.weekday===7?'日':Number(item.weekday).toChinese()} 第${Number(item.lessonOrder).toChinese()}节`,                
            name:item.teacherName,
            subject:item.subjectName,
            // gradeClass:item.className,
            gradeClass:item.placeName,
          });
        });
        this.setState({
          dataSource:newDataSource,
          loading:false
        });
      }
    }.bind(this));
  }

  /**
   * 获取某个教研计划下的详细数据
   */
  getTeaData(){
    var req = {
      id:this.keyData
    };
    _x.util.request('/research_lesson/setting/get_one_plan_detail',req,function(ret){
      if(ret.result){
        //构造出教研教师数据，及其中哪些是评分老师
        var teaList = [];
        var scoreList = [];
        ret.data.planList.map(item1=>{
          teaList = _.concat(teaList,_.differenceBy(item1.teacherList,teaList,'id'));
          scoreList = _.concat(scoreList,_.difference(item1.scoreList,scoreList));
        });
        scoreList.map(item2=>{
          var idx = _.findIndex(teaList,{'id':item2});
          if(idx!==-1){
            teaList[idx].status = 'chosed';
          }
        });
        this.setState({
          teaData:teaList
        });
        var curriculumId = [];
        ret.data.planList.map((item,index)=>{
          curriculumId.push(item.curriculumId);
        });
        this.getClassData(curriculumId);
      }
    }.bind(this));
  }

  componentWillMount(){
    this.keyData = this.props.choseKey;
  }

  componentDidMount(){
    this.getTeaData();
  };

  render(){
    return (
      <div className="cjy-rc-reClass">
        <Spin spinning={this.state.loading} delay={200}>
          <div className="cjy-rc-nameLine">
            <span className="cjy-rc-span">教研员：</span>
            <div className="cjy-rc-nameBox">
              {
                this.state.teaData.map((item,index)=>(
                  item.status === 'chosed'
                  ? <span className="cjy-rc-name" key={index}>{item.name}<i className="iconfont cjy-rc-bubble">&#xe6a9;</i></span>
                  : <span className="cjy-rc-name" key={index}>{item.name}</span>
                ))
              }
            </div>
          </div>
          <div>
            <span className="cjy-rc-span">教研课堂：</span>
            <div className="cjy-rc-table">
              <Table pagination={false} columns={this.columns} dataSource={this.state.dataSource} scroll={{y:200}}/>
            </div>
          </div>
        </Spin>
      </div>
    );
  }
}

export default ResearchClass;