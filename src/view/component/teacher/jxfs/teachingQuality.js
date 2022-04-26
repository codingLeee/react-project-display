/*
 * @Author: xiangting 
 * @Date: 2019-03-01 09:50:31 
 * @Last Modified by: xiangting
 * @Last Modified time: 2019-03-13 12:53:52
 * 教学反思——教学质量
 */

import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';
import { teachingQuality,jxfsLoading } from '../../../../redux/jxfs.reducer'

@connect(state => state.getJxfsData, { teachingQuality,jxfsLoading })

export default class TeachingQuality extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avgScore: 20,
            totalCommentNum: 34,
            totalResearchNum: 45
        }
    }
    componentDidMount() {
        this.props.teachingQuality()
    }

    /**
     * @description 柱状图配置
     */
    initLine() {
        const option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                max: 100,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            series: [{
                data: [12, 20, 50, 80, 70, 10, 30],
                type: 'bar',
                color: '#ffaf40',
                label: {
                    show: true,
                    position: 'top'
                },
                markLine: {
                    lineStyle: {
                        color: '#3dcc85',
                        width: 1,
                        type: 'solid'
                    },
                    data: [{
                        yAxis: 80,
                        symbol: 'none'
                    }],
                }
            }]
        };
        return option;
    }
    render() {
        const data = this.props.teachingQualityData
        return (
            <div className='xt-teachingQuality'>
                <div>教研课质量</div>
                <div className="xt-teachingQuality-score">
                    <div>
                        <div>教研课节数</div>
                        <div><span>{data.totalResearchNum || '-'}</span>节</div>
                    </div>
                    <div>
                        <div>收到点评</div>
                        <div><span>{data.totalCommentNum || '-'}</span>条</div>
                    </div>
                    <div>
                        <div>评教得分</div>
                        <div><span>{data.avgScore || '-'}</span>分</div>
                    </div>
                </div>
                <ReactEcharts
                    style={{
                        width: '96%',
                        height: '300px',
                        overflow: 'hidden'
                    }}
                    className='xt-teachingQuality-echarts'
                    option={this.initLine()}
                />
            </div>
        )
    }
}