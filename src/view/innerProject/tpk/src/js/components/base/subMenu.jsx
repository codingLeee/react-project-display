import React, { Component } from 'react';
import {Menu} from 'antd';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Global } from '../../base/g';
import _ from 'lodash';
import '../../../css/components/base/submenu.css';

const subMenus = [
  {key:'tasks', name:'我的任务', parent:'tpk', role:3},
  {key:'myResearch', name:'我的教研课', parent:'tpk', role:3},
  {key:'myListen', name:'我的随堂听', parent:'tpk', role:3},
  {key:'reTasks', name:'教研任务', parent:'tpk', role:1},
  {key:'reSetup', name:'教研设置', parent:'tpk', role:1},
  {key:'reSetup', name:'教研设置', parent:'tpk', role:2},
  {key:'lisTasks', name:'随堂听任务', parent:'tpk', role:1},
  {key:'lisSet', name:'随堂听设置', parent:'tpk', role:1},
];

class SubMenu extends Component{

  render(){
    var funcs = _.filter(subMenus, {'role': Global.baseinfo.role});
    var key = this.props.match.params.func;
    
    return (
    <div className='xt-submenu'>
      <Menu 
        selectedKeys = {[ key || funcs[0].key]}
        defaultSelectedKeys = {[funcs[0].key]}
        mode='horizontal'
        className='xt-menu'>
        {
        funcs.map(item => 
          (
            <Menu.Item key={item.key}>
              <Link to={'/' + item.key}>{item.name}</Link>
            </Menu.Item>
            )
        )
        }
      </Menu>
    </div>
    );
  }
}


export default SubMenu;