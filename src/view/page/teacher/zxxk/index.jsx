/*
 * @Author: JC.Liu 
 * @Date: 2019-02-26 12:02:58 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-19 13:42:42
 * 老师 - 在线巡课
 */

import React, { Component } from 'react';
import { Route, Switch, Redirect, } from 'react-router-dom';
import { XkEveryTime, XkIntelligence, XkInterval, XkStatic, xkIntelligencs_setting } from './../index';

class ZxxkIndex extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          {/* 实时巡课 */}
          <Route path="/teacher/zxxk/ssxk" component={XkEveryTime} />
          {/* 定时巡课 */}
          <Route path="/teacher/zxxk/dsxk" component={XkInterval} />
          {/* 巡课统计 */}
          <Route path="/teacher/zxxk/xktj" component={XkStatic} />
          {/* 智能巡课 */}
          <Route path="/teacher/zxxk/znxk/ycbj" component={XkIntelligence} />
          {/* 智能巡课 - 设置 */}
          <Route path="/teacher/zxxk/znxk/sz" component={xkIntelligencs_setting} />

          <Redirect to="/teacher/zxxk/ssxk" />
        </Switch>
      </React.Fragment>
    )
  }
}

export default ZxxkIndex;