/*
 * @Author: JC.Liu 
 * @Date: 2019-02-23 22:34:10 
 * @Last Modified by: xiangting
 * @Last Modified time: 2019-03-25 10:47:32
 * 教学检查 - 课程查课
 */
import React, { Component } from 'react';
import { DatePicker, Select, Pagination, Icon } from 'antd';
import moment from 'moment';
import '../../../../css/admin/checkClass.scss';
import { SVG, Loading } from '../../../../base'
import { connect } from 'react-redux';
import _x from '../../../../js/_x/util';
import { getCheckClassData, getLessonOrder, getTeachingOrg, getRankListData, checkClassLoading, getBuildList } from '../../../../redux/checkClass.redux'
const Option = Select.Option;
const number = _x.number;
const date = _x.date

@connect(state => state.checkClass, { getCheckClassData, getLessonOrder, getTeachingOrg, getRankListData, checkClassLoading, getBuildList })
export class XtCheckClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            section: '',              //选中节次
            searchDate: moment(new Date(Date.now())),           //选中日期
            classType: ['全部', '行政班', '教学班'],        //班级类型数据
            selectCollege: '',           //学院
            selectClassType: 0,         //班级类型
            ranking: [
                { name: '本节教师迟到', id: 'teacherLate' },
                { name: '本节调课换课', id: 'changeClass' },
                { name: '本节学生出勤率低', id: 'studentRate' },
                { name: '本学期课堂违纪最多', id: 'selectEvents' },
                { name: '本学期听课人数多', id: 'selectListens' },
                { name: '本学期学生出勤率低', id: 'selectStudents' }
            ],           //排序方式数据
            searchType: false,       //false:选择学院、班级类型，  true：榜单
            curPage: 1,           //当前页数
            sortType: undefined,       //排序方式
            hoverIndex: undefined,      //hover榜单序号
            attSort: 0,                    //出勤率排序
            selectBuild: '',          //上课地点筛选
            moreCollege: false,
            moreBuild: false,
            showMoreCollege: false,
            showMoreBuild: false,
            attSort: true
        }
    }

    componentDidMount() {
        this.props.getLessonOrder().then((res) => {
            if (res.result) {
                this.setState({ section: res.data.selectCurLesson.lessonOrderId }, () => {
                    this.getData()
                })
            }
        }).catch((rej) => {
            console.log(rej)
        })
        this.props.getTeachingOrg().then((res) => {
            if (res.result && this.college.clientHeight > 50) {
                this.setState({ moreCollege: true })
            }
        });
        this.props.getBuildList().then((res) => {
            if (res.result && this.build.clientHeight > 50) {
                this.setState({ moreBuild: true })
            }
        });
        this.props.getRankListData({
            "actureDate": date.format(new Date(this.state.searchDate), 'yyyy-MM-dd'),
            "lessonOrder": this.state.section||1
        });
    }

    /**
     * @description 选择节次
     * @param {string} value    选择的节次
     */
    selectSection(value) {
        this.setState({ section: value }, () => {
            this.getData()
        })
    }

    /**
     * @description 获取当前页数据
     */
    getData = () => {
        let params = {
            "actureDate": date.format(new Date(this.state.searchDate), 'yyyy-MM-dd'),       //时间
            "classType": this.state.selectClassType,            //班级类型
            "curPage": this.state.curPage,              //当前页
            "gradeId": this.state.selectCollege,                //学院
            "lessonOrder": this.state.section||1,              //节次
            "sortType": this.state.sortType,                    //榜单排序方法序号
            "buildId": this.state.selectBuild,                  //上课地点
            "sortOrder": this.state.attSort ? 1 : 0                       //1顺序 0 逆序
        }
        this.props.getCheckClassData(params)
    }

    /**
     * @description     选择时间
     * @param {object} date     选中时间相关信息
     */
    searchDate(date) {
        this.setState({ searchDate: date }, () => {
            this.getData()
        })
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
     * @description  被选中学院
     * @param {number} index    被选择的学院的序号
     */
    selectCollege(index) {
        this.setState({ selectCollege: index }, () => {
            this.getData()
        })
    }

    /**
     * @description  被选中班级类型
     * @param {number} index    被选择的班级类型的序号
     */
    selectClassType(index) {
        this.setState({ selectClassType: index }, () => {
            this.getData()
        })
    }

    /**
     * @description 切换筛选和榜单
     */
    searchType() {
        this.setState({ searchType: !this.state.searchType })
    }

    /**
     * @description 改变页数
     * @param {number} page     当前页
     */
    handlePageChange(page) {
        this.node.scrollIntoView();
        this.setState({ curPage: page }, () => {
            this.getData()
        });
    }

    /**
     * @description 设置排序方式
     * @param {number} index  点击的排序方式序号
     */
    selectRank(index) {
        this.setState({ sortType: index }, () => {
            this.getData()
        })
    }

    /**
     * @description 选择上课地点
     * @param {string} id   上课地点的id
     */
    selectBuild(id) {
        this.setState({ selectBuild: id })
    }

    render() {
        const attSort = ["caret-up", "caret-down"];
        return (
            <div className='xt-checkClass' ref={(node) => this.node = node}>
                <div className='xt-loading' style={{ display: this.props.isLoading ? 'block' : 'none' }}>
                    <Loading />
                </div>
                <div className='xt-checkClass-date'>
                    <DatePicker
                        allowClear={false}
                        placeholder=" 请选择时间"
                        value={this.state.searchDate}
                        showToday={false}
                        disabledDate={this.disabledDate.bind(this)}
                        onChange={this.searchDate.bind(this)} />
                    <Select value={this.state.section} onChange={this.selectSection.bind(this)}>
                        {
                            this.props.lessonOrder.map((item, index) => (
                                <Option value={item.lessonOrderId} key={'key' + index}>{item.lessonName}</Option>
                            ))
                        }
                    </Select>
                    <div style={{ color: '#26a5ff', float: 'right', display: !this.state.searchType ? 'block' : 'none', cursor: 'pointer' }} onClick={this.searchType.bind(this)} >
                        <SVG
                            type='prev' className='xt-checkype'
                            style={{ width: '20px', height: '20px', transform: ['rotate(180deg)'], position: 'relative', top: '5px', left: '-5px', marginBottom: '10px' }}
                        />
                        切换到榜单
                    </div>
                </div>
                <div className='clearfix'>
                    <div className='xt-checkClass-search' style={{ display: !this.state.searchType ? 'block' : 'none' }}>
                        <div>
                            <div className='xt-checkClass-search-title'>学院：</div>
                            <div
                                className='xt-checkClass-search-item'
                                ref={(college) => this.college = college}
                                style={this.state.moreCollege && !this.state.showMoreCollege ? { overflow: 'hidden', height: '45px' } : {}}
                            >
                                {/* {
                                    this.props.teachingOrg.map((item, index) => (
                                        <div
                                            key={'key' + index}
                                            style={{ background: this.state.selectCollege === item.crgUid ? '#31a9ff' : '#fff', color: this.state.selectCollege === item.crgUid ? '#fff' : '#4d4d4d' }}
                                            onClick={this.selectCollege.bind(this, item.crgUid)}
                                        >
                                            {item.crgUid ? item.crgName : '全部'}
                                        </div>
                                    ))
                                } */}
                            </div>
                            <div
                                className='xt-getMore'
                                style={{ display: this.state.moreCollege ? 'block' : 'none' }}
                                onClick={() => this.setState({ showMoreCollege: !this.state.showMoreCollege })}
                            >
                                {!this.state.showMoreCollege ? '更多' : '收起'}
                            </div>
                        </div>
                        <div>
                            <div className='xt-checkClass-search-title'>班级类型：</div>
                            <div className='xt-checkClass-search-item'>
                                {
                                    this.state.classType.map((item, index) => (
                                        <div
                                            key={'key' + index}
                                            style={{ background: this.state.selectClassType === index ? '#31a9ff' : '#fff', color: this.state.selectClassType === index ? '#fff' : '#4d4d4d' }}
                                            onClick={this.selectClassType.bind(this, index)}
                                        >
                                            {item}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            <div className='xt-checkClass-search-title'>上课地点：</div>
                            <div
                                className='xt-checkClass-search-item'
                                ref={(build) => this.build = build}
                                style={this.state.moreBuild && !this.state.showMoreBuild ? { overflow: 'hidden', height: '45px' } : {}}
                            >
                                {
                                    this.props.buildList.map((item, index) => (
                                        <div
                                            key={'key' + index}
                                            style={{ background: this.state.selectBuild === item.buildUid ? '#31a9ff' : '#fff', color: this.state.selectBuild === item.buildUid ? '#fff' : '#4d4d4d' }}
                                            onClick={this.selectBuild.bind(this, item.buildUid)}
                                        >
                                            {item.buildName}
                                        </div>
                                    ))
                                }
                            </div>
                            <div
                                className='xt-getMore'
                                style={{ display: this.state.moreBuild ? 'block' : 'none' }}
                                onClick={() => this.setState({ showMoreBuild: !this.state.showMoreBuild })}
                            >
                                {!this.state.showMoreBuild ? '更多' : '收起'}
                            </div>
                        </div>
                    </div>
                    <div className='xt-checkClass-turn' onClick={this.searchType.bind(this)} style={{ display: this.state.searchType ? 'block' : 'none' }}>
                        <SVG
                            type='prev'
                            style={{ width: '24px', height: '24px', position: 'relative', left: '-5px', marginBottom: '10px' }}
                        />
                        切换到筛选
                    </div>
                    <div className='xt-checkClass-ranking' style={{ display: this.state.searchType ? 'block' : 'none' }}>
                        {
                            this.state.ranking.map((item, index) => (
                                <div className='xt-checkClass-ranking-item'
                                    key={'key' + index}
                                    onMouseEnter={() => this.setState({ hoverIndex: index })}
                                    onMouseLeave={() => this.setState({ hoverIndex: undefined })}
                                >
                                    <div>{item.name}</div>
                                    {
                                        this.props.rankList.length && this.props.rankList[index][item.id].length ? <div>
                                            <div><span>1</span>{this.props.rankList[index][item.id][0].className}</div>
                                            <div><span>2</span>{this.props.rankList[index][item.id][1].className}</div>
                                            <div><span>3</span>{this.props.rankList[index][item.id][2].className}</div>
                                        </div>
                                            :
                                            <div style={{ width: '100%', height: '130px', background: '#fff' }}>
                                                <SVG type='wushuju' style={{ width: '80px', height: '80px', marginLeft: 'calc(50% - 40px' }} />
                                                <div style={{ textAlign: 'center', color: '#aaa' }}>暂无数据</div>
                                            </div>
                                    }
                                    <div onClick={this.selectRank.bind(this, index + 1)} style={{ display: this.props.rankList.length && this.props.rankList[index][item.id].length ? 'block' : 'none' }}>设置为课堂排序</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='xt-checkClass-sort' style={{ display: this.props.totalNum ? 'block' : 'none' }} onClick={() => this.setState({ attSort: !this.state.attSort })}>
                    <span>出勤率排序</span>
                    <span>
                        {
                            attSort.map((item, index) => (
                                <Icon
                                    type={item}
                                    key={item}
                                    className={this.state.attSort == index ? 'xt-checkClass-sort-selected' : ''}
                                />
                            ))
                        }
                    </span>
                </div>
                <div className='xt-checkClass-detail clearfix'>
                    {
                        this.props.checkClassData.map((item, index) => (
                            <div className='xt-checkClass-detail-item' key={'key' + index}>
                                <div>
                                    <div>{item.jfCurriculumsList.curclassname}</div>
                                    <div>{item.jfCurriculumsList.subjectname}</div>
                                    <div>{item.jfCurriculumsList.classroomName}</div>
                                </div>
                                <div>
                                    <div>
                                        {item.jfCurriculumsList.grdListname + '/' + item.jfCurriculumsList.professonalName + '/'
                                            // + item.jfCurriculumsList.
                                        }
                                    </div>
                                    <div>
                                        <SVG type='teacher' style={{ width: '18px', height: '18px', marginRight: '5px' }} />
                                        {item.jfCurriculumsList.teachername}
                                    </div>
                                    <div>
                                        <SVG type='time1' style={{ width: '18px', height: '18px', marginRight: '5px' }} />
                                        {date.format(new Date(item.jfCurriculumsList.timestamp), 'yyyy-MM-dd')}
                                    </div>
                                    <div>
                                        <SVG type='icon25' style={{ width: '18px', height: '18px', marginRight: '5px' }} />
                                        {'第' + number.toChinese(item.jfCurriculumsList.lessonOrder) + '节'}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='ll-buttom'
                    style={{ display: this.props.totalNum ? 'block' : 'none' }}
                >
                    <span className='ll-buttomSpan'>
                        每页12条数据，共{this.props.totalNum || 0}条
                    </span>
                    <Pagination
                        onChange={this.handlePageChange}
                        pageSize={12}
                        current={this.state.curPage}
                        total={this.props.totalNum || 0}
                        className='ll-PageStyle ll-Pg'
                    />
                </div>
            </div >
        )
    }
}
