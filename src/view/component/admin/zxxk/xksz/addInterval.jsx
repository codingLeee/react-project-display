/*
 * @Author: JC.Liu 
 * @Date: 2019-02-27 09:44:45 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-02-27 09:48:18
 * 添加巡课计划
 */
import React, { Component } from 'react';
import { Button,Input,Message,Modal,Select } from 'antd';
import '../../../../../css/admin/ws_planSetting.scss';
import {WsTreeSelect} from './wsTreeSelect.jsx';
const Option = Select.Option;
const { TextArea } = Input;
export class AddInterval extends Component {
  constructor(props){
    super(props);
    this.state = {
        name:"0",
        personnel:[],
        scope:[],
        clbum:[],
        time:"",
        explain:"",
        treeData : [{
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
        }]
    };
  }
  render() {
    let {name,personnel,scope,clbum,time,explain,treeData} = this.state;
    return (
        <Modal onCancel={this.props.cancelInterval} title={'新增定时训课计划'} destroyOnClose={true} footer={false} visible={this.props.visible} wrapClassName="ws-add-modal">
            <div className="ws-add-form">
                <ul>
                    <li>
                        <span className="ws-form-label">巡课计划</span> : 
                        <Select value={name} className="ws-form-select" onChange={(value)=>{this.setState({name:value})}} >
                            <Option value="0">教研计划</Option>
                        </Select>
                    </li>
                    <li>
                        <span className="ws-form-label">训课员</span> : 
                        <WsTreeSelect placeholder={'请选择巡课员'} value={personnel} width={'60%'} treeData={treeData} onChange={(value)=>{this.setState({personnel:value})}}></WsTreeSelect>
                        共选中{personnel.length}个
                    </li>
                    <li>
                        <span className="ws-form-label">巡课范围</span> : 
                        <WsTreeSelect placeholder={'请选择节次'} value={scope} width={'60%'} treeData={treeData} onChange={(value)=>{this.setState({scope:value})}}></WsTreeSelect>
                        共选中{scope.length}个
                    </li>
                    <li>
                        <span className="ws-form-label">班级</span> : 
                        <WsTreeSelect placeholder={'请选择巡课员,在选择班级'} value={clbum} width={'60%'} treeData={treeData} onChange={(value)=>{this.setState({clbum:value})}}></WsTreeSelect>
                        共选中{clbum.length}个
                    </li>
                    <li>
                        <span className="ws-form-label">巡课时间</span> : 
                        <Select value={time} className="ws-form-select" onChange={(value)=>{this.setState({time:value})}} >
                            <Option value="0">上课</Option>
                            <Option value="1">下课</Option>
                            <Option value="2">开课后</Option>
                            <Option value="3">开课前</Option>
                        </Select>
                    </li>
                    <li>
                        <span className="ws-form-label">巡课计划</span> : 
                        <TextArea value={explain} className="ws-form-textArea" onChange={(e)=>{this.setState({explain:e.target.value})}} />
                        <span className="ws-form-mark">{explain.length}/1000字</span>
                    </li>
                </ul>
                <div className="ws-add-btns">
                    <Button className="ws-button-green">保存</Button>
                    <Button className="ws-button-white" onClick={this.props.cancelInterval} >取消</Button>
                </div>
            </div>
        </Modal>
    )
  }
}

