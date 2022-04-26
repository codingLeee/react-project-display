/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:01:31 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-15 10:22:05
 * 评课计划概况
 */
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import { Row, Col } from 'antd';
import './../../../../css/teacher/mj_researchMyTeachComPlan.css';

class ResearchMyTeachComPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static defaultProps = {
    myTeachComPlan: {
      totalPlan: 0,
      fnishPlan: 0,
      goPlan: 0,
      noStartPlan: 0
    }
  }

  render() {
    return (
      <div>
        <div className="pf-r-card">
          <p className="pf-r-cardtitle">评课计划概况</p>
          <div className="pf-r-cardcontent">
            <div className="pf-r-pie">
              <ReactEcharts style={{ width: '160px', height: '160px' }} option={this.getOption(this.props.myTeachComPlan.fnishPlan, this.props.myTeachComPlan.noStartPlan, this.props.myTeachComPlan.goPlan)} />
            </div>
            {/* <div className="pf-r-piemiddle">
              <p className="pf-r-piemidfont">共参与</p>
              <p><span className="pf-r-bigsize">{this.props.myTeachComPlan.totalPlan}</span>个</p>
            </div> */}
            <div className="pf-r-list">
              <Row>
                <Col span={16}><p className="pf-r-rowrange">已完成计划</p></Col>
                <Col span={6}><span className="pf-r-bigzise  pf-r-succcolor">{this.props.myTeachComPlan.fnishPlan}</span></Col>
                <Col span={2}><p>个</p></Col>
              </Row>
              <Row>
                <Col span={16}><p className="pf-r-rowrange">进行中计划</p></Col>
                <Col span={6}><span className="pf-r-bigzise  pf-r-ingcolor">{this.props.myTeachComPlan.goPlan}</span></Col>
                <Col span={2}><p>个</p></Col>
              </Row>
              <Row>
                <Col span={16}><p className="pf-r-rowrange">未开始计划</p></Col>
                <Col span={6}><span className="pf-r-bigzise  pf-r-nocolor">{this.props.myTeachComPlan.noStartPlan}</span></Col>
                <Col span={2}><p>个</p></Col>
              </Row>
            </div>
          </div>
        </div>
      </div>

    );
  };

  getOption(n1, n2, n3) {
    const _that = this;
    const option = {
      series: [{
        name: '评课计划',
        type: 'pie',
        radius: ['60%', '80%'],
        hoverAnimation: false,
        legendHoverLink: false,
        animation: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            color: '#00CC88',
            formatter: function (params) {
              const name = params.name;
              let str = name === '共参与' ? name + "\n\n" + '{size|' + _that.props.myTeachComPlan.totalPlan + '}' + `个` : '';
              return str;
            },
            rich: {
              size: {
                color: '#00CC88',
                fontSize: 20,
              }
            },
            textStyle: {
              fontWeight: 'normal',
              fontSize: 14
            },
          },
          emphasis:{
            
          }
        },
        data: [{
          value: n1,
          name: '',
        }, {
          value: n2,
          name: ''
        },
        {
          value: n3,
          name: `共参与`,
          color: '#EBEBEB'
        }
        ]
      }],
      color: ['#00cc88', '#FFB728', '#EBEBEB']
    }
    return option;
  }
}

export default ResearchMyTeachComPlan;