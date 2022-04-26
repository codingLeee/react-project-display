/*
 * @Author: MinJ
 * @Date: 2018-05-11 15:14:06 
 * @Last Modified by: MinJ
 * @Last Modified time: 2018-05-11 16:51:38
 * 图片放大  this.props.imgClocse父组件关闭弹框   this.props.img图片路径
 */
import React, { Component } from 'react';
import { Breadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom';

class ImgBig extends Component {
  render() {
    return (
      <div onClick={() => this.props.imgClocse()} style={{
        position: 'fixed', width: '100%', height: '100%', top: '0', left: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.65)', zIndex: '1000'
      }}>
        <img alt src={this.props.img} style={{paddingTop:'10%',maxHeight:'80%'}} />
      </div>
    );
  }
}

export default ImgBig;