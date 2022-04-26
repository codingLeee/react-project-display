import util from './../js/_x/index';
const Request = util.util.request.request;

const GET_PLACE_TREE = 'GET_PLACE_TREE';
const GET_VIDEO = 'GET_VIDEO';
const GET_OLD_ORDER = 'GET_OLD_ORDER';
const GET_COMMENT_PAGE = 'GET_COMMENT_PAGE';
const init = {
    placeTree: {},
    videoInfo: {},
    oldOrder: [],
    commentPage: {}
}

export function checkOfRoomReducer(state = init, action) {
    switch (action.type) {
        case GET_PLACE_TREE:
            return {
                ...state,
                placeTree: action.data
            }
        case GET_OLD_ORDER:
            return {
                ...state,
                oldOrder: action.data
            }
        case GET_VIDEO:
            return {
                ...state,
                videoInfo: action.data
            }
        case GET_COMMENT_PAGE:
            return {
                ...state,
                commentPage: action.data
            }
        default:
            return state;
    }
}
/**
 * 根据教室id查询对应教室上课场次
 */
export function oldOrder(params) {
    return dispatch => {
        Request('api/web/classroomcheck/get_old_order',{
            // "place_id": "1FF494C031C94091B3B577C92383139E"
            "place_id":params.place_id
        },(res) => {
            if(res.result){
                dispatch({
                    type: GET_OLD_ORDER,
                    data: res.data
                })
            }
        })  
    }
}
/**
 * 教室列表查询
 */
export function placeTree() {
    return dispatch => {
        Request('api/web/classroomcheck/place_tree',{
            "actureDate": "2019-02-16",
            "teacherId": "2018012",
            "weeks": 3
        },(res) => {
            if(res.result){
                let placeTree = [];
                res.data.length ? res.data.map((item,index) => {
                    placeTree.push({ name:item.buildName,id:item.buildId,children:[]});
                    item.children.length ? item.children.map((item2,index2) => {
                        placeTree[index].children.push({ name:item2.bname,id:item2.bid,children:[] });
                        item2.children.length ? item2.children.map( item3 => {
                            placeTree[index].children[index2].children.push({ name:item3.bname,id:item3.bid,children:[] });
                        }) : null
                    }) : null
                }) : null 
                // console.log(placeTree)
                dispatch({
                    type: GET_PLACE_TREE,
                    data: placeTree
                })
            }
        })
    }
}
/**
 * 根据教室位置查找视屏播放源
 */
export function getVideo(params) {
    return dispatch => {
        Request('api/web/classroomcheck/get_video',{
            "place_id": params.place_id,
            "orderId": params.orderId
        },(res) => {
            console.log(res)
        })
        const data = {
            "addrList": [{
                "equipName": "4313学生",
                "equipTypeNum": 2,
                "urlList": [{
                    "playtype": "hd",
                    "urlList": [{
                        "url": "rtmp://110.185.174.59:1936/live|rtspstd_hik/192.168.65.108/554/1/main/admin/admin123",
                        "videotype": "rtmp"
                    }]
                }]
            }],
            "cfp": {
                "academicYearName": "2018_2019",
                "actualYear": 2018,
                "actureDate": 1551024000000,
                "actureEndTime": 1551067200000,
                "actureStartTime": 1551061200000,
                "classActureNum": null,
                "classID": "180903",
                "className": "18工程造价3",
                "classNum": null,
                "classStudentNum": 63,
                "courseId": "10014",
                "courseName": "思想道德修养与法律基础",
                "curriculumallId": "0813324f0feada4f95ccfab4f88103bf",
                "gradeGroupId": null,
                "gradeGroupName": null,
                "gradeId": "020900",
                "gradeListId": "020900",
                "gradeListName": "工程经济学院",
                "gradeYear": 2018,
                "headteacherID": null,
                "headteacherName": null,
                "lastUpdateTime": 1550217529000,
                "lessonEndTime": 14400000,
                "lessonOrder": 2,
                "lessonStartTime": 8400000,
                "professonalId": "0901",
                "professonalName": "工程造价",
                "semesterEndTime": 1560009600000,
                "semesterId": "2018_2019_1",
                "semesterStartTime": 1549814400000,
                "semesterTypeId": "1",
                "teacherId": "198604",
                "teacherName": "张书菊",
                "weekday": 1,
                "weeks": 3,
                "classroomID": {
                    "classroomId": "1044313",
                    "classroomName": "4313",
                    "deleteFlag": false,
                    "equipmentList": [{
                        "cameraProviderType": {
                            "cameraTypeId": "2",
                            "typeName": null
                        },
                        "channelNum": 1,
                        "classroomId": "1044313",
                        "deleteFlag": false,
                        "equipEnableFlag": false,
                        "equipId": "2ECD9C489E074EF1B9F613E9B1F88417",
                        "equipName": "4313学生",
                        "equipPort": 9901,
                        "equipPwd": "admin123",
                        "equipTypeId": {
                            "equipTypeId": 2,
                            "equipName": "4313学生"
                        },
                        "indexCode": "",
                        "ipAddr": "192.168.65.108",
                        "lastErrorTime": null,
                        "lastUpdateTime": 1550217529000,
                        "mainRtmpAddr": null,
                        "modType": 2,
                        "parantsId": null,
                        "setUseFul": false,
                        "subRtmpAddr": null,
                        "userName": "admin",
                        "vagId": ""
                    }],
                    "lastUpdateTime": 1550217529000
                }
            }
        }
        dispatch({
            type: GET_VIDEO,
            data: data
        })
    }
}
/**
 * 在教学检测下面评价部分，增加点评
 */
export function addComment(params) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Request('api/web/teacommon/addcomment',{
                "curriculumallId": params.curriculumallId,
                "description": params.description
            },(res) => {
                if(res.result){
                    resolve(true)
                }
            })    
        })
    }
}
/**
 * 视屏播放页面中，教学检测部分的评论信息
 */
export function commentPage(params) {
    return dispatch => {
        Request('api/web/teacommon/commentPage',{
            // "curriculumallId": params.curriculumallId,
            "curriculumallId":"0813324f0feada4f95ccfab4f88103bf",
            "pageNumber": params.pageNumber,
            "pageSize": 10,
            "type": params.type
        },(res) => {
            console.log(res)
            if(res.result){
                dispatch({
                    type: 'GET_COMMENT_PAGE',
                    data: data
                })
            }
        })  
    }
}