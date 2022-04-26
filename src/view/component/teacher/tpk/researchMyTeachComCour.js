/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:01:28 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-15 09:23:01
 * 评课概况
 */
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import { Link } from "react-router-dom";
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import { Row, Col, Button } from 'antd';
import './../../../../css/teacher/mj_researchMyTeachComCour.css';

class ResearchMyTeachComCour extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static defaultProps = {
    myTeachComCour: {
      totalCour: 0,
      fnishCour: 0,
      goCour: 0,
      noStartCour: 0
    }
  }

  render() {
    return (
      <div>
        <div className="pf-r-card">
          <p className="pf-r-cardtitle">评课概况</p>
          <Link to="/teacher/tpk/wdjyk/tpkTeachResearchComment/0/0">
            <Button type="primary" size="large" className="pf-r-pullright pf-t-greenbutton">我的教研本</Button>
          </Link>
          <div className="pf-r-cardcontent pf-r-cardlesspadding">
            <div className="pf-r-pie">
              <ReactEcharts style={{ width: '160px', height: '160px' }} option={this.getOption()} />
            </div>
            {/* <div className="pf-r-piemiddle">
              <p className="pf-r-piemidfont">共参与</p>
              <p><span className="pf-r-bigsize">{this.props.myTeachComCour.totalCour}</span>堂</p>
            </div> */}
            <div className="pf-r-list">
              <Row>
                <Col span={16}><p className="pf-r-rowrange">已完成</p></Col>
                <Col span={6}><span className="pf-r-bigzise  pf-r-succcolor">{this.props.myTeachComCour.fnishCour}</span></Col>
                <Col span={2}><p>堂</p></Col>
              </Row>
              <Row>
                <Col span={16}><p className="pf-r-rowrange">未完成</p></Col>
                <Col span={6}><span className="pf-r-bigzise  pf-r-ingcolor">{this.props.myTeachComCour.goCour}</span></Col>
                <Col span={2}><p>堂</p></Col>
              </Row>
              <Row>
                <Col span={16}><p className="pf-r-rowrange">未开始</p></Col>
                <Col span={6}><span className="pf-r-bigzise  pf-r-nocolor">{this.props.myTeachComCour.noStartCour}</span></Col>
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
        name: '评课概况',
        type: 'pie',
        radius: ['60%', '80%'],
        hoverAnimation: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            color: '#00CC88',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 14
            },
            formatter: function (params) {
              const name = params.name;
              let str = name === '共参与' ? name + "\n\n" + '{size|' + _that.props.myTeachComCour.totalCour + '}' + `个` : '';
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
          value: this.props.myTeachComCour.fnishCour,
          name: '',
        }, {
          value: this.props.myTeachComCour.noStartCour,
          name: ''
        },
        {
          value: this.props.myTeachComCour.goCour,
          name: '共参与',
          color: '#EBEBEB'
        }
        ]
      }],
      color: ['#00cc88', '#FFB728', '#EBEBEB']
    }
    return option;
  }
}


export default ResearchMyTeachComCour;