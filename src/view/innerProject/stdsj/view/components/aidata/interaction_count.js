/*
 * @Author: zhengqi 
 * @Date: 2018-11-11 14:16:55 
 * @Last Modified by: zhengqi
 * @Last Modified time: 2018-11-16 15:37:30
 * 互动统计/学生练习统计
 */
import React, { Component } from 'react';
import Line from './line';
import _x from './../../../js/_x/index';
import { Container } from "./../../common";
const TimeLength = _x.util.date.TimeLength;

const legend = [
  {
    color: '#95BF30',
    name: '教师讲授'
  }, {
    color: '#fecf74',
    name: '师生互动'
  }, {
    color: '#FF7600',
    name: '生生互动'
  }, {
    color: '#466FD5',
    name: '学生展示'
  }, {
    color: '#8F83B5',
    name: '学生自习'
  }]

const formatSec = _x.util.date.formatSec;

export class Interaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      writingList: [],//师生互动统计数据
      pptList: [],//生生互动统计数据
      patrolList: [],//学生展示统计数据
      writingLists: [],//师生互动统计数据
      pptLists: [],//生生互动统计数据
      patrolLists: [],//学生展示统计数据
      curStartTime: '00:00:00',//课堂开始时间
    }
  }

  /**
   * c处理数据
   */
  makeData = (color, val) => {
    let { curStartTime, alipersInfo } = this.props;
    var activeData = [];//互动/练习统计数据
    if (val) {
      val.map(item => {
        /**刻度尺上定位高亮*/
        let startTime = item.startTime;
        let timeLong = TimeLength(startTime, item.endTime);//统计时段
        let courseLength = alipersInfo[alipersInfo.length - 1] * 60000;//一节课的毫秒数
        let startPlace = TimeLength(curStartTime, startTime);//开始位置
        let positionNum = startPlace / courseLength;
        activeData.push({
          positionNum: positionNum * 100,
          activeLong: positionNum ? ((timeLong / courseLength) * 100) : 0,
          color: color,
          tooltip: '',
          time: startTime + '~' + item.endTime
        })
      });
    }
    return activeData;
  }

  componentDidUpdate() {
    let { teacherAction, curStartTime } = this.props;
    if (teacherAction && teacherAction.writingList !== this.state.writingLists) {
      this.setState({
        writingList: this.makeData('#00CC88', teacherAction.writingList),
        curStartTime: curStartTime,
        writingLists: teacherAction.writingList
      });
    }
    if (teacherAction && teacherAction.pptList !== this.state.pptLists) {
      this.setState({
        pptList: this.makeData('#FFD500', teacherAction.pptList),
        curStartTime: curStartTime,
        pptLists: teacherAction.pptList
      });
    }
    if (teacherAction && teacherAction.patrolList !== this.state.patrolLists) {
      this.setState({
        patrolList: this.makeData('#26A5FF', teacherAction.patrolList),
        curStartTime: curStartTime,
        patrolLists: teacherAction.patrolList
      });
    }
  }
  render() {
    let { writingList, pptList, patrolList, curStartTime } = this.state;
    return (
      <Container>
        {
          this.props.teacherAction ?
            <div className='zq-intion-container'>
              <p>板书</p>
              <Line listTime={writingList} alipersInfo={this.props.alipersInfo} />
              <p>多媒体</p>
              <Line listTime={pptList} alipersInfo={this.props.alipersInfo} />
              <p>巡视</p>
              <Line listTime={patrolList} alipersInfo={this.props.alipersInfo} />
            </div>
            : <div className='zq-no-data'><span>暂无数据</span></div>

        }

      </Container>

    );
  }
}

export class Count extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listTime: [{ color: '', tooltips: '', list: [] }],//学生练习统计数据
      curStartTime: '00:00:00',//课堂开始时间
    }
  }
  render() {
    let timeNum = this.props.timeNum;
    return (
      <Container>
        {
          this.props.data ?
            <div className='zq-count-container'>
              <ul className='zq-aid-legend'>
                {
                  legend.map((item, i) => (
                    <li key={i}><p style={{ backgroundColor: item.color }}></p>{`${item.name}${timeNum[i] === '' ? '' : "（" + timeNum[i] + "次）"}`}</li>
                  ))
                }
              </ul>
              <div style={{ paddingTop: 90 }}>
                <Line listTime={this.props.data} lineType={1} alipersInfo={this.props.alipersInfo} />
                <p style={{ paddingTop: 40, textAlign: 'center', fontSize: 16, color: '#CECCCC' }}>（课堂时间轴）</p>
              </div>
            </div>
            : <div className='zq-no-data'><span>暂无数据</span></div>
        }
      </Container>
    );
  }
}