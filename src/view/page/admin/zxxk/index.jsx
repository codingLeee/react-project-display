/*
 * @Author: JC.Liu 
 * @Date: 2019-02-26 12:02:58 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-19 13:41:44
 * 管理员 - 听评课
 */

import React, { Component } from 'react';
import { Route, Switch, Redirect, } from 'react-router-dom';
import { XkSetting, XkOntime, XkStatic, XkIntellegence } from './../index';

class ZxxkIndex extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          {/* 巡课设置 */}
          <Route path="/admin/zxxk/xksz" component={XkSetting} />
          {/* 定时巡课 */}
          <Route path="/admin/zxxk/dsxk" component={XkOntime} />
          {/* 巡课统计 */}
          <Route path="/admin/zxxk/xktj" component={XkStatic} />
          {/* 智能巡课 */}
          <Route path="/admin/zxxk/znxk" component={XkIntellegence} />

          <Redirect to="/admin/zxxk/xksz" />
        </Switch>
      </React.Fragment>
    )
  }
}

export default ZxxkIndex;