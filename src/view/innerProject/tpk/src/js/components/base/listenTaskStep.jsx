/*
* @Author: Minj 
* @Date: 2017-09-11 10:27:54 
 * @Last Modified by: JudyC
 * @Last Modified time: 2017-10-20 17:08:09
* 听评课-管理员部分-随堂听任务-教师课堂信息部分7
* 该组件调用格式：<ListenTaskStep steps={steps} linkInfo={lisLink}></ListenTaskStep>
* 数据传入格式：
*     步骤条：const steps = [{ title: '指标名', content: '取一个随堂听指标名' }];
*/
import React, { Component } from 'react';
import { Steps, Button, Modal } from 'antd';
import { withRouter } from 'react-router-dom';
// import createBrowserHistory from 'history/createBrowserHistory';
import { info, success, warning } from '../../components/base/modal';
import ResearchClass from '../researchClass';
import _ from 'lodash';
import { Global } from '../../base/g.js';
import '../../../css/iconfont.css';
import _x from '../../base/_x/api/api.js';


import ListenPlanName from '../../components/listenPlanName';
import ListenCheckCon from '../../components/listenCheckCon';
import ListenFreqSet from '../../components/listenFreqSet';
import ListenTaskDetail from '../../components/listenTaskDetail';

import ConfirmPlanName from '../../components/confirmPlanName';
import RePlanSlctTea from '../../components/rePlanSlctTea';
import ReChoseLesson from '../../components/reChoseLesson';
import ReScoreTeacher from '../../components/reScoreTeacher';

import '../../../css/components/base/listenTaskStep.css';

const Step = Steps.Step;

class ListenTaskStep extends Component {
  constructor(props) {
    super(props);
    var page1Input = '',
      editorTip = 0,
      checkPer = [],
      page3Frequ = '7',
      page3Count = 1;
    if (this.props.defaultData !== undefined) {
      page1Input = this.props.defaultData.planName;
      editorTip = 1;
      checkPer = this.props.defaultData.personList;
      const freData = this.props.defaultData.frequency;
      if (freData === '每周') {
        page3Frequ = '7';
      } else if (freData === '每月') {
        page3Frequ = '30';
      } else {
        page3Frequ = '-1';
      }
      page3Count = this.props.defaultData.planCnt;
    }
    this.state = {
      current: 0,           //当前组件
      visible: false,       //Modal控制
      warningData: [],      //已有任务老师
      warningTip: 0,        //已有任务老师提示  标识
      editorTip: editorTip, //编辑状态  标识
      page1: page1Input,    //组件1  数据   计划名
      page2: checkPer,      //组件2  数据
      page3frequ1: page3Frequ,
      page3frequ2: page3Count,
      page3: [],
      page4: [],
      planList: [],            //第三步需要提交数据cjy
      haveChosedData: [],      //已选的课（课表下方表格数据）
      classInfo: [],            //课表信息
      system: '',         //学期下拉框当前value
      week: '',           //周次下拉框当前value
      weekData: [],      //周次下拉框
      systemData: [],    //学期下拉框
      treeData: [],      //Tree组件
      semester: [],       //学期详细信息
      classId: '',        //当前选中班级
      gradeClass: '',     //当前选中班级名字
      disFini: false,      //完成按钮是否禁用
    };
    this.planId = '';             //当前计划id，cjy添加
    this.classIdArray = []      //存放当前计划编辑前已有的课程id

    this.repeatPlan = this.repeatPlan.bind(this);
    this.page1Data = this.page1Data.bind(this);
    this.page2Data = this.page2Data.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.page3Data1 = this.page3Data1.bind(this);
    this.page3Data2 = this.page3Data2.bind(this);
    this.repeatTeacher = this.repeatTeacher.bind(this);
    this.saveChange = this.saveChange.bind(this);
    this.cleanWarning = this.cleanWarning.bind(this);

    //cjy函数
    this.getDtlData = this.getDtlData.bind(this);
    this.checkName = this.checkName.bind(this);
    this.handlePage1 = this.handlePage1.bind(this);
    this.handlePage3 = this.handlePage3.bind(this);
    this.handlePage4 = this.handlePage4.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.saveLessonTable = this.saveLessonTable.bind(this);
    this.getClassInfo = this.getClassInfo.bind(this);
    this.getSystem = this.getSystem.bind(this);
    this.submitRePlan = this.submitRePlan.bind(this);
    this.getDetail = this.getDetail.bind(this);
  }
  /**
   * 公用
   */
  componentDidMount() {
    if (this.props.person === 'cjy') {
      this.planId = this.props.match.params.planId ? this.props.match.params.planId : '';
      this.getClassInfo();
      this.getSystem();
      if (this.planId !== '') {
        this.getDtlData(this.planId);
      }
    }
  }
  // 步骤条  下一步
  next() {
    //mj  
    if (this.state.current === 0 && this.props.person === 'mj') {     //步骤一
      if (this.state.page1.length !== 0 && this.state.editorTip === 0) {      //新增
        this.repeatPlan('', this.state.page1);
      } else if (this.state.page1.length !== 0 && this.state.editorTip === 1) {   //编辑
        this.repeatPlan(this.props.defaultData.planId, this.state.page1);
      } else {
        // warning('随堂听计划名不能为空', 2000);
        info('提示框', '随堂听计划名不能为空', function (resolve) {
          resolve();
        });
      }

    } else if (this.state.current === 1 && this.props.person === 'mj') {      //步骤二
      // 处理数据为后台需要的样式
      var teaList = '';
      const teachers = this.state.page2;
      for (var i = 0, len = teachers.length; i < len; i++) {
        teaList = teaList + ',' + teachers[i].teacherId;
      }
      teaList = teaList.slice(1);

      if (this.state.page2.length !== 0 && this.state.editorTip === 0) {      //新增
        this.repeatTeacher(teaList, '');
      } else if (this.state.page1.length !== 0 && this.state.editorTip === 1) {   //编辑
        this.repeatTeacher(teaList, this.props.defaultData.planId);     //page2,计划id
      } else {
        // warning('请安排随堂课听课成员', 2000);
        info('提示框', '请安排随堂课听课成员', function (resolve) {
          resolve();
        });
      }
      //cjy
    } else if (this.state.current === 0 && this.props.person === 'cjy') {
      this.checkName();
    } else if (this.state.current === 1 && this.props.person === 'cjy') {
      if (this.state.page2.length) {
        const current = this.state.current + 1;
        this.setState({ current });
      } else {
        // warning('请选择教师', 2000);
        info('提示框', '请选择教师', function (resolve) {
          resolve();
        });

      }
    } else if (this.state.current === 2 && this.props.person === 'cjy') {
      this.saveLessonTable('next');
    }
  }
  // 步骤条  上一步
  prev() {
    if (this.state.current === 2 && this.props.person === 'cjy') {
      this.saveLessonTable('last');
    } else {
      const current = this.state.current - 1;
      this.setState({ current });
    }
  }
  //清空有任务人员数据       zq
  cleanWarning(flag) {
    if (flag) {
      const deleCon = this.state.warningData;
      deleCon.map((item, index) => {
        if (item === flag) {
          deleCon.splice(index, 1);
        }
      })
      this.setState({
        warningData: deleCon
      });
    }
  }
  //Modal显示
  showModal() {
    //mj  保存数据
    if (this.props.person === 'mj') {
      var teacherId = '';
      //传回后台数据处理
      this.state.page2.map((item) => {
        teacherId = teacherId + ',' + item.teacherId;
      })
      teacherId = teacherId.slice(1);

      if (this.state.page3frequ2 === '0' || this.state.page3frequ2 === '') {
        // warning('请填写听课次数', 2000);
        info('操作提示', '请填写听课次数', function (resolve) {
          resolve();
        });
      } else {
        if (this.props.defaultData !== undefined) {     //编辑
          this.saveChange(this.props.defaultData.planId, this.state.page1, teacherId, this.state.page3frequ1, this.state.page3frequ2);
        } else {    //新增
          this.saveChange('', this.state.page1, teacherId, this.state.page3frequ1, this.state.page3frequ2);
        }
        this.setState({
          visible: true,
        });
      }
    } else if (this.props.person === 'cjy') {
      this.submitRePlan();
    }
  }
  // 组件1数据
  page1Data(e) {
    //闵洁
    var val = e.target.value;
    // var pattern = /^[\w\u4e00-\u9fa5]+$/gi;
    // if (val === '' || pattern.test(val)) {
    this.setState({
      page1: val
    })
    // } else {
    // warning('请勿输入特殊字符', 2000);
    // info('提示框', '请勿输入特殊字符', function (resolve) {
    // resolve();
    // });
    // /}
    // }

    //闵洁
  }

  // 组件2数据
  page2Data(val, oprt, teaInfo) {
    this.setState({
      page2: val
    });
    //删除或增加教师时的的操作
    if (teaInfo) {
      if (oprt === 'del') {
        var newChosedData = this.state.haveChosedData;
        newChosedData.map((item1, index1) => {
          var idx = _.findIndex(item1.teacherList, { teacherId: teaInfo });
          if (idx !== -1) {
            _.pullAt(item1.teacherList, idx);
            item1.num = item1.num - 1;
          }
        });
        this.setState({
          haveChosedData: newChosedData
        })
      } else if (oprt === 'add') {
        newChosedData = this.state.haveChosedData;
        if (newChosedData.length !== 0) {
          newChosedData.map(item1 => {
            if (teaInfo.length) {
              teaInfo.map(item2 => {
                item1.teacherList.push(item2);
              });
              item1.num = item1.num + teaInfo.length;
            } else {
              item1.teacherList.push(teaInfo);
              item1.num = item1.num + 1;
            }
          });
          this.setState({
            haveChosedData: newChosedData
          });
        }
      }
    }
  }

  /**
   * mj
   */
  // 请求数据函数
  //判断计划名是否重复
  repeatPlan(planId, planName) {
    _x.util.request('/listenJob/listenMissionSettingNameValidate', {
      'planId': planId,
      'planName': planName
    }, function (ret) {
      if (ret.result) {
        //计划名不重复则跳至下一页    否则提示框提示
        const current = this.state.current + 1;
        this.setState({ current });
      } else {
        info('提示框', '随堂听计划名重复,请重新填写', function (resolve) {
          //dosomething
          resolve();
        });
        // warning('随堂听计划名重复,请重新填写', 2000);
      }
    }.bind(this));
  }
  // 已有任务老师判断
  repeatTeacher(teachers, plan) {
    // console.log('重复任务老师判断：' + teachers + '加' + plan);
    _x.util.request('/listenJob/listenMissionSettingValidate', {
      'techIds': teachers,
      'planId': plan
    }, function (ret) {
      if (ret.result) {
        if (ret.data.length !== 0) {
          const warningData = ret.data.split(',');
          var tip = 0;
          if (warningData.length !== 0) {
            tip = 1;
          }
          this.setState({
            warningData: warningData,
            warningTip: tip
          })
        } else {
          const current = this.state.current + 1;
          this.setState({ current });
        }
      }
    }.bind(this));
  }
  // 数据保存
  saveChange(planId, planName, teachers, frequ, count) {
    // console.log(planId + '  ' + planName + '   ' + teachers + '   ' + frequ + '   ' + count);
    _x.util.request('/listenJob/listenMissionSettingSave', {
      'planId': planId,
      'planName': planName,
      'techIds': teachers,
      'frequency': frequ,//7 / 30 / -1
      'planCnt': count
    }, function (ret) {
      if (ret.result) {
      }
    });
  }
  // mj  Modal关闭
  hideModal() {
    success('数据保存成功', 3000);
    this.setState({
      visible: false,
    });
    this.props.history.push('/lisSet/TpkManaLisTargetSet');
  }
  // mj  组件3数据
  page3Data1(val) {
    this.setState({
      page3frequ1: val
    })
    // console.log('组件3数据1：' + val);
  }
  page3Data2(val) {
    //闵洁
    // if (val.length <= 3) {
    var pattern = /^[\d]+$/gi;
    if (val === '' || pattern.test(val)) {
      this.setState({
        page3frequ2: val
      })
    } else {
      // warning('请输入正整数', 2000);
      info('提示框', '请输入正整数', function (resolve) {
        resolve();
      });
    }
    // }
    //闵洁
  }

  /**
   * cjy获取详细数据
   */
  getDtlData = (key) => {
    var req = {
      id: key
    };
    _x.util.request('/research_lesson/setting/get_one_plan_detail', req, function (ret) {
      if (ret.result) {
        //循环将已存在的课程Id取出
        var longestArrayIdx = 0;    //最多教师的数组的位置
        var longestArrayNum = 0;    //最多教师的数组有多少个教师
        ret.data.planList.map((item, index) => {
          this.classIdArray.push(item.curriculumId);
          if (item.teacherList.length > longestArrayNum) {
            longestArrayIdx = index;
            longestArrayNum = item.teacherList.length;
          }
        });

        var teaList = [];
        ret.data.planList[longestArrayIdx].teacherList.map(item => {
          teaList.push({
            teacherName: item.name,
            teacherId: item.id
          });
        });
        ret.data.planList[longestArrayIdx].scoreList.map(item => {
          var idx = _.findIndex(teaList, { 'teacherId': item });
          teaList[idx].status = 'chosed';
        });
        this.planId = ret.data.id
        this.setState({
          page1: ret.data.planName,
          page2: teaList
        });
        this.getDetail(this.classIdArray, ret.data.planList);
      }
    }.bind(this));
  };

  /**
 * 通过课程的id来获取本课程的详细数据
 */
  getDetail(classIdArray, planList) {
    var req = classIdArray;
    _x.util.request('/research_lesson/setting/get_curriculum_info', req, function (ret) {
      if (ret.result) {
        var chosedData = [];
        ret.data.map((item) => {
          var idx = _.findIndex(planList, { curriculumId: item.curriculumallId });
          var num = planList[idx].teacherList.length;
          var teacherList = [];
          planList[idx].teacherList.map(item => {
            teacherList.push({ teacherName: item.name, teacherId: item.id });
          })
          chosedData.push({
            key: item.curriculumallId,
            time: `第${Number(item.weeks).toChinese()}周 星期${item.weekday === 7 ? '日' : Number(item.weekday).toChinese()} 第${Number(item.lessonOrder).toChinese()}节`,
            name: item.teacherName,
            subject: item.subjectName,
            // gradeClass: item.className,
            gradeClass: item.placeName,
            num: num,
            teacherList: teacherList,
          });
        });
        this.setState({
          haveChosedData: chosedData
        });
      }
    }.bind(this));
  }

  /**
   * cjy获取所有的上课班级信息
   */
  getClassInfo = () => {
    _x.util.request('/research_lesson/setting/get_class_info', {}, function (ret) {
      if (ret.result) {
        this.setState({
          treeData: ret.data
        });
      };
    }.bind(this));
  }

  /**
   * cjy获取学期信息
   */
  getSystem = () => {
    _x.util.request('/research_lesson/setting/semester', {}, function (ret) {
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
          system: Global.id ? Global.id : (newSystemData.length ? newSystemData[0].value : ''),
          week: Global.currentWeek ? parseInt(Global.currentWeek) : (newWeekData.length ? newWeekData[0].value : '')
          // week:Global.currentWeek?Global.currentWeek:(newWeekData.length ? newWeekData[0].value : '')          
          // system: newSystemData.length ? newSystemData[0].value : '',//学期下拉框设置当前默认选中第一条
          // week: newWeekData.length ? newWeekData[0].value : ''       //周次下拉框设置当前默认选中第一条
        });
      }
    }.bind(this));
  };

  /**
   * cjy判断计划名是否重复
   */
  checkName = () => {
    var val = this.state.page1.trim();
    if (val == null || val === '') {
      info('提示框', '计划名不能为空！', function (resolve) {
        resolve();
      });
    } else {
      var req = {
        name: val,
        id: this.planId
      };
      _x.util.request('/research_lesson/setting/check_name', req, function (ret) {
        if (ret.result) {
          if (ret.data.flag) {
            info('提示框', '计划名不能重复', function (resolve) {
              resolve();
            });
          } else {
            const current = this.state.current + 1;
            this.setState({ current, page1: val });
          }
        } else {
          info('提示框', '计划异常');
        }
      }.bind(this));
    }
  }

  /**
   * cjy处理第三步将要上传数据（课表）
   */
  saveLessonTable = (drct) => {
    this.refs.getLessonTableData.submitLessonTableData(drct);
  }

  /**
   * 提交这个计划
   */
  submitRePlan = () => {
    var haveScoreTea = false;
    this.state.page2.map((item) => {
      if (item.status === 'chosed') {
        haveScoreTea = true;
      }
    });
    if (haveScoreTea) {
      console.log(111)
      this.setState({
        disFini: true
      });
      var planList = [];
      this.state.haveChosedData.map((item1) => {
        var teacherList = [];
        var scoreList = [];
        item1.teacherList.map((item2) => {
          teacherList.push({ id: item2.teacherId });
        });
        this.state.page2.map((item3) => {
          if (item3.status === 'chosed') {
            scoreList.push(item3.teacherId);
          }
        });
        planList.push({
          teacherList: teacherList,
          scoreList: scoreList,
          curriculumId: item1.key
        })
      });
      var req = {
        planName: this.state.page1,
        id: this.planId,
        planList: planList
      };
      _x.util.request('/research_lesson/setting/save_or_update', req, function (ret) {
        if (ret.result) {
          this.planId = ret.data.id;
          this.setState({
            visible: true,
          });
        } else {
          info('提示框', ret.message, function (resolve) {
            resolve();
          });
          this.setState({
            disFini: false
          });
        }
      }.bind(this), () => {
        this.setState({
          disFini: false
        });
      });
    } else {
      // warning('请选择评分老师', 2000);
      info('提示框', '请选择评分老师', function (resolve) {
        resolve();
      });

    }
  }

  /**
   * cjy组件步骤1
   */
  handlePage1 = (e) => {
    var val = e.target.value;
    this.setState({
      page1: val
    });
    // var pattern = /^[\w\u4e00-\u9fa5]+$/gi;
    // if (val === '' || pattern.test(val)) {
    // if (val === '') {
    // } else {
    // warning('请勿输入特殊字符', 2000);
    // info('提示框', '请勿输入特殊字符', function (resolve) {
    // resolve();
    // });
    // }
  }

  /**
   * cjy组件步骤3
   */
  handlePage3 = (obj, drct) => {
    if (drct === 'next') {
      if (obj.haveChosedData.length) {
        const current = this.state.current + 1;
        this.setState({
          current: current
        });
      } else {
        info('提示框', '请选择课程', 2000);
      }
    } else if (drct === 'last') {
      const current = this.state.current - 1;
      this.setState({
        current: current
      });
    }
    this.setState({
      system: obj.system,         //学期下拉框当前value
      week: obj.week,           //周次下拉框当前value
      weekData: obj.weekData,      //周次下拉框
      systemData: obj.systemData,    //学期下拉框
      page2: obj.teaData,       //教师数据即teaData！！！
      haveChosedData: obj.haveChosedData,//选中教师数据
      classInfo: obj.classInfo,     //课表数据
      treeData: obj.treeData,      //Tree组件
      semester: obj.semester,       //学期详细信息
      classId: obj.classId,        //当前选中班级
      gradeClass: obj.gradeClass     //当前选中班级名字
    });
    // if (obj.haveChosedData.length) {
    //   this.setState({
    //     system: obj.system,         //学期下拉框当前value
    //     week: obj.week,           //周次下拉框当前value
    //     weekData: obj.weekData,      //周次下拉框
    //     systemData: obj.systemData,    //学期下拉框
    //     page2: obj.teaData,       //教师数据即teaData！！！
    //     haveChosedData: obj.haveChosedData,//选中教师数据
    //     classInfo: obj.classInfo,     //课表数据
    //     treeData: obj.treeData,      //Tree组件
    //     semester: obj.semester,       //学期详细信息
    //     classId: obj.classId,        //当前选中班级
    //     gradeClass: obj.gradeClass     //当前选中班级名字
    //   });
    //   if (drct === 'next') {
    //     const current = this.state.current + 1;
    //     this.setState({
    //       current: current
    //     });
    //   } else if (drct === 'last') {
    //     const current = this.state.current - 1;
    //     this.setState({
    //       current: current
    //     });
    //   }
    // } else {
    //   info('提示框', '请选择课程', 2000);
    // };
  }

  /**
   * cjy组件步骤4
   */
  handlePage4 = (n, oprt) => {
    var newteaData = this.state.page2;
    if (oprt === 'chose') {
      newteaData[n].status = 'chosed';
    } else if (oprt === 'del') {
      newteaData[n].status = 'normal';
    }

    this.setState({
      page2: newteaData
    });
  };

  /**
   *  cjy Modal确认
   */
  handleOk = () => {
    this.setState({
      visible: false,
      classInfo: []
    });
    this.props.history.push('/reSetup/rePlan');
  };

  /**
   * cjy Modal取消
   */
  handleCancel = () => {
    this.setState({
      visible: false,
      classInfo: []
    });
    this.props.history.push('/reSetup/rePlan');
  };

  render() {
    const { current } = this.state;
    const ifli = this.props.person;
    //mj  从table传入值
    var sele = this.state.page3frequ1;
    if (sele === '7') {
      sele = '每周';
    } else if (sele === '30') {
      sele = '每月';
    } else {
      sele = '每学期';
    }

    return (
      <div className='mj-lts-stepCon'>
        {/* 步骤条 */}
        <div className='mj-lts-steps'>
          <Steps current={current}>
            {
              this.props.steps.map((item, index) =>
                <Step key={index} title={item.title} description={item.content}></Step>
              )
            }
          </Steps>
        </div>

        {/* 内容 */}
        <div className="mj-lts-content">
          <div>
            {
              (ifli === 'mj') ?
                (() => {
                  switch (this.state.current) {
                    case 0: return <ListenPlanName page1Data={this.page1Data} defaultData={this.state.page1}></ListenPlanName>;
                    case 1: return <ListenCheckCon page2Data={this.page2Data} warningTip={this.state.warningTip} warningData={this.state.warningData} defaultData={this.state.page2} cleanWarning={this.cleanWarning}></ListenCheckCon>;
                    case 2: return <ListenFreqSet page3Data1={this.page3Data1} page3Data2={this.page3Data2} defaulFrequ={this.state.page3frequ1} defaultCount={this.state.page3frequ2}></ListenFreqSet>;
                    default: return '';
                  }
                })()
                :
                (() => {
                  switch (this.state.current) {
                    case 0: return <ConfirmPlanName handlePage1={this.handlePage1} defaultData={this.state.page1}></ConfirmPlanName>;
                    case 1: return <RePlanSlctTea page2Data={this.page2Data} warningTip={this.state.warningTip} warningData={this.state.warningData} defaultData={this.state.page2} cleanWarning={this.cleanWarning}></RePlanSlctTea>;
                    case 2: return <ReChoseLesson ref="getLessonTableData" system={this.state.system} week={this.state.week} weekData={this.state.weekData} systemData={this.state.systemData} teaData={this.state.page2} haveChosedData={this.state.haveChosedData} classInfo={this.state.classInfo} treeData={this.state.treeData} semester={this.state.semester} classId={this.state.classId} gradeClass={this.state.gradeClass} handlePage3={this.handlePage3} planId={this.planId}></ReChoseLesson>;
                    case 3: return <ReScoreTeacher teaData={this.state.page2} handlePage4={this.handlePage4}></ReScoreTeacher>;
                    default: return '';
                  }
                })()
            }
          </div>
        </div>

        {/* 按钮 */}
        <div className="mj-lts-btnCon">
          {/* 不是第一步 */}
          {
            this.state.current > 0
            &&
            <Button className='mj-lts-btn' onClick={() => this.prev()}>
              上一步
              </Button>
          }
          {/* 未到最后一步 */}
          {
            this.state.current < this.props.steps.length - 1
            &&
            <Button className='mj-lts-next mj-lts-btn' type="primary" onClick={() => this.next()}>下一步</Button>
          }
          {/* 最后一步 */}
          {
            this.state.current === this.props.steps.length - 1
            &&
            <Button className='mj-lts-next mj-lts-btn' type="primary" onClick={this.showModal} disabled={this.state.disFini}>完成</Button>
          }
          {
            ifli === 'mj' ?
              (
                <Modal className='mj-lts-modalCon' title={this.state.page1} visible={this.state.visible} onOk={this.hideModal} onCancel={this.hideModal} okText="关闭">
                  <ListenTaskDetail sele={this.state.page3frequ1} freque={this.state.page3frequ2} perList={this.state.page2}></ListenTaskDetail>
                </Modal>
              ) :
              (
                <Modal footer={false} className="cjy-lts-modal" title="教研计划详情" visible={this.state.visible} onCancel={this.handleCancel}>
                  <ResearchClass choseKey={this.planId} />
                  <div className="ant-modal-footer">
                    <Button className="ant-btn ant-btn-primary ant-btn-lg" onClick={this.handleOk}>关闭</Button>
                  </div>
                </Modal>
              )
          }
        </div>
      </div>
    );
  }

}

export default withRouter(ListenTaskStep);