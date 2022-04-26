/*
 * @Author: lxx 
 * @Date: 2018-11-11 16:06:37 
 * @Last Modified by: lxx
 * @Last Modified time: 2018-11-11 21:04:50
 */
import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Row, Col } from 'antd';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Container } from './../../common';
import _x from './../../../js/_x/index';

const FormatSec = _x.util.date.formatSec;

const HeaderSty = {
    color: '#6B7075',
    lineHeight: '40px',
    borderBottom: '1px solid #EBEBEB'
};
const childSty = {
    lineHeight: '38px',
    borderBottom: '1px solid #EBEBEB'
}

export default class InterTable extends React.Component {
    constructor(params) {
        super(params);
        this.state = {
            saveData: '',   // 存储数据
            data: [], // 表格数据
        }
    }

    componentDidUpdate() {
        let data = this.props.data;
        if (data && this.state.saveData !== data) {
            this.setState({
                saveData: data,
                data: data.listUser || []
            });
        }
    }
    render() {
        let state = this.state;
        return <Container>
            {
                state.data.length
                    ?
                    <Container>
                        <Row type="flex" justify="space-around" align="middle" style={HeaderSty}>
                            <Col span={5}>姓名</Col>
                            <Col span={5} style={{ textAlign: 'center' }}>学生展示次数</Col>
                            <Col span={5} style={{ textAlign: 'center' }}>学生展示时长</Col>
                            <Col span={5} style={{ textAlign: 'center' }}>师生活动次数</Col>
                            <Col span={4} style={{ textAlign: 'right' }}>师生互动时长</Col>
                        </Row>
                        <PerfectScrollbar>
                            <div style={this.props.style}>
                                {
                                    state.data.map((item, index) => {
                                        return <Row key={index} type="flex" justify="space-around" align="middle" style={childSty}>
                                            <Col span={5}>{item.name || '-'}</Col>
                                            <Col span={5} style={{ textAlign: 'center' }}>{item.stuShow || '-'}</Col>
                                            <Col span={5} style={{ textAlign: 'center' }}>{FormatSec(item.showTime) || '-'}</Col>
                                            <Col span={5} style={{ textAlign: 'center' }}>{item.activeCount || '-'}</Col>
                                            <Col span={4} style={{ textAlign: 'right', paddingRight: 20 }}>{FormatSec(item.activeTime) || '-'}</Col>
                                        </Row>
                                    })
                                }
                            </div>
                        </PerfectScrollbar>
                    </Container>
                    : <div className="zq-no-data"></div>
            }
            

        </Container>
    }
}