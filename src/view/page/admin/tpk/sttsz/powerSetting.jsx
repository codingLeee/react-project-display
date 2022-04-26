/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-20 09:32:19
 * 听评课-管理员部分-随堂设置-授课员审批权限设置
 */
import React, { Component } from 'react';
import { Switch, message } from 'antd';
import util from './../../../../../js/_x/index.js';
const Request = util.util.request.request;
import ListenTeaCon from './../../../../component/admin/tpk/listenTeaCon';
import './../../../../../css/admin/mj_listenerOverTab.css';
import './../../../../../css/admin/mj_tpkManaLisTargetSet.css';

export default class PowerSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: false
    }
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange(checked) {
    Request('api/web/listenJob/listen_auth_setting', { authSwitch: checked ? 1 : 0 }, function (ret) {
      // let ret = { data: { authSwitch: 0 }, message: null, result: true, total: 0, }
      if (ret.result) {
        this.setState({
          switch: checked
        });
        message.success('数据保存成功', 3);
      } else {
        message.error(ret.message, 3);
      }
    }.bind(this));
  }
  componentDidMount() {
    Request('api/web/listenJob/listen_auth_setting', {}, function (ret) {
      // let ret = { data: { authSwitch: 0 }, message: null, result: true, total: 0, }
      if (ret.result) {
        if (this._isMounted) {
          this.setState({
            switch: ret.data.authSwitch ? true : false
          });
        }
      }
    }.bind(this));
  }
  componentWillMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className='zq-mts-cont'>
        <div className='zq-mts-explain'>
          <p>1.统一申请设置处于开启状态，老师预约随堂听课立即生效，无需经过老师通过</p>
          <p>2.统一申请设置处于关闭状态，老师预约随堂听课将需要经过教师同意，方能进行课堂听课，同时可针对单个老师设置无需认证权限</p>
        </div>
        <div className="zq-mts-setting">
          <p>统一申请通过设置：
            <Switch defaultChecked={this.state.switch} checked={this.state.switch} onChange={this.handleOnChange} />
          </p>
          <div className={this.state.switch ? 'zq-mts-cover' : ''}></div>
          <p>老师课程权限设置：</p>
          <ListenTeaCon />
        </div>

      </div>
    );
  }
}