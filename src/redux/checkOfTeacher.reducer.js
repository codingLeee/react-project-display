/*
 * @Author: MinJ
 * @Date: 2019-02-28 10:05:01
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-19 11:28:05
 * 教学检查 - 教师查课
 */
import util from './../js/_x/index';
const Request = util.util.request.request;
const toChinese = util.util.number.toChinese;
const getWeekStart = util.util.date.getWeekStart;
const Format = util.util.date.format;

const PAGEDATA = 'PAGEDATA';
const PAGECHAN = 'PAGECHAN';

const init = {
  initData: true,           //首次加载页面
  collegeData: [],      //学院数据
  teaData: [],          //老师数据
  weeks: 1,            //周次数据
  weekNow: 1,           //当前周次
  tableTitle: [],       //课表头部数据
  tableLesson: [],      //课表节次数据
  tableData: [],        //课表内容数据

  college: '',          //学院
  teacher: '',          //教师
  search: '',            //搜索值
  week: 1,             //周次
}

export function checkOfTeaReducer(state = init, action) {
  switch (action.type) {
    case PAGEDATA:
      return { ...state, ...action };
    case PAGECHAN:
      return { ...state, ...action };
    default:
      return state;
  }
}

/**
 * @desc 获取学院
 */
export function requestCollege() {
  return dispatch => {
    Request('api/web/teacommon/teaching_org', {}, res => {
      if (res.result) {
        // const data = [
        //   { crgName: '初中一年级', crgUid: 'CZ_1_2019' },
        //   { crgName: '初中二年级', crgUid: 'CZ_2_2019' },
        //   { crgName: '初中三年级', crgUid: 'CZ_3_2019' },
        //   { crgName: '初中四年级', crgUid: 'CZ_4_2019' },
        // ];
        const data = res.data;
        dispatch({
          type: PAGEDATA,
          collegeData: data,
          college: data[0].crgUid,
        });
        dispatch(requestTea(data[0].crgUid));
      } else {
        dispatch({
          type: PAGEDATA,
          collegeData: [],
          college: '',
        });
      }
    })
  }
}

/**
 * @desc 获取教师列表
 * @param {string} id 学院id
 */
export function requestTea(id) {
  return (dispatch, getState) => {
    Request('api/web/teacommon/get_teachers_by_collegeId', { orgUid: id }, res => {
      if (res.result) {
        // const data = [
        //   { teacherId: '1', teacherName: '张亚军' },
        //   { teacherId: '2', teacherName: '张冠军' },
        //   { teacherId: '3', teacherName: '张季军' },
        //   { teacherId: '4', teacherName: '张不军' },
        // ];
        const data = res.data;
        dispatch({
          type: PAGEDATA,
          teaData: data,
          teacher: data[0].teacherId
        });
        dispatch(requestTable(data[0].teacherId));
      } else {
        dispatch({
          type: PAGEDATA,
          teaData: [],
          teacher: ''
        });
      }
    })
  }
}

/**
 * @desc 获取课表数据
 * @param {string} teacherId 教师id
 */
export function requestTable(teacherId) {
  // console.log(2)
  return (dispatch, getState) => {
    const { initData, week } = getState().checkOfTeaReducer;
    const params = {
      actureDate: '2019-03-19',
      teacherId,
      weeks: initData ? -1 : week
    };
    Request('api/web/teachercheck/getClaTable', params, res => {
      if (res.result) {
        const data = {
          lessonNum: 10, week: 2, weekNum: 9, date: '2019-03-02',
          gradeList: [
            { courseId: '1', course: "财务管理_尼古拉斯四", adress: "401", ifClick: 1 },
            { courseId: '2', course: "财务管理_尼古拉斯四", adress: "401", ifClick: 2 },
            { courseId: '3', course: "财务管理_尼古拉斯四", adress: "401", ifClick: 0 },
            { courseId: '4', course: "财务管理_尼古拉斯四", adress: "401", ifClick: 0 },
          ]
        };
        // const data = res.data;
        let tableLesson = [],
          tableData = data.gradeList,
          tableTitle = [],
          firDate = getWeekStart(new Date(data.date));
        for (let i = 1; i < data.lessonNum + 1; i++) {
          tableLesson.push(i);
        }
        for (let j = 4; j < 70; j++) {
          tableData.push(null);
        }
        for (let k = 1; k < 8; k++) {
          tableTitle.push({
            weekday: k === 7 ? '星期日' : `星期${toChinese(k)}`,
            date: Format(firDate, 'yyyy-MM-dd'),
          });
          firDate = dispatch(getDate(firDate));
        }
        if (initData) {
          dispatch({
            type: PAGEDATA,
            weeks: data.weekNum,
            tableLesson,
            tableData,
            tableTitle,
            weekNow: data.week,
            week: data.week,
            initData: false,
          })
        } else {
          dispatch({
            type: PAGEDATA,
            tableLesson,
            tableData,
            tableTitle,
            week: weekday,
            initData: false,
          })
        }
      } else {
        dispatch({
          type: PAGEDATA,
          weeks: 1,
          tableLesson: [],
          tableData: [],
          tableTitle: [],
        })
      }
    })
  }
}

/**
 * @description 根据教师名字获取教师id----模糊匹配
 * @param {string} tea 教师名字
 */
export function requestTeaId(tea) {
  return (dispatch, getState) => {
    const { weekNow, week } = getState().checkOfTeaReducer;
    Request('api/web/teachercheck/search_teacher', { orgUid: id }, res => {
      if (res.result) {
      } else {

      }
    })
    const data = '1';
    dispatch(requestTable(data, weekNow));
    dispatch({
      type: PAGECHAN,
      teacher: data
    })
  }
}

/**
 * @desc 计算出入日期的后一天
 * @param {*} date 日期
 */
export function getDate(date) {
  return dispatch => {
    let dd = new Date(date);
    dd.setDate(dd.getDate() + 1);
    return dd;
  }
}

/**
 * @desc 页面点击事件
 * @param {string} info 点击的标志
 * @param {string} data 点击的值
 */
export function chanSele(info, data) {
  // console.log(data)
  return (dispatch, getState) => {
    const { weeks, weekNow, week, teacher } = getState().checkOfTeaReducer;
    switch (info) {
      case 'college':
        dispatch(requestTea(data));
        dispatch({
          type: PAGECHAN,
          college: data
        });
        break;

      case 'teacher':
        dispatch(requestTable(data, weekNow));
        dispatch({
          type: PAGECHAN,
          teacher: data
        });
        break;

      case 'search':
        // console.log(week)
        dispatch(requestTeaId(data));
        dispatch({
          type: PAGECHAN,
          search: data
        })
        break;

      case 'weekNow':
        dispatch(requestTable(teacher, data));
        dispatch({
          type: PAGECHAN,
          week: data
        });
        break;

      case 'week':
        if (data > 0 && data <= weeks) {
          dispatch(requestTable(teacher, data));
          dispatch({
            type: PAGECHAN,
            week: data
          });
        }
        break;

      default:
        break;
    }
  }
}