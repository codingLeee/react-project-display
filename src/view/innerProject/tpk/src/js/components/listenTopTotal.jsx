/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-13 11:17:51
 * 听评课-管理员部分-随堂听任务-随堂听开展情况
 */
import React, { Component } from 'react';
import { Radio, Spin } from 'antd';
import { Link } from 'react-router-dom';
import _x from '../base/_x/api/api.js';

import ListenTopTeas from '../components/listenTopTeas';
import ListenAppliCom from '../components/listenAppliCom';
import TpkManaOverListenerInfo from '../pages/tpk/tpkManaOverListenerInfo'

import '../../css/iconfont.css';
import '../../css/components/listenTopTotal.css';

class ListenTopTotal extends Component {
  constructor() {
    super();
    this.state = {
      timeType: '1',    //时间选择
      applyCnt: 0,     //申请次数
      listenCnt: 0,    //听课次数
      unListen: 0,     //申请未听
      applySort: [],   //申请次数最多
      listenSort: [],  //听课数最多
      hotSort: [],      //热度最高的老师
      loading: true
    };

    this.requestData = this.requestData.bind(this);
    this.changeType = this.changeType.bind(this);
  };

  // 开展情况  数据请求
  requestData(dateType) {
    _x.util.request('/listenJob/overview', {
      'dateType': dateType
    }, function (ret) {
      if (ret.result) {
        const data = ret.data;
        // console.log(data);
        var applySort = data.applySort;
        var listenSort = data.listenSort;
        var hotSort = data.hotSort;

        // 申请次数最多补加
        if (data.applySort.length < 3) {
          for (var i = 0,len=3-data.applySort.length; i < len; i++) {
            applySort.push({
              cnt: '',
              teacherId: '',
              teacherName: ''
            });
          }
        }
        // 听课数最多补加
        if (data.listenSort.length < 3) {
          for (var i = 0,len=3-data.listenSort.length; i < len; i++) {
            listenSort.push({
              cnt: '',
              teacherId: '',
              teacherName: ''
            });
          }
        }
        // 热度最高补加
        if (data.hotSort.length < 3) {
          for (var i = 0,len=3-data.hotSort.length; i < len; i++) {
            hotSort.push({
              cnt: '',
              teacherId: '',
              teacherName: ''
            });
          }
        }

        this.setState({
          data: data,
          applyCnt: data.applyCnt,
          listenCnt: data.listenCnt,
          unListen: data.listenUnFinishedCnt,
          applySort: applySort,
          listenSort: listenSort,
          hotSort: hotSort,
          loading: false
        })
      }
    }.bind(this));
  }
  componentDidMount() {
    this.requestData(this.state.timeType);
  };
  // 时间切换
  changeType(e) {
    this.setState({
      timeType: e.target.value,
      loading: true
    });
    this.requestData(e.target.value);
  };

  render() {
    return (
      <div className='mj-ltt-topCon'>
        <div className='mj-ltt-tit'>
          <span>随堂听开展情况</span>
          <Link to='/lisTasks/TpkManaOverListenerInfo'>
            <i className='iconfont mj-ltt-more'>&#xe61a;</i>
          </Link>
        </div>
        <div className='mj-ltt-choice'>
          <Radio.Group className="mj-ltt-RadioGroup" defaultValue={this.state.timeType} onChange={this.changeType}>
            <Radio.Button value='1'>本周</Radio.Button>
            <Radio.Button value='2'>本月</Radio.Button>
            <Radio.Button value='3'>本学期</Radio.Button>
          </Radio.Group>
        </div>
        {
          this.state.loading
            ?
            <div className='mj-ltt-loading'><Spin /></div>
            :
            (
              <div>
                <ListenAppliCom apply={this.state.applyCnt} listen={this.state.listenCnt} noListen={this.state.unListen}></ListenAppliCom>
                <ListenTopTeas applySort={this.state.applySort} listenSort={this.state.listenSort} hotSort={this.state.hotSort}></ListenTopTeas>
              </div>
            )
        }
      </div>
    );
  }
}


export default ListenTopTotal;