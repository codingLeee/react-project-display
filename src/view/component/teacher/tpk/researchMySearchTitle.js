/*
 * @Author: 蒲飞 
 * @Date: 2017-09-19 10:01:35 
 * @Last Modified by: yrj
 * @Last Modified time: 2019-03-27 09:23:32
 * 我的教研课--教研课查询---查询的条件块
 */
import React, { Component } from 'react';
import { Select, Input, Button } from 'antd';
import {G} from './../../../../js/g';
import './../../../../css/teacher/mj_researchMySearchTitle.css';
const Option = Select.Option;

class ResearchMySearchTitle extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      planId: '',//计划id
      classId: '',//班级id
      searchKey: '',//搜素框的值
    };
  
    this.teacherId = G.baseinfo.teacherid;
    this.onhandleChangePlan = this.onhandleChangePlan.bind(this);
    this.onhandleChangeClass = this.onhandleChangeClass.bind(this);
    this.onhandleInput = this.onhandleInput.bind(this);
    this.selectSearch = this.selectSearch.bind(this);
  }

  //所属计划
  onhandleChangePlan(value) {
    this.setState({
      planId: value
    });
    this.selectSearch(value, this.state.classId);
  }

  //班级
  onhandleChangeClass(value) {
    this.setState({
      classId: value
    });
    this.selectSearch(this.state.planId, value);
  }

  //搜素框回车
  onhandleInput(e) {
    this.setState({
      searchKey: e.target.value
    });
  }

  //搜素框回车，按钮查询查詢
  toSearch(val, e) {
    var keys = '';
    if (val) {
      keys = e.target.value;
    } else {
      keys = this.state.searchKey;
    }
    var params = {};
    if (this.props.flag) {
      params = {
        researchPlan: this.state.planId ? this.state.planId : (this.props.plans.length ? this.props.plans[0].id : ''),//计划Id
        classID: this.state.classId ? this.state.classId : this.props.classes[0].CurClassID,  //班级Id
        courseName: keys, //科目
        teacherId: this.teacherId //老師id
      }
    } else {
      params = {
        classID: this.state.classId ? this.state.classId : (this.props.classes.length ? this.props.classes[0].CurClassID : ''),  //班级Id
        courseName: keys, //科目
        teacherId: this.teacherId //老師id
      }
    }
    this.props.getParams(params);
  }
  //下拉选中查询
  selectSearch(val1, val2) {
    var params = {};
    if (this.props.flag) {
      params = {
        researchPlan: val1,//计划Id
        classID: val2,  //班级Id
        courseName: this.state.searchKey, //科目
        teacherId: this.teacherId //老師id
      }
    } else {
      params = {
        classID: val2,  //班级Id
        courseName: this.state.searchKey, //科目
        teacherId: this.teacherId //老師id
      }
    }
    this.props.getParams(params);
  }

  render() {
    
    const plans = this.props.plans;
    const classes = this.props.classes;
  
    return (
      <div className="pf-r-searchtitle">
        {
          this.props.flag ?
            <div className="pf-r-searchtitledrop">
              <span className="pf-t-basefont">所属计划：</span>
              <Select showSearch value={plans.length ? (this.state.planId ? this.state.planId : plans[0].id) : ''} style={{ width: 160, fontSize: 14 }} onChange={this.onhandleChangePlan}
                ptionFilterProp="children" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} >
                {
                  plans.map((plan, i) => <Option value={plan.id} key={i} title={plan.researchPlanName}>{plan.researchPlanName}</Option>)
                }
              </Select>
            </div> : ''
        }

        <div className="pf-r-searchtitledrop">
          <span className="pf-t-basefont">班级筛选：</span>
       
          <Select showSearch value={classes.length ? (this.state.classId ? this.state.classId : classes[0].CurClassID) : ''} style={{ width: 160, fontSize: 14 }} onChange={this.onhandleChangeClass}
            ptionFilterProp="children" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            {
             
              classes.map((aclass, i) => <Option value={aclass.CurClassID} key={i} title={aclass.CurClassName}>{aclass.CurClassName}</Option>)
            }
          </Select>
        </div>
        <div className='pd-r-searchtitlesearch'>
          <Input size="large" placeholder="授课科目" onBlur={this.onhandleInput} onPressEnter={this.toSearch.bind(this, 1)} />
          <Button size='large' onClick={this.toSearch.bind(this, 0)}>查询</Button>
        </div>
      </div>

    );
  }
}

export default ResearchMySearchTitle;