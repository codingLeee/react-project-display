/*
 * @Author: xq 
 * @Date: 2019-02-28 17:37:51 
 * @Last Modified by: xiangting
 * @Last Modified time: 2019-03-20 13:26:27
 * 定时巡课-图片列表
 */
import React, { Component } from "react";
import { Checkbox, Select, Button, Pagination, Radio, Modal, message, Input } from 'antd';
import { connect } from 'react-redux';
import { G } from '../../../../../js/g';
import { ac_getDxxkList } from '../../../../../redux/xq-dsxk.reducer';
// import { ModalTip } from '../../../../../base.jsx';

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

@connect(state => state, { ac_getDxxkList })
class TimingPatrolImgs extends Component {
    constructor() {
        super();
        this.state = {
            showArea: false,     // 模态框文本输入框显示控制
            modalAreaText: '',   // 模态框文本输入框内容
            indeterminate: true,
            list: [],             // 班级列表(name+id)
            checkRoomIdsAll: [],   // 班级全部选中id集合
            checkRoomIds: [],   // 多选班级id
            allChecked: false,  // 班级选择
            defaultRoomCheck: [],
            roomCheckedList: [],
            modalShow: true,
            hasRoomCheck: false,
            value: 1,   // 模态框单选  1 无违纪；2 后面4个复选框
            imgType: 'big',    // big  大图;  small 小图
            visible: false,   // 模态框显示
            checkedList: [],
            plainOptions: [
                { label: '教师迟到', value: '1' },
                { label: '上课睡觉', value: '2' },
                { label: '无人授课', value: '3' },
                { label: '私自调课', value: '4' }
            ],
            test: ['Apple', 'Pear', 'Orange']
        }
        this.dataTypeChange = this.dataTypeChange.bind(this);
        this.imgTypeChange = this.imgTypeChange.bind(this);
        this.checkAll = this.checkAll.bind(this);
        this.modalOnChange = this.modalOnChange.bind(this);
        this.onModalRadioChange = this.onModalRadioChange.bind(this);
        this.checkRoom = this.checkRoom.bind(this);
        this.inArray = this.inArray.bind(this);
        this.modalArea = this.modalArea.bind(this);
    }

    /**
     * 模态框-输入框文本获取
     */
    modalArea(e) {
        let val = e.target.value;
        if (e.target.value.length > 200) {
            val.substr(0, 199)
            console.log(val.substr(0, 199))
            this.setState({ modalAreaText: val.substr(0, 199) })
        } else {
            this.setState({ modalAreaText: val })
        }


    }

    /**
     * 班级id筛选
     * @param {string} str    班级id
     * @param {array}  arrays 班级id集合
     */
    inArray(str, arrays) {
        for (let s = 0; s < arrays.length; s++) {
            let thisEntry = arrays[s].toString();;
            if (thisEntry === str) {
                arrays.splice(s, 1)
                this.setState({
                    checkRoomIds: arrays
                })
                return arrays;
            }
        }
        arrays.push(str)
        this.setState({
            checkRoomIds: arrays
        })
        return arrays;
    }

    /**
     * 班级复选函数
     * @param {object} it        点击的班级所有信息
     * @param {array}  roomList  班级列表（id和name）
     */
    checkRoom(it, roomList) {
        // 初始化触发不带参数
        if (it) {
            let checkRoomIds = this.state.checkRoomIds;  // 选中班级id集合
            let id = it.classroomID.classroomId;
            let list = this.state.list;
            let newCheck = it.checked ? false : true;
            for (let i = 0; i < list.length; i++) {
                if (list[i].classroomID.classroomId === id) {
                    list[i].checked = newCheck;
                }
            }
            // 得到最新的id集合
            checkRoomIds = this.inArray(id, checkRoomIds);
            if (checkRoomIds.length === list.length) {
                // 全选
                this.setState({
                    allChecked: true
                })
            } else if (checkRoomIds.length < list.length) {
                this.setState({
                    allChecked: false
                })
            }
            this.setState({
                list,
                checkRoomIds
            })
        } else {
            // 初始化触发
            let checkRoomIdsAll = [];
            for (let k = 0; k < G.dsxkList.length; k++) {
                checkRoomIdsAll.push(G.dsxkList[k].classroomID.classroomId)
            }
            this.setState({
                list: G.dsxkList,
                checkRoomIdsAll
            })
        }
    }

    /**
     * 模态框显示
     */
    showModal = () => {
        let length = this.state.checkRoomIds.length;
        if (length === 0) {
            message.warning('至少选择一个进行标记')
        } else {
            this.setState({
                visible: true,
            });
        }
    }

    /**
     * 模态框-确定
     */
    handleOk = () => {
        this.setState({
            visible: false,
            showArea: false,
            modalAreaText: '',
            checkedList: [],
            value: 1,
        });
        // 拿到选中违纪项的id集合
        // 拿到选中班级的id集合
        // 拿到模态框文本输入的内容
        // 以上内容作为入参，去请求接口
    }

    /**
     * 模态框-取消
     */
    handleCancel = () => {
        this.setState({
            visible: false,
            showArea: false,
            modalAreaText: '',
            value: 1,
            checkedList: []
        });
    }

    /**
     * 数据类型切换
     * @param {string} value 数据类型   '0'全部，'1'未标记，'2'已标记 
     */
    dataTypeChange(value) {
        let newParam = {};
        newParam.type = value;
        this.props.ac_getDxxkList(newParam);
    }

    /**
     * 模态框 单选
     */
    onModalRadioChange(e) {
        this.setState({
            value: e.target.value
        });
        if (e.target.value === 1) {
            // 无违纪 后面的都不选中
            this.setState({
                checkedList: [],
                showArea: false
            })
        }
    }

    /**
     * 模态框违纪事件复选
     * @param {array} checkedValues  字符串数组，选中违纪项的id集合
     */
    modalOnChange(checkedValues) {
        this.setState({
            checkedList: checkedValues,
            showArea: true,
            value: 2
        })
    }

    /**
     * 大图/小图 切换
     * @param {string} n 图片类型   'small' 小图；'big' 大图
     */
    imgTypeChange(n) {
        if (this.state.imgType !== n) {
            this.setState({
                imgType: n
            })
        }
    }

    /**
     * 班级全选函数
     * @param {object} e checkbox按钮的touch对象
     */
    checkAll(e) {
        let ids = this.state.checkRoomIdsAll;
        let list = this.state.list;
        if (e.target.checked) {
            for (let n = 0; n < list.length; n++) {
                list[n].checked = true;
            }
        } else {
            for (let k = 0; k < list.length; k++) {
                list[k].checked = false;
            }
        }
        this.setState({
            checkRoomIds: e.target.checked ? ids : [],
            allChecked: e.target.checked,
            list
        })
    }

    componentDidMount() {
        // 获取列表
        this.props.ac_getDxxkList({}, () => this.checkRoom());
    }

    render() {
        let data = this.props.dsxkListReducer.data;
        let dataList = data.pageDatas ? data.pageDatas : [];
        let { visible, plainOptions, imgType, list } = this.state;
        list = list.length ? list : G.dsxkList;
        return (
            <div className='xq-timing-left clearfix'>
                <div className='xq-timing-nav'>
                    <div className='xq-timing-nav-all'>
                        <Checkbox
                            onChange={this.checkAll}
                            checked={this.state.allChecked}
                        >
                            全选
                        </Checkbox>
                    </div>
                    <div className='xq-timing-nav-sel'>
                        <Select defaultValue="0" style={{ width: 120 }} onChange={this.dataTypeChange}>
                            <Option value="0">全部数据</Option>
                            <Option value="1">未标记</Option>
                            <Option value="2">已标记</Option>
                        </Select>
                    </div>
                    <div className='xq-timing-nav-sel'>
                        <Select defaultValue="big" style={{ width: 100 }} onChange={this.imgTypeChange}>
                            <Option value="big">大图</Option>
                            <Option value="small">小图</Option>
                        </Select>
                    </div>
                    <div className='xq-timing-nav-sign' onClick={this.showModal}>
                        <Button>标记</Button>
                    </div>
                </div>
                <div className='xq-timing-nav-ul'>
                    {
                        dataList ?
                            dataList.map((item, index) => {
                                return (
                                    <div
                                        className={imgType === 'big' ? 'xq-timing-nav-li-big' : 'xq-timing-nav-li'}
                                        key={index}>
                                        <div className='xq-timing-nav-img'>
                                            <img src={require('../../../../../icon/1.jpg')} alt="" />
                                            {
                                                item.classroomID.deleteFlag ? <span></span> : ''
                                            }
                                        </div>
                                        <div className='xq-timing-nav-title'>
                                            <div
                                                className={list[index].checked ? 'xq-timing-nav-check curr' : 'xq-timing-nav-check'}
                                            >
                                                <span
                                                    className='xq-timing-check-one'
                                                    onClick={() => this.checkRoom(item, this.state.list)}>
                                                </span>
                                                <span className='xq-timing-check-t'>
                                                    {item.classroomID.classroomName}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            : ''
                    }
                </div>
                <div className='xq-timing-page'>
                    <div className='xq-timing-page-l'>
                        每页12条数据，共{data.totalRecords}条
                    </div>
                    <div className='xq-timing-page-r'>
                        <Pagination defaultCurrent={1} defaultPageSize={3} total={data.totalPages} />
                    </div>
                </div>
                <div className='xq-dsxk-modal'>
                    <Modal
                        width={700}
                        title="违纪事件："
                        wrapClassName='xq-dsxk-modal'
                        visible={visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <div className='xq-dsxk-modal-box'>
                            <div className='xq-dsxk-modal-con'>
                                <div className='xq-dsxk-modal-t'>违纪事件：</div>
                                <div className='xq-dsxk-modal-ul'>
                                    <RadioGroup onChange={this.onModalRadioChange} value={this.state.value}>
                                        <Radio value={1}>无违纪</Radio>
                                        <Radio value={2}>
                                            <CheckboxGroup
                                                value={this.state.checkedList}
                                                options={plainOptions}
                                                onChange={this.modalOnChange} />
                                        </Radio>
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className='xq-dsxk-modal-area'>
                                {
                                    this.state.showArea ?
                                        <TextArea
                                            placeholder="备注"
                                            autosize
                                            onChange={this.modalArea}
                                            value={this.state.modalAreaText} />
                                        : ''
                                }
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default TimingPatrolImgs;
