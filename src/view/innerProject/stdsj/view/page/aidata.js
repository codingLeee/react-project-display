/*
 * @Author: zhengqi 
 * @Date: 2018-11-11 10:38:30 
 * @Last Modified by: zhengqi
 * @Last Modified time: 2018-11-16 15:40:28
 *ai数据页面
 */
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Container, AiPanel, SVG } from "./../common";
import TopMenu from './../components/base/topMenu';
import './../../css/aidata.css';
import VerChart from './../components/aidata/verChart';
import InterStatus from './../components/aidata/interactStatus';
import InterTable from './../components/aidata/interactTable';
import { Interaction, Count } from "./../components/aidata/interaction_count";
import _x from './../../js/_x/index';

const FormRequest = _x.util.request.formRequest;
const TimeLength = _x.util.date.TimeLength;
const getQueryString = _x.util.url.getQueryString;
const Format = _x.util.date.format;
const formatMin = _x.util.date.formatMin;

export default class Aidata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientHeight: 0,
      pieData: '',  // 饼图数据
      teacherAction: null,//老师行为
      alipersInfo: [],//一堂课时间标尺刻度
      classAction: null,//课堂行为数据
      curStartTime: '00:00:00',//课堂开始时间
      classInfo: '',   // 课堂信息
      timeNum: ['', 0, 0, 0, ''],//图例标记互动次数
      classTime: 0,  // 课堂行为时长
      teaTime: 0  // 教师行为时长
    }
  }

  size = () => {
    this.setState({ clientHeight: this.dis.clientHeight });
  }

  componentDidMount() {
    this.size();
    window.addEventListener('resize', this.size);
    let id = getQueryString('id');
    let obj = {
      cur_id: id
    };

    // 请求饼图数据
    FormRequest('api/AI_data/all_behave', obj, (res) => {
      if (res.data) {
        let { teaTime } = this.state;
        let teaBe = res.data.teaBehave;
        // classBe 
        //   ? classTime = classBe.teaching + classBe.stuExercise + classBe.stuShow + classBe.teaStuActive + classBe.stuStuActive
        //   : classTime = 0;
        teaBe ? teaTime = formatMin(teaBe.writing) + formatMin(teaBe.patrol) + formatMin(teaBe.ppt) : teaTime = 0;
        this.setState({
          pieData: res.data,
          // classTime,
          teaTime
        })
      }
    });

    // 请求时间轴
    FormRequest('api/AI_data/interaction_count', obj, (res) => {
      // console.log(res);
      if (res.data) {
        const data = res.data;
        const curStartTime = data.curStartTime
        if (curStartTime) {
          /*一节课的时长-->时间刻度**/
          let timeLong = TimeLength(curStartTime, data.curEndTime);
          let alipersNum = timeLong / 60000 / 5;
          let alipersInfo = [];
          for (var i = 0; i <= alipersNum; i++) {
            alipersInfo.push(i * 5);
          };
          this.formattingData(curStartTime, timeLong, 'teaStuActive', data.teaStuActive);
          this.formattingData(curStartTime, timeLong, 'stuStuActive', data.stuStuActive);
          this.formattingData(curStartTime, timeLong, 'stuShow', data.stuShow);
          this.formattingData(curStartTime, timeLong, 'teachingList', data.teachingList);
          this.formattingData(curStartTime, timeLong, 'exerciseList', data.exerciseList);
          let timeNum = ['', data.teaStuActive ? data.teaStuActive.length : 0, data.stuStuActive ? data.stuStuActive.length : 0, data.stuShow ? data.stuShow.length : 0, '']
          this.setState({
            timeNum,//图例标记互动次数
            curStartTime: curStartTime,//课堂开始时间:
            alipersInfo: alipersInfo,
            teacherAction: { writingList: data.writingList, pptList: data.pptList, patrolList: data.patrolList },
            classTime: timeLong / 1000
          });

        }
      }
    });

    // 课堂信息
    FormRequest('api/AI_data/get_class_info', obj, (res) => {
      if (res.data) {
        this.setState({
          classInfo: res.data
        })
      }
    })
  }

  /**
   * 时间轴数据
   */
  formattingData = (start, long, name, val) => {
    let { classAction } = this.state;
    if (val) {
      let info = '', color = '', zIndex = 10;//行为类型
      switch (name) {
        case 'teaStuActive':
          info = '师生互动';
          color = '#fecf74';
          zIndex = 20;
          break;
        case 'stuStuActive':
          info = '生生互动';
          color = '#FF7600';
          zIndex = 30;
          break;
        case 'stuShow':
          info = '学生展示';
          color = '#466FD5';
          zIndex = 40;
          break;
        case 'teachingList':
          info = '教师讲授';
          color = '#95BF30';
          zIndex = 10;
          break;
        case 'exerciseList':
          info = '学生自习';
          color = '#8F83B5';
          zIndex = 50;
          break;
        case 'writingList':
          color = '#00CC88';
          break;
        case 'pptList':
          color = '#FFD500';
          break;
        case 'patrolList':
          color = '#26A5FF';
          break;
        default:
          break;
      }
      var activeData = [];//统计数据
      val.map(item => {
        /**刻度尺上定位高亮*/
        let startTime = item.startTime;
        let timeLong = TimeLength(startTime, item.endTime);//统计时段
        let startPlace = TimeLength(start, startTime);//开始位置
        let positionNum = startPlace / long;
        activeData.push({
          positionNum: positionNum * 100,
          activeLong: (timeLong / long) * 100,
          color: color,
          tooltip: info,
          zIndex: zIndex,
          time: startTime + '~' + item.endTime
        })
        // if (name === 'stuStuActive') {
        //   console.log(timeLong, long)
        // }
      })
      // if (name === 'stuStuActive') {
      //   console.log(activeData)
      // }
      classAction ? classAction = classAction.concat(activeData) : classAction = activeData;
      this.setState({ classAction });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.size)
  }
  render() {
    let height = (this.state.clientHeight - 252) / 2;
    let { teacherAction, alipersInfo, pieData, classAction, curStartTime, classInfo, timeNum, classTime, teaTime } = this.state;
    let startTime = classInfo.dateStartTime ? Format(new Date(classInfo.dateStartTime), 'HH:mm') : 0,
      endTime = classInfo.dateEndTime ? Format(new Date(classInfo.dateEndTime), 'HH:mm') : 0;
    return (
      <div ref={(dis) => this.dis = dis}>
        <Container>
          <TopMenu />
          <div className='zq-aid-container'>
            <div>
              <div className="lxx-g-flex-center">
                <div className="lxx-m-flex"><div className='zq-aid-tit'>课堂行为<span>总时长：{formatMin(classTime)}分钟</span></div></div>
                <div className="lxx-g-classInfo">
                  <span><SVG type="time" />{classInfo.dateStartTime ? (Format(new Date(classInfo.dateStartTime), 'yyyy-MM-dd')) : null} {startTime}-{endTime}</span>
                  <span><SVG type="adress" />{classInfo.plaName || '-'}</span>
                  <span><SVG type="teacher" />{classInfo.teacherName || '-'}</span>
                  <span><SVG type="xy" />{classInfo.collegeName || '-'}</span>
                  <span><SVG type="classroom" />{classInfo.className || '-'}</span>
                </div>
              </div>
              <Row gutter={10} style={{ height: height, minHeight: 338 }}>
                <Col className="zq-gutter-row" span={8}>
                  <AiPanel>
                    <VerChart style={{ height: height - 80 }} data={pieData} />
                  </AiPanel>
                </Col>
                <Col className="zq-gutter-row" span={16}>
                  <AiPanel>
                    <Count data={classAction} timeNum={timeNum} alipersInfo={alipersInfo} />
                  </AiPanel>
                </Col>
              </Row>
            </div>
            <div className='zq-ait-personTotal'>
              <div className='zq-aid-tit'>教师行为<span>总时长：{teaTime}分钟</span></div>
              <Row gutter={10} style={{ height: height, minHeight: 338 }}>
                <Col className="zq-gutter-row" span={8}>
                  <AiPanel>
                    <InterStatus style={{ height: height - 100 }} data={this.state.pieData} />
                  </AiPanel>
                </Col>
                <Col className="zq-gutter-row" span={16}>
                  <AiPanel>
                    <Interaction teacherAction={teacherAction} curStartTime={curStartTime} alipersInfo={alipersInfo} />
                  </AiPanel>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

// export default Aidata;