/*
 * @Author: JC.Liu 
 * @Date: 2019-02-23 22:34:10 
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-03-20 17:13:42
 * 在线巡课 - 巡课统计
 */
import React, { Component } from 'react';
import {
    DatePicker,
    Button,
    Select,
    Checkbox,
    Pagination,
    Modal,
    message,
} from 'antd';
import moment from 'moment';
import EchartsFR from 'echarts-for-react';
// import Echarts from 'echarts';
import './../../../../css/teacher/lean.scss';
import { SVG, ModalTip } from './../../../../base';
import Request from './../../../../js/_x/util/request';
// import Transition from 'react-transition-group/Transition';
import { connect } from 'react-redux';
import {
    modalChangeSwitch_action,
    fetchEchartsData_action,
    listItem_delete_action,
    renderDataStateControl_action
} from './../../../../redux/lean-zxxk.reducer';
import { getEventList, handleEvents, getRenderData, handleCheck } from "./../../../../redux/zq-xktj.reducer";
import ReactLoading from 'react-loading';
import PIC_noData from './../../../../icon/nodata1.png';

const Option = Select.Option;
const sliceWords = Request.sliceWords;

const actions = {
    //lean:
    modalChangeSwitch_action,
    fetchEchartsData_action,
    listItem_delete_action,
    renderDataStateControl_action,
    //zq:
    getEventList,
    handleEvents,
    getRenderData,
    handleCheck
};

/**
 * antd-select 随机ID列表
 */
let idList = [];
while (idList.length < 10) {
    idList.push("lean-selectStyle-reset" + Math.random());
}

// console.log(React)

/**
 * @description 单个任务组件
 */
class TaskPie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            echartStyle: {
                height: "200px",
                width: "auto"
            },
            data: {
                did: this.props.rate - 0,
                residue: 100 - (this.props.rate - 0)
            }
        }
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            ...prevState,
            ...nextProps
        }
    }

    /**
     * 
     * @param { Object } data 
     * @description 此方法是设置单个任务组件的配置方法
     * @returns 返回echarts配置对象
     */
    getOption(data) {
        let option = {
            series: [{
                name: 'task',
                type: 'pie',
                radius: ['70%', '90%'],
                silent: "true",
                avoidLabelOverlap: false,
                animation: false,
                hoverAnimation: false,
                label: {
                    normal: {
                        show: false,
                    },
                    emphasis: {
                        show: false
                    }
                },
                data: [
                    {
                        value: data.did,
                        name: `${data.did}%`,
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                textStyle: {
                                    fontSize: "38",
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#41cc88",
                            }
                        }
                    },
                    {
                        value: data.residue,
                        name: `${data.residue}%`,
                        label: {
                            normal: {
                                show: false,
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#eaeaea",
                            }
                        }
                    },
                ]
            }
            ]
        };
        return option;
    }


    render() {

        return (
            <div className="lean-zxxk-taskContent">
                <p>{this.props.title}</p>
                <div className="lean-zxxk-echartsContent">
                    <EchartsFR option={this.getOption(this.state.data)} style={this.state.echartStyle} />
                </div>
                <div className="lean-zxxk-taskInfo">
                    <span>
                        任务数：{
                            this.props.task
                        }
                    </span>
                    <span>
                        已完成：{
                            this.props.finish
                        }
                    </span>
                </div>
            </div>
        )
    }

}

/**˝
 * @description 头部任务组件列表
 */
class TaskPieContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskList: []
        }
        this.props.fetchEchartsData_action();
    }

    /**
     * 
     * @param {Object} nextProps 
     * @param {Object} prevState 
     * @returns  new State
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log(nextProps.fetchEchartsData_reducer.echartsData)
        if (nextProps.fetchEchartsData_reducer && nextProps.fetchEchartsData_reducer.echartsData) {
            return {
                ...prevState,
                taskList: nextProps.fetchEchartsData_reducer.echartsData
            }
        } else {
            return {
                ...prevState
            }
        }


    }
    render() {
        return (
            <div className="lean-zxxk-allTask">
                {
                    this.state.taskList.map(item => {
                        return <TaskPie key={Math.random()} {...item} />
                    })
                }
            </div>
        )
    }
}

/**
 * @description 新增事件的弹窗组件 
 */
class EventModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalTitle: "新增违纪情况",
            visible: false,
            picPreview: "",
            isChoosedPic: false,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.modalChangeSwitch_reducer) {
            return {
                ...prevState,
                visible: nextProps.modalChangeSwitch_reducer.modalVisibleState
            }
        }
        else {
            return prevState
        }
    }


    componentDidMount() {
        this.props.getEventList();
    }

    /**
     * @description 弹窗取消按钮点击事件
     */
    modalCancleBtnClickHandle() {
        console.log('cancle btn click handle');
        this.props.modalChangeSwitch_action(false);
        let _this = this;
        setTimeout(() => {
            _this.setState({
                isChoosedPic: false
            })
        }, 200)
    }

    /**
     * @description click handle of "OK" button
     */
    modalOkBtnClickHandle() {
        console.log('ok btn click handle');
    }


    /**
     * @description choose event in class type
     * @param {*} event
     */
    eventTypeClick(event) {
        this.props.handleEvents(event);
    }

    /**
     * @description 上传时间出发
     */
    inputPictureHandle() {
        console.log('upload event');
        let filesDOM = document.querySelector('#lean-xkData-uploadfile');
        filesDOM.value = "";
        this.refs['lean-upload-btn'].click();
    }


    /**
     * @description 图片选择完后反显函数
     */
    choosedPic() {
        let _this = this;
        let filesDOM = document.querySelector('#lean-xkData-uploadfile');
        let files = filesDOM.files[0];
        let filetype = files.type.slice(0, files.type.indexOf('/')) || "";
        console.log(filetype);
        if (filetype.toLowerCase() != 'image') {
            message.warning('文件类型错误');
            return false;
        }

        let fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.onload = (result) => {
            _this.setState({
                isChoosedPic: true,
                picPreview: result.target.result
            })
        }
    }

    render() {
        const { eventList } = this.props.zq_xktj_reducer;

        return (
            <Modal
                title={this.state.modalTitle}
                // visible={true}
                visible={this.state.visible}
                // onOk={this.modalOkBtnClickHandle.bind(this)}
                onCancel={this.modalCancleBtnClickHandle.bind(this)}
                centered
                width={800}
                footer={null}
            >
                <div className="lean-xkData-addEventModalContent">
                    <input
                        id="lean-xkData-uploadfile"
                        type="file"
                        style={{ display: "none" }}
                        ref="lean-upload-btn"
                        onChange={this.choosedPic.bind(this)} />
                    <div className="lean-xkData-addEventModal-picContent">
                        {
                            /**图片状态控制 */
                            this.state.isChoosedPic
                                ?
                                <div>
                                    <img src={this.state.picPreview} style={{ width: "100%", height: "100%" }} onClick={this.inputPictureHandle.bind(this)} />
                                </div>
                                :
                                <div>
                                    <SVG type="tianjia" onClick={this.inputPictureHandle.bind(this)} style={{ height: "30px", width: "30px" }} />
                                </div>

                        }
                    </div>
                    <div className="lean-xkData-addEventModal-searchCondition">
                        <div id={idList[0]}>
                            <span>发生学院：</span>
                            <Select defaultValue={1} getPopupContainer={() => document.getElementById(idList[0])}>
                                <Option value={1}>1</Option>
                                <Option value={2}>2</Option>
                            </Select>
                            <Select defaultValue={3} getPopupContainer={() => document.getElementById(idList[0])}>
                                <Option value={3}>3</Option>
                                <Option value={4}>4</Option>
                            </Select>
                        </div>
                        <div id={idList[1]}>
                            <span>发生节次：</span>
                            <Select defaultValue={1} getPopupContainer={() => document.getElementById(idList[1])}>
                                <Option value={1}>1</Option>
                                <Option value={2}>2</Option>
                            </Select>
                            <Select defaultValue={3} getPopupContainer={() => document.getElementById(idList[1])}>
                                <Option value={3}>3</Option>
                                <Option value={4}>4</Option>
                            </Select>
                            <Select defaultValue={3} getPopupContainer={() => document.getElementById(idList[1])}>
                                <Option value={3}>3</Option>
                                <Option value={4}>4</Option>
                            </Select>
                        </div>
                        <div className='zq-xkData-eventBtn'>
                            <h3>发生事件：</h3>
                            {
                                eventList.map(item => (
                                    <Button
                                        key={item.eventTypeId}
                                        ghost={item.ghost}
                                        type='primary'
                                        onClick={this.eventTypeClick.bind(this, item)}
                                    >
                                        {item.eventName}
                                    </Button>

                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="lean-xkData-addEventModal-textareaContent">
                    <textarea maxLength="200" placeholder="备注"></textarea>
                </div>
                <div className='zq-xkData-modalFooter'>
                    <div onClick={this.modalOkBtnClickHandle.bind(this)}>保存</div>
                    <div onClick={this.modalCancleBtnClickHandle.bind(this)}>取消</div>
                </div>
            </Modal>
        )
    }
}



/**
 * @description 单个列表展示组件
 */
export class ListItem extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * @description 每一列的图片按钮点击触发事件，该事件绑定在svg元素上
     * @returns void
     */
    listHandlePic() {
        console.log('图片按钮点击事件');

    }

    /**
     * @description 每一列的编辑按钮点击触发事件，该事件绑定在svg元素上
     * @returns void
     */
    listHandleEdit() {
        console.log(this)
        console.log('编辑按钮点击事件');
    }

    /**
     * @description 每一列的删除按钮点击触发事件，该事件绑定s在svg元素上
     * @returns void
     */
    listHandleDel() {
        console.dir(this.props)
        console.log('单个删除按钮点击事件');

        let uid = this.props.ccuid + "";
        let _this = this;
        //success callback for delete 
        let scb = () => {
            let _Promise = new Promise((resolve, reject) => {
                resolve()
            });
            _Promise.then(() => {
                message.success('删除成功！');
            }).then(() => {
                _this.props.getRenderData();
            }).then(() => {
                _this.props.zq_xktj_reducer.renderData.length > 0
                    ?
                    _this.props.renderDataStateControl_action('rendering')
                    :
                    _this.props.renderDataStateControl_action('noData')
            })

        }
        //failed callback for delete
        let fcb = () => {
            let _Promise = new Promise((resolve, reject) => {
                resolve()
            });
            _Promise.then(() => {
                message.error('删除失败！');
            }).then(() => {
                _this.props.getRenderData();
            }).then(() => {
                _this.props.zq_xktj_reducer.renderData.length > 0
                    ?
                    _this.props.renderDataStateControl_action('rendering')
                    :
                    _this.props.renderDataStateControl_action('noData')
            })
        }

        /**
         * 1.loading
         * 2.ajax to delete
         * 3.rendering?
         */

        let pms = new Promise((resolve, reject) => {
            resolve()
        });
        pms.then(() => {
            _this.props.renderDataStateControl_action('loading');
        }).then(() => {
            _this.props.listItem_delete_action(uid, scb, fcb)
        })

    }

    /**
     * @description 复选框按钮
     * @param {*} e 
     */
    checkallChange(curData, e) {
        console.log(e);
        this.props.handleCheck(false, curData, e.target.checked);
    }

    render() {
        return (
            <li className={this.props.isOdd ? "lean-zxxk-xkDataOdd" : null}>
                <span>
                    <Checkbox
                        checked={this.props.checkedState}
                        onChange={this.checkallChange.bind(this, this.props.ccuid)}>
                        {this.props.collageName}
                    </Checkbox>
                </span>
                <span title={this.props.className}>
                    {sliceWords(this.props.className, 6)}
                </span>
                <span title={this.props.teacherName}>
                    {sliceWords(this.props.teacherName, 6)}
                </span>
                <span title={this.props.courseName}>
                    {sliceWords(this.props.courseName, 6)}
                </span>
                <span title={this.props.roleEventType}>
                    {sliceWords(this.props.roleEventType, 6)}
                </span>
                <span title={this.props.eventNameList}>
                    {sliceWords(this.props.eventNameList, 6)}
                </span>
                <span >
                    {this.props.deductScore}
                </span>
                <span>
                    {moment(this.props.eventHappenTime[0]).format('YYYY-MM-DD')}
                    <br />
                    {moment(this.props.eventHappenTime[0]).format('HH:mm')}
                    ~
                     {moment(this.props.eventHappenTime[1]).format('HH:mm')}
                </span>
                <span>{this.props.recorderName}</span>
                <span style={{ userSelect: "none" }}>
                    <SVG type="tupian" onClick={this.listHandlePic.bind(this)} />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                                <SVG type="bianji" onClick={this.listHandleEdit.bind(this)} />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                                <SVG type="shanchu1" onClick={this.listHandleDel.bind(this)} />
                </span>
            </li>

        )
    }
}


/**
 * @description 巡课数据组件
 */
export class XKData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowModal: true,
            startTime: moment().format('l'),
            renderData: [],
            /**
             * loading => fetching data,default,
             * rendering => has data,and render to view,
             * noData => has not data, show friendly picture;
             */
            renderDataState: "loading",
            startValue: null,
            endValue: null,
            endOpen: false,
            xkunit: {
                school: false,
                collage: false,
            },
            xkunitSelect: false,

        }
        //获取原始数据
        this.props.getRenderData();
        // this.props.renderDataStateControl_action('rendering');
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps.renderDataState_reducer.renderDataState);
        if (nextProps.modalChangeSwitch_reducer) {
            return {
                ...prevState,
                isShowModal: nextProps.modalChangeSwitch_reducer.modalVisibleState,
                renderDataState: nextProps.renderDataState_reducer.renderDataState,
                renderData: nextProps.zq_xktj_reducer.renderData
            }
        } else {
            return {
                ...prevState
            }
        }

    }

    componentDidMount() {
        this.props.renderDataStateControl_action('rendering');
    }

    /**
     * @description 新增事件按钮点击函数
     */
    addEventHandle(e) {
        console.log('新增事件按钮');
        //弹窗开关调用
        this.props.modalChangeSwitch_action(true);
    }

    /**
     * @description 导出查询结果按钮点击函数：
     * @param {*} e 
     */
    exportEventHandle(e) {
        console.log(this)
    }

    /**
     * @description 批量删除按钮的点击函数
     * @description 内部调用base里的弹窗封装；
     */
    batchDeleteEventHandle() {
        //tit = "提示", ctn = "", oT = "确认", cT = "取消", className = "", okFun = () => { }, canFun = () => { },
        let data = this.props.zq_xktj_reducer.renderData;
        let dataChecked = [];
        for (let item of data) {
            item.checkedState
                ?
                dataChecked.push(item)
                :
                null
        }

        console.log(dataChecked)
        if (dataChecked && dataChecked.length > 0) {
            ModalTip({
                tit: "批量删除",
                ctn: "即将删除多项数据，此操作不可逆，您确定吗？",
                oT: "确定",
                cT: "取消",
                okFun: () => {
                    console.log('开始批量删除');
                    this.batchDeleteEventHandle_affirm(dataChecked);
                },
                canFun: () => {
                    console.log('取消删除');
                }
            })
        } else {
            message.warning('没有选中任何数据！')
            return false;
        }

    }


    /**
     * @@description 批量删除确认
     */
    batchDeleteEventHandle_affirm(deleteList) {

        // console.log(deleteList)
        let uidArr = [];
        for (let item of deleteList) {
            uidArr.push(item.ccuid);
        }
        let _this = this;
        let scb = () => {
            let _Promise = new Promise((resolve, reject) => {
                resolve()
            });
            _Promise.then(() => {
                message.success('删除成功！');
            }).then(() => {
                _this.props.getRenderData();
            }).then(() => {
                _this.props.zq_xktj_reducer.renderData.length > 0
                    ?
                    _this.props.renderDataStateControl_action('rendering')
                    :
                    _this.props.renderDataStateControl_action('noData')
            })

        }
        //failed callback for delete
        let fcb = () => {
            let _Promise = new Promise((resolve, reject) => {
                resolve()
            });
            _Promise.then(() => {
                message.error('删除失败！');
            }).then(() => {
                _this.props.getRenderData();
            }).then(() => {
                _this.props.zq_xktj_reducer.renderData.length > 0
                    ?
                    _this.props.renderDataStateControl_action('rendering')
                    :
                    _this.props.renderDataStateControl_action('noData')
            })
        }

        let pms = new Promise((resolve, reject) => {
            resolve()
        });
        pms.then(() => {
            _this.props.renderDataStateControl_action('loading');
        }).then(() => {
            _this.props.listItem_delete_action(uidArr, scb, fcb)
        })

    }

    /**
     * @description DatePicker组件时间选取范围函数
     * @param {*} current 
     */
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return startValue > moment().endOf('day');
        };
        return (startValue.valueOf() > endValue.valueOf() || startValue > moment().endOf('day'));
    }


    /**
     * @description DatePicker组件结束时间禁用
     * @param {*} m 
     */
    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return endValue > moment().endOf('day');
        }
        return (endValue.valueOf() <= startValue.valueOf() || endValue > moment().endOf('day'));
    }

    /**
     * @description DatePicker组件选取结果函数
     * @param {String} field 时间字段
     * @param {moment} value 日期值
     */
    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    /**
     * @description DatePicker组件开始时间选取结果
     * @param {moment} value 日期值
     */
    onStartChange = (value) => {
        this.onChange('startValue', value);
    }

    /**
     * @description DatePicker组件结束时间选取结果函数
     * @param {moment} value 日期值
     */
    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    /**
     * @description DatePicker开始日期面板变化时的回调
     * @param {*} m 
     */
    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    /**
     * @description DatePicker结束日期面板变化时的回调
     * @param {*} m 
     */
    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    /**
     * @description查询按钮点击事件
     */
    searchBtnClickHandle() {
        console.log('查询按钮点击事件');
    }

    /**
     * @description 巡课单位学校选取结果函数
     * @param {*} e 
     */
    chooseSchoolHandle(e) {
        // console.log(e.target.checked);
        if (e.target.checked) {
            this.setState({
                xkunit: {
                    school: true,
                    collage: false
                },
                xkunitSelect: true
            })
        } else {
            this.setState({
                xkunit: {
                    school: false,
                    collage: false
                },
                xkunitSelect: false
            })
        }
    }

    /**
     * @description 巡课单位学院选取结果函数
     * @param {*} e 
     */
    chooseCollegeHandle(e) {
        // console.log(e.target.checked);
        if (e.target.checked) {
            this.setState({
                xkunit: {
                    school: false,
                    collage: true
                },
                xkunitSelect: true
            })
        } else {
            this.setState({
                xkunit: {
                    school: false,
                    collage: false
                },
                xkunitSelect: false
            })
        }
    }


    /**
     * @description 学院全选按钮
     * @param {*} e 
     */
    collageCheckallChange(e) {
        console.log(e.target.checked);
        this.props.handleCheck(true, {}, e.target.checked);
    }

    /**
     * @description 翻页组件change事件，参数是当前页码 
     * @param { number } page 
     */
    changePageHandle(page) {
        console.log(page);
    }


    /**
     * @description 控制当前组件渲染方式的函数
     * @param { String } state, 'loading/rendering/noData'
     */
    setRenderDataState(state = "") {
        // this.props.renderDataStateControl_action(state);
    }

    componentDidUpdate() {
        // console.log('state change：', this.state)
    }
    render() {

        let { renderData, allCkeckBtn } = this.props.zq_xktj_reducer;
        return (
            <div className="lean-zxxk-xkData">
                <EventModal  {...this.props} />
                <div className="lean-zxxk-xkDataTitle">
                    <div>
                        <span>
                            巡课数据
                        </span>
                    </div>
                    <div>
                        <Button onClick={this.addEventHandle.bind(this)} className="lean-zxxk-xkDataAddButton">新增事件</Button>
                        <Button onClick={this.exportEventHandle.bind(this)}>导出</Button>
                        <Button onClick={this.batchDeleteEventHandle.bind(this)}>批量删除</Button>
                    </div>
                </div>
                <div className="lean-zxxk-xkDataSelectList">
                    <div>
                        <span>时间范围：</span>
                        <div id={idList[9]}>
                            <DatePicker
                                disabledDate={this.disabledStartDate.bind(this)}
                                format="YYYY-MM-DD"
                                placeholder="开始时间"
                                onChange={this.onStartChange.bind(this)}
                                onOpenChange={this.handleStartOpenChange.bind(this)}
                                getCalendarContainer={() => document.getElementById(idList[9])}
                                style={{ marginRight: 20 }}
                            />
                            <DatePicker
                                disabledDate={this.disabledEndDate.bind(this)}
                                format="YYYY-MM-DD"
                                placeholder="结束时间"
                                onChange={this.onEndChange.bind(this)}
                                onOpenChange={this.handleEndOpenChange}
                                getCalendarContainer={() => document.getElementById(idList[9])}
                            />
                            <Button style={{ marginLeft: "20px" }} onClick={this.searchBtnClickHandle.bind(this)}>查询</Button>
                        </div>
                    </div>
                    <div>
                        <span>机构：</span>
                        <div id={idList[2]}>
                            <Select defaultValue="1" getPopupContainer={() => document.getElementById(idList[2])}>
                                <Option value="1">全部机构</Option>
                                <Option value="2">全部机构</Option>
                            </Select>
                            <Select defaultValue="3" getPopupContainer={() => document.getElementById(idList[2])}>
                                <Option value="3">全部机构</Option>
                                <Option value="4">全部机构</Option>
                            </Select>
                        </div>
                    </div>
                    <div id={idList[3]}>
                        <span>课程：</span>
                        <div>
                            <Select defaultValue="3" getPopupContainer={() => document.getElementById(idList[3])}>
                                <Option value="3">全部机构</Option>
                                <Option value="4">全部机构</Option>
                            </Select>
                            <Select defaultValue="3" getPopupContainer={() => document.getElementById(idList[3])}>
                                <Option value="3">全部机构</Option>
                                <Option value="4">全部机构</Option>
                            </Select>
                            <Select defaultValue="3" getPopupContainer={() => document.getElementById(idList[3])}>
                                <Option value="3">全部机构</Option>
                                <Option value="4">全部机构</Option>
                            </Select>
                            <Select defaultValue="3" getPopupContainer={() => document.getElementById(idList[3])}>
                                <Option value="3">全部机构</Option>
                                <Option value="4">全部机构</Option>
                            </Select>
                        </div>
                    </div>
                    <div id={idList[4]}>
                        <span>事件：</span>
                        <div>
                            <Select defaultValue="1" getPopupContainer={() => document.getElementById(idList[4])}>
                                <Option value="1">全部机构</Option>
                                <Option value="2">全部机构</Option>
                            </Select>
                            <Select defaultValue="3" getPopupContainer={() => document.getElementById(idList[4])}>
                                <Option value="3">全部机构</Option>
                                <Option value="4">全部机构</Option>
                            </Select>
                        </div>
                    </div>
                    <div >
                        <span>巡课单位：</span>
                        <div id={idList[5]}>
                            <Checkbox onChange={this.chooseSchoolHandle.bind(this)} checked={this.state.xkunit.school}>学校</Checkbox>
                            <Checkbox onChange={this.chooseCollegeHandle.bind(this)} checked={this.state.xkunit.collage}>学院</Checkbox>
                            {
                                this.state.xkunitSelect
                                    ?
                                    <Select defaultValue={1} getPopupContainer={() => document.getElementById(idList[5])} >
                                        <Option value={1}>1</Option>
                                        <Option value={2}>2</Option>
                                        <Option value={3}>3</Option>
                                        <Option value={4}>4</Option>
                                    </Select>
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
                {/* <hr /> */}
                <div className="lean-zxxk-xkDataList">
                    <div className="lean-zxxk-xkDataListHeader">
                        <span>
                            <Checkbox
                                checked={allCkeckBtn}
                                onChange={this.collageCheckallChange.bind(this)}
                            >
                                学院
                            </Checkbox>
                        </span>
                        <span>
                            班级
                        </span>
                        <span>
                            授课教师
                        </span>
                        <span>
                            科目
                        </span>
                        <span>
                            违纪对象
                        </span>
                        <span>
                            违纪事件
                        </span>
                        <span>
                            扣分
                        </span>
                        <span>
                            发生时间
                        </span>
                        <span>
                            记录人
                        </span>
                        <span>
                            操作
                        </span>
                    </div>
                    <div className="lean-zxxk-xkDataListItem">
                        {
                            /**has data*/
                            this.state.renderDataState === 'rendering' ?
                                <ul>
                                    {
                                        renderData.map((item, index) => {
                                            return <ListItem
                                                {...item}
                                                {...this.props}
                                                key={index}
                                                isOdd={index % 2 == 0 ? false : true} />
                                        })
                                    }
                                </ul>
                                :
                                /**fetch end and no data */
                                this.state.renderDataState === "noData"
                                    ?
                                    <div>
                                        <img src={PIC_noData} />
                                        <span>暂无数据</span>
                                    </div>
                                    :
                                    /**fetching and loading */
                                    this.state.renderDataState === "loading"
                                        ?
                                        <div>
                                            <ReactLoading type={"spin"} color="#41cc88" height={80} width={80} />
                                            <span>
                                                正在加载...
                                        </span>
                                        </div>
                                        :
                                        <div>
                                            异常情况!
                                            <br />
                                            一般不会进入此判断!
                                            <br />
                                            通过“this.state.renderDataState”字段，来判断渲染那一层组件，
                                            <br />
                                        /**
                                        * loading => fetching data,default,
                                        * rendering => has data,and render to view,
                                        * noData => has not data, show friendly picture;
                                        */
                                        </div>
                        }
                    </div>
                    <div className="lean-zxxk-xkData-PaginationContent">
                        <div>
                            每页20条，共{4}条数据
                        </div>
                        <Pagination
                            className="ll-PageStyle"
                            onChange={this.changePageHandle.bind(this)}
                            defaultCurrent={1}
                            total={2000}
                            defaultPageSize={20}
                            hideOnSinglePage={true} />
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * @description 巡课统计页面
 */

@connect(state => state, { ...actions })
export class XkStatic extends Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <div className="lean-zxtj-content">
                <TaskPieContent {...this.props} />
                {/* <hr /> */}
                <XKData {...this.props} />
            </div>
        )
    }
}
