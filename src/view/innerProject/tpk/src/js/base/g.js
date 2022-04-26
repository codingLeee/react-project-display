/*
 * @Author: Summer
 * @Date: 2017-09-19 09:14:28
 * @Last Modified time: 2017-10-19 14:31:40
 * @Last Modified by: yrj
 * @Last Modified time: 2019-03-27 14:25:29
 */
// import _ from 'lodash'
import _x from '../../../../../../js/_x/index'
// import Cookies from 'js-cookie'

export function loadBaseInfo () {
  _x.util.requestMultiple(
    [
      {
        // 获取所有的机构，根节点是全部机构，每个学员中挂人
        method: 'research_lesson/setting/get_class_info'
      },
      {
        // 获取学期数 第一学期和第二学期 ，每个学期对象中包含周次，还有学期的开始和结束时间
        method: 'research_lesson/setting/semester'
      }
    ],
    function (ret1, ret2) {
      if (ret1.result) {
        Global.sections = ret1.data
      }
      if (ret2.result) {
        var weekms = 86400000 * 7

        var currentWeek = ''

        var dnow = new Date() // 一周的毫秒数
        Global.semesters = ret2.data.map(item => {
          var semester = {
            id: item.id,
            name: item.name,
            start: new Date(item.semesterStartDate),
            end: new Date(item.semesterEndDate)
          }
          var firsttime = semester.start.getWeekStart().getTime()
          semester.weeks = item.weeks.map(week => {
            var start = new Date(firsttime + weekms * (week.id - 1))
            if (start <= dnow) {
              currentWeek = String(week.id)
            }
            return {
              id: String(week.id),
              name: '第' + Number(week.name).toChinese() + '周',
              start: start,
              end: new Date(start.getTime() + 86400000 * 6)
            }
          })
          if (semester.start <= dnow) {
            Global.semester = semester
            Global.currentWeek = currentWeek
          }
          return semester
        })
      }

      Global.loaded = true
      _x.env.dispatch(document, _x.env.loaded, Global)
    }
  )
}

export const Global = {
  /**
   * 用户信息
   */
  baseinfo: {},
  /**
   * 学期信息
   */
  semesters: [],
  /**
   * 当前学期
   */
  semester: {},
  /**
   * 学段学年年级信息
   */
  sections: [],
  loaded: false,
  funcs: [],
  rootpath: '',
  isdebug: false,
  currentWeek: ''
}

// export function loadGlobal () {
//   loadBaseInfo()
// }

// export function getBaseinfo (isDebug) {
//   // 解析出根地址
//   Global.rootpath = window.location.href.substring(
//     0,
//     window.location.href.indexOf('/tpk')
//   )
//   var uinfos = Cookies.get('tpk_cookies')

//   if (isDebug) {
//     // uinfos = '{"teacherId":"123456789","rm":"系统管理员","roleLevel":1,"userId":"411101500001_SUPERUSER","key":"QWERT","nm":"超级管理员"}';
//     // uinfos = '{"teacherId":"201501","rm":"管理员","roleLevel":2,"userId":"6281_999888","loginName": "999888","key":"QWERT","nm":"管理员"}';
//     uinfos =
//       '{"rm":"系统管理员","roleLevel":1,"userId":"6281_SUPERUSER","key":"QWERT","nm":"超级管理员"}'
//     // uinfos = '{"rm":"系统管理员","roleLevel":1,"userId":"510900_SUPERUSER","key":"QWERT","nm":"超级管理员"}';
//     // uinfos = '{"teacherId":"201615","rm":"教师","roleLevel":3,"userId":"6281_201615","key":"QWERT","nm":"张雅楠"}';
//     // uinfos = '{"teacherId":"201004","rm":"教师","roleLevel":3,"userId":"6281_201004","key":"QWERT","nm":"白克"}';
//     // uinfos = '{"teacherId":"2018008","rm":"教师","roleLevel":3,"userId":"510900_2018008","key":"QWERT","nm":"BY2"}';
//     Global.isdebug = true
//   }
//   if (uinfos) {
//     uinfos = JSON.parse(uinfos)
//     Global.baseinfo = {
//       uname: uinfos.nm,
//       userid: uinfos.userId,
//       loginName: uinfos.loginName,
//       utype: uinfos.rm,
//       ukey: uinfos.key,
//       teacherid: uinfos.teacherId,
//       systemname: '课堂生态',
//       role: uinfos.roleLevel,
//       // serviceroot: Global.isdebug ? 'http://192.168.20.67:8080/cloud/' : Global.rootpath
//       serviceroot: Global.isdebug
//         ? 'http://10.10.1.6:8081/cloud/'
//         : Global.rootpath
//       // serviceroot: Global.isdebug ? 'http://10.4.3.111:7080/cloud/' : Global.rootpath
//     }
//   } else {
//     window.location.href = Global.rootpath
//   }
// }
