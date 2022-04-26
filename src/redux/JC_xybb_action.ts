/*
 * @Author: JC.Liu 
 * @Date: 2019-03-24 13:34:42 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-24 15:12:22
 * action
 */

export enum ActionTypes {
  TEACH = "TEACH",
  PATROL = "PATROL",
  VIOLATION = "VIOLATION",
  TIME = "TIME",
}

export interface TeachDataInter {
  id: string
  collegeName: string
  count: number
  source: number
}

interface GetTeachDataInter {
  type: ActionTypes.TEACH,
  dataSource: TeachDataInter[]
}

// 获取教学机构数据
export function GetTeachData(): GetTeachDataInter {
  return {
    type: ActionTypes.TEACH,
    dataSource: [
      {
        id: "1",
        collegeName: "学校1",
        count: 10,
        source: 10
      }, {
        id: "2",
        collegeName: "学校2",
        count: 20,
        source: 20
      }, {
        id: "3",
        collegeName: "学校3",
        count: 30,
        source: 30
      }
    ]
  }
}

// interface TeachSlectInter {
//   type: ActionTypes.TEACH,
//   payload: {
//     data: TeachDataInter[]
//   }
// }

// // 教学机构下拉筛选
// export const TeachSelect = (value): TeachSlectInter => {
//   console.log("教学:", value);
//   dispatch => {
//     if (value) {
//       return dispatch({
//         type: ActionTypes.TEACH,
//         payload: {
//           data: []
//         }
//       })
//     } else {
//       return dispatch({
//         type: ActionTypes.TEACH,
//         payload: {
//           data: []
//         }
//       })
//     }
//   }
// }

// // 巡课机构下拉筛选
// export const PatrolMechanism = (value) => {
//   return dispatch => {

//   }
// }

// // 违纪类型下拉筛选
// export const ViolationTypeMechanism = (value) => {
//   return dispatch => {

//   }
// }

// // 时间范围筛选
// export const TimeChangeMechanism = (value) => {
//   return dispatch => {

//   }
// }

export type ActionBehavior = GetTeachDataInter;
