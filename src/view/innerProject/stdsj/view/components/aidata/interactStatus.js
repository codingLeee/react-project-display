/*
 * @Author: lxx 
 * @Date: 2018-11-11 13:18:14 
 * @Last Modified by: lxx
 * @Last Modified time: 2018-11-14 16:56:34
 * 互动情况组件
 */

import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Progress } from 'antd';
import { Container } from './../../common';
import _x from './../../../js/_x/index';

const FormRequest = _x.util.request.formRequest;
const formatMin = _x.util.date.formatMin;

export default class InterStatus extends React.Component {
    constructor(params) {
        super(params);
        this.state = {
            countData: [],  // 授课数据
            saveData: '',
            stuNum: 0,  // 学生总人数
            activeNum: 0,  // 互动人数
            total: 0,  // 总数据
        }
    }

    componentDidUpdate() {
        let data = this.props.data;
        if (data && this.state.saveData !== data) {
            let teaData = data.teaBehave, countData = [], total;
            countData = [{
                'name': '板书',
                'value': teaData.writing
            }, {
                'name': '巡视',
                'value': teaData.patrol
            }, {
                'name': '多媒体',
                'value': teaData.ppt
            }];
            total = teaData.writing + teaData.patrol + teaData.ppt;
            this.setState({
                saveData: data,
                countData,
                total
            });
        }
    }

    getOption = () => {
        var color = ['#00CC88', '#26A5FF', '#FFD500'];
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
        };
        for(let i in secData) {
            if(!secData[i].value) {
                secData.splice(i, 1);
            }
        };
        let option = {
            tooltip: {
                show: false
            },
            legend: {
                show: false,
            },
            series: [
                {
                    type: 'pie',
                    center: ['50%', '55%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'outside',
                                color: '#333',
                                fontSize: 16,
                                formatter: function (params) {
                                    if (params.name !== '') {
                                        return formatMin(params.value) + '分钟\n{white|' + params.name + '}';
                                    } else {
                                        return '';
                                    }
                                },
                                rich: {
                                    white: {
                                        color: '#333',
                                        align: 'center',
                                        fontSize: 15,
                                        padding: [10, 0]
                                    }
                                }
                            },
                            labelLine: {
                                length: 10,
                                length2: 30,
                                show: true,
                                color: '#333'
                            }
                        }
                    },
                    data: secData
                }
            ]

        };

        return option;
    }
    render() {
        let state = this.state;

        return (
            <div>
                {
                    state.countData.length && state.total
                        ? <ReactEcharts style={this.props.style} option={this.getOption()} />
                        : <div className="zq-no-data"><span>暂无数据</span></div>
                }
            </div>
        )
    }
}