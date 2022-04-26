/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:01:26 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-15 09:24:28
 * 我的教研课概况 
 */
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import { Row, Col } from 'antd';
import './../../../../css/teacher/mj_researchMyTeach.css';

class ResearchMyTeach extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static defaultProps = {
    myTeach: {
      totalMyCour: 0,
      fnishMyCour: 0,
      noStartMyCour: 0
    }
  }

  render() {
    return (
      <div>
        <div className="pf-r-card">
          <p className="pf-r-cardtitle">我的教研课</p>
          <div className="pf-r-cardcontent">
            <div className="pf-r-pie">
              <ReactEcharts style={{ width: '160px', height: '160px' }} option={this.getOption()} />
            </div>
            {/* <div className="pf-r-piemiddle">
              <p className="pf-r-piemidfont">合计</p>
              <p><span className="pf-r-bigsize">{this.props.myTeach.totalMyCour}</span>堂</p>
            </div> */}
            <div className="pf-r-list">
              <Row>
                <Col span={16}><p className="pf-r-rowrange">完成数</p></Col>
                <Col span={6}><span className="pf-r-bigzise  pf-r-succcolor">{this.props.myTeach.fnishMyCour}</span></Col>
                <Col span={2}><p>堂</p></Col>
              </Row>
              <Row>
                <Col span={16}><p className="pf-r-rowrange">未开始</p></Col>
                <Col span={6}><span className="pf-r-bigzise  pf-r-ingcolor">{this.props.myTeach.noStartMyCour}</span></Col>
                <Col span={2}><p>堂</p></Col>
              </Row>
            </div>
          </div>
        </div>
      </div>

    );
  };

  getOption() {
    const _that = this;
    const option = {
      series: [{
        name: '我的教研课',
        type: 'pie',
        radius: ['60%', '80%'],
        hoverAnimation: false,
        label: {
          normal: {
            show: HTMLOptGroupElement,
            position: 'center',
            color: '#00CC88',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 14
            },
            formatter: function (params) {
              const name = params.name;
              let str = name === '合计' ? name + "\n\n" + '{size|' + _that.props.myTeach.totalMyCour + '}' + `个` : '';
              return str;
            },
            rich: {
              size: {
                color: '#00CC88',
                fontSize: 20,
              }
            },
          }
        },
        data: [{
          value: this.props.myTeach.fnishMyCour,
          name: '',
        },
        {
          value: this.props.myTeach.noStartMyCour,
          name: '合计',
          color: '#EBEBEB'
        }
        ]
      }],
      color: ['#00cc88', '#EBEBEB']
    }
    return option;
  }
}

export default ResearchMyTeach;