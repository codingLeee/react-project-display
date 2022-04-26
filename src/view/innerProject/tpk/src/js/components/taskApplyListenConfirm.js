/*
 * @Author: 蒲飞 
 * @Date: 2017-09-21 19:32:46 
 * @Last Modified by: 蒲飞
 * @Last Modified time: 2017-09-21 20:09:52
 */
import React, { Component } from 'react';
import {Button} from 'antd';
import '../../css/components/taskApplyListenConfirm.css';

class TaskApplyListenConfirm extends Component{
  constructor(props) {
    super(props);
  }
  

  render(){
    return (
      <div className="pf-rap-confirm">
        <Button type="primary">确认申请</Button>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button>取消</Button>
      </div>
    );
  }
}

export default TaskApplyListenConfirm;