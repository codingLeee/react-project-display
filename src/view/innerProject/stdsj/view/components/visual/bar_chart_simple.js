/*
 * @Author: xiangting 
 * @Date: 2018-08-28 13:26:11 
 * @Last Modified by: yrj
 * @Last Modified time: 2019-03-21 15:54:22
 * 柱状——简单版
 * color:柱状图颜色
 * data：数据，数组格式
 * xAxis：横坐标，数组格式
 * type:1——课堂秩序：教学机构、教师违纪扣分，2——学生出勤,4——课堂秩序：违纪类型次数
 * number：tooltip中子单位数据
 */

import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default class BarChartSimple extends React.Component {

    getOption = () => {
        let option = {
            tooltip: {
                //trigger(触发类型)，可选'item','axis','none'
                trigger: 'axis',
                axisPointer: {
                    //指示器类型,可选'line','shadow','cross'
                    type: 'shadow'
                },
                formatter: (params) => {
                    let value;
                    if (this.props.type === 1) {
                        value = params[0].axisValue + '<br />' + '课程数：' + this.props.number[params[0].dataIndex] + '<br />' + "节均扣分：" + params[0].data
                    } else if (this.props.type === 2) {
                        value = params[0].axisValue + '<br />' + '课程数：' + this.props.number[params[0].dataIndex] + '<br />' + "平均出勤率：" + params[0].data + '%'
                    } else if (this.props.type === 3) {
                        value = params[0].axisValue + '<br />' + '课程数：' + this.props.number[params[0].dataIndex] + '<br />' + "发生次数：" + params[0].data
                    }
                    return value;
                },
            },
            grid: {
                top: 30,
            },
            xAxis: {
                type: 'category',
                data: this.props.xAxis,
                // data: ['马克思列宁主义毛泽东思想基本理论'],
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    },
                    formatter: (params) => {
                        let xAxis = [];
                        for (let j = 0; j < Math.floor(params.length / 5); j++) {
                            xAxis.push(params.slice(j * 5, (j + 1) * 5))
                        }
                        if ((params.length % 5) > 0) {
                            xAxis.push(params.slice(Math.floor(params.length / 5) * 5))
                        }
                        xAxis = xAxis.join('\n');
                        return xAxis;
                    }
                },
                // axisLabel: {}
                axisLine: {
                    lineStyle: {
                        color: '#FFFFFF',
                    }
                },
                nameRotate: 45,
                axisTick: {
                    show: false
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#FFFFFF',
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    formatter: this.props.max ? '{value}%' : '{value}'
                }
            },
            series: [{
                data: this.props.data,
                type: 'bar',
                itemStyle: {
                    color: this.props.color || '#d37f2d',
                },
                barWidth: 40,
            }]
        };

        return option;
    }
    render() {
       
        return (
            <div>
                <ReactEcharts
                    // style={{ width: '400px', height: '291px' }}
                    style={this.props.style}
                    option={this.getOption()}
                />
            </div>
        )
    }
}