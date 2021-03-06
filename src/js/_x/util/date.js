/*
 * @Author: SummerSKW 
 * @Date: 2017-12-29 13:34:16 
 * @Last Modified by: lxx
 * @Last Modified time: 2018-11-14 17:23:30
 * Date对象方法扩展
 */
import _ from 'lodash';
/**
 * 获取从某一年开始计算到指定日期值的周数
 * @param   {Date} date         指定日期
 * @param   {Number} nYear      开始计算的年份，默认为当前日期值所在年份
 * @param   {Number} nWeekStart 每周开始为周几，默认为周一
 * @returns {Number} 总周数
 */
export const getWeekFromYear = function (date, nYear, nWeekStart) {
  nWeekStart = (nWeekStart || 1) - 0;
  if (isNaN(nWeekStart) || nWeekStart > 6)
    nWeekStart = 1;
  if (!nYear) {
    nYear = date.getFullYear();
  }
  var dFirstDay = new Date(nYear, 0, 1);
  var nFirstWeekDays = 7 - dFirstDay.getDay() + nWeekStart;
  var nDayOfYear = (((new Date(date.getFullYear(), date.getMonth(), date.getDate())) - dFirstDay) / (24 * 3600 * 1000)) + 1;
  return Math.ceil((nDayOfYear - nFirstWeekDays) / 7) + 1;
};
/**
 * 获取指定日期在本月的周数
 * @param   {Date} date         指定日期
 * @param   {Number} nWeekStart 每周开始为周几，默认为周一, 可选值1到7
 * @returns {Number} 总周数
 */
export const getWeekFromMonth = function (date, nWeekStart) {
  nWeekStart = (nWeekStart || 1) % 7;
  if (isNaN(nWeekStart) || nWeekStart > 7)
    nWeekStart = 1;
  var dFirstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var nFirstWeekDays = 7 - dFirstDay.getDay() + nWeekStart;
  var nDayOfYear = (((new Date(date.getFullYear(), date.getMonth(), date.getDate())) - dFirstDay) / (24 * 3600 * 1000)) + 1;
  return Math.ceil((nDayOfYear - nFirstWeekDays) / 7) + 1;
};
/**
 * 获取指定时间所在周的第一天日期
 * @param   {Date} date         指定日期
 * @param   {Number} nWeekStart 每周开始为周几，默认为周一, 可选值1到7
 * @returns {Date}
 */
export const getWeekStart = function (date, nWeekStart) {
  nWeekStart = (nWeekStart || 1) % 7;
  if (isNaN(nWeekStart) || nWeekStart > 7)
    nWeekStart = 1;
  var ndate = (new Date(date.getFullYear(), date.getMonth(), date.getDate()));
  ndate.setDate(date.getDate() - date.getDay() + nWeekStart);
  return ndate;
};

/**
 * 获取指定时间所在月的天数
 * @param   {Date} date         指定日期
 * @returns {Number}
 */
export const getMonthDays = function (date) {
  var d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.getDate();
};
/**
 * 日期时间格式化
 * @param   {Date} date         指定日期
 * @param   {String} [sFmt='yyyy-MM-dd HH:mm:ss'] 输出的日期时间格式 默认值为'yyyy-MM-dd HH:mm:ss'
 * @returns {String} 格式化后的字符串
 */
export const format = function (date, sFmt) {
  sFmt = sFmt || 'yyyy-MM-dd HH:mm:ss';
  var aWeekDay = ['日', '一', '二', '三', '四', '五', '六'],
    obj = {
      'y': date.getFullYear(), // 年份，注意必须用getFullYear
      'M': date.getMonth() + 1, // 月份，注意是从0-11
      'd': date.getDate(), // 日期
      'q': Math.floor((date.getMonth() + 3) / 3), // 季度
      'w': date.getDay(), // 星期，注意是0-6
      'H': date.getHours(), // 24小时制
      'h': date.getHours() % 12 === 0 ?
        12 : date.getHours() % 12, // 12小时制
      'm': date.getMinutes(), // 分钟
      's': date.getSeconds(), // 秒
      'S': date.getMilliseconds() // 毫秒
    };
  const replacefun = function (m) {
    var val = String(obj[i]);
    if (i === 'w')
      return (m.length > 2 ?
        '星期' :
        '周') + aWeekDay[val];
    val = _.padStart(val, m.length, '0');
    return m.length === 1 ?
      val :
      val.substring(val.length - m.length);
  };
  for (var i in obj) {
    sFmt = sFmt.replace(new RegExp(i + '+', 'g'), replacefun);
  }

  return sFmt;
};

/**
 * 
 * @param {* 秒数} sec 
 */
export const formatSec = function (sec) {
  let time;
  if (!sec) {
    time = "00'" + '00"';
  } else if (sec < 10) {
    time = "00'0" + sec + '"';
  } else if (sec >= 10 && sec < 60) {
    time = "00'" + sec + '"';
  } else {
    let rem = sec / 60;
    if (Math.floor(rem) !== rem) {
      rem = sec - parseInt(sec / 60) * 60;
      if (rem < 10) {
        time = parseInt(sec / 60) + "'0" + rem + '"';
      } else {
        time = parseInt(sec / 60) + "'" + rem + '"';
      }
    } else {
      time = parseInt(sec / 60) + "'" + '00"';
    }
  }
  return time;
}

/**
 * 秒数转化成分钟
 * @param {* 秒数} sec 
 */
export const formatMin = function (sec) {
  let time;
  if (sec && sec < 60) {
    time = 1;
  } else {
    let rem = sec / 60;
    if (Math.floor(rem) !== rem) {
      time = parseInt(rem) + 1;
    } else {
      time = parseInt(rem);
    }
  }
  return time;
}

/**
 * 
 * @param {*start} 开始时间 09:12:00
 * @param {*end} 结束时间
 */
export const TimeLength = function (start, end) {
  let starts = start.split(":");
  let ends = end.split(":");
  let startLong = Number(starts[0]) * 60 * 60 * 1000 + Number(starts[1]) * 60 * 1000 + Number(starts[2]) * 1000;
  let endLong = Number(ends[0]) * 60 * 60 * 1000 + Number(ends[1]) * 60 * 1000 + Number(ends[2]) * 1000;
  let result = endLong - startLong
  return (result > 0 ? result : 0);
}

export default { getWeekFromYear, getWeekFromMonth, getWeekStart, getMonthDays, format, formatSec, formatMin, TimeLength }