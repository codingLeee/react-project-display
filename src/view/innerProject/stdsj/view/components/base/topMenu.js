/*
 * @Author: zhengqi 
 * @Date: 2018-08-28 10:43:28 
 * @Last Modified by: zhengqi
 * @Last Modified time: 2018-12-17 16:31:22
 */
import React, { Component } from 'react';
// import { Menu } from 'antd';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { SVG } from './../../common';
import G from './../../../js/g';
import Cookies from 'js-cookie';
import './../../../css/menu.css';

// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

let pathname = '';
class TopMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    /******打包*********/
    this.funcs = [];
    /******打包*********/
    /******本地*********/
    // this.funcs = [
    //   { name: '生态大数据', key: 'stdsj', reqPath: '/bd', isOut: false },
    //   { name: '在线巡课', key: 'zxxk', reqPath: '/r_crd', isOut: false },
    //   { name: '听评课', key: 'tpk', reqPath: 'https:www.baidu.com', isOut: true },
    //   { name: '教学检查', key: 'jxjc', reqPath: 'https://ant.design', isOut: true }
    // ]
    /******本地*********/
  }

  componentWillMount() {
    pathname = this.props.location.pathname;
  }

  /**********打包*************/
  render() {
    let configInfo = [];
    if (sessionStorage.configInfo) {
      configInfo = JSON.parse(sessionStorage.configInfo);
      this.funcs = configInfo[0].childrenList;
    }
    var uinfo = '欢迎，' + JSON.parse(Cookies.get('tpk_cookies')).loginName + '(' + G.baseinfo.uname + ')';
    let isAi = pathname.indexOf('ai_data') > -1 ? true : false;

    return (
      <div className='zq-header'>
        <div className='zq-header-title'>{sessionStorage.title}</div>
        <div className='zq-menu'>
          {
            this.funcs.map((item, i) => {
              if (item.functionEnableFlag) {
                if (item.functionName === '生态大数据' && !isAi) {
                  return <NavLink key={i} className="zq-topM-active" to={item.reqPath}>{item.functionName}</NavLink>
                } else if (item.functionName === '听评课') {
                  return <a key={i} href={G.dataServices + '/tpk/index.html'}>{item.functionName}</a>
                } else if (item.functionName === '教学检查' && isAi) {
                  return <a key={i} className="zq-topM-active" href={G.dataServices + '/tpk/index.html'}>{item.functionName}</a>
                } else {
                  return <a key={i} href={G.dataServices + '/home#' + item.reqPath}>{item.functionName}</a>
                }
              }
            })
          }
        </div>
        <div className='zq-header-uinfo'>
          <span>{uinfo}</span>
          {
            G.baseinfo.role !== 2 ?
              <span className='zq-header-setting' onClick={() => this.props.history.push('/setting')}><SVG type='setting' /></span> : null
          }
        </div>
      </div>
    );
  }
  /**********打包*************/
  /**********本地*************/
  // render() {
  //   var uinfo = 'admin';
  //   return (
  //     <div className='zq-header'>
  //       <div className='zq-header-title'>{sessionStorage.title}</div>

  //       <div className='zq-menu'>
  //         {
  //           this.funcs.map((item, i) => {
  //             if (item.isOut) {
  //               if (item.name === '教学检查') {
  //                 return <a key={i} className='zq-topM-active' href={item.reqPath}>{item.name}</a>
  //               }
  //               return <a key={i} href={item.reqPath}>{item.name}</a>
  //             } else {
  //               return <NavLink key={i} activeClassName="zq-topM-active" to={item.reqPath}>{item.name}</NavLink>
  //             }
  //           })
  //         }
  //       </div>
  //       <div className='zq-header-uinfo'>
  //         <span>{uinfo}</span>
  //         {
  //           G.baseinfo.role !== 2 ?
  //             <span className='zq-header-setting' onClick={() => this.props.history.push('/setting')}><SVG type='setting' /></span> : null
  //         }
  //       </div>
  //     </div>
  //   );
  // }
  /**********本地*************/

}

export default withRouter(TopMenu);