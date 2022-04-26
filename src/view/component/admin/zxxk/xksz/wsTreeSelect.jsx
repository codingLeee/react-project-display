/*
 * @Author: wangsong
 * @Date: 2019-02-27 09:44:45 
 * @Last Modified by: wangsong
 * @Last Modified time: 2019-02-27 09:48:18
 * 树选择
 */
import React, { Component } from 'react';
import { TreeSelect  } from 'antd';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
export class WsTreeSelect extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }
/**
 * @desc  change事件
 */
  onChange = (value, label, extra) => {
    if(this.props.onChange){
        this.props.onChange(value, label, extra)
    }
  }
  render() {
    let {treeData,value,placeholder,width,height} = this.props;
    const tProps = {
        treeData,
        value,
        onChange: this.onChange,
        treeCheckable: true,
        treeDefaultExpandAll:true,
        showCheckedStrategy: SHOW_PARENT,
        searchPlaceholder: placeholder || '请选择',
        style: {
          width: width || 300,
          height:height || 40
        },
    };
    return (
        <TreeSelect {...tProps} />
    )
  }
}

