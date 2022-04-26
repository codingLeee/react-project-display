/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: xiangting
 * @Last Modified time: 2019-03-26 10:36:51
 * 听评课-管理员部分-随堂任务-完成情况
 */
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';

import './../../../../css/admin/mj_listenAppliCom.css';

class ListenTaskCom extends Component {
  render() {
    console.log(this.props)
    return (
      <div className='mj-lal-pieCon mj-lbt-pieCon'>
        <div className='mj-lal-pie'>
          <ReactEcharts style={{ width: '140px', height: '180px' }} option={this.getOption()} />
        </div>

        <div>
          <div className='mj-ltc-data'>
            <span>完成人员</span>
            <span>{this.props.finish}</span>
            <span>人</span>
          </div>
          <div className='mj-ltc-data'>
            <span>总人数</span>
            <span>{this.props.total}</span>
            <span>人</span>
          </div>
        </div>
      </div>
    );
  }

  // bottom echarts
  getOption() {
    var finish;
    if (this.props.finish === 0 || this.props.total === 0) {
      finish = 0;
    } else {
      finish = Math.round((this.props.finish / this.props.total) * 10000) / 100;
    }

    const option = {
      title: {
        text: '听课员任务完成度',
        textStyle: {
          fontWeight: 'normal',
          fontSize: 14,
          fontFamily: '微软雅黑'
        },
        left:'center',
        bottom: '0'
      },
      series: [{
        name: '听课员任务完成度',
        type: 'pie',
        hoverAnimation: false,
        radius: ['60%', '80%'],
        label: {
          normal: {
            show: false
          }
        },
        data: [{
          value: finish,
          name: '已完成', itemStyle: { normal: { color: '#00cc88' }, emphasis: { color: '#00cc88' } },
          label: {
            normal: {
              show: true,
              position: 'center',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 20
            },
            formatter: '{d}%'
            }
          }
        }, {
          value: 100 - finish,
          name: '未完成', itemStyle: { normal: { color: '#ebebeb' }, emphasis: { color: '#ebebeb' } },
        }
        ]
      }]
    }
    return option;
  }
}

export default ListenTaskCom;