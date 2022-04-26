/*
 * @Author: JC.Liu 
 * @Date: 2019-02-23 22:34:10 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-11 17:23:21
 * 听评课 - 教研设置
 */
import React, { Component } from 'react';
import { Route, Switch, Redirect, matchPath } from 'react-router-dom';
import PlanCtro from './planCtro';
import GroupCtro from './groupCtro';
import EvaluateCtro from './evaluateCtro';
import TpkAddResearchPlan from './tpkAddResearchPlan';
export class TpkTeaSetting extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* 教研计划管理 */}
          <Route exact path="/admin/tpk/jysz/jyjhgl" component={PlanCtro} />
          <Route path="/admin/tpk/jysz/reAddPlan/:planId?" component={TpkAddResearchPlan} />
          {/* 教研组管理 */}
          <Route path="/admin/tpk/jysz/jyzgl" component={GroupCtro} />
          {/* 教研评价管理 */}
          <Route path="/admin/tpk/jysz/jypjgl" component={EvaluateCtro} />
          <Redirect to="/admin/tpk/jysz/jyjhgl" />
        </Switch>
      </div>
    )
  }
}
