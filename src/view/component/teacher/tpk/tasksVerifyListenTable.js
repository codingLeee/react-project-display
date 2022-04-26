/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 14:02:31 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-14 16:39:03
 * 待处理的申请列表
 */
import React, { Component } from 'react';
import { Button, Table, Spin, message, Pagination } from 'antd';
import { G } from './../../../../js/g';
import { SVG, ModalTip } from './../../../../base';
import util from './../../../../js/_x/index.js';
const Request = util.util.request.request;
import './../../../../css/teacher/mj_tasksVerifyListenTable.css';

class TasksVerifyListenTable extends Component {
  constructor() {
    super();
    this.state = {
      selectedRowKeys: [],
      selectedRows: [],
      loading: false,
      totalNumber: 0,
      applyListen: [],
      currentPage: 1,
      currNum: 0
    };
    this.id = [];
    this.ids = [];
    this.jobStatus = '';
    this.teacherId = G.baseinfo.teacherid;
    this.handleAgree = this.handleAgree.bind(this);
    this.handleDisAgree = this.handleDisAgree.bind(this);
    this.onhandleMassArgee = this.onhandleMassArgee.bind(this);
    this.onhandleMassDisArgee = this.onhandleMassDisArgee.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.getTableInfo = this.getTableInfo.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }


  componentDidMount() {
    this.getTableInfo(1);
  };

  getTableInfo(page) {
    this.setState({
      loading: true
    });
    let req = {
      teacherId: this.teacherId,
      currentPage: page,
      pageSize: 20
    }
    // Request('/teacherJob/myCourseApply', req, function (ret) {
    let ret = {
      result: true,
      data: { totalNumber: 0, applyListen: [] }
    }
    if (ret.result) {
      let retData = ret.data;
      let applyListen = retData.applyListen;
      let data = [];
      for (let i = 0; i < applyListen.length; i++) {
        function add0(m) { return m < 10 ? '0' + m : m };
        var now = new Date(applyListen[i].lastUpdateTime);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var time = year + "-" + add0(month) + "-" + add0(date) + "   " + add0(hour) + ":" + add0(minute);
        data.push({
          key: i,
          id: applyListen[i].id,
          teacherId: applyListen[i].teacherId,
          teacherName: applyListen[i].teacherName,
          section: `第${Number(applyListen[i].weeks).toChinese()}周/星期${Number(applyListen[i].weekday).toChinese() === '七' ? '日' : Number(applyListen[i].weekday).toChinese()}/第${Number(applyListen[i].lessonOrder).toChinese()}节`,
          className: applyListen[i].className,
          courseName: applyListen[i].courseName,
          lastUpdateTime: time
        });
      };
      this.setState({
        totalNumber: retData.totalNumber,
        applyListen: data,
        ids: this.state.applyListen.id,
        currNum: applyListen.length
      });
    } else {
      message.info(ret.message, 3);
    }
    this.setState({
      loading: false
    });
    // }.bind(this));
  }
  //同意
  handleAgree(value) {
    this.id.push(value);
    let req = {
      id: this.id,
      jobStatus: '2'
    }
    // confirm('操作提示', '是否同意你所选择的申请吗？', function (resolve) {
    //   Request('/teacherJob/myVerify', req, function (ret) {
    //     if (ret.result) {
    //       message.info('同意操作成功', 3);
    //       if (this.state.currNum == 1) {
    //         this.getTableInfo(this.state.currentPage - 1);
    //       } else {
    //         this.getTableInfo(this.state.currentPage);
    //       }
    //     } else {
    //       message.error('操作失败', 3);
    //       this.getTableInfo(this.state.currentPage);
    //     }
    //   }.bind(this));
    //   resolve();
    // }.bind(this), function (resolve) {
    //   resolve();
    // });

    ModalTip({
      tit: '操作提示',
      ctn: '是否同意你所选择的申请吗？',
      ot: '确定',
      ct: '取消',
      okFun: () => {
        // Request('/teacherJob / myVerify', req, function (ret) {
        //     if (ret.result) {
        //       message.info('同意操作成功', 3);
        //       if (this.state.currNum == 1) {
        //         this.getTableInfo(this.state.currentPage - 1);
        //       } else {
        //         this.getTableInfo(this.state.currentPage);
        //       }
        //     } else {
        //       message.error('操作失败', 3);
        //       this.getTableInfo(this.state.currentPage);
        //     }
        //   }.bind(this));
      },
      canFun: () => { }
    })
    this.id = [];
  }
  //拒绝
  handleDisAgree(value) {
    this.id.push(value);
    let req = {
      id: this.id,
      jobStatus: '3'
    }
    // confirm('操作提示', '是否拒绝你所选择的申请吗？', function (resolve) {
    //   Request('/teacherJob/myVerify', req, function (ret) {
    //     if (ret.result) {
    //       message.info('拒绝操作成功', 3);
    //       if (this.state.currNum == 1) {
    //         this.getTableInfo(this.state.currentPage - 1);
    //       } else {
    //         this.getTableInfo(this.state.currentPage);
    //       }
    //     } else {
    //       message.error('操作失败', 3);
    //       this.getTableInfo(this.state.currentPage);
    //     }
    //   }.bind(this));
    //   resolve();
    // }.bind(this), function (resolve) {
    //   resolve();
    // });
    ModalTip({
      tit: '操作提示',
      ctn: '是否同意你所选择的申请吗？',
      ot: '确定',
      ct: '取消',
      okFun: () => {
        //   Request('/teacherJob/myVerify', req, function (ret) {
        //     if (ret.result) {
        //       message.info('拒绝操作成功', 3);
        //       if (this.state.currNum == 1) {
        //         this.getTableInfo(this.state.currentPage - 1);
        //       } else {
        //         this.getTableInfo(this.state.currentPage);
        //       }
        //     } else {
        //       message.error('操作失败', 3);
        //       this.getTableInfo(this.state.currentPage);
        //     }
      },
      canFun: () => { }
    })
    this.id = [];
  }
  //批量同意
  onhandleMassArgee() {
    // console.log(111)
    // console.log(this.state.selectedRowKeys)
    if (this.state.selectedRows) {
      // if (this.state.selectedRowKeys) {
      let rows = this.state.selectedRows;
      let row = [];
      rows.map((item, index) =>
        row.push(item.id)
      )
      this.ids = row;
      if (row.length == 0) {
        message.info('请勾选', 3);
      } else {
        // confirm('操作提示', '是否批量同意你所勾选的申请吗？', function (resolve) {
        //   var req = {
        //     id: this.ids,
        //     jobStatus: 2
        //   }
        //   Request('/teacherJob/myVerify', req, function (ret) {
        //     if (ret.result) {
        //       message.info('批量同意操作成功', 3);
        //       if (this.state.currentPage == 1) {
        //         this.getTableInfo(1);
        //         this.setState({ selectedRows: [] })
        //       } else if (this.state.currNum == this.state.selectedRows.length) {
        //         this.getTableInfo(this.state.currentPage - 1);
        //         this.setState({ selectedRows: [] })
        //       } else if (this.state.currNum > this.state.selectedRows.length) {
        //         this.getTableInfo(this.state.currentPage);
        //         this.setState({ selectedRows: [] })
        //       }
        //     } else {
        //       message.error('操作失败', 3);
        //       this.getTableInfo(this.state.currentPage);
        //     }
        //   }.bind(this));
        //   resolve();
        // }.bind(this), function (resolve) {
        //   resolve();
        // });
        ModalTip({
          tit: '操作提示',
          ctn: '是否批量同意你所勾选的申请吗？',
          ot: '确定',
          ct: '取消',
          okFun: () => {
            //   var req = {
            //     id: this.ids,
            //     jobStatus: 2
            //   }
            //   Request('/teacherJob/myVerify', req, function (ret) {
            //     if (ret.result) {
            //       message.info('批量同意操作成功', 3);
            //       if (this.state.currentPage == 1) {
            //         this.getTableInfo(1);
            //         this.setState({ selectedRows: [] })
            //       } else if (this.state.currNum == this.state.selectedRows.length) {
            //         this.getTableInfo(this.state.currentPage - 1);
            //         this.setState({ selectedRows: [] })
            //       } else if (this.state.currNum > this.state.selectedRows.length) {
            //         this.getTableInfo(this.state.currentPage);
            //         this.setState({ selectedRows: [] })
            //       }
            //     } else {
            //       message.error('操作失败', 3);
            //       this.getTableInfo(this.state.currentPage);
            //     }
            //   }
          },
          canFun: () => { }
        })
      }
    }
  }
  //批量拒绝
  onhandleMassDisArgee() {
    if (this.state.selectedRows) {
      let rows = this.state.selectedRows;
      let row = [];
      rows.map((item, index) =>
        row.push(item.id)
      )
      this.ids = row;
      if (row.length == 0) {
        message.info('请勾选', 3);
      } else {
        // confirm('操作提示', '是否批量拒绝你所勾选的申请吗？', function (resolve) {
        //   var req = {
        //     id: this.ids,
        //     jobStatus: 3
        //   }
        //   Request('/teacherJob/myVerify', req, function (ret) {
        //     if (ret.result) {
        //       message.info('批量拒绝操作成功', 3);
        //       if (this.state.currentPage == 1) {
        //         this.getTableInfo(1);
        //         this.setState({ selectedRows: [] })
        //       } else if (this.state.currNum == this.state.selectedRows.length) {
        //         this.getTableInfo(this.state.currentPage - 1);
        //         this.setState({ selectedRows: [] })
        //       } else if (this.state.currNum > this.state.selectedRows.length) {
        //         this.getTableInfo(this.state.currentPage);
        //         this.setState({ selectedRows: [] })
        //       }
        //     } else {
        //       message.error('操作失败', 3);
        //       this.getTableInfo(this.state.currentPage);
        //     }
        //   }.bind(this));
        //   resolve();
        // }.bind(this), function (resolve) {
        //   resolve();
        // });
        ModalTip({
          tit: '操作提示',
          ctn: '是否批量拒绝你所勾选的申请吗？',
          ot: '确定',
          ct: '取消',
          okFun: () => {
            //   var req = {
            //     id: this.ids,
            //     jobStatus: 3
            //   }
            //   Request('/teacherJob/myVerify', req, function (ret) {
            //     if (ret.result) {
            //       message.info('批量拒绝操作成功', 3);
            //       if (this.state.currentPage == 1) {
            //         this.getTableInfo(1);
            //         this.setState({ selectedRows: [] })
            //       } else if (this.state.currNum == this.state.selectedRows.length) {
            //         this.getTableInfo(this.state.currentPage - 1);
            //         this.setState({ selectedRows: [] })
            //       } else if (this.state.currNum > this.state.selectedRows.length) {
            //         this.getTableInfo(this.state.currentPage);
            //         this.setState({ selectedRows: [] })
            //       }
            //     } else {
            //       message.error('操作失败', 3);
            //       this.getTableInfo(this.state.currentPage);
            //     }
            //   }
          },
          canFun: () => { }
        })
      }
    }
  }

  // start = () => {
  //   this.setState({ loading: true });
  //   // ajax request after empty completing
  //   setTimeout(() => {
  //     this.setState({
  //       selectedRowKeys: [],
  //       loading: false,
  //     });
  //   }, 1000);
  // }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    // console.log(selectedRows)
    this.setState({ selectedRowKeys, selectedRows });
  }

  handleChangePage(page) {
    this.setState({
      currentPage: page,
      selectedRowKeys: [],
      selectedRows: []
    });
    this.getTableInfo(page)
  }

  render() {
    const columns = [{
      title: '申请听课的老师',
      dataIndex: 'teacherName',
      key: 'teacherName',
    }, {
      title: '时间（周/星期/节次）',
      dataIndex: 'section',
      key: 'section'
    }, {
      title: '授课班级',
      dataIndex: 'className',
      key: 'className'
    }, {
      title: '授课科目',
      dataIndex: 'courseName',
      key: 'courseName'
    }, {
      title: '申请时间',
      dataIndex: 'lastUpdateTime',
      key: 'lastUpdateTime'
    }, {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
        <span>
          <a className="pf-t-verifyagree" onClick={() => this.handleAgree(record.id)}>同意</a>&nbsp;&nbsp;&nbsp;&nbsp;
          <a className="pf-t-verifydisagree" onClick={() => this.handleDisAgree(record.id)}>拒绝</a>
        </span>
      ),
    }
    ];

    function itemRender(current, type, originalElement) {
      if (type === 'prev') {
        return <a>上一页</a>;
      } else if (type === 'next') {
        return <a>下一页</a>;
      }
      return originalElement;
    }


    const { loading, selectedRowKeys, selectedRows } = this.state;
    const rowSelection = {
      selectedRowKeys,
      selectedRows,
      hideDefaultSelections: true,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div>
        <div className="pf-t-verifylisten">
          <div className="pf-t-totaloperation">
            <Button type='primary' size="large" className="pf-t-verifybutton pf-t-agreebutton" onClick={this.onhandleMassArgee}>批量同意</Button>
            <Button type='primary' size="large" className="pf-t-verifybutton pf-t-disagreebutton" onClick={this.onhandleMassDisArgee}>批量拒绝</Button>
          </div>
          {
            this.state.loading ? <div className='pf-r-loading'><Spin /></div> :
              <div className="pf-t-verifylist">
                <Table
                  pagination={false}
                  loading={this.state.loading}
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={this.state.applyListen}
                />
                {
                  this.state.totalNumber > 0 ?
                    <div className='ll-buttom'>
                      <span className='ll-buttomSpan'>
                        {`每页20条数据，共${this.state.totalNumber}条`}
                      </span>
                      <Pagination
                        defaultCurrent={1}
                        total={this.state.totalNumber}
                        className='ll-PageStyle ll-Pg'
                        itemRender={itemRender}
                        pageSize={20}
                        current={this.state.currentPage}
                        onChange={(page) => this.handleChangePage(page)}
                      />
                    </div>
                    : null
                }
              </div>
          }
        </div>
      </div>

    );
  }
}

export default TasksVerifyListenTable;