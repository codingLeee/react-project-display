/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:01:31 
 * @Last Modified by: 蒲飞
 * @Last Modified time: 2017-09-27 14:32:07
 * 评课计划概况
 */
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import {Row,Col} from 'antd';
import '../../css/components/researchMyTeachComPlan.css';

class ResearchMyTeachComPlan extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  static defaultProps = {
    myTeachComPlan:{
    totalPlan:0,
    fnishPlan:0,
    goPlan:0,
    noStartPlan:0
    }
  }

  render(){
    return (
      <div>
        <div className="pf-r-card">
          <p className="pf-r-cardtitle">评课计划概况</p>
          <div className="pf-r-cardcontent">
            <div className="pf-r-pie">
              <ReactEcharts style={{width:'160px',height:'160px'}} option={this.getOption(this.props.myTeachComPlan.fnishPlan,this.props.myTeachComPlan.noStartPlan,this.props.myTeachComPlan.goPlan)} />
            </div>
            <div className="pf-r-piemiddle">
              <p className="pf-r-piemidfont">共参与</p>
              <p><span className="pf-r-bigsize">{this.props.myTeachComPlan.totalPlan}</span>个</p>
            </div>
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

  getOption(n1,n2,n3){
    const option = {
      series: [{
        name: '评课计划',
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
          value: n1,
          name: '已完成',
          },{
            value:n2,
            name:'未开始'
          },
          {
            value:n3,
            name:'进行中',
            color:'#EBEBEB'
          }
        ]
      }],
      color:['#00cc88','#FFB728','#EBEBEB']
    }
    return option;
  }
}

export default ResearchMyTeachComPlan;