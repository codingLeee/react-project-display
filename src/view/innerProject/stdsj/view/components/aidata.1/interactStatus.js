/*
 * @Author: lxx 
 * @Date: 2018-11-11 13:18:14 
 * @Last Modified by: lxx
 * @Last Modified time: 2018-11-12 13:40:55
 * 互动情况组件
 */

import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Progress } from 'antd';
import { Container } from './../../common';
import _x from './../../../js/_x/index';

const FormRequest = _x.util.request.formRequest;
const FormatSec = _x.util.date.formatSec;

export default class InterStatus extends React.Component {
    constructor(params) {
        super(params);
        this.state = {
            countData: [],  // 授课数据
            saveData: '',
            stuNum: 0,  // 学生总人数
            activeNum: 0,  // 互动人数
        }
    }
    componentDidMount() {

    }

    componentDidUpdate() {
        let data = this.props.data;
        if (data && this.state.saveData !== data) {
            let situData = data.interactionSituation;
            situData.map(dt => {
                return dt.name = dt.name + '次'
            });
            this.setState({
                saveData: data,
                countData: situData,
                stuNum: data.studentNum,
                activeNum: data.activeStu
            });
        }
    }

    getOption = () => {
        var color = ['#FFD174', '#FFBF41', '#C08F31', '#FFAB00', '#FF7400', '#BF7030', '#A73700', '#A73700'];
        var secData = [];
        var data = this.state.countData;
        for (var i = 0; i < data.length; i++) {
            secData.push({
                value: data[i].value,
                name: data[i].name,
                itemStyle: {
                    borderColor: color[i],
                    color: color[i]
                }
            });
        }
        let option = {
            tooltip: {
                // trigger: 'item',
                formatter: "{b}: {c}"
            },
            legend: {
                show: true,
                orient: 'vertical',
                padding: [15, 25],
                height: 120,
                itemGap: 20,
                itemWidth: 15,
                itemHeight: 15,
                right: 10,
                bottom: '13%',
                borderStyle: 'dotted',
                borderColor: '#BBC2C0',
                borderWidth: 1,

            },
            series: [
                {
                    type: 'pie',
                    radius: ['50%', '72%'],
                    center: ['25%', '50%'],
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: secData
                }
            ]

        };

        return option;
    }
    render() {
        let state = this.state, num = 0;
        state.stuNum ? num = parseInt(state.activeNum / state.stuNum * 100) : null;

        return (
            <div>
                {
                    state.countData.length
                        ? <Container>
                            <div>
                                <div className="lxx-g-flex" style={{ marginBottom: 5, color: '#6B7075' }}>
                                    <p className="lxx-m-flex">本堂课共{state.activeNum}学生参加互动</p>
                                    <span>{state.activeNum}/{state.stuNum}</span>
                                </div>
                                <Progress className="progress" percent={num} showInfo={false} />
                            </div>
                            <ReactEcharts style={this.props.style} option={this.getOption()} />
                        </Container>
                        
                        : <div className="zq-no-data"></div>
                }
            </div>
        )
    }
}