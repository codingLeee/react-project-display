/*
 * @Author: Summer
 * @Date: 2017-08-02 09:29:31
 * @Last Modified by: Summer
 * @Last Modified time: 2017-09-21 16:56:08
 * 基础功能扩展
 */
import _ from 'lodash';

export function init() {
  //基础设置
  (function () {
    /**
     * 为类设置属性（和方法）
     * @param   {number}   nMask     属性各项配置，四位二进制数，依次为accessor descriptor（访问器）,writable,configurable,enumerable，可是数字或字符串
     *                             可用的配置项
     *                             0 : readonly data descriptor - not configurable, not enumerable (0000).
     *                             1 : readonly data descriptor - not configurable, enumerable (0001).
     *                             2 : readonly data descriptor - configurable, not enumerable (0010).
     *                             3 : readonly data descriptor - configurable, enumerable (0011).
     *                             4 : writable data descriptor - not configurable, not enumerable (0100).
     *                             5 : writable data descriptor - not configurable, enumerable (0101).
     *                             6 : writable data descriptor - configurable, not enumerable (0110).
     *                             7 : writable data descriptor - configurable, enumerable (0111).
     *                             8 : accessor descriptor - not configurable, not enumerable (1000).
     *                             9 : accessor descriptor - not configurable, enumerable (1001).
     *                             10 : accessor descriptor - configurable, not enumerable (1010).
     *                             11 : accessor descriptor - configurable, enumerable (1011).
     *                             Note: If the flag 0x8 is setted to "accessor descriptor" the flag 0x4 (writable)
     *                             will be ignored. If not, the fSet argument will be ignored.
     * @param   {object}   oObj      接收属性的对象
     * @param   {string}   sKey      属性名称
     * @param   {object}   vVal_fGet 属性值或者geter访问器
     * @param   {function} fSet      （可选）seter访问器
     * @returns {object}   被设置属性/方法的对象本上
     */
    Object.setProperty = function (nMask, oObj, sKey, vVal_fGet, fSet) {
      var oDesc = {};
      if (typeof nMask === "string") {
        nMask = parseInt(nMask, 2);
      }
      if (nMask & 8) {
        // accessor descriptor
        if (vVal_fGet) {
          oDesc.get = vVal_fGet;
        }
        if (fSet) {
          oDesc.set = fSet;
        }
      } else {
        // data descriptor
        if (arguments.length > 3) {
          oDesc.value = vVal_fGet;
        }
        oDesc.writable = Boolean(nMask & 4);
      }
      oDesc.enumerable = Boolean(nMask & 1);
      oDesc.configurable = Boolean(nMask & 2);
      Object.defineProperty(oObj, sKey, oDesc);
      return oObj;
    };
    //将设置属性方法设置为不可修改、不可配置
    Object.setProperty(0, Object, "setProperty");
  })();

  //Date
  (function () {
    /**
     * 获取从某一年开始计算到当前日期值的周数
     * @param   {number} nYear      开始计算的年份，默认为当前日期值所在年份
     * @param   {number} nWeekStart 每周开始为周几，默认为周一
     * @returns {number} 总周数
     */
    Date.prototype.getWeekFromYear = function (nYear, nWeekStart) {
      nWeekStart = (nWeekStart || 1) - 0;
      if (isNaN(nWeekStart) || nWeekStart > 6)
        nWeekStart = 1;
      if (!nYear) {
        nYear = this.getFullYear();
      }
      var dFirstDay = new Date(nYear, 0, 1);
      var nFirstWeekDays = 7 - dFirstDay.getDay() + nWeekStart;
      var nDayOfYear = (((new Date(this.getFullYear(), this.getMonth(), this.getDate())) - dFirstDay) / (24 * 3600 * 1000)) + 1;
      return Math.ceil((nDayOfYear - nFirstWeekDays) / 7) + 1;
    };

    Object.setProperty(0, Date.prototype, "getWeekFromYear");
    /**
     * 获取当前日期在本月的周数
     * @param   {number} nWeekStart 每周开始为周几，默认为周一, 可选值1到7
     * @returns {number} 总周数
     */
    Date.prototype.getWeekFromMonth = function (nWeekStart) {
      nWeekStart = (nWeekStart || 1) % 7;
      if (isNaN(nWeekStart) || nWeekStart > 7)
        nWeekStart = 1;
      var dFirstDay = new Date(this.getFullYear(), this.getMonth(), 1);
      var nFirstWeekDays = 7 - dFirstDay.getDay() + nWeekStart;
      var nDayOfYear = (((new Date(this.getFullYear(), this.getMonth(), this.getDate())) - dFirstDay) / (24 * 3600 * 1000)) + 1;
      return Math.ceil((nDayOfYear - nFirstWeekDays) / 7) + 1;
    };

    Object.setProperty(0, Date.prototype, "getWeekFromMonth");
    /**
     * 获取当前时间所在周的第一天日期
     * @param   {number} nWeekStart 每周开始为周几，默认为周一, 可选值1到7
     * @returns {date}
     */
    Date.prototype.getWeekStart = function (nWeekStart) {
      nWeekStart = (nWeekStart || 1) % 7;
      if (isNaN(nWeekStart) || nWeekStart > 7)
        nWeekStart = 1;
      var date = (new Date(this.getFullYear(), this.getMonth(), this.getDate()));
      date.setDate(date.getDate() - this.getDay() + nWeekStart);
      return date;
    };

    Object.setProperty(0, Date.prototype, "getWeekStart");
    /**
     * 获取当前时间所在月的天数
     * @returns {number}
     */
    Date.prototype.getMonthDays = function () {
      var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
      return d.getDate();
    };

    Object.setProperty(0, Date.prototype, "getMonthDays");

    /**
     * 日期时间格式化
     * @param   {string} [sFmt='yyyy-MM-dd HH:mm:ss'] 输出的日期时间格式
     * @returns {string} 格式化后的字符串
     */
    Date.prototype.format = function (sFmt) {
      sFmt = sFmt || 'yyyy-MM-dd HH:mm:ss';
      var aWeekDay = [
        '日',
        '一',
        '二',
        '三',
        '四',
        '五',
        '六'
      ];
      var obj = {
        'y': this.getFullYear(), // 年份，注意必须用getFullYear
        'M': this.getMonth() + 1, // 月份，注意是从0-11
        'd': this.getDate(), // 日期
        'q': Math.floor((this.getMonth() + 3) / 3), // 季度
        'w': this.getDay(), // 星期，注意是0-6
        'H': this.getHours(), // 24小时制
        'h': this.getHours() % 12 == 0 ?
          12 : this.getHours() % 12, // 12小时制
        'm': this.getMinutes(), // 分钟
        's': this.getSeconds(), // 秒
        'S': this.getMilliseconds() // 毫秒
      };
      for (var i in obj) {
        sFmt = sFmt.replace(new RegExp(i + '+', 'g'), function (m) {
          var val = String(obj[i]);
          if (i == 'w')
            return (m.length > 2 ?
              '星期' :
              '周') + aWeekDay[val];
          val = _.padStart(val, m.length, '0');
          return m.length == 1 ?
            val :
            val.substring(val.length - m.length);
        });
      }

      return sFmt;
    };
    Object.setProperty(0, Date.prototype, "format");
  })();

  //Number
  (function () {
    /**
     * 将数字转换成中文文本
     * @param   {boolean} bIsCapital 是否中文大写
     * @returns {string}  转换后的字符串
     */
    Number.prototype.toChinese = function (bIsCapital) {
      var str = this + '';
      var len = str.length - 1;
      var idxs = [
        '',
        '十',
        '百',
        '千',
        '万',
        '十',
        '百',
        '千',
        '亿',
        '十',
        '百',
        '千',
        '万',
        '十',
        '百',
        '千',
        '亿'
      ];
      var num;
      if (bIsCapital) {
        num = [
          '零',
          '壹',
          '贰',
          '叁',
          '肆',
          '伍',
          '陆',
          '柒',
          '捌',
          '玖'
        ];
      } else {
        num = [
          '零',
          '一',
          '二',
          '三',
          '四',
          '五',
          '六',
          '七',
          '八',
          '九'
        ];
      }
      return str.replace(/([1-9]|0+)/g, function ($, $1, idx, full) {
        var pos = 0;
        if ($1[0] != '0') {
          pos = len - idx;
          if (idx == 0 && $1[0] == 1 && idxs[pos] == '十') {
            return idxs[pos];
          }
          return num[$1[0]] + idxs[pos];
        } else {
          var left = len - idx;
          var right = left + $1.length;
          if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
            pos = left - left % 4;
          }
          if (pos) {
            return idxs[pos] + num[$1[0]];
          } else if (idx + $1.length >= len) {
            return '';
          } else {
            return num[$1[0]];
          }
        }
      })
    };
    Object.setProperty(0, Number.prototype, "toChinese");

    /**
     * 将数字输出为带单位的文本
     * @param   {boolean} baseUnit 基准单位，默认为K
     * @returns {string}  转换后的字符串
     */
    Number.prototype.formatSize = function (baseUnit) {
      baseUnit = baseUnit || 'K';
      baseUnit = baseUnit.toUpperCase();
      var units = ['K', 'M', 'G', 'T'],
        cnt = 0,
        size = this,
        index = 0;
      while (size > 1024) {
        size = size / 1024;
        cnt++;
      }
      units.forEach(function (item, idx) {
        if (item === baseUnit) {
          index = idx;
        }
      });
      return (size.toFixed(2) + units[index + cnt] + 'B');
    }
  })();

  (function () {

    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
  })();
}