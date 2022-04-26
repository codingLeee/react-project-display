/*
 * @Author: Summer
 * @Date: 2017-08-01 17:16:07
 * @Last Modified by: Summer
 * @Last Modified time: 2017-10-10 21:16:25
 * 数据服务请求方法
 */
import axios from 'axios';
import _ from 'lodash';
import qs from 'qs';
/**
 * 数据请求相关配置
 */
var requestConfig = {
  'dataService': '', //数据服务入口
  'version': '1.06',
  'alias': 'ISCEM'
},
axiosIns;
/**
 * 请求数据服务
 * @param {String} method 请求的方法
 * @param {JSON} params 提交参数
 */
export const request = function (method, params, success, fail) {
  var opts = requestConfig;
  if(!opts.dataService){
    throw new Error('需要设置数据服务地址，请执行_x.util.request.setConfig进行设置');
  }

  if (method) {
    var postData = {
      'version': opts.version,
      'data': JSON.stringify(params || {}),
      'alias': opts.alias
    };
    var ajaxObj = axiosIns.post(method, qs.stringify(postData));
    if(typeof success === 'function'){
      ajaxObj.then(function(response){
        if(typeof success === 'function'){
          success(response.data);
        }
      });
    }
    if(typeof fail === 'funciton'){
      ajaxObj.catch(fail);
    }
    
    return ajaxObj;
  } else {
    throw new Error('请求数据需要指定方法，参数method不能为空');
  }
};

/**
 * @description 同时进行多个请求，全部完成时执行回调
 * @param {Array} requestList 请求列表[{method:'',params:{}}...]
 */
export const requestMultiple = function(requestList, success, fail){
  var reqlist, axiosobj;
  requestList = requestList || [];
  if(requestList.length === 0){
    throw new Error('arguments 不能为空');
  }
  reqlist = requestList.map((item) => {
    return request(item.method, item.params, item.success, item.fail);
  } );
  axiosobj  = axios.all(reqlist);
  if(typeof success === 'function'){
    axiosobj.then(axios.spread(function(){
      var rets = [];
      for(var i = 0; i < arguments.length; i ++){
        rets.push(arguments[i].data);
      }
      success(...rets);
    }));
  }

  if(typeof fail === 'function'){
    axiosobj.catch(fail);
  } 
}

/**
 * @description 设置数据服务配置
 * @author Summer
 * @param {String} dataService 数据服务地址
 */
function setConfig(dataService){
  dataService = dataService || "/";
  if(!_.endsWith(dataService, '/')){
    dataService = dataService + '/';
  }
  requestConfig.dataService = dataService;
  axiosIns = axios.create({
    baseURL: dataService
  });
}

request.setConfig = setConfig;