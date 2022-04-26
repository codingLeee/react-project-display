/*
 * @Author: JC.Liu 
 * @Date: 2019-02-23 22:34:10 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-07 13:15:27
 * 听评课 - 随堂听任务
 */
import React, { Component } from 'react';
import ListenTopTotal from './../../../../component/admin/tpk/listenTopTotal';
import ListenButtomTotal from './../../../../component/admin/tpk/listenButtomTotal';

export class SttTask extends Component {
  render() {
    return (
      <div>
         <ListenTopTotal history={this.props.history}></ListenTopTotal>
         <ListenButtomTotal></ListenButtomTotal>  
      </div>
    );
  }
}