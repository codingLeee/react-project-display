/*
 * @Author: xiangting 
 * @Date: 2018-08-28 13:26:11 
 * @Last Modified by: xiangting
 * @Last Modified time: 2018-09-28 09:36:09
 * 柱状——带边框版
 * data:数据，数组格式
 * color:柱状图显示颜色
 * xAxis：横坐标，数组格式
 * type:1——课堂质量：教师教研评分排行，2——课堂质量：评分项得分比例，3——教师出勤：考勤异常类型次数排行，4——教师考勤：教师考勤异常平均次数排行
 * number：tooltip中子单位数据
 */

import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default class BarChartBorder extends React.Component {
    state = {
        border: [],             //内框数据
        inline: [],               //内填充数据
    }

    componentWillReceiveProps(props) {
        let border = [], inline = [], max = Math.max(...props.data);
        for (let i = 0; i < props.data.length; i++) {
            if (max <= 50 && max > 20) {
                if (props.data[i] > 0.5) {
                    border.push(props.data[i] * (1 - 0.5 / props.data[i]));

                } else {
                    border.push(props.data[i] * 0.5)
                }
                inline.push(props.data[i] * 0.87);
            } else if (max <= 20 && max > 10) {
                if (props.data[i] > 0.2) {
                    border.push(props.data[i] * (1 - 0.2 / props.data[i]));

                } else {
                    border.push(props.data[i] * 0.9)
                }
                inline.push(props.data[i] * 0.82);
            } else if (max <= 10 && max > 3) {
                if (props.data[i] > 0.1) {
                    border.push(props.data[i] * (1 - 0.1 / props.data[i]));

                } else {
                    border.push(props.data[i] * 0.9)
                }
                inline.push(props.data[i] * 0.78);
            } else if (max <= 3 && max > 1) {
                if (props.data[i] > 0.02) {
                    border.push(props.data[i] * (1 - 0.02 / props.data[i]));

                } else {
                    border.push(props.data[i] * 0.9)
                }
                inline.push(props.data[i] * 0.78);
            } else if (max <= 1) {
                border.push(props.data[i] * 0.99);
                inline.push(props.data[i] * 0.9);
            } else {
                if (props.data[i] > 1) {
                    border.push(props.data[i] * (1 - 1 / props.data[i]));

                } else {
                    border.push(props.data[i] * 0.5)
                }
                inline.push(props.data[i] * 0.9);
            }
        };
        this.setState({ border, inline })
    }

    componentDidMount() {
        let border = [], inline = [], max = Math.max(...this.props.data);
        for (let i = 0; i < this.props.data.length; i++) {
            if (max <= 50 && max > 20) {
                if (this.props.data[i] > 0.5) {
                    border.push(this.props.data[i] * (1 - 0.5 / this.props.data[i]));

                } else {
                    border.push(this.props.data[i] * 0.5)
                }
                inline.push(this.props.data[i] * 0.87);
            } else if (max <= 20 && max > 10) {
                if (this.props.data[i] > 0.2) {
                    border.push(this.props.data[i] * (1 - 0.2 / this.props.data[i]));

                } else {
                    border.push(this.props.data[i] * 0.9)
                }
                inline.push(this.props.data[i] * 0.82);
            } else if (max <= 10 && max > 3) {
                if (this.props.data[i] > 0.1) {
                    border.push(this.props.data[i] * (1 - 0.1 / this.props.data[i]));

                } else {
                    border.push(this.props.data[i] * 0.9)
                }
                inline.push(this.props.data[i] * 0.78);
            } else if (max <= 3 && max > 1) {
                if (this.props.data[i] > 0.02) {
                    border.push(this.props.data[i] * (1 - 0.02 / this.props.data[i]));

                } else {
                    border.push(this.props.data[i] * 0.9)
                }
                inline.push(this.props.data[i] * 0.78);
            } else if (max <= 1) {
                border.push(this.props.data[i] * 0.99);
                inline.push(this.props.data[i] * 0.9);
            } else {
                if (this.props.data[i] > 1) {
                    border.push(this.props.data[i] * (1 - 1 / this.props.data[i]));

                } else {
                    border.push(this.props.data[i] * 0.5)
                }
                inline.push(this.props.data[i] * 0.9);
            }
        };
        this.setState({ border, inline })
    }

    getOption = () => {
        let option = {
            // tooltip（提示框组件）
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
                        value = params[0].axisValue + '<br />' + '教研课数：' + this.props.number[params[0].dataIndex] + '<br />' + "评分平均分：" + params[0].data
                    } else if (this.props.type === 2) {
                        value = params[0].axisValue + '<br />' + '全校平均分：' + this.props.number[params[0].dataIndex] + '<br />' + "得分比例：" + params[0].data + "%"
                    } else if (this.props.type === 3) {
                        value = params[0].axisValue + '<br />' + '课程数：' + this.props.number[params[0].dataIndex] + '<br />' + "异常数：" + params[0].data
                    } else if (this.props.type === 4) {
                        value = params[0].axisValue + '<br />' + '课程数：' + this.props.number[params[0].dataIndex] + '<br />' + "异常比例：" + params[0].data + '%'
                    }
                    return value;
                },
            },
            //echarts图表的相对于容器的布局,
            grid: {
                top: 50,
            },
            xAxis: [{
                type: 'category',
                //axisTick 坐标轴刻度相关设置
                axisTick: {
                    show: false
                },
                //axixLine 坐标轴轴线相关设置
                axisLine: {
                    lineStyle: {
                        color: '#FFFFFF',
                    },
                },
                axisLabel:{
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
                data: this.props.xAxis,
            },
            {
                type: 'category',
                axisTick: {
                    show: false
                },

                axisLine: {
                    lineStyle: {
                        color: '#FFFFFF',
                    }
                },
                data: [],
                axisLabel: {
                    show: false,
                }
            }, {
                type: 'category',
                axisTick: {
                    show: false
                },

                axisLine: {
                    lineStyle: {
                        color: '#FFFFFF',
                    }
                },
                data: [],
                axisLabel: {
                    show: false,
                }
            },
            ],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    color: '#fff',
                    fontSize: 14,
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff',
                    },
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    formatter: this.props.max ? '{value} %' : '{value}'
                }
            }],
            series: [
                {
                    type: 'bar',
                    data: this.props.data,
                    barWidth: '53',
                    z: 0,
                    itemStyle: {
                        color: this.props.color,
                    },
                }, {
                    type: 'bar',
                    name: '内填充',
                    xAxisIndex: 1,
                    data: this.state.inline,
                    barWidth: '25',
                    z: 2,
                    itemStyle: {
                        color: this.props.color,
                    },
                },
                {
                    type: 'bar',
                    name: '内框',
                    xAxisIndex: 2,
                    data: this.state.border,
                    barWidth: '52',
                    z: 1,
                    itemStyle: {
                        color: 'rgba(13,28,45,0.9)',
                    },
                }
            ]
        };

        return option;
    }
    render() {
        return (
            <div>
                <div></div>
                <ReactEcharts style={this.props.style} option={this.getOption()} />
            </div>
        )
    }
}