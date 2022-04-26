/*
 * @Author: zhengqi 
 * @Date: 2018-11-11 14:16:55 
 * @Last Modified by: lxx
 * @Last Modified time: 2018-11-13 11:28:15
 * 互动统计/学生练习统计
 */
import React, { Component } from 'react';
import Line from './line';
import _x from './../../../js/_x/index';
import { Container } from "./../../common";

const formatSec = _x.util.date.formatSec;

export class Interaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teaAndStu: { count: 0, time: 0, listTime: [] },//师生互动统计数据
      stuAndStu: { count: 0, time: 0, listTime: [] },//生生互动统计数据
      stuShow: { count: 0, time: 0, listTime: [] },//学生展示统计数据
      curStartTime: '00:00:00',//课堂开始时间
    }
  }

  componentDidUpdate() {
    let data = this.props.data;
    if (data && data.teaAndStu !== this.state.teaAndStu) {
      this.setState({
        teaAndStu: data.teaAndStu,
        curStartTime: data.curStartTime
      });
    }
    if (data && data.stuAndStu !== this.state.stuAndStu) {
      this.setState({
        stuAndStu: data.stuAndStu,
        curStartTime: data.curStartTime
      });
    }
    if (data && data.stuShow !== this.state.stuShow) {
      this.setState({
        stuShow: data.stuShow,
        curStartTime: data.curStartTime
      });
    }
  }
  render() {
    let data = this.props.data;
    let { teaAndStu, stuAndStu, stuShow, curStartTime } = this.state;
    return (
      <Container>
        {
          data ?
            <div className='zq-intion-container'>
              <p>互动总时长：{data ? formatSec(data.interactionTimeCount) : formatSec(0)}</p>
              <div className='zq-intion-text'>
                <p>师生互动时长：<span>{formatSec(teaAndStu.time)}</span></p>
                <p>师生互动次数：<span>{teaAndStu.count}</span></p>
              </div>
              <Line listTime={teaAndStu.listTime} curStartTime={curStartTime} alipersInfo={this.props.alipersInfo} />
              <div className='zq-intion-text'>
                <p>生生互动时长：<span>{formatSec(stuAndStu.time)}</span></p>
                <p>生生互动次数：<span>{stuAndStu.count}</span></p>
              </div>
              <Line listTime={stuAndStu.listTime} curStartTime={curStartTime} alipersInfo={this.props.alipersInfo} />
              <div className='zq-intion-text'>
                <p>学生展示时长：<span>{formatSec(stuShow.time)}</span></p>
                <p>学生展示次数：<span>{stuShow.count}</span></p>
              </div>
              <Line listTime={stuShow.listTime} curStartTime={curStartTime} alipersInfo={this.props.alipersInfo} />
            </div>
            : <div className='zq-no-data'></div>

        }

      </Container>

    );
  }
}

export class Count extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stuExercise: { count: 0, time: 0, listTime: [] },//学生练习统计数据
      curStartTime: '00:00:00',//课堂开始时间
    }
  }
  componentDidUpdate() {
    let data = this.props.data;
    if (data && data.stuExercise !== this.state.stuExercise) {
      this.setState({
        stuExercise: data.stuExercise,
        curStartTime: data.curStartTime
      });
    }
  }
  render() {
    let { stuExercise, curStartTime } = this.state;
    let time = formatSec(stuExercise.time);
    return (
      <Container>
        {
          this.props.data ?
            <div className='zq-count-container'>
              <div className='zq-count-circle'>
                <div>
                  <div>练习时长
            <p style={{ backgroundColor: '#2abd81' }}>{time}</p>
                  </div>
                </div>
                <div>
                  <div>练习次数
            <p style={{ backgroundColor: '#26a5ff' }}>{stuExercise.count}</p>
                  </div>
                </div>
              </div>
              <Line listTime={stuExercise.listTime} curStartTime={curStartTime} alipersInfo={this.props.alipersInfo} />
            </div>
            : <div className='zq-no-data'></div>
        }
      </Container>
    );
  }
}