/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-13 14:41:40
 * 听评课-管理员部分-随堂听任务-随堂听完成情况
 */
import React, { Component } from 'react';
import { Radio, Spin } from 'antd';
import { Link } from 'react-router-dom';
import _x from '../base/_x/api/api.js';

import ListenButtomTeas from '../components/listenButtomTeas';
import ListenTaskCom from '../components/listenTaskCom';

import '../../css/iconfont.css';
import '../../css/components/listenTopTotal.css';

class ListenButtomTotal extends Component {
  constructor() {
    super();
    this.state = {
      timeType: '1',    //时间选择
      finishedCnt: 0,    //完成人员
      allCnt: 0,         //总人员
      finishedHighSort: [],  //完成度高
      finishedLowSort: [],     //完成度低
      ifNull: false,
      loading: true
    };

    this.changeType = this.changeType.bind(this);
    this.requestData = this.requestData.bind(this);
  };

  requestData(dateType) {
    _x.util.request('/listenJob/overviewFinished', {
      'dateType': dateType
    }, function (ret) {
      if (ret.result) {
        if (JSON.stringify(ret.data) == '{}') {
          this.setState({
            ifNull: true
          })
        } else {
          const data = ret.data;
          // console.log(data);
          var finishedHighSort = data.finishedHighSort;
          var finishedLowSort = data.finishedLowSort;

          // 完成度较高补加
          if (data.finishedHighSort.length < 3) {
            for (var i = 0, len = 3 - data.finishedHighSort.length; i < len; i++) {
              finishedHighSort.push({
                allNum: '',
                cnt: '',
                teacherId: '',
                teacherName: ''
              });
            }
          }
          // 完成度较低补加
          if (data.finishedLowSort.length < 3) {
            for (var i = 0, len = 3 - data.finishedLowSort.length; i < len; i++) {
              finishedLowSort.push({
                allNum: '',
                cnt: '',
                teacherId: '',
                teacherName: ''
              });
            }
          }
          this.setState({
            finishedCnt: data.finishedCnt,
            allCnt: data.allCnt,
            finishedHighSort: finishedHighSort,
            finishedLowSort: data.finishedLowSort,
            ifNull: false,
            loading: false
          })
        }
      }
    }.bind(this));
  }
  componentDidMount() {
    this.requestData(this.state.timeType);
  };

  changeType(e) {
    this.setState({
      timeType: e.target.value,
      loading: true
    });
    this.requestData(e.target.value);
  };

  render() {
    return (
      this.state.ifNull === false
        ?
        (<div className='mj-ltt-topCon mj-lbt-botCon'>
          <div className='mj-ltt-tit'>
            <span>随堂听任务完成情况</span>
            <Link to={'/lisTasks/TpkManaDetListenerInfo'}>
              <i className='iconfont mj-ltt-more'>&#xe61a;</i>
            </Link>
          </div>
          <div className='mj-ltt-choice'>
            <Radio.Group className="mj-ltt-RadioGroup" value={this.state.timeType} onChange={this.changeType}>
              <Radio.Button value="1">本周</Radio.Button>
              <Radio.Button value="2">本月</Radio.Button>
              <Radio.Button value="3">本学期</Radio.Button>
            </Radio.Group>
          </div>
          {
            this.state.loading
              ?
              <div className='mj-ltt-loading'><Spin /></div>
              :
              (
                <div>
                  <ListenTaskCom finish={this.state.finishedCnt} total={this.state.allCnt}></ListenTaskCom>
                  <ListenButtomTeas finishedHighSort={this.state.finishedHighSort} finishedLowSort={this.state.finishedLowSort}></ListenButtomTeas>
                </div>
              )
          }
        </div>)
        :
        (
          <span></span>
        )
    );
  }
}


export default ListenButtomTotal;