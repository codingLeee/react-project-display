/*
 * @Author: minj 
 * @Date: 2017-09-11 17:59:57 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-07 10:08:59
 */
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';

import './../../../../css/admin/mj_listenAppliCom.css';

class ListenAppliCom extends Component {
  render() {
    return (
      <div className='mj-lal-pieCon'>
        <div className='mj-lal-pie'>
          <ReactEcharts style={{ width: '140px', height: '180px' }} option={this.getOption()} />
        </div>

        <div className='mj-lal-dataCon'>
          <div className='mj-lal-data'>
            <span className='mj-lal-span'>申请次数</span>
            <div className='mj-lal-spanDiv'>
              <span>{this.props.apply}</span>
              <span> 次</span>
            </div>
          </div>
          <div className='mj-lal-data'>
            <span className='mj-lal-span'>听课次数</span>
            <div className='mj-lal-spanDiv'>
              <span>{this.props.listen}</span>
              <span> 次</span>
            </div>
          </div>
          <div className='mj-lal-data'>
            <span className='mj-lal-span'>申请未听</span>
            <div className='mj-lal-spanDiv'>
              <span>{this.props.noListen}</span>
              <span> 次</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // top echarts
  getOption() {
    var listenPre;
    if (this.props.listen === 0 || this.props.apply === 0) {
      listenPre = 0;
    } else {
      listenPre = Math.round((this.props.listen / this.props.apply) * 10000) / 100;
    }
    // console.log(listenPre);

    const option = {
      title: {
        text: '申请听课完成度',
        textStyle: {
          fontWeight: 'normal',
          fontSize: 14,
          fontFamily: '微软雅黑'
        },
        left: 'center',
        bottom: '0'
      },
      series: [{
        name: '申请听课完成度',
        type: 'pie',
        hoverAnimation: false,
        radius: ['60%', '80%'],
        label: {
          normal: {
            show: false
          }
        },
        data: [{
          value: listenPre,
          name: '已完成', 
          itemStyle: { 
            normal: { color: '#00cc88' }, 
            emphasis: { color: '#00cc88' } 
          },
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
          value: 100 - listenPre,
          name: '未完成', 
          itemStyle: { 
            normal: { color: '#ebebeb' }, 
            emphasis: { color: '#ebebeb' } 
          },
        }
        ]
      }]
    }
    return option;
  }
}

export default ListenAppliCom;