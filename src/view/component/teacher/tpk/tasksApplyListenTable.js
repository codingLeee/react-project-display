/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:02:09 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-13 15:28:23
 * 已选教研课随堂听申请列表
 */
import React, { Component } from 'react';
import { Select, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { G } from './../../../../js/g';
import util from './../../../../js/_x/index.js';
const Request = util.util.request.request;
import ResearchTree from './../../admin/tpk/researchTree.jsx';
import ResearchSelect from './../../admin/tpk/researchSelect.jsx';
import ResearchClassTable from './../../admin/tpk/researchClassTable.jsx';
import ClassHaveChosed from './../../admin/tpk/classHaveChosed.jsx';
import './../../../../css/teacher/mj_reChoseLesson.css';
import './../../../../css/teacher/mj_tasksApplyListenTable.css';



class ReChoseLesson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // selectedKeys:'0-0-0-0',
      //gradeClass:'初一1班',
      //system:1,
      //week:7,
      system: '',         //学期下拉框当前value
      week: '',           //周次下拉框当前value
      weekData: [],      //周次下拉框
      //teaData:[],
      haveChosedData: [],
      classInfo: [],
      treeData: [],      //Tree组件
      semester: [],     //学期下拉列表
      systemData: [],
      classID: '', //班级id
      // weeks:'',//周次id
      // semesterId:'',//学期id,默认为本学期  
    };
    this.teacherId = G.baseinfo.teacherid;
    this.systemStatus = '';
    this.weekStatus = '';
    this.handleClassChange = this.handleClassChange.bind(this);
    this.getClassInfo = this.getClassInfo.bind(this);
    this.getSystem = this.getSystem.bind(this);
    this.handleSelectWeek = this.handleSelectWeek.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getLessonTable = this.getLessonTable.bind(this);
    this.handleSelectSystem = this.handleSelectSystem.bind(this);
  }
  componentDidMount() {
    this.getClassInfo();
    this.getSystem();
    //this.getData();
  };

  /**
   * 获取课表信息
   */
  getLessonTable = (classId, curWeek, CurSstm) => {
    var req = {
      teacherId: this.teacherId,
      classID: classId, //班级id
      weeks: curWeek,//周次id
      semesterId: CurSstm,//学期id,默认为本学期     
    };
    // Request('/teacherJob/myChooseListen', req, function (ret) {
    let ret = {
      result: true,
      data: {
        curriculumall: [
          {
            className: "教学班ERP101",
            courseName: "ERP沙盘实践",
            courseShortName: "ERP",
            curriculumallId: "97914d86048fd851e462f9e78a9a266d",
            flag: false,
            lessonOrder: 1,
            placeName: "101",
            semesterId: "2018_2019_2",
            teacherId: "2018012",
            teacherName: "王一",
            weekday: 1,
            weeks: 4
          }
        ]
      }
    }
    if (ret.message === "参数错误") {
      message.info('请选择要查看的班级', 3);
    } else {
      if (ret.result) {
        if (ret.data.curriculumall.length == 0) {
          // info('提示框','请选择查看时间',3000);
          this.setState({
            classInfo: [],
            // haveChosedData: []
          });
        } else {
          let resData = ret.data;
          var newClassInfo = [];
          resData.curriculumall.map((item) => {
            var classStatus = '';
            var idx = _.findIndex(this.state.haveChosedData, { key: item.curriculumallId });
            if (idx === -1) {
              if (item.flag) {
                classStatus = 'normal';
              } else {
                classStatus = 'dsbd';
              }
            } else {
              classStatus = 'blue';
            }
            if (item.teacherId == this.teacherId) {
              classStatus = 'dsbd';
            }
            newClassInfo.push({
              id: item.curriculumallId,
              teacherId: item.teacherId,
              semesterId: item.semesterId,
              lessonOrder: item.lessonOrder,
              weeksId: item.weeks,
              dayOfWeek: item.weekday,
              teacherName: item.teacherName,
              subjectName: item.courseName,
              subjectShortName: item.courseShortName,
              canClick: item.flag,
              status: classStatus,
              placeName: item.placeName
            });
          });
          this.setState({
            // system:this.props.system,         //学期下拉框当前value
            // week:this.props.week,           //周次下拉框当前value
            // weekData:this.props.weekData,      //周次下拉框
            // systemData:this.props.systemData,    //学期下拉框
            //teaData:this.state.teaData,       //教师数据
            //haveChosedData:this.state.haveChosedData,                 //请求课表时清空下方已选课堂
            classInfo: newClassInfo,
            // treeData:this.props.treeData,      //Tree组件
            // semester:this.props.semester,     //学期详细信息
            classID: req.classID, //班级id
            // weeks:req.weeks,//周次id
            // semesterId:req.semesterId, //学期id,默认为本学期  
            // treeClass:req.classID,
            system: req.semesterId,         //学期下拉框当前value
            week: req.weeks,
          });
        }

      } else {
        message.info('请选择要查看班级', 3);
      }
    }
    // }.bind(this));
  };

  /**
  * cjy获取所有的上课班级信息
  */
  getClassInfo = () => {
    // Request('/research_lesson/setting/get_class_info', {}, function (ret) {
    let ret = {
      result: true,
      data: [{
        id: "",
        name: "全部机构",
        children: []
      }]
    }
    if (ret.result) {
      this.setState({
        treeData: ret.data
      });
    };
    // }.bind(this));
  }

  /**
   * cjy获取学期信息
   */
  getSystem = () => {
    // Request('/research_lesson/setting/semester', {}, function (ret) {
    let ret = {
      result: true,
      data: [{
        id: "2018_2019_1",
        name: "第一学期",
        semesterEndDate: 1545580800000,
        semesterStartDate: 1545580800000,
        weeks: []
      }]
    }
    if (ret.result) {
      var newSystemData = [];
      ret.data.map((item) => {
        newSystemData.push({
          value: item.id,
          text: item.name
        });
      });
      var newWeekData = [];
      ret.data[0].weeks.map((item) => {
        newWeekData.push({
          value: item.id,
          text: `第${item.name}周`
        });
      });
      this.setState({
        systemData: newSystemData,
        weekData: newWeekData,
        semester: ret.data,
        system: newSystemData.length ? newSystemData[0].value : '',//学期下拉框设置当前默认选中第一条
        week: newWeekData.length ? newWeekData[G.currentWeek - 1].value : ''       //周次下拉框设置当前默认选中第一条
      });
    }
    // }.bind(this));
  };

  // 通过课程的id来获取本课程的详细数据
  componentWillMount() {
  }
  render() {
    return (
      <div className="pf-tap-applylisten">
        <div className="cjy-rcl-choseLsBox">
          <div className="cjy-rcl-treeAndTable">
            <ResearchTree treeData={this.state.treeData} handleChangeGrade={this.handleChangeGrade.bind(this)} />
            <div className="cjy-rcl-rightBox">
              <div className="cjy-rcl-slctBox">
                <ResearchSelect defaultValue={this.state.system} selectData={this.state.systemData} width={'160px'} handleSelect={this.handleSelectSystem.bind(this)} />
                <div className="cjy-rcl-slct2">
                  <ResearchSelect defaultValue={this.state.week} selectData={this.state.weekData} width={"160px"} handleSelect={this.handleSelectWeek.bind(this)} />
                </div>
              </div>
              <div className="cjy-rcl-tableBox">
                <ResearchClassTable classInfo={this.state.classInfo} handleClassChange={this.handleClassChange.bind(this)} />
              </div>
            </div>
          </div>
          <ClassHaveChosed type={'listen'} dataSource={this.state.haveChosedData} handleDelHaveChose={this.handleDelHaveChose.bind(this)} />
          <div className="pf-rap-confirm">
            <Button type="primary" onClick={this.handleSubmit}>确认申请</Button>&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to='/teacher/tpk/wdrw'>
              <Button onClick={this.handleCancel}>取消</Button>
            </Link>
            {/*} <Button onClick={this.handleCancel}>取消</Button>*/}
          </div>
        </div>
      </div>
    );
  }

  handleSubmit() {
    var chosedDatas = this.state.haveChosedData;
    let chosedData = [];
    chosedDatas.map((item, i) => {
      let obj = {};
      let key = item.key;
      let teachID = item.teacherId;
      obj[key] = teachID;
      chosedData.push(obj)
    })
    if (chosedData.length !== 0) {
      let req = {
        teacherId: this.teacherId,
        curriculumall: chosedData
      }
      // Request('/teacherJob/myApply', req, function (ret) {
      let ret = {
        data: { flag: true },
        message: null,
        result: true
      }
      if (ret.result) {
        if (ret.data.flag) {
          message.info('申请听课成功！', function (resolve) {
            window.location.reload();
            resolve(); //执行此方法弹出框才会关闭，用于需要等待的异步操作
          });
        } else {
          message.info('申请听课失败，请重试！', 3);
        }
      } else {
        message.error('操作失败', 3);
      }
      // }.bind(this));
    } else {
      message.info('您尚未选择随堂听课，请选择随堂听课后进行确认申请操作！', 3);
    }
  }

  handleCancel() {
    var newInfo = this.state.classInfo;
    var chosedData = this.state.haveChosedData;
    chosedData.map((data) => {
      var index = _.findIndex(newInfo, { id: data.key });
      if (index === -1) {
        return;
      } else {
        newInfo[index].status = 'normal';
        this.setState({
          classInfo: newInfo
        });
      }
    })
    this.setState({
      haveChosedData: []
    });
  }

  handleClassChange(oprt, classInfo) {
    var newInfo = this.state.classInfo;
    var chosedData = this.state.haveChosedData;
    if (oprt === 'add') {
      chosedData.push({
        key: classInfo.id,
        time: `第${Number(this.state.week).toChinese()}周 星期${Number(classInfo.dayOfWeek).toChinese() === '七' ? '日' : Number(classInfo.dayOfWeek).toChinese()} 第${Number(classInfo.lessonOrder).toChinese()}节`,
        name: classInfo.teacherName,
        subject: classInfo.subjectName,
        // gradeClass:this.state.gradeClass,
        gradeClass: classInfo.placeName,
        teacherId: classInfo.teacherId
      });
      this.setState({
        haveChosedData: chosedData
      });

      var index = _.findIndex(newInfo, { id: classInfo.id });
      if (index === -1) {
        return;
      } else {
        newInfo[index].status = 'blue';
        this.setState({
          classInfo: newInfo
        });
      }
    } else if (oprt === 'del') {
      var index = _.findIndex(chosedData, { key: classInfo.id });
      if (index === -1) {
        return;
      } else {
        _.pullAt(chosedData, index);
        this.setState({
          haveChosedData: chosedData
        });
      }

      index = _.findIndex(newInfo, { id: classInfo.id });
      if (index === -1) {
        return;
      } else {
        newInfo[index].status = 'normal';
        this.setState({
          classInfo: newInfo
        });
      }
    }
  };

  handleDelHaveChose(key) {
    var newInfo = this.state.classInfo;
    var index = _.findIndex(newInfo, { id: key });
    if (index !== -1) {
      newInfo[index].status = 'normal';
      this.setState({
        classInfo: newInfo
      });
    }

    var chosedData = this.state.haveChosedData;
    index = _.findIndex(chosedData, { key: key });
    if (index === -1) {
      return;
    } else {
      _.pullAt(chosedData, index);
      this.setState({
        haveChosedData: chosedData
      });
    }
  };

  /**
   * 树组件改变
   * @param {String} selectedKeys 树组件当前选中key
   * @param {String} info 当前选中key对应信息
   */
  handleChangeGrade(selectedKeys, info, level) {
    // var items = selectedKeys[0].split('_');
    // if(items.length>3){
    //   this.getLessonTable(selectedKeys[0],this.state.week,this.state.system);
    //   this.setState({
    //     classId:selectedKeys[0],
    //     gradeClass:info

    //   });
    // };

    if (selectedKeys.length) {
      if (level === '3') {
        this.getLessonTable(selectedKeys[0], this.state.week, this.state.system);
        this.setState({
          classId: selectedKeys[0],
          gradeClass: info
        });
      }
    }

  };

  // handleDelete(num){
  //   let teaDataAfterDel = this.state.teaData;
  //   this.state.teaData.splice(num,1);
  //   this.setState({
  //     teaData:teaDataAfterDel
  //   });
  // };

  /**
 * 学期下拉框选择事件
 */
  handleSelectSystem(value) {
    var index = _.findIndex(this.state.semester, { id: value });
    if (index === -1) {
      return;
    } else {
      var newWeekData = [];
      this.state.semester[index].weeks.map((item) => {
        newWeekData.push({
          value: item.id,
          text: `第${item.name}周`
        });
      });
    };
    this.setState({
      system: value,
      weekData: newWeekData,
      //week:newWeekData.length?newWeekData[0].value:'',
      week: newWeekData.length ? newWeekData[G.currentWeek - 1].value : ''       //周次下拉框设置当前默认选中第一条
    });
    if (newWeekData.length) {
      this.getLessonTable(this.state.classId, newWeekData[G.currentWeek - 1].value, value);
    } else {
      message.info('本学期暂无周次信息，请重新选择学期！', 3);
      this.setState({
        classInfo: [],
      });
    }
  };

  /**
   * 周次下拉框选择事件
   */
  handleSelectWeek(value) {
    this.systemStatus = value;
    this.setState({
      week: value
    });
    this.systemStatus = value;
    var classId = this.state.classId;
    this.getLessonTable(this.state.classId, value, this.state.system);
  };

}

export default ReChoseLesson;