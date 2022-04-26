/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: zhengqi
 * @Last Modified time: 2017-09-28 20:36:13
 * 听评课-管理员部分-随堂设置-授课员审批权限设置
 */
import React, { Component } from 'react';
import { Switch } from 'antd';
import _x from '../../base/_x/api/api';
import { confirm, info, success, error, warning } from '../../components/base/modal';
import ListenTeaCon from '../../components/listenTeaCon';
import '../../../css/components/listenerOverTab.css';
import '../../../css/pages/tpkManaLisTargetSet.css';

class TpkManaTeaPermisSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: false
    }
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange(checked) {
    _x.util.request('listenJob/listenAuthSetting', { authSwitch: checked ? 1 : 0 }, function (ret) {
      if (ret.result) {
        this.setState({
          switch: checked
        });
        success('数据保存成功', 3000);
      } else {
        error(ret.message, 3000);
      }
    }.bind(this));

  }
  componentDidMount() {
    _x.util.request('listenJob/listenAuthSetting', {}, function (ret) {
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

export default TpkManaTeaPermisSet;