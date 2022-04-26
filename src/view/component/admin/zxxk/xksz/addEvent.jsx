/*
 * @Author: JC.Liu 
 * @Date: 2019-02-27 09:44:45 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-02-27 09:48:18
 * 添加事件
 */
import React, { Component } from 'react';
import { Button,Input,Message,Modal,Radio } from 'antd';
import {SVG} from '../../../../../base.jsx';
import '../../../../../css/admin/ws_planSetting.scss';
import {connect} from 'react-redux';
import { } from './../../../../../redux/ws-xksz.reducer';
const RadioGroup = Radio.Group;
const { TextArea } = Input;
@connect(state=>state ,{ })
export class AddEvent extends Component {
  constructor(props){
    super(props);
    this.state = {
        name:"",
        mark:"",
        type:1,
        explain:""
    };
  }
  componentDidMount(){
     
  }
  render() {
    let {name,mark,type,explain} = this.state;
    return (
        <Modal onCancel={this.props.cancelEvent} title={'新增事件'} destroyOnClose={true} footer={false} visible={this.props.visible} wrapClassName="ws-add-modal">
            <div className="ws-add-form">
                <ul>
                    <li>
                        <span className="ws-form-label">事件名称</span> : <Input className="ws-form-input" value={name} onChange={(e)=>{this.setState({name:e.target.value})}} />
                    </li>
                    <li>
                        <span className="ws-form-label">扣分</span> : <Input className="ws-form-input" value={mark} onChange={(e)=>{this.setState({mark:e.target.value})}} />
                    </li>
                    <li>
                        <span className="ws-form-label">事件类型</span> : <RadioGroup className="ws-form-radio" value={type} onChange={(e)=>{this.setState({type:e.target.value})}} >
                            <Radio value={1}>学生违纪</Radio>
                            <Radio value={2}>教师违纪</Radio>
                        </RadioGroup>
                    </li>
                    <li>
                        <span className="ws-form-label">事件说明</span> : <TextArea maxLength={100} className="ws-form-textArea" value={explain} onChange={(e)=>{this.setState({explain:e.target.value})}} />
                        <span className="ws-form-mark">{explain.length}/100字</span>
                    </li>
                </ul>
                <div className="ws-add-btns">
                    <Button className="ws-button-green"  >保存</Button>
                    <Button className="ws-button-white" onClick={this.props.cancelEvent} >取消</Button>
                </div>
            </div>
        </Modal>
    )
  }
}

