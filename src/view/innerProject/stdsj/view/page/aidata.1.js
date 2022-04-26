/*
 * @Author: zhengqi 
 * @Date: 2018-11-11 10:38:30 
 * @Last Modified by: zhengqi
 * @Last Modified time: 2018-11-12 10:23:47
 *ai数据页面
 */
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Container, AiPanel } from "./../common";
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

export default class Aidata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientHeight: 0,
      stuData: '',  // 学生互动数据
      data: null,//互动/学生练习统计数据
      alipersInfo: [],//一堂课时间标尺刻度
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

    // 请求学生互动数据
    FormRequest('api/AI_data/individual_performance', obj, (res) => {
      if (res.data) {
        this.setState({
          stuData: res.data
        })
      }
    });

    // 请求互动统计/学生练习统计
    FormRequest('api/AI_data/interaction_count', obj, (res) => {
      if (res.data) {
        /*一节课的时长-->时间刻度**/
        let timeLong = TimeLength(res.data.curStartTime, res.data.curEndTime);
        let alipersNum = timeLong / 60000 / 5;
        let alipersInfo = [];
        for (var i = 0; i <= alipersNum; i++) {
          alipersInfo.push(i * 5);
        };
        this.setState({
          data: res.data,
          alipersInfo: alipersInfo
        });
      }
    });
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.size)
  }
  render() {
    let height = (this.state.clientHeight - 252) / 2;
    let { data, alipersInfo } = this.state;
    return (
      <div ref={(dis) => this.dis = dis}>
        <Container>
          <TopMenu />
          <div className='zq-aid-container'>
            <div>
              <div className='zq-aid-tit'>课堂整体表现</div>
              <Row gutter={10} style={{ height: height, minHeight: 338 }}>
                <Col className="zq-gutter-row" span={8}>
                  <AiPanel title="教师授课统计">
                    <VerChart style={{ height: height - 90 }} />
                  </AiPanel>
                </Col>
                <Col className="zq-gutter-row" span={8}>
                  <AiPanel title="互动统计">
                    {/* {
                      data ? */}
                    <Interaction data={data} alipersInfo={alipersInfo} />
                    {/* <div className='zq-no-data'></div>

                    } */}
                  </AiPanel>
                </Col>
                <Col className="zq-gutter-row" span={8}>
                  <AiPanel title="学生练习统计">
                    {/* {
                      data ? */}
                    <Count data={data} alipersInfo={alipersInfo} />
                    {/* <div className='zq-no-data'></div>
                    } */}
                  </AiPanel>
                </Col>
              </Row>
            </div>
            <div className='zq-ait-personTotal'>
              <div className='zq-aid-tit'>学生个人表现</div>
              <Row gutter={10} style={{ height: height, minHeight: 338 }}>
                <Col className="zq-gutter-row" span={8}>
                  <AiPanel title="互动情况">
                    <InterStatus style={{ height: height - 120 }} data={this.state.stuData} />
                  </AiPanel>
                </Col>
                <Col className="zq-gutter-row" span={16}>
                  <AiPanel title="个人互动情况">
                    <InterTable data={this.state.stuData} style={{ height: height - 113 }} />
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