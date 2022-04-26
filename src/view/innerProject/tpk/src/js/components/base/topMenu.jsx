import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { Global } from '../../base/g';
import '../../../css/components/base/topmenu.css';
import setImg from './../../../img/setting.png';

const imgStyle = {
  display: 'inline-block',
  padding: 5,
  marginTop: 20,
  marginLeft: 10, 
  width: 30
}
class TopMenu extends Component{

  render(){
    var uinfo = '欢迎，' + Global.baseinfo.loginName + ' (' + Global.baseinfo.uname + ')';
    return (
      <div className='xt-header'>
        <div className='xt-header-title'>{this.props.title}</div>
        <Menu 
          selectedKeys={['tpk']} 
          mode='horizontal'
          className='xt-menu'>
          {
            Global.funcs.map(item => {
              if(item.reqPath === '/research'){
                return <Menu.Item key='tpk'><Link to='/'>听评课</Link></Menu.Item>
              } else if (item.reqPath === '/bigData') {
                return <Menu.Item key={item.functionId}><a href={ Global.rootpath + '/dsj/index.html' }>{ item.functionName }</a></Menu.Item>
              }else{
                return <Menu.Item key={item.functionId}><a href={ Global.rootpath + '/home#' + item.reqPath }>{ item.functionName }</a></Menu.Item>
              }
            })
          }
        </Menu>
        <div className='xt-header-uinfo'>
          <span>{uinfo}</span>
          {
            Global.baseinfo.role === 1
              ? <a href={Global.baseinfo.serviceroot + '/dsj/index.html#/setting'} style={imgStyle}><img src={setImg} style={{display: 'block', width: '100%'}} /></a>
              : null
          }
        </div>
    </div>);
  }
}

export default TopMenu;