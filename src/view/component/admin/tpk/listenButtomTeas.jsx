import React, { Component } from 'react';
import { Radio } from 'antd';

import ListenTeaInfo from './../../../component/admin/tpk/listenTeaInfo';

// import '../../css/iconfont.css';
import '../../../../css/admin/mj_listenTopTeas.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class ListenButtomTeas extends Component {

  render() {
    return (
      <div className='mj-ltt-teacherCon mj-lbt-teacherCon'>
        <div>
          <span className='mj-ltt-title'>完成度较高的听课员</span>
          <div>
            {
              this.props.finishedHighSort.map((value, index) => (
                <ListenTeaInfo key={index} data={value} num={index} finished={value.cnt} all={value.allNum} thePer='mj'></ListenTeaInfo>
              ))
            }
            <div className='mj-ltt-clear'></div>
          </div>
        </div>

        <div className='mj-ltt-teacherConOth'>
          <span className='mj-ltt-title'>完成度较低的听课员</span>
          <div>
            {
              this.props.finishedLowSort.map((value, index) => (
                <ListenTeaInfo key={index} data={value} num={index + 3} finished={value.cnt} all={value.allNum} thePer='mj'></ListenTeaInfo>
              ))
            }
            <div className='mj-ltt-clear'></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListenButtomTeas;