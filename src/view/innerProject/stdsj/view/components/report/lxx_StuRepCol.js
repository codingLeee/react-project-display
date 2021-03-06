/*
 * @Author: lxx 
 * @Date: 2018-08-29 19:02:20 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-12 10:30:49
 * 学生考勤-学院数据组件
 */

import React, { Component } from 'react';
import { Select, Table, Pagination, DatePicker, Input, message } from 'antd';
import { connect } from 'react-redux';
import { _x } from './../../../js/index';
import { SVG } from './../../common';
import G from './../../../js/g';
import './../../../css/stuReport.css';
import { updateColParams, getColListData, changeLoadingStatus } from './../../../redux/lxx.student.reducer';
import moment from 'moment';

const Request = _x.util.request.request;
const Option = Select.Option;
const dateFormat = 'YYYY/MM/DD';
const Format = _x.util.date.format;
const { Column } = Table;

const selStyle = {
    width: 200,
    marginRight: 10
}
const spanStyle = {
    marginLeft: 5,
    color: '#3498DB',
    fontWeight: 'bold',
    fontSize: 16,
}

@connect(
    state => state,
    { updateColParams, getColListData, changeLoadingStatus }
)
class StuRepCol extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colList: [],
            selIndex: "0",
            startTime: Format(new Date(), 'yyyy/MM/dd'),
            endTime: Format(new Date(), 'yyyy/MM/dd'),
            courPage: 1,
            inputValue: '',
        }
    }

    componentDidMount() {
        let colList = G.trgList ? G.trgList : [];
        this.setState({
            colList
        });
        let params = this.props.studentReducer.colParam;
        params.startTime = new Date(this.state.startTime).setHours(0, 0, 0, 0);
        params.endTime = new Date(this.state.endTime).setHours(23, 59, 59, 59);
        params.trgName = colList.length? colList[0].trgName : "";
        // 更新入参
        this.props.updateColParams(params);

        /**
         * message最大限制
         */
        message.config({
            duration: 3,
            maxCount: 1
        })
    }

    /**
     * 筛选机构
     */
    onChange = (ind) => {
        let colList = this.state.colList;
        this.setState({
            selIndex: ind
        });
        let params = this.props.studentReducer.colParam;
        params.trgName = colList[ind].trgName;
        params.trgId = colList[ind].trgId;
        // 更新入参
        this.props.updateColParams(params);
    }

    /**
     * 开始时间选择
     */
    onPanelChange = (dateString) => {
        let params = this.props.studentReducer.colParam;
        let date = new Date(dateString).setHours(0, 0, 0, 0);
        if (date < params.endTime) {
            this.setState({
                startTime: Format(new Date(date), 'yyyy/MM/dd')
            });
            params.startTime = date;
            params.pageIndex = 1;
            // 更新入参
            this.props.updateColParams(params);
        } else {
            message.warning('开始时间不能大于结束时间');
            this.setState({
                startTime: Format(new Date(params.startTime), 'yyyy/MM/dd')
            });
        }
    }

    /**
     * 结束时间选择
     */
    onPanelChange1 = (dateString) => {
        let params = this.props.studentReducer.colParam;
        let date = new Date(dateString).setHours(23, 59, 59, 59);
        if (date > params.startTime) {
            this.setState({
                endTime: Format(new Date(date), 'yyyy/MM/dd')
            });
            params.endTime = date;
            params.pageIndex = 1;
            // 更新入参
            this.props.updateColParams(params);
        } else {
            message.warning('结束时间不能小于开始时间');
            this.setState({
                endTime: Format(new Date(params.endTime), 'yyyy/MM/dd')
            });
        }
    }

    /**
     * 切换页码
     * @param { * } p 
     */
    handlePageChange = (p) => {
        console.log(p);
        let params = this.props.studentReducer.colParam;
        this.setState({
            courPage: p
        })
        params.pageIndex = p;
        // 更新入参
        this.props.updateColParams(params);
        this.node.scrollIntoView();
    }

    /**
     * 输入框值
     */
    changeInput = (e) => {
        let val = e.target.value,
            isNum = /^[0-9]+$/.test(val);
        if (isNum) {
            this.setState({
                inputValue: Number(val)
            });
        } else if (!val) {
            return;
        } else {
            message.warning('请输入纯数字！');
        }

    }

    /**
     * 输入框回车回调
     */
    handleChangePage = () => {
        let p = this.state.inputValue,
            isMax = p > Math.ceil(this.props.studentReducer.total / 20);
        let params = this.props.studentReducer.colParam;
        if (p < 1) {
            message.warning('输入的页码有误!');
            this.setState({
                inputValue: ''
            })
            return;
        }
        if (isMax) {
            message.warning('输入的页码不能大于当前总页数!');
            this.setState({
                inputValue: ''
            })
        } else {
            this.setState({
                courPage: p,
                inputValue: ''
            })
            params.pageIndex = p;
            // 更新入参
            this.props.updateColParams(params);
            this.node.scrollIntoView();
        }

    }

    /**
     * table改变
     */
    handleTableChange = (pagination, filters, sorter) => {
        let params = this.props.studentReducer.colParam;
        let columnKey = sorter.columnKey,
            order = sorter.order, orKey;
        order === 'ascend' ? orKey = 1 : orKey = -1;
        if (columnKey === 'courseNumber') {
            params.courseOrder = orKey;
            params.numberOrder = 0;
        } else if (columnKey === 'attendence') {
            params.numberOrder = orKey;
            params.courseOrder = 0;
        }
        params.pageIndex = 1;
        this.setState({
            courPage: 1
        })
        // 更新入参
        this.props.updateColParams(params);
    }

    /**
     * 报表导出
     */
    downloadFile = () => {
        Request('api/web/stu_report/export_academy_report', this.props.studentReducer.colParam, (res) => {
            if (res.result && res.data) {
                let downUrl = G.dataServices + res.data;
                var iframe = document.createElement("iframe");
                iframe.setAttribute("style", "display: none");
                iframe.setAttribute("src", downUrl);
                var body = document.getElementsByTagName("body")[0];
                body.appendChild(iframe);
                message.warning(res.message);
            } else {
                message.warning(res.message);
            }
        })
    }

    render() {
        const columns = [{
            title: "学院",
            // G.isVer === '1' ? '学院' : '班级',
            dataIndex: 'gradeName',
            width: 200,
        }, {
            title: '课程数',
            dataIndex: 'courseNumber',
            width: 140,
            sorter: true,
        }, {
            title: '出勤率',
            dataIndex: 'attendence',
            width: 140,
            sorter: true,
            render: (text) => {
                return <div>{text}%</div>
            }
        }];

        let state = this.state,
            colList = this.props.studentReducer.colList,
            total = this.props.studentReducer.total;
        console.log("colList:", this.props.studentReducer);


        return (
            <div className="lxx-g-report" ref={(ref) => this.node = ref}>
                <div className="lxx-g-flex lxx-g-re-header">
                    <div className="lxx-hd-g-lf lxx-m-flex">
                        <div id="lxx-select">
                            {/* {G.isVer === '1' ? '机构' : '班级'} */}
                            <span>机构：</span>
                            <Select
                                value={state.selIndex}
                                showSearch
                                style={selStyle}
                                onChange={this.onChange}
                                getPopupContainer={() => document.getElementById('lxx-select')}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                {
                                    state.colList.map((item, index) => {
                                        return <Option key={index} value={index.toString()} title={item.trgName}>{item.trgName}</Option>
                                    })
                                }
                            </Select>
                            <span>时间：</span>
                            <DatePicker
                                allowClear={false}
                                showToday={false}
                                placeholder="开始时间"
                                value={state.startTime === '' ? null : moment(state.startTime, dateFormat)}
                                format={dateFormat}
                                className="kyl-crc-selectSj"
                                style={{ width: "140px" }}
                                onChange={this.onPanelChange} />
                            <span>&nbsp;--&nbsp;</span>
                            <DatePicker
                                allowClear={false}
                                showToday={false}
                                placeholder="结束时间"
                                value={state.endTime === '' ? null : moment(state.endTime, dateFormat)}
                                format={dateFormat}
                                className="kyl-crc-selectSj"
                                style={{ width: "140px" }}
                                onChange={this.onPanelChange1} />
                        </div>
                    </div>
                    <div onClick={this.downloadFile} style={{ cursor: 'pointer' }}>
                        <SVG type="dcbb" color="#3498DB" width={20} height={19} />
                        <span style={spanStyle}>导出报表</span>
                    </div>
                </div>
                <div className="lxx-hd-g-rg">
                    <Table
                        className="zn-report-table"
                        columns={columns}
                        key="table"
                        pagination={false}
                        loading={this.props.studentReducer.loading}
                        rowKey="id"
                        dataSource={colList}
                        onChange={this.handleTableChange}>
                        {/* {
                            G.isVer === '1'
                                ? <Column title="学制" dataIndex="phase" key="phase" width={140}></Column>
                                : ''
                        } */}
                        {/* <Column title={G.isVer === '1' ? '学院' : '班级'} dataIndex="gradeName" key="gradeName" width={200}></Column>
                        <Column title="课程数" dataIndex="courseNumber" key="courseNumber" sorter={true} width={140}></Column>
                        <Column title="出勤率" dataIndex="attendence" key="attendence" sorter={true} width={140}></Column> */}
                    </Table>
                    {
                        !total
                            ? ''
                            : <div className="kyl-kt-clear">
                                <span className="kyl-kt-pageInfo">每页 20 条数据，共 {total} 条</span>
                                <Input
                                    className="kyl-kt-jumpZdPage"
                                    disabled={!total ? true : false}
                                    value={state.inputValue}
                                    disabled={!total || total < 20 ? true : false}
                                    onChange={this.changeInput}
                                    onPressEnter={this.handleChangePage} />
                                <Pagination
                                    className="kyl-kt-fy"
                                    pageSize={20}
                                    defaultCurrent={1}
                                    current={state.courPage}
                                    total={total}
                                    onChange={this.handlePageChange} />
                            </div>
                    }
                </div>
            </div>
        )
    }
}
export default StuRepCol;
