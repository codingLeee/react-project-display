import React from 'react';
import ReactDOM from 'react-dom';
import Loading from './view/page/loading';
import { LocaleProvider } from 'antd';
import { BrowserRouter as Router, Route, Redirect, browserHistory as history, NavLink } from 'react-router-dom'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './redux/index.reducer';
import thunkMiddleware from 'redux-thunk';
import { _x } from './js/index';
import G from './js/g';
import './css/base.css';
import './css/public.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import svgContent from "./svg/symbol-defs.svg";
import RouterRelation from './view/routerRelation';
import { getBaseinfo, loadGlobal } from './../src/js/g';
import Setting from './view/page/setting';
import Aidata from './view/page/aidata';
 

// {
//     /**
//      * 正式环境反调试去console.log
//      */
//     if (process.env.NODE_ENV !== 'development') {
//         if (window.console) {
//             for (let item in window.console) {
//                 window['console'][item] = () => {
//                     return false
//                 }
//             }
//         }
//     }
// }

// const setConfig = _x.util.request.setConfig;

// 动画
// _x.util.animation.start();

//reducers合并，并创建store和router:
// const store = createStore(allReducers, compose(
//     applyMiddleware(thunkMiddleware),
//     window.devToolsExtension ? window.devToolsExtension() : f => f)
// );
// document.querySelector('body').innerHTML += svgContent;


// 获取全局信息 开发模式下
// getBaseinfo();
// setConfig(G.baseinfo.serviceroot);
let type;
// if (window.location.href.indexOf('/setting') > -1) {
//     type = 1;
// } else if (window.location.href.indexOf('/ai_data') > -1) {
//     type = 2;
// }
// else {
//     loadGlobal();
// }



// url截取axios对象实例化，及页面title设置
// {
//     let token, orgcode;
//     let localUrl = window.location;
//     // console.log(localUrl);
//     if (localUrl.href.indexOf('token') > -1) {
//         let href = window.location.href.replace('?', '&');
//         let hrefArr = href.split('&'), search = '';
//         console.log(hrefArr);
//         for (let i in hrefArr) {
//             if (i > 0) {
//                 search += hrefArr[i] + '&';
//             }
//         }
//         search = search.slice(0, search.length - 1);
//         search = search.replace(/=/g, " ");
//         search = search.replace(/&/g, " ");
//         let searchObject = search.split(" ");
//         token = searchObject[1];
//         orgcode = searchObject[3];

//         let paramsInfo = { token, orgcode };
//         // 存全局
//         G.paramsInfo = paramsInfo;
//         // 存session
//         sessionStorage.setItem("paramsInfo", JSON.stringify(paramsInfo));
//         // axios对象初始实例化
//         setConfig(G.dataServices, token, orgcode);
//     } else {
//         if (sessionStorage.paramsInfo) {
//             token = JSON.parse(sessionStorage.paramsInfo).token;
//             orgcode = JSON.parse(sessionStorage.paramsInfo).orgcode;
//         } else if (G.paramsInfo) {
//             token = G.paramsInfo.token;
//             orgcode = G.paramsInfo.orgcode;
//         } else {
//             token = null;
//             orgcode = null;
//         }
//     }

//     if (token && orgcode) {
//         setConfig(G.dataServices, token, orgcode);
//     } else {
//         // 地址未带token，非法登录
//         let baseUrl = localUrl.origin;
//         window.location.href = baseUrl + '/error/?token=null&orgcode=null';
//     }
// }


// export default class App extends React.Component {
//     render() {
//         return <LocaleProvider locale={zh_CN}>
//             <Provider store={store}>
//                 <Router basename={window.location.pathname + '#'}>
//                     {
//                         type === 2 ?
//                             // AI 数据 广西版本需要
//                             <Aidata />
//                             :
//                             type === 1 ?
//                             // 进设置页
//                                 <Setting />
//                                 :
//                                 // 路由表
//                                 <RouterRelation />
//                     }
//                 </Router>
//             </Provider>
//         </LocaleProvider>
//     }
// }

// ReactDOM.render(<App />, document.getElementById('root'));
