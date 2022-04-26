/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-12 16:37:27
 * 听评课-管理员部分-随堂设置-听课员任务指标设置
 */
import React, { Component } from 'react';
import { Radio,Button } from 'antd';
import { BrowserRouter as Router, Route, Link, withRouter, Switch, Redirect} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import TpkManaLisTargetSet from './tpkManaLisTargetSet';
import TpkManaTeaPermisSet from './tpkManaTeaPermisSet';
import TpkManaNewTask from './tpkManaNewTask';

import '../../../css/pages/tpkResearchSetup.css';

const history = createBrowserHistory();

class TpkManaLisSet extends Component {
  render() {
    return (
      <div className="cjy-rs-fs14">
        <div className="cjy-rs-btnGroup">
          <Route path='/lisSet/:cpage' component={LiteMenu} />
        </div>
        <div>
          <Switch>
            <Route path='/lisSet/TpkManaLisTargetSet' component={TpkManaLisTargetSet} />
            <Route path='/lisSet/TpkManaTeaPermisSet' component={TpkManaTeaPermisSet} />
            <Route path='/lisSet/TpkManaNewTask' component={TpkManaNewTask} />
            
            <Redirect to='/lisSet/TpkManaLisTargetSet' />
          </Switch>
        </div>
      </div>
    );
  }
}

class Litemenu extends Component {
  handlePageChange = (e) => {
    if (e.target.value === 'TpkManaLisTargetSet') {
      this.props.history.push('/lisSet/TpkManaLisTargetSet');
    } else if (e.target.value === 'TpkManaTeaPermisSet') {
      this.props.history.push('/lisSet/TpkManaTeaPermisSet');
    }
  }

  render() {
    var cpage = this.props.match.params.cpage;
    if (cpage === 'TpkManaNewTask') {
      cpage = 'TpkManaLisTargetSet';
    }
    return (
      <Radio.Group value={cpage} onChange={this.handlePageChange}>
        <Radio.Button value="TpkManaLisTargetSet">听课员任务指标设置</Radio.Button>
        <Radio.Button value="TpkManaTeaPermisSet">授课员审批权限设置</Radio.Button>
      </Radio.Group>);
  }
}

const LiteMenu = withRouter(Litemenu);
export default TpkManaLisSet;