/*
 * @Author: JC.Liu
 * @Date: 2019-02-22 16:08:44
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-27 16:03:24
 * loading 模块 在此获取全局信息，初始化项目
 */
import React, { Component } from 'react'
import { message } from 'antd'
import { G, findGlobalData } from './../../js/g'
import _x from './../../js/_x/index'
const Request = _x.util.request.request
class Loading extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    Promise.all([
      // 获取所有巡课机构
      Request('api/web/big_data/get_patrol_orgs', {}, res => { }),
      // 获取所有教学机构
      Request('api/web/big_data/get_teach_orgs', {}, res => { }),
      // 获取所有的课程类型
      Request('api/web/big_data/get_course_type', {}, res => { }),
      // 获取所有的机构，根节点是全部机构，每个学员中挂人
      Request('api/web/research_lesson/setting/get_class_info', {}, res => { }),
      // 获取学期数 第一学期和第二学期 ，每个学期对象中包含周次，还有学期的开始和结束时间
      Request('api/web/research_lesson/setting/semester', {}, res => { }),
      // 获取所有评课机构
      Request('api/web/big_data/get_evaluation_org', {}, res => { }),
    ])
      .then(values => {
        if (values && values.length === 6) {
          values.map((item, index) => {
            switch (index) {
              case 0:
                if (item.data.result && item.data.data && item.data.data.length) {
                  // 巡课机构
                  G.xkTrgList = item.data.data
                } else {
                  G.xkTrgList = []
                }
                break
              case 1:
                if (item.data.result && item.data.data && item.data.data.length) {
                  // 教学机构
                  G.trgList = item.data.data
                } else {
                  G.trgList = []
                }
                break
              case 2:
                if (item.data.result && item.data.data && item.data.data.length) {
                  G.typeList = item.data.data
                } else {
                  G.typeList = []
                }
                break
              case 3:
                // 获取所有的机构，根节点是全部机构，每个学员中挂人
                if (item.data.result && item.data.data && item.data.data.length) {
                  G.sections = item.data.data
                } else {
                  G.sections = []
                }
                break
              case 4:
                // 获取学期数 第一学期和第二学期 ，每个学期对象中包含周次，还有学期的开始和结束时间
                if (item.data.result && item.data.data && item.data.data.length) {
                  var weekms = 86400000 * 7
                  var currentWeek = ''
                  var dnow = new Date() // 一周的毫秒数
                  // G.semesters = item.data.data.map(item => {
                  //   var semester = {
                  //     id: item.id,
                  //     name: item.name,
                  //     start: new Date(item.semesterStartDate) ,
                  //     end: new Date(item.semesterEndDate)
                  //   }
                  //   var firsttime = 0;

                  //   if(semester.start){
                  //     firsttime =  semester.start.getWeekStart().getTime()
                  //   }else{
                  //     firsttime=0
                  //   }

                  //   semester.weeks = item.weeks.map(week => {
                  //     var start = new Date(firsttime + weekms * (week.id - 1))
                  //     if (start <= dnow) {
                  //       currentWeek = String(week.id)
                  //     }
                  //     return {
                  //       id: String(week.id),
                  //       name: '第' + Number(week.name).toChinese() + '周',
                  //       start: start,
                  //       end: new Date(start.getTime() + 86400000 * 6)
                  //     }
                  //   })
                  //   if (semester.start <= dnow) {
                  //     G.semester = semester
                  //     G.currentWeek = currentWeek
                  //   }
                  //   return semester
                  // })
                } else {
                  G.semester = [];
                  G.currentWeek = "";
                }
                break;
              case 5:
                // 全部评课机构
                if (item.data.result && item.data.data && item.data.data.length) {
                  G.pkTrgList = item.data.data;
                } else {
                  G.pkTrgList = [];
                }
                break;
              default:
                break
            }
          });
          
          // 将全局数据存入session
          sessionStorage.setItem('G', JSON.stringify(G));
        } else {
          message.error('全局信息获取错误，请尝试重新登录', 2)
          this.props.history.push('/login')
        }
      })
      .then(res => {
        if (G.baseinfo && Object.keys(G.baseinfo).length) {
          switch (G.baseinfo.roleLevel) {
            case 1:
              this.props.history.push('/admin')
              break
            case 2:
              this.props.history.push('/admin')
              break
            case 3:
              this.props.history.push('/teacher')
              break
            case 4:
              this.props.history.push('/teacher')
              break
            default:
              break
          }
        } else {
          findGlobalData()
            .then(res => { })
            .catch(err => {
              message.error('全局信息获取错误，请尝试重新登录', 2)
              this.props.history.push('/login')
            })
        }
      })
  }

  render() {
    return false
  }
}

export default Loading
