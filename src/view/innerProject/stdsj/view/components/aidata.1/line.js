/*
 * @Author: zhengqi 
 * @Date: 2018-11-11 14:30:22 
 * @Last Modified by: zhengqi
 * @Last Modified time: 2018-11-11 20:44:23
 * 时长进度条 alipersInfo:刻度
 */
import React, { Component } from 'react';
import scale from './../../../img/scale.png';
import _x from './../../../js/_x/index'
const TimeLength = _x.util.date.TimeLength;

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // alipersInfo: [],//时刻段
      listTime: [],//统计时刻数据
      activeData: [],//互动/练习统计数据
    }
  }


  componentDidUpdate() {
    let { listTime, curStartTime, alipersInfo } = this.props;
    if (listTime.length && listTime !== this.state.listTime) {
      var activeData = [];//互动/练习统计数据
      listTime.map(item => {
        /**刻度尺上定位高亮*/
        let startTime = item.startTime;
        let timeLong = TimeLength(startTime, item.endTime);//统计时段
        let courseLength = alipersInfo[alipersInfo.length - 1] * 60000;//一节课的毫秒数
        let startPlace = TimeLength(curStartTime, startTime);//开始位置
        let positionNum = startPlace / courseLength;
        activeData.push({
          positionNum: positionNum * 100,
          activeLong: positionNum ? ((timeLong / courseLength) * 100) : 0
        })
      })
      this.setState({ listTime, activeData });
    }
  }

  render() {
    let { alipersInfo } = this.props;
    let length = alipersInfo.length - 1;
    return (
      <div>
        <div className='zq-line-bc'>
          {
            this.state.activeData.map((item, i) => (
              <span key={i} style={{ left: item.positionNum + '%', width: item.activeLong + '%' }}></span>
            ))
          }
        </div>
        <div className='zq-lin-alipers'>
          {
            alipersInfo.map((item, i) => {
              return <div key={i} style={{ left: (100 / length) * i + '%' }}><img src={scale} alt="" /><span>{item}</span></div>
            }
            )
          }
        </div>
      </div>
    );
  }
}

export default Line;