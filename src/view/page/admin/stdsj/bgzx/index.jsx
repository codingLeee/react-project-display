/*
 * @Author: JC.Liu 
 * @Date: 2019-03-06 19:23:59 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-07 09:23:50
 * 报告中心 
 */
import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Xtbg from './xtbg';
import Zdybg from './zdybg';
@withRouter
class BgzxIndex extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* 系统报告 */}
          <Route path="/admin/stdsj/bgzx/xtbg" component={Xtbg} />
          {/* 自定义报告 */}
          <Route path="/admin/stdsj/bgzx/zdybg" component={Zdybg} />
          <Redirect to="/admin/stdsj/bgzx/xtbg" />
        </Switch>
      </div>
    )
  }
}
export default BgzxIndex;
