/*
 * @Author: JC.Liu 
 * @Date: 2019-03-19 18:29:55 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-20 18:27:00
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import { BrowserRouter as Router } from 'react-router-dom';
import thunlMiddleware from 'redux-thunk';
import allReducers from './redux/index.redux';
import RouterRelation from './routerRelation';
import { G } from './js/g';
import 'moment/locale/zh-cn';
import { LocaleProvider, message } from 'antd';
import MenuConfig from './menu';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import axios from 'axios';
import svgContent from "./svg/symbol-defs.svg";
import _x from './js/_x/index';
import './css/index.scss';
import 'react-perfect-scrollbar/dist/css/styles.css'

const setConfig = _x.util.request.setConfig;

const store = createStore(allReducers, compose(applyMiddleware(thunlMiddleware), window.devToolsExtension
  ? window.devToolsExtension() : f => f));
document.querySelector('body').innerHTML += svgContent;

setConfig(G.serverUrl);

console.log("index 入口");

_x.util.animation.start();

message.config({
  maxCount: 1
});
ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      {/* basename 需要改成变量 */}
      <Router basename="/">
        <RouterRelation />
      </Router>
    </LocaleProvider>
  </Provider>
  , document.getElementById('root')
);


