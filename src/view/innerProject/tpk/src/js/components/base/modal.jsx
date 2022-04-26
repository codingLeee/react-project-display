/*
 * @Author: Summer 
 * @Date: 2017-09-18 09:52:49 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-19 16:49:29
 * 提示框、确认框及模态弹出窗
 */

import React, { Component } from 'react';
import { Modal,Button } from 'antd';
import '../../../css/components/base/modal.css';

/**
 * @description 弹出操作确认框
 * @param {String} title 提示框标题
 * @param {String|ReactNode} content 提示说明
 * @param {function} fnOK 点击确定按钮回调
 * @param {function} fnCancel 点击取消按钮回调
 */
export function confirm(title, content, fnOK, fnCancel){
  title = title || '操作提示';
  content = content || '你确定要进行该操作吗？';
  Modal.confirm({
    title: title,
    content: content,
    okText:'取消',
    cancelText:'确定',
    okType:'default',
    onOk: function(){
      var self = this;
      if(typeof fnCancel === 'function'){
        var promise = new Promise((resolve, reject) => {
          fnCancel.call(this, resolve);
        });
        return promise;
      }
    },
    onCancel: function(){
      var self = this;
      if(typeof fnOK === 'function'){
        var promise = new Promise((resolve, reject) => {
          fnOK.call(this, resolve);
        });
        return promise;
      }
    },
    // footer:[
    //   <Button type="button" className="ant-btn ant-btn-primary ant-btn-lg" onClick={this.onOk}>确定</Button>,
    //   <Button type="button" className="ant-btn ant-btn-lg" onClick={this.onCancel}>取 消</Button>
    // ],
    // onOk: function(){
    //   var self = this;
    //   if(typeof fnOK === 'function'){
    //     var promise = new Promise((resolve, reject) => {
    //       fnOK.call(this, resolve);
    //     });
    //     return promise;
    //   }
    // },
    // onCancel: function(){
    //   var self = this;
    //   if(typeof fnCancel === 'function'){
    //     var promise = new Promise((resolve, reject) => {
    //       fnCancel.call(this, resolve);
    //     });
    //     return promise;
    //   }
    // },
    iconType: null
  });
}

/**
 * @description 弹出信息提示框
 * @param {String} title 提示框标题
 * @param {String|ReactNode} content 提示说明
 * @param {function} fnOK 点击确认按钮回调
 */
export function info(title, content, fnOK){
  title = title || '信息提示';
  content = content || '提示信息内容';
  Modal.info({
    title: title,
    content: content,
    okText:'关闭',
    onOk: function(){
      var self = this;
      if(typeof fnOK === 'function'){
        var promise = new Promise((resolve, reject) => {
          fnOK.call(this, resolve);
        });
        return promise;
      }
    },
    iconType: null
  });
}

/**
 * @description 操作成功提示
 * @param {String|ReactNode} content 提示说明
 * @param {Number} time 自动消失时间（毫秒），值为0时不自动消失
 * @retrun {Object} Modal对象引用
 */
export function success(content, time){
  content = content || '操作成功';
  time = typeof time === 'undefined' ? 3000 : time;
  var modal = Modal.success({
    title: '',
    content: content,
    iconType: 'check-circle-o',
    okText: '',
    cancelText: '',
    maskClosable: true,
    width: 280
  });
  if(time > 0){
    setTimeout(function() {
      modal.destroy();
    }, 3000);
  }
  return modal;
}

/**
 * @description 操作失败提示
 * @param {String|ReactNode} content 提示说明
 * @param {Number} time 自动消失时间（毫秒），值为0时不自动消失
 * @retrun {Object} Modal对象引用
 */
export function error(content, time){
content = content || '操作失败';
  time = typeof time === 'undefined' ? 3000 : time;
  var modal = Modal.error({
    title: '',
    content: content,
    iconType: 'close-circle-o',
    okText: '',
    cancelText: '',
    maskClosable: true,
    width: 280
  });
  if(time > 0){
    setTimeout(function() {
      modal.destroy();
    }, 3000);
  }
}

/**
 * @description 警告提示
 * @param {String|ReactNode} content 提示说明
 * @param {Number} time 自动消失时间（毫秒），值为0时不自动消失
 * @retrun {Object} Modal对象引用
 */
export function warning(content, time){
content = content || '警告提示';
  time = typeof time === 'undefined' ? 3000 : time;
  var modal = Modal.warning({
    title: '',
    content: content,
    iconType: 'exclamation-circle-o',
    okText: '',
    cancelText: '',
    maskClosable: true,
    width: 280
  });
  if(time > 0){
    setTimeout(function() {
      modal.destroy();
    }, 3000);
  }
}

//export default {confirm, info, success, error, warning};