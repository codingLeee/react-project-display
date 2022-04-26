/*
 * @Author: xiangting 
 * @Date: 2019-03-01 09:50:49 
 * @Last Modified by: xiangting
 * @Last Modified time: 2019-03-19 16:46:52
 * 教学反思——授课秩序
 */

import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';
import { teachingOrder, jxfsLoading } from '../../../../redux/jxfs.reducer'

@connect(state => state.getJxfsData, { teachingOrder, jxfsLoading })
export default class TeachingOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventNum: 23
        }
    }

    /**
     * @description  饼图配置
     */
    initLine() {
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: "<br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name: '授课秩序',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '50%'],
                    label: {
                        normal: {
                            position: 'inner',
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        { value: 335, name: '学生违纪', selected: true },
                        { value: 679, name: '老师违纪' },
                    ],
                    color: ['#ea6e76', '#eb8c00']
                },
                {
                    name: '授课秩序',
                    type: 'pie',
                    radius: ['60%', '75%'],
                    label: {
                        normal: {
                            formatter: ' {b|{b}} ',
                            rich: {
                                a: {
                                    color: '#999',
                                    lineHeight: 22,
                                    align: 'center'
                                },
                                hr: {
                                    borderColor: '#aaa',
                                    width: '100%',
                                    borderWidth: 0.5,
                                    height: 0
                                },
                                b: {
                                    fontSize: 16,
                                    lineHeight: 33
                                },
                                per: {
                                    color: '#eee',
                                    backgroundColor: '#334455',
                                    padding: [2, 4],
                                    borderRadius: 2
                                }
                            }
                        }
                    },
                    data: [
                        { value: 335, name: '私自调课' },
                        { value: 310, name: '上课说话' },
                        { value: 234, name: '上课吃东西' },
                        { value: 135, name: '接电话' },
                        { value: 1048, name: '迟到' },
                        { value: 102, name: '其他' }
                    ]
                }
            ]
        };
        return option;
    }

    /**
     * @description  切换角色
     * @param {object} e    被选中角色信息
     */
    changeRole(e) {
        if (e.seriesIndex === 0) {
            console.log(e.dataIndex)
            this.props.teachingOrder()
        }
    }
    render() {
        const data = this.props.teachingOrderData;
        const onEvents = { 'click': this.changeRole.bind(this) }
        return (
            <div className='xt-teachingOrder'>
                <div className='xt-teachingOrder-title'>
                    <div>授课秩序</div>
                    <div>总违纪次数<span>{data.eventNum || '-'}</span>次</div>
                </div>
                <ReactEcharts
                    onEvents={onEvents}
                    style={{
                        width: '96%',
                        padding: '2rem 0rem 0',
                        height: '300px',
                        overflow: 'hidden'
                    }}
                    className='xt-teachingOrder-echarts'
                    option={this.initLine()}
                />
            </div>
        )
    }
}