/*
 * @Author: Summer
 * @Date: 2017-08-02 11:29:16
 * @Last Modified by: Summer
 * @Last Modified time: 2017-08-02 17:11:36
 * 动画循环
 */
import {
  requestAnimationFrame
} from '../env/env';
import _ from 'lodash';

export const animation = function () {};
var tasks = [];
var running = false;
var start = 0;
/**
 * 添加动画或计时任务
 * @param   {number}  [delay=1]        持续时长或计时长度，单位秒，最小值为0.1秒，默认1秒
 * @param   {boolean} [isseries=false] 是否连续执行
 * @param   {fun}     todo             回调函数
 * @param   {boolean}     [isloop=false]   是否循环调用
 * @returns {boolean} 任务是否添加成功
 */
animation.add = function (delay, isseries, todo, isloop) {
  if (typeof todo === 'function') {
    delay = delay || 1;
    delay = Math.max(delay, 0.1);
    delay = delay * 1000;
    isseries = isseries || false;
    isloop = isloop || false;
    var task = {
      delay: delay,
      todo: todo,
      isseries: isseries,
      isloop: isloop,
      start: start
    };
    tasks.push(task);
    return true;
  } else {
    return false;
  }
}
/**
 * 启动循环
 */
animation.start = function () {
  document.addEventListener('unload', function () {
    running = false;
    tasks = [];
  });
  running = true;
  requestAnimationFrame(anloop);
}
/**
 * 停止循环
 */
animation.stop = function () {
  running = false;
  tasks = [];
}
/**
 * 动画循环执行主体方法
 */
function anloop(timestamp) {
  if (running) {
    start = timestamp;
    requestAnimationFrame(anloop);
    var shifts = [];
    tasks.forEach(function (item, index) {
      var delay = timestamp - item.start;
      if (delay >= item.delay) {
        var over = item.todo(item.start, timestamp);
        if (over === false || !item.isloop) {
          shifts.push(item);
        } else {
          item.start = start;
        }
      } else if (item.isseries) {
        var over = item.todo(item.start, timestamp);
        if (over === false) {
          shifts.push(item);
        }
      }
    });
    if (shifts.length) {
      tasks = _.difference(tasks, shifts);
    }
  }
}