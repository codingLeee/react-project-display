/*
 * @Author: lxx 
 * @Date: 2018-11-11 13:18:14 
 * @Last Modified by: lxx
 * @Last Modified time: 2018-11-12 09:20:25
 * 教师授课统计组件
 */

import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Container } from './../../common';
import _x from './../../../js/_x/index';
import noData from './../../../img/nodata1.png';

const FormRequest = _x.util.request.formRequest;
const FormatSec = _x.util.date.formatSec;
const getQueryString = _x.util.url.getQueryString;
// const Style = {
//     paddingTop: 235,
//     marginTop: 100,
//     height: 300,
//     background: `#fff url('./../../../img/nodata1.png') 50% 24%/170px 170px no-repeat`,
//     borderBottom: 0
// }

export default class VerChart extends React.Component {
    constructor(params) {
        super(params);
        this.state = {
            totalNum: 0,  // 授课总时长
            countData: []  // 授课数据
        }
    }
    componentDidMount() {
        let obj = {
            cur_id: getQueryString('id') || ''
        };
        FormRequest('api/AI_data/teach_class_count', obj, (res) => {
            if (res.data) {
                let data = [], totalNum;
                data = [{
                    'name': '讲话时长',
                    'value': res.data.teachTime
                },
                {
                    'name': '多媒体使用',
                    'value': res.data.multimediaTime
                },
                {
                    'name': '板书时长',
                    'value': res.data.writingTime
                }];
                this.setState({
                    totalNum: res.data.teachCount,
                    countData: data
                });
            }
        });
    }

    /**
     * 环形图处理
     */
    getOption = () => {
        var scaleData = [];
        let dt = this.state.countData;
        !dt ? [] : dt;
        var color = ['#4474D5', '#8F83B5', '#BBC2C0'];
        for (var i = 0; i < dt.length; i++) {
            scaleData.push({
                value: dt[i].value,
                name: dt[i].name,
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        shadowBlur: 0,
                        borderColor: '#BBC2C0',
                        color: color[i]
                    }
                }
            }, {
                    value: 0.25,
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
        }
        let option = {
            tooltip: {
                show: false
            },
            legend: {
                show: true,
                orient: 'vertical',
                itemWidth: 20,
                left: 10,
                bottom: '1%',
            },
            toolbox: {
                show: false
            },
            series: [{
                name: '',
                type: 'pie',
                clockWise: false,
                radius: ['50%', '72%'],
                center: ['50%', '40%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'outside',
                            color: '#333',
                            fontSize: 18,
                            formatter: function (params) {
                                if (params.name !== '') {
                                    return FormatSec(params.value) + 'm\n{white|' + params.name + '}';
                                } else {
                                    return '';
                                }
                            },
                            rich: {
                                white: {
                                    color: '#333',
                                    align: 'center',
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
                data: scaleData
            }]

        };

        return option;
    }
    render() {
        let state = this.state;

        return (
            <div>
                {
                    state.countData.length
                        ? <Container>
                            <p>教师授课总时长：{FormatSec(state.totalNum)}</p>
                            <ReactEcharts style={this.props.style} option={this.getOption()} />
                        </Container>
                        : <div className="zq-no-data"></div>
                }
            </div>
        )
    }
}