/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-09-11 20:10:55
 * 听评课-管理员部分-随堂听开展情况
 */
import React, { Component } from 'react';

import ListenTopTotal from '../../components/listenTopTotal';
import ListenButtomTotal from '../../components/listenButtomTotal';

class TpkManagerLisTasks extends Component{
  render(){
    return (
      <div>
          <ListenTopTotal></ListenTopTotal>  
          <ListenButtomTotal></ListenButtomTotal>  
      </div>
    );
  }
}

export default TpkManagerLisTasks;