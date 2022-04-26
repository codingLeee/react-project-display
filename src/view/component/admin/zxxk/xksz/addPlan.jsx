/*
 * @Author: JC.Liu 
 * @Date: 2019-02-27 09:44:45 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-02-27 09:48:18
 * 添加计划
 */
import React, { Component } from 'react';
import { Button, Input, Message, Modal, Radio, Select, Table } from 'antd';
import { SVG } from '../../../../../base.jsx';
import '../../../../../css/admin/ws_planSetting.scss';
import { WsTreeSelect } from './wsTreeSelect.jsx';
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const Option = Select.Option;
export class AddPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      college_list: [{ "name": "全部学院", "id": "all" }, { "name": "管理学院", "id": "961CCD37800848A481CBF0B8B03D69CA" }, { "name": "计算机学院", "id": "E4F3A12C3DC347978E6E1BCE7B2599E0" }],
      colleges_and_classes: [{ "collegeId": "ED04F1F37FBF47C284DCF8504EE47BD2", "collegeName": "管理学院", "classes": [{ "classId": "9387E84E4BFB55B98397A68A259B9495", "className": "教学班ERP101", "courses": 2.0 }, { "classId": "E476C848BE4A82D2DCC2063CD12FFCA4", "className": "教学班ERP201", "courses": 2.0 }, { "classId": "88F06BC2714F37B0D47C59E9F4B606E6", "className": "教学班ERP301", "courses": 2.0 }, { "classId": "BCE05B6AD1B5E15A228E4529E9F96246", "className": "教学班ERP401", "courses": 2.0 }, { "classId": "34BDE1E977A1BCEB0C35BFF1D3A70B86", "className": "教学班会计学401", "courses": 2.0 }, { "classId": "015CA6D36915ED64C5EFEC5339DC8F48", "className": "教学班商务401", "courses": 1.0 }, { "classId": "14492A0C80DF596E0DAB27AAE72854B0", "className": "教学班财管101", "courses": 2.0 }, { "classId": "5ED31E9E3BE3167A4DA6FF7268B1B40E", "className": "教学班财管201", "courses": 2.0 }, { "classId": "ACB0C5771B100775EABAE16FDD97BD0B", "className": "教学班财管301", "courses": 2.0 }, { "classId": "F2BDA1F8E8963C646A3F04B09ADE1313", "className": "教学班财管401", "courses": 2.0 }, { "classId": "E5DB1168224689C48EA3EE031A75C941", "className": "教学班马克思101", "courses": 2.0 }, { "classId": "586AF7E24E1F06828871B2805B660248", "className": "教学班马克思201", "courses": 2.0 }, { "classId": "163A12F2B089086BB994A73372730B77", "className": "教学班马克思301", "courses": 2.0 }] }, { "collegeId": "DC920B916B09495E95FB3289C517A385", "collegeName": "计算机学院", "classes": [{ "classId": "A73C255E86A56EC47ECA06597B948096", "className": "教学班java101", "courses": 2.0 }, { "classId": "25E7F3C7EC71CE7B0002E1B2A88DEB96", "className": "教学班java201", "courses": 2.0 }, { "classId": "C89684C1ADE9827BFA76C7D43B495AC6", "className": "教学班java301", "courses": 2.0 }, { "classId": "789D19B457E80D6B7007E5C1CC1936E4", "className": "教学班java401", "courses": 2.0 }, { "classId": "BFA4C88F6CE566BF15F7E383929827AD", "className": "教学班线代101", "courses": 1.0 }, { "classId": "0A4FFB815A49A58D69021BA54A1B3EC6", "className": "教学班线代201", "courses": 1.0 }, { "classId": "05188323C490AAA701D7B726A6B65061", "className": "教学班线代301", "courses": 1.0 }] }],
      project: [
        {
          name: '计划名称',
          hint: '输入计划名称',
        }, {
          name: '选择巡课人员',
          hint: '安排巡课人员'
        }, {
          name: '选择巡课范围',
          hint: '设置巡课人员巡课范围'
        }, {
          name: '完成',
          hint: '确认巡课计划'
        }
      ],
      step: 1,
      planName: "",
      personCollege: '1',
      personLetter: [{ name: '' }, { name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }, { name: 'E' }, { name: 'F' }, { name: 'G' }, { name: 'H' }, { name: 'I' }, { name: 'J' }, { name: 'K' }, { name: 'L' }, { name: 'M' }, { name: 'N' }, { name: 'O' }, { name: 'P' }, { name: 'Q' }, { name: 'R' }, { name: 'S' }, { name: 'T' }, { name: 'U' }, { name: 'V' }, { name: 'W' }, { name: 'X' }, { name: 'Y' }, { name: 'Z' }],
      personTotal: [{ "userId": "510900_2018034", "teacherName": "尼古拉斯二(教)", "nameStartChat": "N", "loginName": "2018034" }, { "userId": "510900_2018038", "teacherName": "尼古拉斯六(教)", "nameStartChat": "N", "loginName": "2018038" }, { "userId": "510900_2018039", "teacherName": "尼古拉斯七(教)", "nameStartChat": "N", "loginName": "2018039" }, { "userId": "510900_2018035", "teacherName": "尼古拉斯三(教)", "nameStartChat": "N", "loginName": "2018035" }, { "userId": "510900_2018036", "teacherName": "尼古拉斯四(教)", "nameStartChat": "N", "loginName": "2018036" }, { "userId": "510900_2018037", "teacherName": "尼古拉斯五(教)", "nameStartChat": "N", "loginName": "2018037" }, { "userId": "510900_2018033", "teacherName": "尼古拉斯一(教)", "nameStartChat": "N", "loginName": "2018033" }, { "userId": "510900_2018013", "teacherName": "王二(教)", "nameStartChat": "W", "loginName": "2018013" }, { "userId": "510900_2018017", "teacherName": "王六(教)", "nameStartChat": "W", "loginName": "2018017" }, { "userId": "510900_2018018", "teacherName": "王七(教)", "nameStartChat": "W", "loginName": "2018018" }, { "userId": "510900_2018014", "teacherName": "王三(教)", "nameStartChat": "W", "loginName": "2018014" }, { "userId": "510900_2018015", "teacherName": "王四(教)", "nameStartChat": "W", "loginName": "2018015" }, { "userId": "510900_2018016", "teacherName": "王五(教)", "nameStartChat": "W", "loginName": "2018016" }, { "userId": "510900_201801201", "teacherName": "王一(管)", "nameStartChat": "W", "loginName": "201801201" }, { "userId": "510900_2018012", "teacherName": "王一(教)", "nameStartChat": "W", "loginName": "2018012" }, { "userId": "510900_2018041", "teacherName": "吴二(教)", "nameStartChat": "W", "loginName": "2018041" }, { "userId": "510900_2018045", "teacherName": "吴六(教)", "nameStartChat": "W", "loginName": "2018045" }, { "userId": "510900_2018046", "teacherName": "吴七(教)", "nameStartChat": "W", "loginName": "2018046" }, { "userId": "510900_2018042", "teacherName": "吴三(教)", "nameStartChat": "W", "loginName": "2018042" }, { "userId": "510900_2018043", "teacherName": "吴四(教)", "nameStartChat": "W", "loginName": "2018043" }, { "userId": "510900_2018044", "teacherName": "吴五(教)", "nameStartChat": "W", "loginName": "2018044" }, { "userId": "510900_2018040", "teacherName": "吴一(教)", "nameStartChat": "W", "loginName": "2018040" }, { "userId": "510900_201804001", "teacherName": "吴一(管)", "nameStartChat": "W", "loginName": "201804001" }],
      personList: [],
      personSelected: [],
      scopeTreeData: [{
        title: 'Node2',
        value: '0-1',
        key: '0-1',
        children: [{
          title: 'Child Node3',
          value: '0-1-0',
          key: '0-1-0',
        }, {
          title: 'Child Node4',
          value: '0-1-1',
          key: '0-1-1',
        }, {
          title: 'Child Node5',
          value: '0-1-2',
          key: '0-1-2',
        }]
      }],
      scopeCollege: [],
      scopeClass: [],
      scopeStatus: 1, //1按范围，2按节次
      sectionTask: [

      ]
    };
  }
  componentDidMount() {
    //拼音默认选中人员*
    this.clickSpell(0)
    // 获取表格数据
    this.transitionSection()
  }
  /**
  * @desc  上一步
  */
  prevStep() {
    this.setState({ step: this.state.step - 1 }, () => {
    });
  }
  /**
  * @desc  下一步
  */
  nextStep() {
    this.setState({ step: this.state.step + 1 }, () => {
    });
  }
  /**
  * @desc  点击人员姓名首字母
  * @param {number} index    索引
  */
  clickSpell(index) {
    let { personLetter, personTotal } = this.state;
    personLetter.map((item, index) => {
      item.active = false;
    })
    personLetter[index].active = true;
    let screen = personLetter[index].name;
    let personList = [];
    if (screen == '') {
      personList = personTotal;
    } else {
      personTotal.map((item, index) => {
        if (item.nameStartChat == screen) {
          personList.push(item);
        }
      })
    }
    this.setState({ personLetter, personList });
  }
  /**
  * @desc  点击选中人员
  * @param {number} index    索引
  */
  clickPerson(index) {
    let { personList, personSelected } = this.state;
    personList[index].selected = true;
    personSelected.push(personList[index]);
    this.setState({ personList, personList });
  }
  /**
  * @desc  点击取消人员
  * @param {number} index    索引
  */
  cancelPerson(index) {
    let { personList, personSelected } = this.state;
    personList.map((item, i) => {
      if (personSelected[index].userId == item.userId) {
        personList[i].selected = false;
      }
    })
    personSelected.splice(index, 1);
    this.setState({ personList })
  }
  /**
  * @desc  巡课节次点击星期几
  * @param {number} index    索引
  */
  taskClickWeek(index) {
    let { sectionTask } = this.state;
    sectionTask.map((item, index) => {
      item.active = false;
    })
    sectionTask[index].active = true;
    this.setState({ sectionTask });
  }
  /**
  * @desc  初始化获取节次的数据
  */
  transitionSection() {
    let sectionTask = [];
    let { college_list } = this.state;
    college_list.splice(0, 1);
    college_list.map((item, index) => {
      item.section = [{ name: '第一节' }, { name: '第二节' }, { name: '第三节' }, { name: '第四节' }, { name: '第五节' }, { name: '第六节' }, { name: '第七节' }, { name: '第八节' }, { name: '第九节' }, { name: '第十节' }];
    })
    sessionStorage.college_list = JSON.stringify(college_list);
    let weeks = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    weeks.map((item, index) => {
      sectionTask[index] = {
        name: item,
        college: JSON.parse(sessionStorage.college_list)
      }
    })
    sectionTask[0].active = true;
    this.setState({ sectionTask });
    console.log(sectionTask)
  }
  /**
  * @desc  平均分配
  */
  equalAllocation() {
    let { sectionTask, personSelected } = this.state;
    let personTemp = [...personSelected];
    sectionTask.map((item, index) => {
      if (item.active) {
        item.college.map((item, index) => {
          item.section.map((item, index) => {
            if (personTemp.length == 0) {
              personTemp = [...personSelected];
            }
            item.person = personTemp.shift();
          })
        })
      }
    })
    this.setState({ sectionTask })
  }
  /**
  * @desc  应用非周末
  */
  applyWorkday() {
    let { sectionTask } = this.state;
    let selectCollege = [];
    sectionTask.map((item, index) => {
      if (item.active) {
        selectCollege = item.college;
        sessionStorage.college_list = JSON.stringify(selectCollege);
      }
    })
    sectionTask.map((item, index) => {
      if (item.name != '周六' && item.name != '周日') {
        item.college = JSON.parse(sessionStorage.college_list);
      }
    })
    this.setState({ sectionTask })
  }
  /**
  * @desc  移除选中任务
  * @param {number} selectIndex 选中的索引index
  * @param {string} selectId    选中的学院id
  */
  clearCaption(selectIndex,selectId){
    let {sectionTask} = this.state;
    sectionTask.map((item,index)=>{
      if(item.active){
        item.college.map((item,index)=>{
          if(item.id == selectId){
            delete item.section[selectIndex].person;
          }
        })
      }
    })
    this.setState({sectionTask})
  }

  /**
  * @desc  设置拖拽容器
  */
  handleDragOver = (e) => {
    e.preventDefault();
  }
  /**
  * @desc  开始拖拽时存储目标
  */
  dragStart = (e) => {
      //存储拖拽对象
      e.dataTransfer.setData("status", e.target.getAttribute('draggable'));//状态
      e.dataTransfer.setData("id", e.target.id);//拖拽目标id
      e.dataTransfer.setData("index", e.target.getAttribute('index'));//拖拽目标索引  --移动的时候存在
      e.dataTransfer.setData("section", e.target.getAttribute('section'));//拖拽目标的学院 --移动的时候存在
  }
  /**
  * @desc  拖拽到目标时做相应数据变更
  */
  handleDrop = (e) => {
    e.preventDefault();
    const status = e.dataTransfer.getData("status");//可拖拽状态
    if(status == 'true'){
      const id = e.dataTransfer.getData("id");//拖拽目标id
      const beforeIndex = e.dataTransfer.getData("index");//拖拽目标之前的index --移动的时候存在
      const beforeSection = e.dataTransfer.getData("section");//拖拽目标之前的学院 --移动的时候存在
      const section = e.target.getAttribute('section');//学院id
      const sectionIndex = e.target.getAttribute('index');//学院索引
      let {personSelected,sectionTask} = this.state;
      let person;//拖拽目标
      //查找目标
      personSelected.map((item,index)=>{
        if(item.userId == id){
          person = item;
        }
      })
      sectionTask.map((item,index)=>{
        if(item.active){
          item.college.map((item,index)=>{
            //删除拖拽前的目标
            if(beforeIndex != 'null' && beforeSection != 'null'){
              if(item.id == beforeSection){
                delete item.section[beforeIndex].person;
              }
            }
            //拖拽复制
            if(item.id == section){
              item.section[sectionIndex].person = person;
            }
          })
        }
      })
      this.setState({sectionTask})
    }else{
      return false;
    }
  }
  render() {
    let { project, step, planName, personCollege, personLetter, personTotal, personList, personSelected, scopeTreeData, scopeCollege, scopeClass, scopeStatus, sectionTask } = this.state;
    const scopeColumns = [{
      title: '巡课员',
      dataIndex: 'name'
    }, {
      title: '巡课范围(学院/专业)',
      align: 'center',
      render: (text, record) => (
        <span className="ws-addPlan-table-oper">
          <span>管理学院</span>
          <span>计算机学院</span>
        </span>
      ),
    }, {
      title: '巡课数',
      dataIndex: 'count',
    }];
    const scopeData = [{
      id: '1',
      count: 50,
      name: 'John Brown'
    }, {
      id: '2',
      count: 20,
      name: 'Jim Green'
    }, {
      id: '3',
      count: 10,
      name: 'Joe Black'
    }];
    const sectionColumns = [{
      title: '巡课员',
      dataIndex: 'name'
    }, {
      title: '周一巡课数',
      dataIndex: 'monday',
    }, {
      title: '周二巡课数',
      dataIndex: 'tuesday',
    }, {
      title: '周三巡课数',
      dataIndex: 'wednesday',
    }, {
      title: '周四巡课数',
      dataIndex: 'thursday',
    }, {
      title: '周五巡课数',
      dataIndex: 'friday',
    }, {
      title: '周六巡课数',
      dataIndex: 'saturday',
    }, {
      title: '周日巡课数',
      dataIndex: 'sunday',
    }];
    const sectionData = [{
      id: '1',
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
      sunday: 7,
      name: 'John Brown'
    }, {
      id: '2',
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
      sunday: 7,
      name: 'John Brown'
    }];
    return (
      <div className="ws-addPlan">
        <div className="ws-addPlan-header">
          <Button style={{ width: 60, height: 30 }} className="ws-button-blue" onClick={this.props.canCelPlan}>返回</Button>
          <span>
            当前位置 :  <span>在线巡课</span> >  <span>巡课设置</span> >  <span>新增巡课计划</span>
          </span>
        </div>
        <div className="ws-addPlan-content">
          <div className="ws-addPlan-procedure">
            <ul>
              {
                project.map((item, index) => (
                  <li key={index} className={step == index + 1 ? 'active' : step >= index + 1 ? 'activeBy' : ''}>
                    <div className="ws-addPlan-circle">{index + 1}</div>
                    <div className="ws-addPlan-slogan">
                      <p>{item.name}</p>
                      <p>{item.hint}</p>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="ws-addPlan-collect">
            {
              step == 1 ?
                <div className="ws-addPlan-step1">
                  <span>巡课计划名 : </span>
                  <Input value={planName} maxLength={20} onChange={(e) => { this.setState({ planName: e.target.value }) }} />
                  <span className="ws-addPlan-step1Hint">{planName.length}/20</span>
                  <Button className="ws-button-green" onClick={this.nextStep.bind(this)}>下一步</Button>
                </div> :
                step == 2 ?
                  <div className="ws-addPlan-step2">
                    <div className="ws-addPlan-step2-person">
                      <div>
                        <div className="ws-addPlan-person-header">
                          <span className="ws-addPlan-person-hint">成员</span>
                          <Select value={personCollege} onChange={(value) => { this.setState({ value }) }}>
                            <Option value="1">全部学院</Option>
                          </Select>
                        </div>
                        <div className="ws-addPlan-person-list">
                          <div className="person-list-letter">
                            <ul>
                              {
                                personLetter.map((item, index) => (
                                  <li onClick={this.clickSpell.bind(this, index)} key={index} className={item.active ? 'active' : ''}>
                                    {
                                      item.name == '' ? <SVG type={item.active ? 'xing' : 'pingfen'}></SVG> : <span>{item.name}</span>
                                    }
                                  </li>
                                ))
                              }
                            </ul>
                          </div>
                          <div className="person-list-show">
                            {personList.length > 0 ?
                              <ul>
                                {
                                  personList.map((item, index) => (
                                    <li title={item.teacherName} key={index} onClick={this.clickPerson.bind(this, index)} className={item.selected ? 'disable' : ''}>
                                      <Button disabled={item.selected}>{item.teacherName}</Button>
                                    </li>
                                  ))
                                }
                              </ul>
                              : <div className="ws-noData">
                                <SVG type="wushuju" />
                                <p>暂无老师数据</p>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                      <div className="ws-addPlan-jiantou"><SVG type="icon" /></div>
                      <div>
                        <div className="ws-addPlan-person-header">
                          <span className="ws-addPlan-person-hint">已选成员</span>
                        </div>
                        <div className="ws-addPlan-person-selected">
                          <ul>
                            {
                              personSelected.map((item, index) => (
                                <li title={item.teacherName} key={index}>
                                  <Button>{item.teacherName}</Button>
                                  <SVG onClick={this.cancelPerson.bind(this, index)} type="quxiao"></SVG>
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="ws-addPlan-step2-button">
                      <Button className="ws-button-white" onClick={this.prevStep.bind(this)}>上一步</Button>
                      <Button className="ws-button-green" onClick={this.nextStep.bind(this)}>下一步</Button>
                    </div>
                  </div>
                  :
                  step == 3 ?
                    <div className="ws-addPlan-step3">
                      {scopeStatus == 1 ?
                        <div className="ws-addPlan-step3-scope">
                          <div className="ws-addPlan-step3-header">
                            <span className="active">按训课范围</span>
                            <span onClick={() => { this.setState({ scopeStatus: 2 }); }}>按巡课节次</span>
                          </div>
                          <div className="ws-add-form">
                            <ul>
                              <li>
                                <span className="ws-form-label">学院</span> :
                                <WsTreeSelect placeholder={'请选择学院'} value={scopeCollege} width={'60%'} treeData={scopeTreeData} onChange={(value) => { this.setState({ scopeCollege: value }) }}></WsTreeSelect>
                                共选中{scopeCollege.length}个
                              </li>
                              <li>
                                <span className="ws-form-label">班级</span> :
                                <WsTreeSelect placeholder={'请选择班级'} value={scopeClass} width={'60%'} treeData={scopeTreeData} onChange={(value) => { this.setState({ scopeClass: value }) }}></WsTreeSelect>
                                共选中{scopeClass.length}个
                              </li>
                            </ul>
                          </div>
                          <div className="ws-addPlan-step3-selected">
                            <p className="ws-addPlan-step3-selected-hint">已选老师 : </p>
                            <ul>
                              {
                                personSelected.map((item, index) => (
                                  <li title={item.teacherName} key={index}>
                                    <Button>{item.teacherName}</Button>
                                  </li>
                                ))
                              }
                            </ul>
                          </div>
                        </div>
                        :
                        <div className="ws-addPlan-step3-section">
                          <div className="ws-addPlan-step3-person">
                            <div className="ws-addPlan-step3-person-header">
                              <span>巡课员</span>
                            </div>
                            <div className="ws-addPlan-step3-person-list">
                              <ul>
                                {
                                  personSelected.map((item, index) => (
                                    <li
                                      draggable="true"
                                      onDragStart={this.dragStart}
                                      id={item.userId}
                                      title={item.teacherName} key={index}>
                                      {item.teacherName}
                                    </li>
                                  ))
                                }
                              </ul>
                            </div>
                          </div>
                          <div className="ws-addPlan-step3-apply">
                            <p onClick={() => { this.setState({ scopeStatus: 1 }) }}>按巡课范围</p>
                            <p onClick={this.equalAllocation.bind(this)}>平均分配</p>
                            <p onClick={this.applyWorkday.bind(this)}>应用到非周末</p>
                          </div>
                          <div className="ws-addPlan-step3-table">
                            <div className="ws-addPlan-step3-header">
                              <span className="ws-addPlan-step3-header-hint">巡课员任务</span>
                              {
                                sectionTask.map((item, index) => (
                                  <span className={item.active ? 'active' : ''} onClick={this.taskClickWeek.bind(this, index)} key={index}>{item.name}</span>
                                ))
                              }
                            </div>
                            <div className="ws-addPlan-step3-title">
                              <div className="ws-addPlan-step3-caption">
                                <div className="ws-jf-title-date">节次</div>
                                <div className="ws-jf-title-jc">学院</div>
                                <div className="ws-jf-title-line"></div>
                              </div>
                              {
                                sectionTask[0].college[0].section.map((item, index) => (
                                  <div key={index} className="ws-addPlan-step3-caption">
                                    {item.name}
                                  </div>
                                ))
                              }
                            </div>
                            <div className="ws-addPlan-step3-content">
                              {
                                sectionTask.map((item, index) => (
                                  item.active ?
                                    item.college.map((itemi, index) => (
                                      [
                                        <div key={index} className="ws-addPlan-step3-caption">
                                          {itemi.name}
                                        </div>,
                                        itemi.section.map((itemj, index) => (
                                          <div
                                            onDragStart={this.dragStart}
                                            onDragOver={this.handleDragOver}
                                            onDrop={this.handleDrop}
                                            draggable={ itemj.person ? Object.keys(itemj.person).length > 0 ? true : false : false}
                                            id={itemj.person ? itemj.person.userId : ''}
                                            index={index}
                                            section={itemi.id}
                                            title={
                                              itemj.person ?
                                                itemj.person.teacherName : ''}
                                            key={index} className="ws-addPlan-step3-caption">
                                            { itemj.person ? Object.keys(itemj.person).length > 0 ? <SVG onClick={()=>{this.clearCaption(index,itemi.id)}} type="quxiao" />:'' :''}
                                            {
                                              itemj.person ?
                                                itemj.person.teacherName : ''}
                                          </div>
                                        ))]
                                    )) : ''
                                ))
                              }
                            </div>
                          </div>
                        </div>
                      }
                      <div className="ws-addPlan-step3-button">
                        <Button className="ws-button-white" onClick={this.prevStep.bind(this)}>上一步</Button>
                        <Button className="ws-button-green" onClick={this.nextStep.bind(this)}>下一步</Button>
                      </div>
                    </div> :
                    step == 4 ?
                      <div className="ws-addPlan-step4">
                        {
                          scopeStatus == 1 ?
                            <div>
                              <Table rowKey={record => record.id} columns={scopeColumns} dataSource={scopeData} pagination={false} />
                            </div>
                            :
                            <div>
                              <Table rowKey={record => record.id} columns={sectionColumns} dataSource={sectionData} pagination={false} />
                            </div>
                        }
                        <div className="ws-addPlan-step4-button">
                          <Button className="ws-button-white" onClick={this.prevStep.bind(this)}>上一步</Button>
                          <Button className="ws-button-green">完成</Button>
                        </div>
                      </div>
                      : ''
            }
          </div>
        </div>
      </div>
    )
  }
}

