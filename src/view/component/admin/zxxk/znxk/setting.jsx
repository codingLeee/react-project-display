/*
 * @Author: JC.Liu 
 * @Date: 2019-02-27 09:44:45 
 * @Last Modified by: lilu
 * @Last Modified time: 2019-03-20 10:34:32
 * 设置
 */
import React, { Component } from 'react';
import { Row, Col, Button, Switch, Checkbox, InputNumber, Modal, Radio, message } from 'antd';
import '../../../../../css/admin/znxk/setting.scss'
import { callbackify } from 'util';
import { connect } from 'react-redux';
import { ll_getSetting, ll_warnSetting, ll_examineSetting, ll_getData } from '../../../../../redux/setting.reducer'
import { ModalTip, Loading } from './../../../../../base';
const RadioGroup = Radio.Group;

@connect(state => state, { ll_getSetting, ll_warnSetting, ll_examineSetting, ll_getData })
export default class LL_Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warnSetting: {
        "classAct": //班级出勤
        {
          "stateFlag": "1", //"老师迟到：0为关闭，1为开启"
          "timeFlag": "2", //0为课前，1为课时，2为课后"
          "time": "15", //"时间设置，单位为分钟",
          "lowActRate": "90" //"最低出勤率设置"
        }
        ,
        "teacherAbsent":
        {
          "stateFlag": "1"  //教师出勤设置：0为关闭，1为开启
        }
        ,
        "changeCourse": //调课换课
        {
          "stateFlag": "1"
        }
        ,
        "teacherAct":
        {
          "stateFlag": "1" //"老师迟到：0为关闭，1为开启"
        }

      },
      examineSetting: {
        "openFlag": "1",//"审定设置：0为关闭，1为开启"
        "time": "1" // "时间设置，单位为天"
      }

    }
  }

  componentDidMount() {
    console.log('hahah', this.props.ll_setting.warnSetting)
    this.change();
  }

  /**
   *获取数据
   *
   * @memberof LL_Setting
   */
  change() {
    console.log('change')
    let { warnSetting, examineSetting } = this.state;
    this.props.ll_getSetting().then((res => {
      console.log('数据数据')
      let data = res.data;
      warnSetting = {
        "classAct": //班级出勤
        {
          "stateFlag": data[0].claAttOpenFlag, //"老师迟到：0为关闭，1为开启"
          "timeFlag": data[0].claAttTimeFlag, //0为课前，1为课时，2为课后"
          "time": data[0].claAttTime, //"时间设置，单位为分钟",
          "lowActRate": data[0].claAttRate //"最低出勤率设置"
        }
        ,
        "teacherAbsent":
        {
          "stateFlag": data[0].teaAbsentOpenFlag //教师出勤设置：0为关闭，1为开启
        }
        ,
        "changeCourse": //调课换课
        {
          "stateFlag": data[0].changeClaOpenFlag
        }
        ,
        "teacherAct":
        {
          "stateFlag": data[0].teaLateOpenFlag //"老师迟到：0为关闭，1为开启"
        }
      }
      examineSetting = {
        "openFlag": data[1].openFlag,//"审定设置：0为关闭，1为开启"
        "time": data[1].time // "时间设置，单位为天"
      }
      this.setState({
        warnSetting,
        examineSetting
      })
    })).catch(err => {
      if (err.status) {
        message.warning('请求失败');
      }
    })


  }

  /**
   *警告设置
   *
   * @param {string} type 对应相关的事件 lateCheck教师迟到报警  AttendanceCheck班级出勤报警 teacherAbsent教师缺勤报警 changeCoursechangeCourse
   * @param {object} e 当前点击的对象
   * @memberof LL_Setting
   */
  WarnSetting(type, e) {
    let getDate = this.props.ll_setting.getDate;
    let { warnSetting } = this.state;
    console.log('warnSetting', warnSetting)
    switch (type) {
      //教师迟到报警
      case 'lateCheck':
        if (e) {
          warnSetting.teacherAct.stateFlag = '1';
          getDate[0].teaLateOpenFlag = '1'
        } else {
          warnSetting.teacherAct.stateFlag = '0';
          getDate[0].teaLateOpenFlag = '0'
        }
        break;
      //班级出勤报警
      case 'AttendanceCheck':
        if (e) {
          warnSetting.classAct.stateFlag = '1';
          getDate[0].claAttOpenFlag = '1'
        } else {
          warnSetting.classAct.stateFlag = '0';
          getDate[0].claAttOpenFlag = '0'
        }
        break;
      case 'timeFlag':
        warnSetting.classAct.timeFlag = e.target.value;
        getDate[0].claAttTimeFlag = e.target.value;
        console.log(' e.target.value', typeof e.target.value)
        break;
      case 'AttendanceTime':
        warnSetting.classAct.time = `${e}`
        getDate[0].claAttTime = `${e}`
        break;
      case 'AttendanceAttendance':
        warnSetting.classAct.lowActRate = `${e}`
        getDate[0].claAttRate = `${e}`
        break;

      //教师缺勤报警
      case 'teacherAbsent':
        if (e) {
          warnSetting.teacherAbsent.stateFlag = '1';
          getDate[0].teaAbsentOpenFlag = '1';
        } else {
          warnSetting.teacherAbsent.stateFlag = '0';
          getDate[0].teaAbsentOpenFlag = '0';
        }
        break;

      //调课换课报警
      case 'changeCourse':
        if (e) {
          warnSetting.changeCourse.stateFlag = '1';
          getDate[0].changeClaOpenFlag = '1'
        } else {
          warnSetting.changeCourse.stateFlag = '0';
          getDate[0].changeClaOpenFlag = '0'

        }
        break;
      default:
        break;

    }
    console.log('warnSetting', warnSetting)
    this.setState({
      warnSetting,

    })

  }

  /**
   *警告保存
   *
   * @memberof LL_Setting
   */
  WarnSave() {
    console.log('this.state.warnSetting', this.state.warnSetting)
    ModalTip({
      tit: '系统提示',
      ctn: '是否保存',
      oT: '确定',
      okFun: () => {
        this.props.ll_warnSetting(this.state.warnSetting).then((res) => {
          this.change()
          message.success('操作成功')
        }).catch(err => {
          if (err.status) {
            message.warning('请求失败');
          }
        }
        );

      },
      // onCancel: canFun
    })
  }

  /**
   *审定设置
   *
   * @param {string} type 对应相关的方法
   * @param {object} e 当前点击的对象
   * @memberof LL_Setting
   */
  Examination(type, e) {
    let { getDate } = this.props.ll_setting;
    let { examineSetting } = this.state;
    switch (type) {
      case 'ExaminationCheck':
        if (e) {
          examineSetting.openFlag = '1';
          getDate[1].openFlag = '1'
        } else {
          examineSetting.openFlag = '0';
          getDate[1].openFlag = '0'
        }
        break;
      case 'ExaminationInputTime':
        getDate[1].time = `${e}`;
        examineSetting.time = `${e}`
      default:
        break;
    }
    this.props.ll_getData(getDate)
    console.log('hah', getDate)
    this.setState({
      examineSetting,
    })
  }

  /**
   *审定保存
   *
   * @memberof LL_Setting
   */
  ExaminationSave() {
    ModalTip({
      tit: '系统提示',
      ctn: '是否保存',
      oT: '确定',
      okFun: () => {
        this.props.ll_examineSetting(this.state.examineSetting).then((res) => {
          console.log('审定设置', res.data)
          this.change();
          message.success('操作成功')
        }).catch(err => {
          if (err.status) {
            message.warning('请求失败');
          }
        }
        )

      },
    })
  }


  render() {

    let { getDate } = this.props.ll_setting
    // console.log('getDate123', getDate)
    return (
      <div style={{ backgroundColor: '#eff3f5' }} >
        <div className='ll-loading' style={this.props.ll_setting.loading ? { display: 'block' } : { display: 'none' }}>
          <Loading style={{ width: '150px', height: '30px', display: 'block', }} tit='数据加载...' />
        </div>

        <div className='ll-border'>
          <Row className='ll-borderTop'>
            <Col span={22} style={{ fontSize: 20 }}>报警设置</Col>
            <Col span={1}>
              <div className='ll-saveBtn' onClick={this.WarnSave.bind(this)}>保存</div>
            </Col>
          </Row>
          <Row className='ll-Warn' type="flex" justify="space-between">
            <Col span={11} className='ll-Late'>
              <Row>
                <Col span={24} className='ll-LateTea'>
                  <span>教师迟到报警 ：</span> <Switch checkedChildren="开" unCheckedChildren="关" checked={getDate[0].teaLateOpenFlag === '1' ? true : false} onChange={this.WarnSetting.bind(this, 'lateCheck')} />
                  {
                    getDate[0].teaLateOpenFlag === '1' ? '开启' : '关闭'
                  }
                </Col>
                <Col span={24}>

                </Col>

              </Row>

            </Col>
            <Col span={12} className='ll-Late'>
              <Row>
                <Col span={24} className='ll-LateTea'>
                  <span>班级出勤报警 ：</span> <Switch checkedChildren="开" unCheckedChildren="关" checked={getDate[0].claAttOpenFlag === '1' ? true : false} onChange={this.WarnSetting.bind(this, 'AttendanceCheck')} />
                  {getDate[0].claAttOpenFlag === '1' ? '开启' : '关闭'}
                </Col>
                <Col span={24}>
                  <RadioGroup onChange={this.WarnSetting.bind(this, 'timeFlag')} value={getDate[0].claAttTimeFlag}>
                    <Radio value='0'>开课前</Radio>
                    <Radio value='1'>开课时</Radio>
                    <Radio value='2'>开课后</Radio>
                  </RadioGroup>

                  <InputNumber min={0} value={getDate[0].claAttTime} onChange={this.WarnSetting.bind(this, 'AttendanceTime')} />分钟
                   出勤率<InputNumber min={0} max={100} value={getDate[0].claAttRate} onChange={this.WarnSetting.bind(this, 'AttendanceAttendance')} />%
                 </Col>
              </Row>

            </Col>

          </Row>
          <Row className='ll-Warn' type="flex" justify="space-between">
            <Col span={11} className='ll-Late'>
              <Row>
                <Col span={24} className='ll-LateTea'>
                  <span>教师缺勤报警 ：</span> <Switch checkedChildren="开" unCheckedChildren="关" checked={getDate[0].teaAbsentOpenFlag === '1' ? true : false} onChange={this.WarnSetting.bind(this, 'teacherAbsent')} />     {getDate[0].teaAbsentOpenFlag === '1' ? '开启' : '关闭'}
                </Col>
              </Row>
            </Col>
            <Col span={12} className='ll-Late'>
              <Row>
                <Col span={24} className='ll-LateTea'>
                  <span>调课换课报警 ：</span> <Switch checkedChildren="开" unCheckedChildren="关" checked={getDate[0].changeClaOpenFlag === '1' ? true : false} onChange={this.WarnSetting.bind(this, 'changeCourse')} />     {getDate[0].changeClaOpenFlag === '1' ? '开启' : '关闭'}
                </Col>
              </Row>
            </Col>
          </Row>

        </div>

        <div className='ll-border ll-lastBorder'>
          <Row className='ll-borderTop'>
            <Col span={22} style={{ fontSize: 20 }}>审定设置</Col>
            <Col span={1}>
              <div className='ll-saveBtn' onClick={this.ExaminationSave.bind(this)}>保存</div>
            </Col>
          </Row>
          <Row className='ll-warnSetting'>
            <Col span={24}>
              <div className='ll-warnSetOpen'>
                <span>审定开关：</span> <Switch checkedChildren="开" unCheckedChildren="关" checked={getDate[1].openFlag === '1' ? true : false} onChange={this.Examination.bind(this, 'ExaminationCheck')} />

                {getDate[1].openFlag === '1' ? '开启' : '关闭'}
              </div>
              <div className='ll-warnSetOpen'>
                <span>时间设置：</span> <InputNumber min={0} value={getDate[1].time} onChange={this.Examination.bind(this, 'ExaminationInputTime')} />天后，列表遗留未审定时间默认全部是审定通过
              </div>
            </Col>
          </Row>

        </div>

      </div>
    )
  }
}

