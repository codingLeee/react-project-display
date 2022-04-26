/*
 * @Author: xiangting 
 * @Date: 2019-03-01 09:49:22 
 * @Last Modified by: xiangting
 * @Last Modified time: 2019-03-19 16:39:25
 * 教学反思——任务课表
 */

import React, { Component } from 'react';
import { Table, Button, Icon } from 'antd';
import { SVG } from '../../../../base';
import _x from '../../../../js/_x/util';
import { connect } from 'react-redux';
import { timeTable, jxfsLoading, curSemesterAndWeeks } from '../../../../redux/jxfs.reducer'

const number = _x.number

@connect(state => state.getJxfsData, { timeTable, jxfsLoading, curSemesterAndWeeks })
export default class Timetable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            showHover: '',
            showMore: undefined
        }
    }
    componentDidMount() {
        this.props.curSemesterAndWeeks().then((res) => {
            this.props.timeTable({
                "semester": {
                    "semesterId": "2018_2019_2"
                },
                "weeks": 2
            })
        })
    }

    /**
     * @desc 鼠标移上单元格，显示详情
     * @param {string} text         鼠标移上的单元格显示内容
     */
    showHover(text) {
        if (text && text.typeStatus !== 2) {
            this.setState({ showHover: text.curriculumallId.curriculumallId })
        }
    }

    /**
     * @description     上一周按钮
     */
    lastWeek() {
        console.log('上一周');
        this.props.timeTable()
    }

    /**
     * @description     下一周按钮
     */
    nextWeek() {
        console.log('下一周');
        this.props.timeTable()
    }

    getMore(text, e) {
        e.stopPropagation()
        this.setState({ showMore: text })
    }
    render() {
        let text = (text, record) => text.length ? <div style={{ position: 'relative' }}>
            <div
                style={{
                    height: '100%',
                    lineHeight: 5,
                    background: text[0] ? (text[0].typeStatus === 1 ? '#ff775c' : text[0].typeStatus === 2 ? '#3dcc85' : '#708afa') : '#fff',
                    color: '#fff',
                }}
                onMouseEnter={this.showHover.bind(this, text[0])}
                onMouseLeave={() => { this.setState({ showHover: undefined }) }}
            >
                {text[0].curriculumallId.className}
                {text.length > 1 ? <Icon type="bars" className='xt-timetable-more' onClick={this.getMore.bind(this, text)} /> : null}
                <SVG
                    type='time1'
                    style={{ width: '20px', height: '20px', position: 'absolute', top: '10px', right: '15px', display: text[0].timeStatus === 2 ? 'block' : 'none' }}
                    color='#000'
                />
            </div>
            {
                this.state.showMore && this.state.showMore === text ?
                    <div className='xt-timetable-select'>
                        {
                            this.state.showMore.map((item, index) => (
                                <div key={'index' + index}>
                                    <div className='xt-timetable-table-top' style={{ borderBottomColor: '#31a9ff' }}></div>
                                    <div>{item.curriculumallId.className}</div>
                                </div>
                            ))
                        }
                    </div> : null}
            <div className='xt-timetable-table-hover' style={{ display: this.state.showHover === text[0].curriculumallId.curriculumallId && !this.state.showMore && text[0].typeStatus !== 2 ? 'block' : 'none' }}>
                <div className='xt-timetable-table-top' style={{ borderBottomColor: 'rgba(0,0,0,0.5)' }}></div>
                <div style={{ display: text[0].typeStatus === 1 ? 'block' : 'none' }}>收到点评：{text[0].commentNumCur}</div>
                <div>违纪次数：{text[0].eventNum}</div>
            </div>
        </div> : <div></div>
        const columns = [
            {
                key: 'section',
                title: '节次',
                align: 'center',
                dataIndex: 'section',
                width: '10%'
            }, {
                key: 'Monday',
                title: '星期一',
                align: 'center',
                dataIndex: 'Monday',
                render: text,
                width: '10%'
            }, {
                key: 'Tuesday',
                title: '星期二',
                align: 'center',
                dataIndex: 'Tuesday',
                render: text,
                width: '10%'
            }, {
                key: 'Wednesday',
                title: '星期三',
                align: 'center',
                dataIndex: 'Wednesday',
                render: text,
                width: '10%'
            }, {
                key: 'Thursday',
                title: '星期四',
                align: 'center',
                dataIndex: 'Thursday',
                render: text,
                width: '10%'
            }, {
                key: 'Friday',
                title: '星期五',
                align: 'center',
                dataIndex: 'Friday',
                render: text,
                width: '10%'
            }, {
                key: 'Saturday',
                title: '星期六',
                align: 'center',
                dataIndex: 'Saturday',
                render: text,
                width: '10%'
            }, {
                key: 'Sunday',
                title: '星期日',
                align: 'center',
                dataIndex: 'Sunday',
                render: text,
                width: '10%'
            },
        ]

        const data = this.props.timeTableData
        return (
            <div className='xt-timetable' onClick={() => this.setState({ showMore: undefined })}>
                <div>任务课表</div>
                <div className='xt-timetable-checked'>
                    <div>
                        <Button onClick={this.lastWeek.bind(this)}>上一周</Button>
                        <Button onClick={this.nextWeek.bind(this)}>下一周</Button>
                        <span>2017-03-01 ~ 2017-03-04</span>
                    </div>
                    <div className='xt-timetable-legend'>
                        <div>
                            <span></span>
                            <div>教研课</div>
                        </div>
                        <div>
                            <span></span>
                            <div>随堂听</div>
                        </div>
                        <div>
                            <span></span>
                            <div>日常授课</div>
                        </div>
                    </div>
                </div>
                <Table
                    columns={columns}
                    className='xt-timetable-table'
                    bordered={true}
                    dataSource={data}
                    pagination={false}
                >
                </Table>
            </div>
        )
    }
} 