/*
 * @Author: JudyC 
 * @Date: 2017-09-19 16:41:08 
 * @Last Modified by: JudyC
 * @Last Modified time: 2017-12-11 10:10:25
 */
import React, { Component } from 'react';
import {Input} from 'antd'; 
import ListenPerName from '../components/listenPerName';
import ListenSearchKey from '../components/listenSearchKey';
import ListenCheckName from '../components/listenCheckName';
import _x from '../base/_x/api/api.js';
import '../../css/components/reModGroup.css';

const { TextArea } = Input;
var personList=[];

class ReModGroup extends Component{
  constructor(){
    super();
    this.state = {
      personLists: [],
      ischeck: false,
    };
    this.handleGroupName = this.handleGroupName.bind(this);
    this.handleNote = this.handleNote.bind(this);
  }

  componentDidMount(){
    this.getTea();
  };

  getTea(){
    _x.util.request('/research_lesson/setting/get_all_teachers',{},function(ret){
      if(ret.result){
        this.setState({
          personLists:ret.data
        });
        personList=ret.data;
      }
    }.bind(this));
  }
  
  render(){
    return (
      <div className="cjy-rmg-modGroup">
        <div className="cjy-rmg-nameLine">
          <span className="cjy-rmg-span">教研组名称：</span>
          <Input maxLength="20" value={this.props.reGroupName} onChange={this.handleGroupName}/>
        </div>
        <div className="cjy-rmg-memberBox">
          <span className="cjy-rmg-span cjy-rmg-textToTop">组员：</span>
          <div className="cjy-rmg-choseTeaBox">
            <div className="cjy-rmg-leftBox">
              <ListenSearchKey handleOnTeaKey={this.handleOnTeasKey.bind(this)} />
              <ListenPerName data={this.state.personLists} handleOnChange={this.handleOnChange.bind(this)} checkData={this.props.checkData} curPerson={''} />
            </div>
          </div>
          <span className="cjy-rmg-arrowBox"><i className="iconfont">&#xe60c;</i></span>
          <div className="cjy-rmg-RightBox">
            <ListenCheckName data={this.props.checkData} handleOnDel={this.handleOnDel.bind(this)} warningData={[]} />
          </div>
        </div>
        <div className="cjy-rmg-noteLine">
          <span className="cjy-rmg-span">备注：</span>
          <TextArea maxLength="200" value={this.props.note} className="cjy-rmg-textarea" onChange={this.handleNote} placeholder="输入请勿超过200字"/>
        </div>
      </div>
    )
  }

  //ListenSearchKey组件用于备选人员姓名首字母检索
  handleOnTeasKey(e) {
    var itemLists = [];
    if (e.target.value) {
      for (var i = 0; i < personList.length; i++) {
        if (personList[i].nameStartChat === e.target.value) {
          itemLists.push(personList[i]);
        }
      }
      this.setState({
        personLists: itemLists
      });
    } else {
      this.setState({
        personLists: personList
      });
    }
  };

  //listenPerName组件的change事件
  handleOnChange(e) {
    e.target.disabled = true;
    var curData = JSON.parse(e.target.value);
    var datalist = this.props.checkData;
    datalist.push(curData);
    this.props.handleData('tea',datalist);
  };
  
  //listenCheckName组件的点击删除事件
  handleOnDel(e) {
    var data = this.props.checkData;//初始化默认通过人员
    const curData = JSON.parse(e.target.getAttribute('data-item'));
    for (var i = 0; i < data.length; i++) {
      if (data[i].teacherId === curData.teacherId) {
        data.splice(i, 1);
        break;
      }
    };
    this.props.handleData('tea',data);
  };

  handleGroupName(e){
    this.props.handleData('groupName',e.target.value);
  }

  handleNote(e){
    this.props.handleData('note',e.target.value);
  }

}

export default ReModGroup;