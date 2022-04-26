/*
 * @Author: xiangting 
 * @Date: 2018-08-28 13:26:11 
 * @Last Modified by: yrj
 * @Last Modified time: 2019-03-22 09:21:26
 * 折线图
 * data:数据，数据格式
 * color：折线图颜色
 * xAxis：横坐标，数组格式
 * type:1——课堂秩序，2——学生出勤，3——教师考勤
 * number：tooltip中子单位数据
 */

import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default class LineChart extends React.Component {
    
    getOption = () => {
        let option = {
            tooltip: {
                //trigger(触发类型)，可选'item','axis','none'
                trigger: 'axis',
                axisPointer: {
                    //指示器类型,可选'line','shadow','cross'
                    type: 'line'
                },
                formatter: (params) => {
                    let value;
                    if (this.props.type === 1) {
                        value = params[0].axisValue + '<br />' + '课程数：' + this.props.number[params[0].dataIndex] + '<br />' + "节均扣分：" + params[0].data
                    } else if (this.props.type === 2) {
                        value = params[0].axisValue + '<br />' + '课程数：' + this.props.number[params[0].dataIndex] + '<br />' + "出勤率：" + params[0].data + '%'
                    } else if (this.props.type === 3) {
                        value = params[0].axisValue + '<br />' + '课程数：' + this.props.number[params[0].dataIndex] + '<br />' + "异常次数：" + params[0].data
                    }
                    return value;
                },
            },
            grid: {
                top: 20,
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                data: this.props.xAxis,
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
                }
            },
            yAxis: {
                type: 'value',
              
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                },
            },
            series: [{
                data: this.props.data,
                type: 'line',
                smooth: true,
                lineStyle: {
                    color: this.props.color
                },
                itemStyle: {
                    color: this.props.color,
                    borderWidth: 3
                },
                connectNulls: true
            }]
        };

        return option;
    }
    render() {

        return (
            <div>
                <ReactEcharts style={this.props.style} option={this.getOption()} />
            </div>
        )
    }
}