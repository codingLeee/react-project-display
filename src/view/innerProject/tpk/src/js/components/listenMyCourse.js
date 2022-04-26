/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:00:04 
 * @Last Modified by: 蒲飞
 * @Last Modified time: 2017-12-27 11:31:52
 * 我的课
 */
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import {Row,Col} from 'antd';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';

class ListenMyCourse extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  static defaultProps = {
    myCourse:{
    totalOrder:0,
    orderNoFnish:0,
    orderListen:0
    }
  }
  
  render(){
    var mainStyle={
      width:this.props.haveTask?'':'375px'
    };
    var pieStyle={
      margin:this.props.haveTask?'':'0px auto 20px'
    }
    var pieMiddleStyle={
      left:this.props.haveTask?'67px':'112px'
    }
    return (
      <div className="pf-l-card" style={mainStyle}>
        <p className="pf-l-cardtitle">我的课</p>
        <div className="pf-l-pie" style={pieStyle}>
          <ReactEcharts style={{width:'160px',height:'160px'}} option={this.getOption()} />
        </div>
        <div className="pf-r-piemiddle pf-l-piemiddle" style={pieMiddleStyle}>
          <p className="pf-r-piemidfont">被预约</p>
          <p><span className="pf-r-bigsize">{this.props.myCourse.totalOrder}</span>次</p>
        </div>
        <div className="pf-l-list">
          <Row gutter={8}>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <div className="pf-l-gutter">预约未听</div>
                </Col>
                <Col span={9}>
                {
                  this.props.myCourse.orderNoFnish>1000?<div className="pf-l-smallsize pf-l-agree">{this.props.myCourse.orderNoFnish}</div>:
                  <div className="pf-l-bigsize pf-l-agree">{this.props.myCourse.orderNoFnish}</div>
                }
                </Col>
                <Col span={3}>
                  <div className="pf-l-gutter">次</div>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <div className="pf-l-gutter">被听课</div>
                </Col>
                <Col span={9}>
                {
                this.props.myCourse.orderListen>1000?<div className="pf-l-reject pf-l-smallsize">{this.props.myCourse.orderListen}</div>:
                  <div className="pf-l-bigsize pf-l-reject">{this.props.myCourse.orderListen}</div>
                }
                </Col>
                <Col span={3}>
                  <div className="pf-l-gutter">次</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  };

  getOption(){
    const option = {
      series: [{
        name: '我的课',
        type: 'pie',
        radius: ['60%', '80%'],
        hoverAnimation:false,
        label: {
            normal: {
                show: false,
                position: 'center',
                color:'#00CC88',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize:20
                },  
            }
        },
        data: [{
          value: this.props.myCourse.orderNoFnish,
          name: '预约被听',
          },{
            value:this.props.myCourse.orderListen,
            name:'被听课'
          }
        ]
      }],
      color:['#00cc88','#FFB728']
    }
    return option;
  }
}

export default ListenMyCourse;
