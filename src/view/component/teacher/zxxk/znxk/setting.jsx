/*
 * @Author: JC.Liu 
 * @Date: 2019-02-27 09:44:45 
 * @Last Modified by: lilu
 * @Last Modified time: 2019-03-14 14:23:02
 * 设置
 */
import React, { Component } from 'react';
import { Row, Col, Button, Switch, Checkbox, InputNumber, Modal, Radio } from 'antd';
import '../../../../../css/admin/znxk/setting.scss'
import { callbackify } from 'util';
import { connect } from 'react-redux';
import { ll_examineSetting, ll_getSetting } from '../../../../../redux/setting.reducer'
import { ModalTip } from './../../../../../base';
const RadioGroup = Radio.Group;

@connect(state => state, { ll_examineSetting, ll_getSetting })
export default class ll_settingTea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      examineSetting: {}

    }
  }

  componentDidMount() {
    this.setState({
      examineSetting: this.props.ll_settingTea.examineSetting
    })
  }

  /**
   *省定开关
   *
   * @param {string} type 'ExaminationCheck'开关 'ExaminationInputTime'时间
   * @param {object} e
   * @memberof ll_settingTea
   */
  Examination(type, e) {
    let { examineSetting } = this.state
    switch (type) {
      case 'ExaminationCheck':
        e ? examineSetting.stateFlag = '1' : examineSetting.stateFlag = '0'
        break;
      case 'ExaminationInputTime':
        examineSetting.inputTime = `${e}`
      default:
        break;
    }
    this.setState({
      examineSetting
    })
  }

  /**
   *保存提交数据
   *
   * @memberof ll_settingTea
   */
  ExaminationSave() {
    ModalTip({
      tit: '系统提示',
      ctn: '是否保存',
      oT: '确定',
      okFun: () => {
        this.props.ll_examineSetting(this.state.examineSetting);
      },
      // onCancel: canFun
    })
  }


  render() {
    let examineSetting = this.props.ll_settingTea.examineSetting;
    return (
      <div style={{ backgroundColor: '#fff', height: '790px' }}>

        <div className='ll-border'>
          <Row className='ll-borderTop'>
            <Col span={22} style={{ fontSize: 20 }}>审定设置</Col>
            <Col span={1}>
              {/* <div className='ll-saveBtn' onClick={this.ExaminationSave.bind(this)}>保存</div> */}
              <Button className='ll-stSave' onClick={this.ExaminationSave.bind(this)}>保存</Button>
            </Col>
          </Row>
          <Row className='ll-warnSetting'>
            <Col span={24}>
              <div className='ll-warnSetOpen'>
                <span>审定开关：</span> <Switch checkedChildren="开" unCheckedChildren="关" checked={examineSetting.stateFlag === '1' ? true : false} onChange={this.Examination.bind(this, 'ExaminationCheck')} />

                {examineSetting.stateFlag === '1' ? '开启' : '关闭'}
              </div>
              <div className='ll-warnSetOpen'>
                <span>时间设置：</span> <InputNumber min={0} value={examineSetting.inputTime} onChange={this.Examination.bind(this, 'ExaminationInputTime')} />天后，列表遗留未审定时间默认全部是审定通过
              </div>

            </Col>
          </Row>

        </div>

      </div>
    )
  }
}

