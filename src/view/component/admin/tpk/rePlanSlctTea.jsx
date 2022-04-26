/*
 * @Author: JudyC 
 * @Date: 2017-09-14 17:36:21 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-19 16:04:01
 */
import React, { Component } from 'react';
import { Tabs } from 'antd';
import _ from 'lodash';
import { SVG } from './../../../../base';
import util from './../../../../js/_x/index.js';
const Request = util.util.request.request;

import ListenGroupName from './listenGroupName';
import ListenSearchKey from './listenSearchKey';
import ListenPerName from './listenPerName';
import ListenCheckName from './listenCheckName';
import './../../../../css/admin/mj_listenCheckCon.css';
import './../../../../css/admin/mj_listenCheckedName.css';
import './../../../../css/admin/mj_listenPerCon.css';

const TabPane = Tabs.TabPane;

function callback(key) {
}

class RePlanSlctTea extends Component {
  constructor(props) {
    super(props);
    var checkPer = this.props.defaultData;
    this.state = {
      allPerson: [],    //初始化获取所有老师（值不变）
      groups: [],       //教研组
      teachers: [],     //所有老师
      // personLists1: data1.person,
      // checkData: data1.person[0].relaTeachers,
      checkPer: checkPer,    // 已选择成员
      warningLen: -1,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnTeasKey = this.handleOnTeasKey.bind(this);
    this.handleOnDel = this.handleOnDel.bind(this);
    this.handleGroup = this.handleGroup.bind(this);
    this.requestGroups = this.requestGroups.bind(this);
    this.requstTeachers = this.requstTeachers.bind(this);
  }

  //获取所有教研组
  requestGroups() {
    Request('api/web/research_lesson/setting/get_all_research_groups', {}, function (ret) {
      // const ret = {
      //   result: true,
      //   data: []
      // };
      if (ret.result) {
        const data = ret.data;
        data.map((item) => {
          item.perNum = item.teacherList.length;
        })
        this.setState({
          groups: data
        })
      }
    }.bind(this));
  }
  //获取所有老师
  requstTeachers() {
    Request('api/web/research_lesson/setting/get_all_teachers', {}, function (ret) {
      // const ret = {
      //   result: true,
      //   data: [
      //     { teacherName: "BY2", teacherId: "2018008", nameStartChat: "B" },
      //     { teacherName: "迪玛希", teacherId: "2018006", nameStartChat: "D" },
      //     { teacherName: "法斗", teacherId: "2018048", nameStartChat: "F" }
      //   ]
      // }
      if (ret.result) {
        this.setState({
          teachers: ret.data,
          allPerson: ret.data
        })
      }
    }.bind(this));
  }

  //listenPerName组件的change事件
  handleOnChange(e) {
    e.target.disabled = true;
    var curData = JSON.parse(e.target.value);
    var datalist = this.state.checkPer;
    datalist.push(curData);
    this.setState({
      checkPer: datalist
    });
    this.props.page2Data(this.state.checkPer, 'add', curData);
  }
  //ListenSearchKey组件用于备选人员姓名首字母检索
  handleOnTeasKey(e) {
    const itemLists = [];
    const allPerson = this.state.allPerson;
    if (e.target.value) {
      for (var i = 0; i < allPerson.length; i++) {
        if (allPerson[i].nameStartChat === e.target.value) {
          itemLists.push(allPerson[i]);
        }
      }
      this.setState({
        teachers: itemLists
      });
    } else {
      this.setState({
        teachers: allPerson
      });
    }
    //请求得到的数据赋值给  personLists
    // this.setState({
    //   personLists1: this.getData(1)
    // });
  }
  //listenCheckName组件的点击删除事件
  handleOnDel(e) {
    var data = this.state.checkPer;//初始化默认通过人员
    const curData = JSON.parse(e.target.getAttribute('data-item'));
    var warningLength = this.props.warningData.length;
    // console.log(warningLength);
    // console.log(e.target.getAttribute('data-warning'));
    if (warningLength && e.target.getAttribute('data-warning')) {
      // console.log(222);
      var num;
      if (this.state.warningLen !== -1) {
        num = this.state.warningLen - 1;
        if (num == 0) {
          this.props.cleanWarning(true);
        }
        num = num ? num : -1;
      } else {
        num = warningLength - 1;
      }
      this.setState({
        warningLen: num
      });
    }

    for (var i = 0; i < data.length; i++) {
      if (data[i].teacherId === curData.teacherId) {
        data.splice(i, 1);
        break;
      }
    };
    this.setState({
      checkPer: data
    });
    this.props.page2Data(this.state.checkPer, 'del', curData.teacherId);
    // console.log(this.state.checkPer);
  }
  // 教研组点击事件
  handleGroup(val, key, e) {
    const defulVal = this.state.checkPer;
    // const addDefaultPer = defulVal.concat(val.teacherList);//合并成一个数组
    // temp = {},          //用于id判断重复
    // result = [];        //最后的新数组
    // addDefaultPer.map((item, index) => {
    //   if (!temp[item.teacherId]) {
    //     result.push(item);
    //     temp[item.teacherId] = true
    //   }
    // })



    // var addTea = [];
    // val.teacherList.map(item=>{
    //   var idx = _.findIndex(defulVal,{teacherId:item.teacherId})
    //   if (idx===-1) {
    //     addTea.push(item);
    //   }
    // });
    var addTea = _.differenceBy(val.teacherList, defulVal, 'teacherId');
    var newCheckPer = defulVal.concat(addTea);
    this.setState({
      checkPer: newCheckPer,
    });
    this.props.page2Data(newCheckPer, 'add', addTea);
  }
  componentWillMount() {
    this.requestGroups();
    this.requstTeachers();
    this.props.page2Data(this.state.checkPer);


    // var data1 = [
    //   { teacherName: "王填", teacherId: "jfat011", nameStartChat: null },
    //   { teacherName: "文兴泽", teacherId: "100008", nameStartChat: null },
    //   { teacherName: "明强", teacherId: "jfat003", nameStartChat: null }
    // ];
    // var data2 = [
    //   { teacherName: "文兴泽", teacherId: "100008", nameStartChat: "W" },
    //   { teacherName: "明强", teacherId: "jfat003", nameStartChat: null }
    // ];
    // console.log(_.findIndex(data2, 'teacherId'));
  }
  render() {
    // console.log(this.state.warningLen);
    return (
      <div>
        {/* 左边部分 */}
        <div className='mj-lpc-nameCon'>
          <Tabs onChange={callback} type="card">
            {/* 教研组 */}
            <TabPane tab="教研组" key="1">
              {
                this.state.groups.map((item, index) => {    //教研组所有内容
                  const weState = [];
                  const checkPer = this.state.checkPer;
                  var we = 0;
                  //循环比较教研组中是否有老师已经被选择
                  for (var i = 0, len = item.teacherList.length; i < len; i++) {   //item.teacherList 单个教研组下面的老师列表
                    for (var j = 0, leng = checkPer.length; j < leng; j++) {
                      if (item.teacherList[i].teacherId === checkPer[j].teacherId) {
                        we = 1;
                      } else {
                        we = -1;
                      }
                      weState.push(we);
                    }
                  }
                  {/* for (var i = 0, len = item.teacherList.length; i < len; i++) {   //item.teacherList 单个教研组下面的老师列表
                    if (len !== 0) {
                      var we = _.findIndex(this.state.checkPer, item.teacherList[i]);  //checkPer 已选择的老师
                      weState.push(we);
                    }
                  } */}
                  const max = Math.max.apply(null, weState);
                  if (max === -1 || weState.length === 0) {
                    return <ListenGroupName key={index} index={index} datas={item} handleGroup={this.handleGroup.bind(this)} groupCla={false}></ListenGroupName>
                  } else {
                    return <ListenGroupName key={index} index={index} datas={item} handleGroup={this.handleGroup.bind(this)} groupCla={true}></ListenGroupName>
                  }
                })
              }
              <div className='mj-lpc-clear'></div>
            </TabPane>
            {/* 成员 */}
            <TabPane tab="成员" key="2">
              <ListenSearchKey handleOnTeaKey={this.handleOnTeasKey}></ListenSearchKey>
              <ListenPerName data={this.state.teachers} handleOnChange={this.handleOnChange} checkData={this.state.checkPer} curPerson=''></ListenPerName>
            </TabPane>
          </Tabs>
        </div>
        {/* 图标 */}
        <div className='mj-lcc-icon'>
          {/* <i className='iconfont'>&#xe60c;</i> */}
          <SVG type='icon' />
        </div>
        {/* 右边部分 */}
        <div className='mj-lcn-nameCon'>
          <div className='mj-lcn-tit'>已选成员</div>

          <div className='mj-lcn-name'>
            <div>
              <ListenCheckName data={this.state.checkPer} warningData={this.props.warningData} handleOnDel={this.handleOnDel} />
            </div>
            {
              this.props.warningData.length !== 0
                ?
                <span className='mj-lcn-span'>{(this.state.warningLen !== -1) ? this.state.warningLen : this.props.warningData.length}位老师已有任务，不能再安排新任务</span>
                :
                <span></span>
            }
          </div>
        </div>
        {/* 清除浮动 */}
        <div style={{ clear: 'both' }}></div>
      </div>
    );
  }
}

export default RePlanSlctTea;