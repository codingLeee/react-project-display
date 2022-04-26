/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-09-19 14:52:32
 * 听评课-管理员部分-随堂设置-选择听课左侧
 */
import React, { Component } from 'react';
import { Tabs } from 'antd';

import ListenHandelPerson from '../listenHandelPerson';
import ListenSearchKey from '../listenSearchKey';
import ListenPerName from '../listenPerName';
import ListenGroupName from '../base/listenGroupName';
import '../../../css/components/base/listenPerCon.css';

const TabPane = Tabs.TabPane;
const data = [];
const data1 = {
  person: [
    {
      name: '郑宝儿r',
      num: 1,
      teacherId: 1,
      relaTeachers: [{ name: 'ADFCD', teacherId: 2 }, { name: '战三', teacherId: 4 }, { name: '账单', teacherId: 3 }]
    },
    {
      name: 'ADFCD',
      num: 2,
      teacherId: 2,
      relaTeachers: [{ name: '李敏', teacherId: 5 }, { name: '战三', teacherId: 4 }, { name: '账单', teacherId: 3 }]
    },
    {
      name: '账单',
      num: 3,
      teacherId: 3,
      relaTeachers: [{ name: '李敏', teacherId: 5 }, { name: '战三', teacherId: 4 }, { name: 'ADFCD', teacherId: 2 }]
    },
    {
      name: '战三',
      num: 4,
      teacherId: 4,
      relaTeachers: [{ name: '李敏', teacherId: 5 }, { name: 'ADFCD', teacherId: 2 }, { name: '账单', teacherId: 3 }]
    }, {
      name: '李敏',
      num: 5,
      teacherId: 5,
      relaTeachers: [{ name: '李娟', teacherId: 6 }, { name: '战三', teacherId: 4 }, { name: '账单', teacherId: 3 }]
    },
    {
      name: '李娟',
      num: 6,
      teacherId: 6,
      relaTeachers: [{ name: '丽丽', teacherId: 7 }, { name: '战三', teacherId: 4 }, { name: '账单', teacherId: 3 }]
    },
    {
      name: '丽丽',
      num: 7,
      teacherId: 7,
      relaTeachers: [{ name: '李娟', teacherId: 6 }, { name: '战三', teacherId: 4 }, { name: '账单', teacherId: 3 }]
    },
    {
      name: '张三五',
      num: 8,
      teacherId: 8,
      relaTeachers: [{ name: '李娟', teacherId: 6 }, { name: '战三', teacherId: 4 }, { name: '账单', teacherId: 3 }]
    }]
};

function callback(key) {
  // console.log(key);
}

class ListenPerCon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personLists1: data1.person,
      checkData: data1.person[0].relaTeachers
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnTeasKey = this.handleOnTeasKey.bind(this);
  }

  //制造伪数据
  getData(n) {
    for (let i = 20 * n; i < 20 * n + 20; i++) {
      data.push({
        name: '张三五' + i,
        num: i,
        teacherId: i,
        relaTeachers: [{ name: '李娟', teacherId: 6 }, { name: '战三', teacherId: 4 }, { name: '账单', teacherId: 3 }]
      })
    }
    return data;
  };
  //listenPerName组件的change事件
  handleOnChange(e) {
    e.target.disabled = true;
    var curData = JSON.parse(e.target.value);
    var datalist = this.state.checkData;
    datalist.push(curData);
    this.setState({
      checkData: datalist
    });
  }
  //ListenSearchKey组件用于备选人员姓名首字母检索
  handleOnTeasKey(e) {
    // console.log(`备选人员提交检索关键字:${e.target.value}`);
    //请求得到的数据赋值给  personLists
    this.setState({
      personLists1: this.getData(1)
    });
  }

  render() {
    const data = [];
    for (var i = 0; i < 12; i++) {
      data.push(
        {
          groupName: `教研组名称${i}`,
          perNum: i + 1
        }
      );
    }
    return (
      <div>
        <div className='mj-lpc-nameCon'>
          <Tabs onChange={callback} type="card">
            <TabPane tab="教研组" key="1">
              {
                data.map((item, index) => (
                  <ListenGroupName key={index} data={item}></ListenGroupName>
                ))
              }
              <div className='mj-lpc-clear'></div>
            </TabPane>

            <TabPane tab="成员" key="2">
              <ListenSearchKey handleOnTeaKey={this.handleOnTeasKey}></ListenSearchKey>
              <ListenPerName data={data1.person} handleOnChange={this.handleOnChange} checkData={this.state.checkData}></ListenPerName>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default ListenPerCon;