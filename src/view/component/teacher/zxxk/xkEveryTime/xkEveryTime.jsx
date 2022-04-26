/*
 * @Author: JC.Liu 
 * @Date: 2019-03-04 09:55:12 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-19 15:27:10
 * 在线巡课 - 实时巡课
 */
import React, { Component } from 'react'
import Player from './../../../../publicComponent/player';
import { Tree, Select, Row, Col, Switch } from 'antd';
import './../../../../../css/teacher/JC.ssxk.scss';
import { SVG } from './../../../../../base';
const { TreeNode } = Tree;
const { Option } = Select;
export class XkEveTime extends Component {

  state = {
    switch: false,
  }

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }

  // 开关
  switchChange = (check) => {
    this.setState({
      switch: check
    })
  }

  // 轮巡速度change
  timeChange = (value) => {
    if (value) {

    }
  }

  render() {
    return (
      <div className="JC-zxxk-ssxk">
        <div className="JC-ss-left">
          <Tree
            checkable
            defaultExpandedKeys={['0-0-0', '0-0-1']}
            defaultSelectedKeys={['0-0-0', '0-0-1']}
            defaultCheckedKeys={['0-0-0', '0-0-1']}
            onSelect={this.onSelect}
            onCheck={this.onCheck}
          >
            <TreeNode title="parent 1" key="0-0">
              <TreeNode title="parent 1-0" key="0-0-0" disabled>
                <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
                <TreeNode title="leaf" key="0-0-0-1" />
              </TreeNode>
              <TreeNode title="parent 1-1" key="0-0-1">
                <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
              </TreeNode>
            </TreeNode>
          </Tree>
        </div>
        {/* 播放器 */}
        <div className="JC-ss-right">
          <div className="JC-v-info">
            <div className="JC-v-i" id="JC_v_i">
              <Row gutter={24}>
                <Col span={4}>这里是班级名称</Col>
                <Col span={4}><SVG type="xueyuan" title="学院" />&nbsp;学院</Col>
                <Col span={4}><SVG type="icon25" title="科目" />&nbsp;科目</Col>
                <Col span={3}><SVG type="shijian-2" title="节次" />&nbsp;节次</Col>
                <Col span={3}><SVG type="laoshi" title="教师" />&nbsp;教师</Col>
                <Col span={2}><SVG type="xuesheng" title="人数" />&nbsp;人数</Col>
                <Col span={4}>
                  <Select defaultValue={1} getPopupContainer={() => document.getElementById("JC_v_i")}>
                    <Option value={1} >演示机</Option>
                  </Select>
                </Col>
              </Row>
            </div>
          </div>
          <Player />
          <div className="JC-ss-footer">
            <div className="JC-ss-setting">
              <div>
                轮巡设置：
              <Switch checkedChildren="开"
                  unCheckedChildren="关"
                  defaultChecked
                  checked={this.state.switch}
                  onChange={this.switchChange} />
              </div>
              <div id="JC-setting">
                轮巡速度：&nbsp;&nbsp;
                <Select defaultValue={50} onChange={this.timeChange} disabled={!this.state.switch} getPopupContainer={() => document.getElementById("JC-setting")}>
                  <Option value={5}>5s</Option>
                  <Option value={15}>15s</Option>
                  <Option value={30}>30s</Option>
                  <Option value={50}>50s</Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
