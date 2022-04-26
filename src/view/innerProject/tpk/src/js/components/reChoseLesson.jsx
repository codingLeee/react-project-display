/*
 * @Author: JudyC 
 * @Date: 2017-09-14 17:38:43 
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-02-27 19:42:16
 */
import React, { Component } from 'react';
import { Modal, Icon } from 'antd';
import _ from 'lodash';
import ResearchTree from './researchTree';
import ResearchTeacherLine from './researchTeacherLine';
import ResearchSelect from './base/researchSelect';
import ResearchClassTable from './researchClassTable';
import ClassHaveChosed from './classHaveChosed';
import { info } from '../components/base/modal';
import _x from '../base/_x/api/api.js';
import '../../css/components/reChoseLesson.css';

class ReChoseLesson extends Component {
  constructor() {
    super();
    this.state = {
      visible: '',       //模态框
      system: '',         //学期下拉框当前value
      week: '',           //周次下拉框当前value
      weekData: [],      //周次下拉框
      systemData: [],    //学期下拉框
      teaData: [],       //教师数据
      haveChosedData: [],//课表下表格中数据
      classInfo: [],     //课表数据
      treeData: [],      //Tree组件
      semester: [],       //学期详细信息
      classId: '',        //当前选中班级
      gradeClass: ''     //当前选中班级名字
    };
    this.classInfo = [];   //模态框需要变量
    this.teacherList = [];  //模态框需要变量
    this.idx = 0;           //模态框需要变量
    this.handleClassChange = this.handleClassChange.bind(this);
    this.handleSelectSystem = this.handleSelectSystem.bind(this);
    this.handleSelectWeek = this.handleSelectWeek.bind(this);
    this.getLessonTable = this.getLessonTable.bind(this);
    this.submitLessonTableData = this.submitLessonTableData.bind(this);
    this.handleChangeGrade = this.handleChangeGrade.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDelHaveChose = this.handleDelHaveChose.bind(this);
    this.judgeRepeat = this.judgeRepeat.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.setState({
      system: this.props.system,         //学期下拉框当前value
      week: this.props.week,           //周次下拉框当前value
      weekData: this.props.weekData,      //周次下拉框
      systemData: this.props.systemData,    //学期下拉框
      teaData: this.props.teaData,       //教师数据
      haveChosedData: this.props.haveChosedData,//选中教师数据
      classInfo: this.props.classInfo,     //课表数据
      treeData: this.props.treeData,      //Tree组件
      semester: this.props.semester,     //学期详细信息
      classId: this.props.classId,
      gradeClass: this.props.gradeClass
    })
  };

  /**
   * 获取课表信息
   */
  getLessonTable = (classId, curWeek, CurSstm) => {
    var req = {
      classId: classId, //班级id
      weeksId: curWeek,//周次id
      semesterId: CurSstm,//学期id,默认为本学期
      planId: this.props.planId
    };
    _x.util.request('/research_lesson/setting/get_curriculum', req, function (ret) {
      // console.log(ret);
      if (ret.result) {
        var newClassInfo = [];
        ret.data.map((item) => {
          var classStatus = '';
          var idx = _.findIndex(this.state.haveChosedData, { key: item.id });
          if (idx === -1) {
            if (item.canClick) {
              classStatus = 'normal';
            } else {
              classStatus = 'dsbd';
            }
          } else {
            classStatus = 'blue';
          }
          newClassInfo.push({
            id: item.id,
            teacherId: item.teacherId,
            semesterId: item.semesterId,
            lessonOrder: item.lessonOrder,
            weeksId: item.weeksId,
            dayOfWeek: item.dayOfWeek,
            teacherName: item.teacherName,
            subjectName: item.subjectName,
            subjectShortName: item.subjectShortName,
            canClick: item.canClick,
            status: classStatus,
            placeName: item.placeName
          });
        });
        this.setState({
          classInfo: newClassInfo,
        });
      } else if (classId === '') {
        info('提示框', '请选择要查看的班级');
      } else {
        info('提示框', '请选择查看时间');
      }
    }.bind(this));
  };

  /**
   * 提交第三步数据
   * @param { String } drct 上一步还是下一步
   */
  submitLessonTableData(drct) {
    this.props.handlePage3(this.state, drct);
  }

  render() {
    return (
      <div className="cjy-rcl-choseLsBox">
        <div className="cjy-rcl-treeAndTable">
          <ResearchTree treeData={this.state.treeData} handleChangeGrade={this.handleChangeGrade} />
          <div className="cjy-rcl-rightBox">
            <ResearchTeacherLine data={this.state.teaData} handleDelete={this.handleDelete} />
            <div className="cjy-rcl-slctBox">
              <ResearchSelect defaultValue={this.state.system} selectData={this.state.systemData} width={'160px'} handleSelect={this.handleSelectSystem} />
              <div className="cjy-rcl-slct2">
                <ResearchSelect defaultValue={this.state.week} selectData={this.state.weekData} width={'160px'} handleSelect={this.handleSelectWeek} />
              </div>
            </div>
            <div className="cjy-rcl-tableBox">
              <ResearchClassTable classInfo={this.state.classInfo} handleClassChange={this.handleClassChange} />
              <Modal className="cjy-rcl-modal" closable={false} title="提示" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} okText="计入" cancelText="不计入">
                <Icon className="cjy-rcl-close" type="close" onClick={this.closeModal} />
                <p className="cjy-rcl-info">存在听课老师进行教研自己授课的情况，是否计入任务中？</p>
              </Modal>
            </div>
          </div>
        </div>
        <ClassHaveChosed dataSource={this.state.haveChosedData} handleDelHaveChose={this.handleDelHaveChose} />
      </div>
    );
  }

  handleOk = () => {
    this.setState({
      visible: false
    });
    this.judgeRepeat(this.classInfo, this.teacherList);
  }

  handleCancel = () => {
    this.setState({
      visible: false
    });
    this.teacherList.splice(this.idx, 1);
    this.judgeRepeat(this.classInfo, this.teacherList);
  }

  closeModal = () => {
    this.setState({
      visible: false
    });
  }

  /**
   * 下方表格数据处理
   * @param {Object} classInfo 课对象
   * @param {Array} teacherList 教师对象数组
   */
  judgeRepeat(classInfo, teacherList) {
    var newInfo = this.state.classInfo;
    var chosedData = this.state.haveChosedData;
    chosedData.push({
      key: classInfo.id,
      time: `第${Number(this.state.week).toChinese()}周 星期${classInfo.dayOfWeek === 7 ? '日' : Number(classInfo.dayOfWeek).toChinese()} 第${Number(classInfo.lessonOrder).toChinese()}节`,
      name: classInfo.teacherName,
      subject: classInfo.subjectName,
      // gradeClass:this.state.gradeClass,
      gradeClass: classInfo.placeName,
      num: teacherList.length,
      teacherList: teacherList
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
    };
  }

  /**
   * 课表中课的点击事件
   * @param {String} oprt 操作（添加还是删除）
   * @param {Object} classInfo 当前点击课的信息
   */
  handleClassChange(oprt, classInfo) {
    // console.log(classInfo);
    this.classInfo = classInfo;
    var newInfo = this.state.classInfo;
    var chosedData = this.state.haveChosedData;
    if (oprt === 'add') {
      this.teacherList = [];
      this.state.teaData.map((item) => {
        this.teacherList.push(item);
      });
      this.idx = _.findIndex(this.state.teaData, { teacherId: classInfo.teacherId });
      if (this.idx !== -1) {
        this.setState({
          visible: true
        });
      } else {
        this.judgeRepeat(classInfo, this.teacherList);
      }

    } else if (oprt === 'del') {
      var index = _.findIndex(chosedData, { key: classInfo.id });
      if (index === -1) {
        return;
      } else {
        _.pullAt(chosedData, index);
        console.log(chosedData);
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

  /**
   * 课表下方表格删除事件
   * @param {Number} key 删第几节课
   */
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
    };
  };

  /**
   * 树组件改变
   * @param {String} selectedKeys 树组件当前选中key
   * @param {String} info 当前选中key对应信息
   */
  handleChangeGrade(selectedKeys, info, level) {
    // console.log(selectedKeys,info,level);
    if (selectedKeys.length) {
      if (level === '3') {
        // console.log('111');
        this.getLessonTable(selectedKeys[0], this.state.week, this.state.system);
        this.setState({
          classId: selectedKeys[0],
          gradeClass: info
        });
      }
    }
  };

  /**
   * 删除教师
   * @param {Number} num 教师位置
   */
  handleDelete(num, teacherId) {
    let teaDataAfterDel = this.state.teaData;
    if (teaDataAfterDel.length === 1) {
      info('提示框', '请至少保留一个教师');
    } else {
      teaDataAfterDel.splice(num, 1);
      var newChosedData = this.state.haveChosedData;
      newChosedData.map((item1, index1) => {
        var idx = _.findIndex(item1.teacherList, { teacherId: teacherId });
        if (idx !== -1) {
          _.pullAt(item1.teacherList, idx);
          item1.num = item1.num - 1;
        }
      });
      this.setState({
        haveChosedData: newChosedData,
        teaData: teaDataAfterDel
      })
    }
  };

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
      week: newWeekData.length ? newWeekData[0].value : ''
    });
    if (newWeekData.length) {
      this.getLessonTable(this.state.classId, newWeekData[0].value, value);
    } else {
      info('提示框', '本学期暂无周次信息，请重新选择学期！');
      this.setState({
        classInfo: []
      })
    }
  };

  /**
   * 周次下拉框选择事件
   */
  handleSelectWeek(value) {
    this.setState({
      week: value
    });
    this.getLessonTable(this.state.classId, value, this.state.system);
  };

}

export default ReChoseLesson;