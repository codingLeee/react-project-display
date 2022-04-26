/*
 * @Author: JC.Liu 
 * @Date: 2019-02-27 09:44:45 
 * @Last Modified by: lilu
 * @Last Modified time: 2019-03-20 12:48:12
 * 异常报警
 */
import React, { Component } from 'react';
import { Tabs, Button, Select, Input, Table, Pagination, Row, Col, Modal, InputNumber, message } from 'antd';
import { SVG } from '../../../../../base';
import LL_WarnTable from './warnTable'
import '../../../../../../src/css/admin/znxk/warning.scss';
import { ll_tabs, ll_Opear, ll_ExaminationPass, ll_Initialization, ll_ExaminationError, ll_uidList, ll_search, ll_img } from '../../../../../redux/warn.reducer'
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';
import { ModalTip, Loading } from './../../../../../base';

const TabPane = Tabs.TabPane;



@connect(state => state, { ll_tabs, ll_Opear, ll_Initialization, ll_uidList, ll_search, ll_img })
export default class LL_Warining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: '',//表格页1 调课换课信息页2 
      arr: [],//照片
      visible: false,//照片信息弹窗
      imageStatus: false,//加载状态 ture加载成功 false加载失败
      BigImg: '', //大图
      mulAttendance: false, //修改出勤率弹窗
      search: {}
    }
  }

  componentDidMount() {
    this.props.ll_Initialization();
    this.props.ll_tabs({
      tab: '1',
      name: '调课换课'
    })
    this.props.ll_Opear({
      page: 1,
      tabRecord: {},
    })
    // this.props.ll_warn.tabMessage.page=1;
    // this.props.ll_warn.tabs.tab='1';
    let { arr, search } = this.state;
    arr = [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1551343081&di=4af548174828d6a91bcd16c4d7c74583&src=http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180714/e5b318f468dd42a6b9932d9ceb9c775b.jpeg',
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4028630024,1593274136&fm=111&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2779898432,3654201866&fm=27&gp=0.jpg',
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2923708249,4258978487&fm=27&gp=0.jpg'
    ]
    for (var i = 0; i < 20; i++) {
      arr.push(arr[i])
    }

    this.setState({
      arr,
      search: this.props.ll_warn.search
    })
  }


  /**
   *获取到当前的tabs的key值和名字
   *
   * @memberof LL_Warining
   */
  tabsChange = (activeKey) => {
    let obj = {}
    switch (activeKey) {
      case '1':
        obj.tab = '1';
        obj.name = '调课换课'
        break;
      case '2':
        obj.tab = '2';
        obj.name = '教师迟到'
        break;
      case '3':
        obj.tab = '3';
        obj.name = '教师缺勤'
        break;
      case '4':
        obj.tab = '4';
        obj.name = '学生出勤'
        break;
      default:
        break;
    }
    this.props.ll_tabs(obj)

    //清空数据
    this.props.ll_Initialization()

  }

  /**
   *信息返回
   *
   * @memberof LL_Warining
   */
  PageBack = () => {
    this.props.ll_Opear(
      {
        page: 1,
        tabRecord: {},
      }
    );
    console.log(this.props.ll_warn.search)
    console.log(this.props.ll_warn.uidList)

  }

  /**
   *翻页跳转
   *
   * @param {number} pageIndex 分页码
   * @memberof LL_Warining
   */
  jumpPage(pageIndex) {

    this.props.ll_img({
      uid: this.props.ll_warn.img.uid,
      pageNow: pageIndex,
      pageSize: "20"
    })

  }

  /**
   *图片弹窗
   *
   * @param {*} e
   * @memberof LL_Warining
   */
  CheckImg(e) {
    this.setState({
      visible: true
    })
  }

  /**
   *关闭图片弹窗
   *
   * @memberof LL_Warining
   */
  ClickClose() {
    this.setState({
      visible: false
    })
  }

  /**
   *点击通过和不通过按钮
   *
   * @param {string} type
   * @memberof LL_Warining
   */
  CheckExamination(type) {
    let search = this.props.ll_warn.search;
    switch (type) {
      case 'ExaminationPass':
        let examinationPass = {
          "type": this.props.ll_warn.tabs.tab, //[1:调课换课;2教师迟到;3学生出勤]
          "uidList": this.props.ll_warn.uidList.checkedUidList //[List类型]操作对象uid(课程id)"
        }
        console.log('examinationPass', examinationPass)
        ModalTip({
          tit: '系统提示',
          ctn: '确定数据通过？',
          oT: '确定',
          okFun: () => {
            ll_ExaminationPass(examinationPass).then((res) => {
              console.log(123456)
              message.success('操作成功')
              this.props.ll_uidList({
                checkedUidList: [],//[List类型]操作对象uid(课程id)"
                selectedRowKeys: []
              })//清空uidlist
              search.pageNowe = 1;
              this.props.ll_search(search)

            }).catch(err => {
              if (err.status) {
                message.warning('请求失败');
              }
            })

          },
        })
        break;

      case 'ExaminationError':
        let examinationError = {
          "type": this.props.ll_warn.tabs.tab, //[1:调课换课;2教师迟到;3学生出勤]
          "uidList": this.props.ll_warn.uidList.checkedUidList //[List类型]操作对象uid(课程id)"
        }
        ModalTip({
          tit: '系统提示',
          ctn: '确定数据不通过？',
          oT: '确定',
          okFun: () => {

            ll_ExaminationError(examinationError).then((res) => {
              message.success('请求成功')
              this.props.ll_uidList({
                checkedUidList: [],//[List类型]操作对象uid(课程id)"
                selectedRowKeys: []
              })
              let search = this.props.ll_warn.search;
              search.pageNowe = 1;
              this.props.ll_search(search)
            }).catch(err => {
              if (err.status) {
                message.warning('请求失败')
              }
            })


          },
        })
        break;


      default:
        break;
    }
  }

  /**
   *图片加载成功
   *
   * @memberof LL_Warining
   */
  handleImageLoaded() {
    this.setState(
      { imageStatus: true }
    );
  }

  /**
   *图片加载失败
   *
   * @memberof LL_Warining
   */
  handleImageErrored() {
    this.setState(
      { imageStatus: false }
    );
  }

  /**
   *获取当前图片的src
   *
   * @param {object} e
   * @memberof LL_Warining
   */
  ClickImgInfo(e) {
    this.setState({
      BigImg: e.target.src
    })
    console.log(e.target.src)
  }

  /**
   *编辑实到人数，显示弹窗
   *
   * @memberof LL_Warining
   */
  MulAttendance() {
    this.setState({
      mulAttendance: true
    })
  }

  /**
   *修改实到人数弹窗取消按钮
   *
   * @memberof LL_Warining
   */
  handleCancel() {
    this.setState({
      mulAttendance: false
    })
  }

  /**
   *实到人数操作
   *
   * @param {string} type 标识
   * @param {number} value 人数
   * @memberof LL_Warining
   */
  ChangePeople(type, value) {
    switch (type) {
      case 'changeNum':
        console.log(value)
        break;
      case 'click':
        this.setState({
          mulAttendance: false
        })
        break
      default:
        break;
    }
  }

  /**
   *详情里面判断数据是否正常
   *
   * @param {string} type 标识
   * @memberof LL_Warining
   */
  changeSingle(type) {
    switch (type) {
      case 'nomal':
        ModalTip({
          tit: '系统提示',
          ctn: '确定数据正常？',
          oT: '确定',
          okFun: () => {
            this.props.ll_Opear(
              {
                page: 1,
                tabRecord: {},
              }
            )
            this.props.ll_uidList({
              checkedUidList: [],//[List类型]操作对象uid(课程id)"
              selectedRowKeys: []
            })
          },
        })
        break;

      case 'abnomal':
        ModalTip({
          tit: '系统提示',
          ctn: '确定数据异常？',
          oT: '确定',
          okFun: () => {
            this.props.ll_Opear(
              {
                page: 1,
                tabRecord: {},
              }
            )

            this.props.ll_uidList({
              checkedUidList: [],//[List类型]操作对象uid(课程id)"
              selectedRowKeys: []
            })
          },

        })

        break;
      default:
        break;
    }
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
    let { tabMessage, tabs, search, uidList, img } = this.props.ll_warn;
    // let tabs = this.props.ll_warn.tabs;
    // let search = this.props.ll_warn.search;
    // let uidList = this.props.ll_warn.uidList;
    // let img = this.props.ll_warn.img

    const operations = <div className='ll-btn'>
      <Button className="ll-button ll-btngreen" onClick={this.CheckExamination.bind(this, 'ExaminationPass')} style={search.dropType === '3' || search.dropType === '1' || search.dropType === '0' ? { display: 'inline-block' } : { display: 'none' }} disabled={uidList.checkedUidList.length ? false : true} >通过</Button>

      <Button className="ll-btnerr ll-btnred" onClick={this.CheckExamination.bind(this, 'ExaminationError')} style={search.dropType === '2' || search.dropType === '1' || search.dropType === '0' ? { display: 'inline-block' } : { display: 'none' }} disabled={uidList.checkedUidList.length ? false : true}>不通过</Button>
    </div>;

    var colorArr = ['#3498db'];
    var option = {
      title: {
        text: '出勤率趋势'
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          return '时间: ' + params[0].name + '<br>出勤率: ' +
            params[0].data + '%';
        }
      },

      xAxis: {
        type: 'category',
        axisLine: { onZero: false },
        data: ['11.10', '11.20', '11.30', '11.40', '11.50', '12.00', '12.10']
      },
      yAxis: {
        type: 'value',
        axisLine: { onZero: false },
        axisLabel: {
          show: true,
          interval: 'auto',
          formatter: '{value}%'
        },
      },
      color: colorArr,
      series: [{
        smooth: true,
        data: [20, 30, 90, 0, 50, 70, 100],
        type: 'line'
      }]
    };


    return (
      <div>


        {tabMessage.page === 1 ?
          <Tabs tabBarExtraContent={operations}
            activeKey={`${tabs.tab}`}
            onChange={this.tabsChange}
          >
            <TabPane tab="调课换课" key="1">
              <LL_WarnTable />
            </TabPane>
            <TabPane tab="教师迟到" key="2">
              <LL_WarnTable />
            </TabPane>
            <TabPane tab="教师缺勤" key="3">
              <LL_WarnTable />
            </TabPane>

            <TabPane tab="学生出勤" key="4">
              <LL_WarnTable />
            </TabPane>
          </Tabs>
          :
          <div className='ll-ImgBorder'>
            <div className='ll-warnTop'>
              <span ><SVG type='zuo' onClick={this.PageBack}></SVG> {tabs.name}</span> > 课程信息
           </div>
            <div className='ll-AllInfo'>
              <div className='ll-warnContentTop'>
                <div className='ll-IDPhoto'>
                  <img src='https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1551343081&di=4af548174828d6a91bcd16c4d7c74583&src=http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180714/e5b318f468dd42a6b9932d9ceb9c775b.jpeg' />

                </div>
                <div className='ll-IDInfo'>
                  <Row >
                    <Col span={24} className='ll-IDInfospan' style={{ fontSize: 18 }}>课程信息</Col>
                    <Col span={24} className='ll-IDInfospan ll-courseLength' title={tabMessage.tabRecord.course}>上课课程：{tabMessage.tabRecord.course}</Col>
                    <Col span={24} className='ll-IDInfospan ll-courseLength' title={tabMessage.tabRecord.classroom}>上课地点：{tabMessage.tabRecord.classroom}</Col>
                    <Col span={24} className='ll-IDInfospan'>上课时间：{tabMessage.tabRecord.time}
                      <span className='ll-arriveTime' style={tabs.tab === '2' ? { display: 'inline-block' } : { display: 'none' }}>到达时间：10.12</span>
                    </Col>
                    <Col span={24} className='ll-IDInfospan'>智能判定：<span>疑似{tabs.name}</span></Col>
                  </Row>
                  <Row className='ll-Attendance' style={tabs.tab === '4' ? { display: 'block' } : { display: 'none' }}>
                    <Col span={8}>
                      <div style={{ color: '#14cc8f' }}>80%</div>
                      <div>课程出勤</div>
                    </Col>
                    <Col span={8}>
                      <div>50</div>
                      <div>应到人数</div>
                    </Col>
                    <Col span={8}>
                      <div>4</div>
                      <div>实到人数</div>
                    </Col>
                    <SVG type='bianjichuqin' onClick={this.MulAttendance.bind(this)}></SVG>
                  </Row>
                  <div className='ll-btnClick'>
                    <Button className="ll-nomal ll-btngreen" onClick={this.changeSingle.bind(this, 'nomal')} style={search.dropType === '3' || search.dropType === '1' || search.dropType === '0' ? { display: 'inline-block' } : { display: 'none' }}>正常</Button>

                    <Button className="ll-innomal ll-btnred" onClick={this.changeSingle.bind(this, 'abnomal')} style={search.dropType === '2' || search.dropType === '1' || search.dropType === '0' ? { display: 'inline-block' } : { display: 'none' }}>异常</Button>

                  </div>
                </div>
              </div>
            </div>
            <ReactEcharts
              ref={(e) => { this.echartsElement = e }}
              option={option}
              theme="clear"
              style={tabs.tab === '4' ? { display: 'block' } : { display: 'none' }}
            />
            <div className="ll-AllImgInfo">
              <Row gutter={16} >
                {this.state.arr.map(function (data, key) {
                  return (
                    <Col span={6} className="ll-AllImg" key={key} onClick={this.ClickImgInfo.bind(this)}  >
                      {!this.state.imageStatus ? <div className='ll-load'>
                        <Loading style={{ width: '30px', height: '30px', display: 'block' }} tit='加载图片...' />
                      </div> : null
                      }

                      <img src={`${data}`}
                        onLoad={this.handleImageLoaded.bind(this)}
                        onError={this.handleImageErrored.bind(this)}
                        onClick={this.CheckImg.bind(this)}
                      />
                      <div className='ll-ImgLateTime' style={this.state.imageStatus && tabs.tab === '2' ? { display: 'block' } : { display: 'none' }}>迟到点</div>

                      <Row className='ll-ImgInfo' style={this.state.imageStatus ? tabs.tab === '2' ? { display: 'block', backgroundColor: '#611616' } : { display: 'block' } : { display: 'none' }}>
                        <Col span={24}  >{tabs.tab === '2' ? '对比时间：11.20' : '识别人数：20'}</Col>
                        {/* <Col span={12} className='ll-ImgLastSpan'>对比值 ：90</Col> */}
                      </Row>


                    </Col>
                  )
                }, this)
                }
              </Row>
              <div className='ll-buttom'>
                <span className='ll-buttomSpan'>
                  每页20条数据，共{this.state.arr.length}条
                </span>
                <Pagination
                  current={img.pageNow}
                  // defaultCurrent={1}
                  total={this.state.arr.length}
                  className='ll-PageStyle ll-Pg'
                  itemRender={this.itemRender.bind(this)}
                  pageSize={20}
                  hideOnSinglePage={true}
                  onChange={this.jumpPage.bind(this)}
                  centered={false}
                />
              </div>
            </div>

          </div>
        }

        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          footer={null}
          className='ll-imgModal'
          width='100%'
          height="100%"

        >
          <div className='ll-imgModal-Top'>
            <Row className='ll-TopROW'>
              <Col span={10} className='ll_TopRL'>
              </Col>
              <Col span={4} className='ll_TopM'>
                对比结果：{tabs.name}
              </Col>
              <Col span={10} className='ll_TopRL ll_TopLR'>
              </Col>

            </Row>

          </div>
          <Row className='ll-imgModal-Mid' >
            <Col span={20} className='ll-Mid-Mid' offset={2}>
              <img src={this.state.BigImg} />
              <div className='ll-ModalClose' onClick={this.ClickClose.bind(this)}><SVG type='guanbi' ></SVG></div>
            </Col>

            <div className='ll-Mid-Bottom'>
              <Row className='ll-MBottom-Row' type="flex" justify="space-between">
                <Col span={3} className='ll-MBottom-Rol'>
                  发生时间：{JSON.stringify(tabMessage.tabRecord) === "{}" ? '' : tabMessage.tabRecord.time}
                </Col>
                <Col span={3} className='ll-MBottom-Rol'>
                  教师：{JSON.stringify(tabMessage.tabRecord) === "{}" ? '' : tabMessage.tabRecord.teacher}
                </Col>
                <Col span={3} className='ll-MBottom-Rol'>
                  课程：{JSON.stringify(tabMessage.tabRecord) === "{}" ? '' : tabMessage.tabRecord.course || tabMessage.tabRecord.ClassInfo}
                </Col>
                <Col span={3} className='ll-MBottom-Rol'>
                  教室：{JSON.stringify(tabMessage.tabRecord) === "{}" ? '' : tabMessage.tabRecord.classroom || '教师'}
                </Col>
                <Col span={3} offset={3} className='ll-MBottom-Rol'>
                  设置时间：开课后5分钟
                </Col>
                <Col span={3} className='ll-MBottom-Rol'>
                  对比时间：2018
                </Col>
              </Row>

            </div>

          </Row>
        </Modal>

        {/* 修改实到人数弹窗 */}
        <Modal
          title="修改出勤率"
          visible={this.state.mulAttendance}
          onCancel={this.handleCancel.bind(this)}
          className='ll-mulAttModal'
        >
          <div className='ll-modalDiv'>
            实到人数：<InputNumber min={0} onChange={this.ChangePeople.bind(this, 'changeNum')} />

            <Button className=' ll-bule ll-button' onClick={this.ChangePeople.bind(this, 'click')}>确定</Button>
          </div>
        </Modal>

      </div >
    )
  }
}

