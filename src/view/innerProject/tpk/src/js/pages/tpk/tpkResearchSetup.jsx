/*
 * @Author: JudyC 
 * @Date: 2017-09-11 17:48:31 
 * @Last Modified by: JudyC
 * @Last Modified time: 2017-10-27 17:02:07
 */
import React, { Component } from 'react';
import { Radio,Button } from 'antd';
import { BrowserRouter as Router, Route, Link, withRouter, Switch, Redirect} from 'react-router-dom';
import TpkResearchPlanManage from '../../pages/tpk/tpkResearchPlanManage';
import TpkResearchGroupManage from '../../pages/tpk/tpkResearchGroupManage';
import TpkResearchCommentManage from '../../pages/tpk/tpkResearchCommentManage';
import createBrowserHistory from 'history/createBrowserHistory';
import TpkAddResearchPlan from './tpkAddResearchPlan';
import '../../../css/pages/tpkResearchSetup.css';
import { Global } from '../../base/g';

const history = createBrowserHistory();

class TpkResearchSetup extends Component{
  render(){
    return (
      <div className="cjy-rs-fs14">
        <div className="cjy-rs-btnGroup">
          <Route path='/reSetup/:cpage' component={LiteMenu}/>
        </div>
          <div>
            <Switch>
              <Route path='/reSetup/rePlan' component={TpkResearchPlanManage}/>
              <Route path='/reSetup/reGroup' component={TpkResearchGroupManage}/>
              <Route path='/reSetup/reComment' component={TpkResearchCommentManage}/>
              <Route path='/reSetup/reAddPlan/:planId?' component={TpkAddResearchPlan}/>
              <Redirect to='/reSetup/rePlan'/>
            </Switch>
          </div>
      </div>
    );
  };
}

class Litemenu extends Component{
  handlePageChange = (e) => {
    if(e.target.value === 'rePlan'){
      this.props.history.push('/reSetup/rePlan');
    }else if(e.target.value === 'reGroup'){
      this.props.history.push('/reSetup/reGroup');
    }else if(e.target.value === 'reComment'){
      this.props.history.push('/reSetup/reComment');
    }
  }

  render(){
    var cpage = this.props.match.params.cpage;
    if(cpage === 'reAddPlan'){
      cpage = 'rePlan';
    }
    return (
    <Radio.Group value={cpage} onChange={this.handlePageChange}>
      <Radio.Button value="rePlan">教研计划管理</Radio.Button>
      <Radio.Button value="reGroup">教研组管理</Radio.Button>
      {Global.baseinfo.role === 2 ? null : <Radio.Button value="reComment">教研评价管理</Radio.Button>}
    </Radio.Group>);
  }
}

const LiteMenu = withRouter(Litemenu);

export default TpkResearchSetup;