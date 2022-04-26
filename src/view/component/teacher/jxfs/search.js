/*
 * @Author: xiangting 
 * @Date: 2019-03-01 09:49:22 
 * @Last Modified by: xiangting
 * @Last Modified time: 2019-03-19 16:08:12
 * 教学反思——查询条件
 */

import React, { Component } from 'react';
import { DatePicker, Button, message } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { teachingOrder, teachingQuality, jxfsLoading } from '../../../../redux/jxfs.reducer'

@connect(state => state.getJxfsData, { teachingQuality, teachingOrder, jxfsLoading })
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkSearchType: 0,
            startDate: undefined,
            endDate: undefined,
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        let params = {
            "type": this.state.checkSearchType,
            "startDate": this.state.startDate,
            "endDate": this.state.endDate
        }
        this.props.teachingOrder(params)
        this.props.teachingQuality(params)
    }

    /**
     * 选择查询类型
     * @param {number} index    被点击
     */
    checkSearchType(index) {
        this.setState({ checkSearchType: index })
    }

    /**
     * @description    时间转无时分秒的时间戳
     * @param {string||date} date     要转时间戳的时间
     * @returns 时间戳
     */
    getTimestamp = (date) => {
        return new Date(date).setHours(0, 0, 0, 0)
    }

    /**
     * @description 时间选择器禁选项
     * @param {date} current    选择时间
     * @returns         禁选时间
     */
    disabledDate(current) {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
    }

    /**
     * @description     开始时间
     * @param {object} date     选中时间相关信息
     */
    startChange(date) {
        let selectDate = this.getTimestamp(date);
        if (this.state.endDate && selectDate > this.getTimestamp(this.state.endDate)) {
            message.warning('开始时间不能大于结束时间');
        } else {
            this.setState({ startDate: date })
        }
    }

    /**
     * @description     结束时间
     * @param {object} date     选中时间相关信息
     */
    endChange(date) {
        let selectDate = this.getTimestamp(date);
        if (this.state.startDate && selectDate < this.getTimestamp(this.state.startDate)) {
            message.warning('开始时间不能大于结束时间');
        } else {
            this.setState({ endDate: date })
        }
    }

    /**
     * @description 查询按钮
     */
    search() {
        this.props.teachingOrder();
        this.props.teachingQuality()
    }
    render() {
        const types = ['本周', '本月', '本学期']
        return (
            <div className='xt-search clearfix'>
                <div>
                    {
                        types.map((item, index) => (
                            <div
                                key={'key' + index}
                                onClick={this.checkSearchType.bind(this, index)}
                                className={index === this.state.checkSearchType ? 'xt-search-type' : ''}
                            >
                                {item}
                            </div>
                        ))
                    }
                </div>
                <div>
                    <div>时间范围：</div>
                    <DatePicker
                        allowClear={false}
                        placeholder="开始时间"
                        value={this.state.startDate}
                        showToday={false}
                        disabledDate={this.disabledDate.bind(this)}
                        onChange={this.startChange.bind(this)} />
                    <span>—</span>
                    <DatePicker
                        allowClear={false}
                        placeholder="结束时间"
                        value={this.state.endDate}
                        showToday={false}
                        disabledDate={this.disabledDate.bind(this)}
                        onChange={this.endChange.bind(this)} />
                    <Button onClick={this.search.bind(this)}>查询</Button>
                </div>
            </div>
        )
    }
}