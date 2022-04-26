/*
 * @Author: lxx 
 * @Date: 2018-11-11 13:18:14 
 * @Last Modified by: lxx
 * @Last Modified time: 2018-11-14 17:23:52
 * 教师授课统计组件
 */

import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Container } from './../../common';
import _x from './../../../js/_x/index';
import noData from './../../../img/nodata1.png';

const FormRequest = _x.util.request.formRequest;
const formatMin = _x.util.date.formatMin;
const getQueryString = _x.util.url.getQueryString;

export default class VerChart extends React.Component {
    constructor(params) {
        super(params);
        this.state = {
            countData: [],  // 授课数据
            saveData: '',  // 存储数据
            total: 0
        }
    }

    componentDidUpdate() {
        let data = this.props.data;
        if (data && this.state.saveData !== data) {
            let classData = data.classBehave, countData = [], total;
            countData = [{
                'name': '教师讲授',
                'value': classData.teaching,
            }, {
                'name': '学生自习',
                'value': classData.stuExercise
            }, {
                'name': '学生展示',
                'value': classData.stuShow
            }, {
                'name': '生生互动',
                'value': classData.stuStuActive
            }, {
                'name': '师生互动',
                'value': classData.teaStuActive
            }];
            total = classData.teaching + classData.stuExercise + classData.stuShow + classData.teaStuActive + classData.stuStuActive;
            this.setState({
                saveData: data,
                countData: countData,
                total
            });
        }
    }

    /**
     * 环形图处理
     */
    getOption = () => {
        var scaleData = [];
        let dt = this.state.countData,
            total = this.state.total;
        !dt ? [] : dt;
        var color = ['#95BF30', '#8F83B5', '#466FD5', '#FF7600', '#fecf74'];
        // console.log(total);
        for (var i = 0; i < dt.length; i++) {
            if (dt[i].value && (i === dt.length - 1 || dt[i].name === '教师讲授' || dt[i].name === '学生自习')) {
                scaleData.push({
                    value: dt[i].value,
                    name: dt[i].name,
                    itemStyle: {
                        normal: {
                            color: color[i]
                        }
                    }
                }, {
                        value: total/100,
                        name: '',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                },
                                color: 'rgba(0, 0, 0, 0)',
                                borderColor: 'rgba(0, 0, 0, 0)',
                                borderWidth: 0
                            }
                        }
                    });
            } else if (dt[i].value && (dt[i].name === '学生展示' || dt[i].name === '师生互动' || dt[i].name === '生生互动')) {
                scaleData.push({
                    value: dt[i].value,
                    name: dt[i].name,
                    itemStyle: {
                        normal: {
                            color: color[i],
                        }
                    }
                });
            }
        };
        // console.log(scaleData);
        // for(let i in scaleData) {
        //     console.log(scaleData[i].name);
        //     // console.log(scaleData[i]);
        //     if(!scaleData[i].value) {
        //         console.log(scaleData[i].name);
        //         scaleData.splice(i, 1);
        //     }
        // };
        
        let option = {
            tooltip: {
                show: false
            },
            legend: {
                show: false,
            },
            toolbox: {
                show: false
            },
            series: [{
                name: '',
                type: 'pie',
                clockWise: false,
                radius: ['50%', '72%'],
                center: ['50%', '60%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'outside',
                            color: '#333',
                            fontSize: 15,
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
                                    padding: [5, 0]
                                }
                            }
                        },
                        labelLine: {
                            length: 5,
                            length2: 15,
                            show: true,
                            color: '#333',
                        }
                    }
                },
                data: scaleData
            }]

        };

        return option;
    }
    render() {
        let state = this.state;
        // console.log(formatMin(136));
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