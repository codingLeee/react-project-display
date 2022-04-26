import React from 'react';
import '../../../css/znReport.css'
import { Button, DatePicker, Input, Modal, Form, Checkbox, Row, Col, message, Spin } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import _x from '../../../js/_x/index';
import { connect } from 'react-redux';
import {
    zn_change_prop, showAddModal1, addReportMsg,
    znCheck_report, addChangeValue2, changeInside,
    zn_change_input, changeLoadCustomer, zn_change_jsProp,
    initCustomeTable, zn_add_ajax,
} from '../../../redux/zn.systemreducer'

const Format = _x.util.date.format;
const Search = Input.Search;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

@connect(
    state => state.znSystemReducer,
    {
        addChangeValue2, //新增报告inout value
        changeInside, //新增包公案修改时间
        zn_change_prop, //改变表格所需的所有属性
        showAddModal1,// 新增报告modalshow
        addReportMsg, //新增click
        znCheck_report, //选中的check新增报告
        zn_change_input, //修改input
        changeLoadCustomer, //table loading
        zn_change_jsProp, //修改初始化参数
        initCustomeTable, //table ajax
        zn_add_ajax,// add ajax
    }
)
export default class ZnReportHead extends React.Component {

    constructor() {
        super();
        this.state = {
            startTime: moment(new Date(), 'YYYY/MM/DD'),
            endTime: moment(new Date(), 'YYYY/MM/DD'),
            startTimeAdd: Format(new Date(), 'yyyy/MM/dd'),
            endTimeAdd: Format(new Date(), 'yyyy/MM/dd'),
            btnStatus: true,
            isLight: undefined,
            loading: false,
        }
    }

    componentDidMount() {
        //初始化日期插件
        let params = this.props.colParam;
        //是否展示
        // JSON.parse(sessionStorage.isShowdetail)
        params.startDate = new Date().setHours(0, 0, 0, 0);
        params.endDate = new Date().setHours(23, 59, 59, 59);
        let selDate1 = new Date().setHours(0, 0, 0, 0);
        let selDate2 = new Date().setHours(23, 59, 59, 59);
        this.props.changeInside(selDate1, 0)
        this.props.changeInside(selDate2, 1)
        //初始化
        this.props.zn_change_prop(params);

    }


    componentWillReceiveProps(nextProps) {
        console.log(nextProps.btnStatus)
        if (nextProps.btnStatus) {
            this.setState({ btnStatus: false })
        } else {
            this.setState({ btnStatus: true, loading: false })
        }
    }

    //外部开始时间
    onChangeStart = (date) => {
        let selDate1 = new Date(date).setHours(0, 0, 0, 0), prop = this.props;
        let source = this.props.colParam;

        //开始时间不能大于结束时间
        if (selDate1 < source.endDate) {
            source.startDate = selDate1;
            source.pageIndex = 1;
            this.setState({
                startTime: moment(new Date(date), 'YYYY/MM/DD')
            })
            this.props.initCustomeTable(source, true);
        } else {
            message.warning("开始时间不能大于结束时间");
            this.setState({
                startTime: moment(new Date(source.startDate), 'YYYY/MM/DD')
            })
            return;
        }


    }


    //外部结束时间
    onChangeEnd = (date) => {
        let selDate2 = new Date(date).setHours(23, 59, 59, 59), prop = this.props;
        let source = prop.colParam;
        //开始时间大于结束时间
        if (source.startDate < selDate2) {
            this.setState({
                endTime: moment(new Date(date), 'YYYY/MM/DD')
            })
            source.endDate = selDate2;
            source.pageIndex = 1;
            this.props.initCustomeTable(source, true);
        } else {
            message.warning("结束时间不能小于开始时间");
            this.setState({
                endTime: moment(new Date(source.endDate), 'YYYY/MM/DD')
            })
        }


    }

    //新增报告多选
    onChangeCheck = (v) => {
        console.log(v.length === 0);
        this.props.znCheck_report(v);
        this.setState({
            isLight: v.length !== 0 ? 'light' : 'noLight'
        }, () => {
            this.props.addReportMsg(this.props.addInputValue, this.props.addStartTime, this.props.addEndTime, this.state.isLight, '1');
        })
    }

    //新增开始时间
    onChangeStartAdd = (date) => {
        let selDate1 = new Date(date).setHours(0, 0, 0, 0);
        let addEndTime = this.props.addEndTime;
        if (selDate1 < addEndTime) {
            this.props.changeInside(selDate1, 0);
            this.setState({
                startTimeAdd: Format(new Date(selDate1), 'yyyy/MM/dd')
            }, () => {
                this.props.addReportMsg(this.props.addInputValue, selDate1, this.props.addEndTime, this.state.isLight, '1');
            })
        } else {
            message.warning("开始时间不能大于结束时间");
            this.setState({
                startTimeAdd: Format(new Date(this.props.addStartTime), 'yyyy/MM/dd')
            })
        }

    }


    //新增结束时间
    onChangeEndAdd = (date) => {
        let selDate2 = new Date(date).setHours(23, 59, 59, 59);
        let addStartTime = this.props.addStartTime;
        if (selDate2 > addStartTime) {
            this.props.changeInside(selDate2, 1);
            this.setState({
                endTimeAdd: Format(new Date(selDate2), 'yyyy/MM/dd')
            }, () => {
                this.props.addReportMsg(this.props.addInputValue, this.props.addStartTime, selDate2, this.state.isLight, '1');
            })
        } else {
            message.warning("结束时间不能小于开始时间");
            this.setState({
                endTimeAdd: Format(new Date(this.props.addStartTime), 'yyyy/MM/dd')
            })

        }
    }

    //input 内容改变
    changeInputOutside = (e) => {
        let params = this.props.colParam
        params = { ...params, seacherContent: e.target.value };
        this.props.zn_change_input(params);
    }

    //报告名字搜索
    report_search = (e) => {
        let params = this.props.colParam
        this.props.initCustomeTable(params, true);
    }

    // 报告名称
    onChangeInput = (e) => {
        let name = e.target.value;
        name = name.replace(/\s+/g, ' ');
        this.props.addChangeValue2(name);
        this.props.addReportMsg(name, this.props.addStartTime, this.props.addEndTime, name && this.state.isLight, '1');
    }

    //新增报告
    add(json) {
        console.log(json);
        let prop = this.props;
        prop.addReportMsg(prop.addInputValue, prop.addStartTime, prop.addEndTime, json, '0');

        this.setState({
            json,
            startTime: moment(new Date(), 'YYYY/MM/DD'),
            endTime: moment(new Date(), 'YYYY/MM/DD'),
            startTimeAdd: Format(new Date(), 'yyyy/MM/dd'),
            endTimeAdd: Format(new Date(), 'yyyy/MM/dd'),
            loading: true
        })
    }

    // 取消报告
    cancelModal = () => {
        this.setState({
            startTimeAdd: Format(new Date(), 'yyyy/MM/dd'),
            endTimeAdd: Format(new Date(), 'yyyy/MM/dd'),
        })
        this.props.showAddModal1(false);
    }

    //
    disabledDate = (current) => {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
    }



    render() {
        const formItemLayout = {
            labelCol: {
                md: { span: 4 },
            },
            wrapperCol: {
                md: { span: 20 },
            },
        };
        const dateFormat = 'YYYY-MM-DD';
        let prop = this.props, state = this.state, params = this.props.colParam;
        //取出选中的数组拼接进入对象
        let select = prop.addcheck, json = {};
        select.map((val) => {
            json[val] = 1;
        })
        return <div className="zn-height-head zn-flex zn-spaceBetween">
            <div>
                <span className="zn-fontsize">生成时间 : </span>
                <DatePicker
                    allowClear={false}
                    showToday={false}
                    placeholder="开始时间"
                    value={state.startTime}
                    onChange={this.onChangeStart}
                    disabledDate={this.disabledDate}
                    format={dateFormat}
                />
                <span className="zn-pdlr10">--</span>
                <DatePicker
                    allowClear={false}
                    showToday={false}
                    onChange={this.onChangeEnd}
                    value={state.endTime}
                    placeholder="结束时间"
                    disabledDate={this.disabledDate}
                    format={dateFormat}
                />
                <Search
                    maxLength={15}
                    placeholder="请输入报告名"
                    value={params.seacherContent}
                    onChange={this.changeInputOutside}
                    onSearch={this.report_search}
                    style={{ width: 220 }}
                />
            </div>
            <div className="zn-head-btn">
                <Button onClick={() => { prop.showAddModal1(true) }}>新增报告</Button>
            </div>
            <Modal
                maskClosable={false}
                width={590}
                className="zn-modal-add"
                title="新增报告"
                centered
                visible={prop.addShow}
                footer={null}
                onCancel={() => { prop.showAddModal1(false) }}
            >
                <Spin spinning={this.state.loading}>
                    <Form>
                        <FormItem {...formItemLayout} label="请输入报告名">
                            <div className="zn-from-pdl10">
                                <Input maxLength={15} value={prop.addInputValue}
                                    onChange={(e) => { this.onChangeInput(e) }}
                                    className="zn-input-wid196"
                                />
                            </div>
                        </FormItem>
                        <FormItem {...formItemLayout} label="请选择时间段">
                            <div className="zn-from-pdl10">
                                <DatePicker
                                    allowClear={false}
                                    showToday={false}
                                    value={moment(state.startTimeAdd, dateFormat)}
                                    onChange={this.onChangeStartAdd}
                                    disabledDate={this.disabledDate}
                                    placeholder="开始时间" />
                                <span className="zn-pdlr10">--</span>
                                <DatePicker
                                    allowClear={false}
                                    showToday={false}
                                    value={moment(state.endTimeAdd, dateFormat)}
                                    onChange={this.onChangeEndAdd}
                                    disabledDate={this.disabledDate}
                                    placeholder="结束时间" />
                            </div>
                        </FormItem>
                        <FormItem {...formItemLayout} label="报告包含内容">
                            <div className="zn-from-pdl10">
                                {/* <CheckboxGroup value={prop.checkedList} options={prop.options} onChange={this.onChangeCheck} /> */}

                                <Checkbox.Group onChange={this.onChangeCheck} value={prop.addcheck}>
                                    <Row>
                                        {
                                            prop.options.map((val) => {
                                                return <Checkbox key={val.value} value={val.value}>{val.label}</Checkbox>
                                            })
                                        }

                                    </Row>
                                </Checkbox.Group>
                            </div>
                        </FormItem>
                        <FormItem>
                            <Row>
                                <Col md={{ span: 4 }}>
                                </Col>
                                <Col md={{ span: 20 }}>
                                    <div className="zn-addmod-btn">
                                        <Button
                                            onClick={this.add.bind(this, json)}
                                            disabled={this.state.btnStatus}
                                            title={this.state.btnStatus ? '选项为空，不能新增' : ''}>
                                            新增
                                    </Button>
                                        <Button onClick={this.cancelModal}>
                                            取消
                                    </Button>
                                    </div>
                                </Col>
                            </Row>
                        </FormItem>
                    </Form>
                </Spin>
            </Modal>
        </div>
    }
}