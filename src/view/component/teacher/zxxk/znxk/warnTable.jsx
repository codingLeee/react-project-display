/*
 * @Author: JC.Liu 
 * @Date: 2019-02-27 09:44:45 
 * @Last Modified by: lilu
 * @Last Modified time: 2019-03-15 17:29:23
 * 异常报警
 */
import React, { Component } from 'react';
import { Tabs, Button, Select, Input, Table, Pagination, DatePicker, Row, Col, Breadcrumb } from 'antd';
import { SVG } from '../../../../../base'
import '../../../../../../src/css/admin/znxk/warning.scss';
import { ll_tabs, ll_Opear, ll_search, ll_uidList ,ll_img } from '../../../../../redux/warnTea.reducer'
import { connect } from 'react-redux';
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Search = Input.Search;
const Option = Select.Option;

@connect(state => state, { ll_tabs, ll_Opear, ll_search, ll_uidList ,ll_img})
export default class LL_WarnTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],//表格内容
            page: '',
            search: {
                dateTime: [],
                dropType: '0',
                inputTeacherName: '',
                jigouAll: '0',
                classAll: '0'
            },
            currentPage: 1,//当前页
            index: '',
            selectedRowKeys: [1, 2, 3]
        }
    }


    componentDidMount() {
        console.log('his.props.ll_warnTea.tabs.tab', this.props.ll_warnTea.tabs.tab)
        console.log('this.props.ll_warnTea.search', this.props.ll_warnTea.search)
        this.change()

    }

    change() {
        this.props.ll_search(this.props.ll_warnTea.search)
        let { data } = this.state
        if (this.props.ll_warnTea.tabs.tab === '4') {
            for (var i = 0; i < 22; i++) {
                data.push({
                    key: i,
                    time: '第一周/周一/第二节',
                    course: '计本一班',
                    ClassInfo: '计算机导论',
                    arrivePeople: '100',
                    latePeople: '90',
                    Attendance: '90%',
                    state: '未审定',

                })
            }

        } else {
            for (var i = 0; i < 22; i++) {
                data.push({
                    key: i,
                    time: '第一周/周一/第二节',
                    teacher: '刘老师',
                    course: '思想品德撒个谎咖啡哥萨克的很快就爱上当看见爱上都看见爱上都好困吉安市倒计时卡号的看见爱上当看见爱上大框架爱神的箭卡上',
                    classroom: '基础教学楼',
                    state: '未审定',

                })
            }
        }
        this.setState({
            data,
        })
    }
    /**
     *点击操作
     *
     * @param {object} record 表格里面的信息
     * @memberof LL_WarnTable
     */
    handleOption(record) {
        let obj = {
            page: 2,
            tabRecord: record
        }
        this.props.ll_Opear(obj);
        this.props.ll_img( {
            uid: record.classroom,
            pageNow: 1,
            pageSize: "20"
        })
        this.setState({
            page: 2
        })
        console.log(record)
    }

    /**
     *筛选数据
     *
     * @param {string} type 根据type区分对应调用者
     * @param {string} value 搜索框的值和下拉列表的value
     * @param {Array} dateString 时间筛选
     * @memberof LL_WarnTable
     */
    SearchChange(type, value, dateString) {
        let { search } = this.state;
        let arr = [];
        switch (type) {
            case 'dateTime':
                for (let i = 0; i < dateString.length; i++) {
                    if (dateString[i]) {
                        arr.push(dateString[i]);
                    }
                }
                search.dateTime = arr;
                this.setState({
                    search,
                })
                console.log(dateString)
                // search.dateTime = dateString
                break;
            case 'dropType':
                search.dropType = value;
                console.log('value', value)
                break;
            case 'search':
                search.inputTeacherName = value;
                break;
            case 'jigouAll':
                console.log('value', value)
                search.jigouAll = value;
                break;
            case 'classAll':
                search.classAll = value;
                break;
            default:
                break;
        }
        this.props.ll_search(search);
        this.props.ll_uidList({
            checkedUidList: [],//[List类型]操作对象uid(课程id)"
            selectedRowKeys: []
        })
        this.setState({
            search
        })
    }

    /**
     *分页跳转
     *
     * @param {Number} pageIndex 页码
     * @memberof LL_WarnTable
     */
    jumpPage(pageIndex) {
        let {search} = this.state;
        search.pageNowe=pageIndex
        console.log(search);
       
        this.setState({
            currentPage: pageIndex,
            search
        })
        this.props.ll_search(search)

    }

    /**
     *获取当前span的状态
     *
     * @param {Number} key 下标代表第几节课
     * @param {object} e 当前点击的标签
     * @memberof LL_WarnTable
     */
    ClickInfo(key, e) {
        let { search } = this.state;
        search.dropType = e.target.id;
        search.festivals=key;
        this.props.ll_search(search)
        this.setState({
            search,
            index: key
        })
        this.props.ll_uidList({
            checkedUidList: [],//[List类型]操作对象uid(课程id)"
            selectedRowKeys: []
        })
        console.log('点击的状态 ', e.target.id)
        console.log('第几节', key);
    }

    /**
     *总的状态数
     *
     * @param {object} e 当前点击的状态
     * @memberof LL_WarnTable
     */
    ClickInfoAll(e) {
        let { search } = this.state;
        search.dropType = e.target.id;
        this.props.ll_search(search)
        this.setState({
            search,
            index: -1
        })
        console.log('点击的状态', e.target.id)

    }

    itemRender(current, type, originalElement) {
        if (type === 'prev') {
            return <a className='ll-PageChange'>上一页</a>;
        } if (type === 'next') {
            return <a className='ll-PageChange'>下一页</a>;
        }
        return originalElement;
    }
    render() {
        // let {selectedRowKeys} = this.state;
        let ll_warnTea = this.props.ll_warnTea;
        let arr = [
            {
                'classIndex': '一',
                'Unapproved': 10,
                'normal': 20,
                'abnormal': 50


            },
            {
                'classIndex': '二',
                'Unapproved': 10,
                'normal': 20,
                'abnormal': 50
            },
            {
                'classIndex': '三',
                'Unapproved': 10,
                'normal': 20,
                'abnormal': 50
            },
            {
                'classIndex': '四',
                'Unapproved': 10,
                'normal': 20,
                'abnormal': 50
            },
            {
                'classIndex': '五',
                'Unapproved': 10,
                'normal': 20,
                'abnormal': 50
            },
            {
                'classIndex': '六',
                'Unapproved': 10,
                'normal': 20,
                'abnormal': 50
            },
            {
                'classIndex': '七',
                'Unapproved': 10,
                'normal': 20,
                'abnormal': 50
            },
            {
                'classIndex': '八',
                'Unapproved': 10,
                'normal': 20,
                'abnormal': 50
            },
            {
                'classIndex': '九',
                'Unapproved': 10,
                'normal': 20,
                'abnormal': 50
            }

        ]
        const columns = this.props.ll_warnTea.tabs.tab === '4' ?
            [{
                title: '时间',
                dataIndex: 'time',
                width: '174px',
                align: 'center',
                render: (text, record) => {
                    return <div className='ll-tableContent' title={text}>
                        {text}
                    </div>
                }
            }, {
                title: '班级',
                dataIndex: 'course',
                width: '174px',
                align: 'center',
                render: (text, record) => {
                    return <div className='ll-tableContent' title={text}>
                        {text}
                    </div>
                }
            }, {
                title: '授课信息',
                align: 'center',
                width: '174px',
                dataIndex: 'ClassInfo',
                width: '174px',
                render: (text, record) => {
                    return <div className='ll-tableContent' title={text}>
                        {text}
                    </div>
                }
            }, {
                title: '应到人数',
                align: 'center',
                width: '174px',
                dataIndex: 'arrivePeople',
                render: (text, record) => {
                    return <div className='ll-tableContent' title={text}>
                        {text}
                    </div>
                }
            },
            {
                title: '迟到人数',
                align: 'center',
                width: '174px',
                dataIndex: 'latePeople',

            }, {
                title: '出勤率',
                align: 'center',
                width: '174px',
                dataIndex: 'Attendance',
            }, {
                title: '状态',
                width: '174px',
                align: 'center',
                dataIndex: 'state',

            }, {
                title: '操作',
                width: '174px',
                align: 'center',
                dataIndex: 'Option',
                render: (text, record) => {
                    return <a ><span onClick={this.handleOption.bind(this, record)}> <SVG type='chakan' style={{ fontSize: '20px' }} title='查看'></SVG></span></a>
                }
            }]
            :
            [
                {
                    title: '时间',
                    dataIndex: 'time',
                    width: '174px',
                    align: 'center',
                    render: (text, record) => {
                        return <div className='ll-tableContent' title={text}>
                            {text}
                        </div>
                    }
                }, {
                    title: '教师',
                    dataIndex: 'teacher',
                    width: '174px',
                    align: 'center',
                    render: (text, record) => {
                        return <div className='ll-tableContent' title={text} >
                            {text}
                        </div>
                    }
                }, {
                    title: '课程',
                    dataIndex: 'course',
                    align: 'center',
                    width: '180px',
                    render: (text, record) => {
                        return <div className='ll-tableContent' title={text}>
                            {text}
                        </div>
                    }
                }, {
                    title: '教室',
                    dataIndex: 'classroom',
                    width: '180px',
                    align: 'center',
                    render: (text, record) => {
                        return <div className='ll-tableContent' title={text}>
                            {text}
                        </div>
                    }
                }, {
                    title: '状态',
                    dataIndex: 'state',
                    width: '174px',
                    align: 'center'
                }, {
                    title: '操作',
                    dataIndex: 'Option',
                    width: '174px',
                    align: 'center',
                    render: (text, record) => {
                        return <a ><span onClick={this.handleOption.bind(this, record)}> <SVG type='chakan' style={{ fontSize: '20px' }} title='查看'></SVG></span></a>
                    }
                }];


        //批量选择
        const rowSelection = {
            selectedRowKeys: ll_warnTea.uidList.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                let uidList = {
                    checkedUidList: [],//[List类型]操作对象uid(课程id)"
                    selectedRowKeys: selectedRowKeys
                }
                selectedRows.forEach(function (value, i) {
                    uidList.checkedUidList.push(value.course)
                })
                this.props.ll_uidList(uidList)
            },

        };

        return (
            < div className='ll-tableBody'>

                <div style={{ display: 'inline-block' }}>
                    时间筛选： <RangePicker onChange={this.SearchChange.bind(this, 'dateTime')} value={ll_warnTea.search.dateTime.length ? [moment(ll_warnTea.search.dateTime[0], dateFormat), moment(ll_warnTea.search.dateTime[0], dateFormat)] : null} format={dateFormat} />
                </div>
                <Select value={ll_warnTea.search.dropType} style={{ width: 100, marginLeft: '10px' }} className='ll-tableSelect' onChange={this.SearchChange.bind(this, 'dropType')}>
                    <Option value="0">全部</Option>
                    <Option value="1">未审定</Option>
                    <Option value="2">正常</Option>
                    <Option value="3">异常</Option>
                </Select>

                <Search
                    placeholder={"请输入教师名字"}
                    onSearch={this.SearchChange.bind(this, 'search')}
                    style={{ width: 200 }}
                    defaultValue={`${ll_warnTea.search.inputTeacherName}`}
                />

                <div className='ll-wzyTop'>
                    <Row type="flex" justify="space-between">
                        <Col span={4} className={-1 === ll_warnTea.search.festivals ? 'll-changeColor' : ''}>
                            <div>
                                <span>未审定</span>/
                                <span>正常</span>/
                                <span>异常</span>
                            </div>
                            <div className='ll-wzySpan' >
                                <span id='1' onClick={this.ClickInfoAll.bind(this)}>10</span>/
                                <span id='2' onClick={this.ClickInfoAll.bind(this)}>20</span>/
                                <span id='3' onClick={this.ClickInfoAll.bind(this)}>100</span>
                            </div>
                        </Col>
                        {
                            arr.map(function (data, key) {
                                return (
                                    <Col span={2} key={key} className={key === ll_warnTea.search.festivals ? 'll-changeColor' : ''}>
                                        <div>第{data.classIndex}节</div>
                                        <div className='ll-wzySpan'>
                                            <span id='1' onClick={this.ClickInfo.bind(this, key)}>{data.Unapproved}</span>/
                                            <span id='2' onClick={this.ClickInfo.bind(this, key)}>{data.normal}</span>/
                                            <span id='3' onClick={this.ClickInfo.bind(this, key)}>{data.abnormal}</span>
                                        </div>
                                    </Col>
                                )
                            }, this)
                        }

                    </Row>
                </div>


                <Table
                    rowSelection={rowSelection}
                    id='goTop'
                    rowKey={record => record.key}
                    dataSource={this.state.data}
                    columns={columns}
                    pagination={false}
                    className='ll-Table' />
                <div className='ll-buttom'>
                    <span className='ll-buttomSpan'>
                        每页20条数据，共{this.state.data.length}条
                </span>
                    <Pagination
                        current={ll_warnTea.search.pageNowe}
                        // defaultCurrent={1}
                        total={this.state.data.length}
                        className='ll-PageStyle ll-Pg'
                        id='goTop'
                        pageSizeOptions={['20']}
                        pageSize={20}
                        defaultPageSize={20}
                        hideOnSinglePage={true}
                        onChange={this.jumpPage.bind(this)}
                        centered={false}
                        itemRender={this.itemRender.bind(this)}
                    />
                </div>
            </div >
        )
    }
}

