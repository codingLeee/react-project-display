/*
 * @Author: JC.Liu
 * @Date: 2017-09-12 10:54:12 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-19 17:21:35
 */
import React, { Component } from 'react';
import { Button, Table, Modal, message } from 'antd';
import { SVG, ModalTip } from './../../../../../base';
import util from './../../../../../js/_x/index.js';
const Request = util.util.request.request;
import ReAddScoreOption from './../../../../component/admin/tpk/reAddScoreOption';
import './../../../../../css/admin/mj_tpkResearchCommentManage.css';

export default class EvaluateCtro extends Component {
  constructor() {
    super();
    this.total = 2;
    this.state = {
      visible: false,       //模态框显示与否
      isDestroy: false,      //模态框注销与否
      tableData: [],         //表格数据
      itemData: {
        "evaluateModelId": "",//评价大项唯一标识，修改后保存不为空
        "evaluateModelName": "",//评价大项名称
        "evaluateModelDescription": "",//评价大项描述
        "childModelList": [{
          "evaluateModelName": "",//评价小项名称
          "evaluateModelDescription": "",//评价小项描述
          "score": 0//评价分数
        }]
      },
      loading: false      //表格加载中
    };
    this.oprt = ''      //当前操作
    this.submitData = this.submitData.bind(this);
    this.delcon = this.delcon.bind(this);
    this.columns = [{
      title: '评价大项(总分<=100分)',
      dataIndex: 'commentAmount',
      width: 180,
      render: this.renderContent
    }, {
      title: '评价子项',
      dataIndex: 'commentChild',
      width: 190
    }, {
      title: '评价标准',
      dataIndex: 'commentStandard',
      width: 520
    }, {
      title: '分值',
      dataIndex: 'score',
      width: 160
    }, {
      title: '操作',
      dataIndex: 'operation',
      width: 50,
      render: this.renderContent
    }];
  };

  componentDidMount() {
    this.getData();
  };

  getData() {
    this.setState({
      loading: true
    });
    Request('api/web/techJob/evaluate_model_list', {}, function (ret) {
      // let ret = {
      //   result: true,
      //   message: '',
      //   data: [
      //     {
      //       deleteFlag: false,
      //       evaluateModelDescription: null,
      //       evaluateModelId: "b4b349a1-4d31-4cbe-a1df-9e9a100cf670",
      //       evaluateModelName: "学习氛围",
      //       fatherModelId: "",
      //       lastUpdateTime: 1551074825000,
      //       score: 20,
      //       childModelList: [
      //         {
      //           childModelList: null,
      //           deleteFlag: false,
      //           evaluateModelDescription: "针对老师讲课的方式学生听课情况",
      //           evaluateModelId: "fb976dc5-65b8-4eec-b3e6-1f4a1c81c59b",
      //           evaluateModelName: "学生听课兴趣",
      //           fatherModelId: "b4b349a1-4d31-4cbe-a1df-9e9a100cf670",
      //           lastUpdateTime: 1551074825000,
      //           score: 20
      //         },
      //         {
      //           childModelList: null,
      //           deleteFlag: false,
      //           evaluateModelDescription: "表达是否清晰、易懂",
      //           evaluateModelId: "c74c687b-1560-4dba-9184-ef827327f6e8",
      //           evaluateModelName: "表达能力",
      //           fatherModelId: "d9ef82d4-374c-418b-b960-ce0ef0bbbbbb",
      //           lastUpdateTime: 1551074763000,
      //           score: 40
      //         }
      //       ]
      //     }
      //   ]
      // }
      if (ret.result) {
        var comment = ret.data;
        var newTableData = [];
        comment.map((item1) => {
          item1.childModelList.map((item2, index) => {
            newTableData.push({
              key: item2.evaluateModelId,
              prtKey: item1.evaluateModelId,
              commentAmount: `${item1.evaluateModelName}(合计${item1.score}分)`,
              amount: (index % item1.childModelList.length) === 0 ? item1.childModelList.length : 0,
              commentChild: item2.evaluateModelName,
              commentStandard: item2.evaluateModelDescription,
              score: item2.score,
              operation: 'icon'
            })
          })
        });
        this.setState({
          tableData: newTableData
        });
      } else {
        message.info(ret.message, 2);
      }
      this.setState({
        loading: false
      });
    }.bind(this));
  };

  renderContent = (value, row) => {
    const obj = {
      children: value,
      props: {},
    };
    if (value === 'icon') {
      obj.children = <span>
        <a href="javascript:;" className="cjy-rcm-aBox" onClick={() => this.showModal('mod', row.prtKey)}>
          {/* <i className="iconfont" title="编辑">&#xe606;</i> */}
          <SVG type='bianji' />
        </a>
        <a href="javascript:;" className="cjy-rcm-aBox" onClick={() => this.delcon(row.prtKey)}>
          {/* <i className="iconfont" title="删除">&#xe626;</i> */}
          <SVG type='shanchu1' />
        </a>
      </span>;
    }
    obj.props.rowSpan = row.amount;
    return obj;
  };

  render() {
    return (
      <div className="cjy-rcm-tableBox">
        <div className="cjy-rcm-headLine">
          <Button onClick={() => this.showModal('add')}>添加评价项</Button>
          {
            this.state.isDestroy
              ? ''
              : <Modal className="cjy-rcm-modal" title={this.oprt} footer={null} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <ReAddScoreOption itemData={this.state.itemData} handleCancel={this.handleCancel} submitData={this.submitData} />
              </Modal>
          }
        </div>
        <div className='cjy-trcm-table'>
          <Table columns={this.columns} dataSource={this.state.tableData} pagination={false} loading={this.state.loading} bordered />
        </div>
      </div>
    );
  }

  /**
   * 提交数据
   */
  submitData = (req) => {
    Request('api/web/techJob/evaluate_model_save', req, function (ret) {
      // let ret = {
      //   data: "",
      //   message: "修改成功",
      //   result: true

      // }
      if (ret.result) {
        message.success('保存成功', 2);
        this.getData();
        this.setState({
          visible: false,
          isDestroy: true,
          itemData: {
            "evaluateModelId": "",//评价大项唯一标识，修改后保存不为空
            "evaluateModelName": "",//评价大项名称
            "evaluateModelDescription": "",//评价大项描述
            "childModelList": [{
              "evaluateModelName": "",//评价小项名称
              "evaluateModelDescription": "",//评价小项描述
              "score": 0//评价分数
            }]
          }
        })
      } else {
        message.info(ret.message, 2);
      }
    }.bind(this));
  };

  showModal = (opr, prtKey) => {
    if (opr === 'add') {
      this.oprt = '添加评分项';
      this.setState({
        visible: true,
        isDestroy: false,
      });
    } else if (opr === 'mod') {
      this.oprt = '修改评分项';
      this.getOneComment(prtKey);
    }
  };

  /**
   * 获取修改前数据
   */
  getOneComment = (prtKey) => {
    var req = {
      evaluateModelId: prtKey
    }
    Request('api/web/techJob/evaluate_model_update_search', req, function (ret) {
      // let ret = {
      //   data: {
      //     deleteFlag: false,
      //     evaluateModelDescription: null,
      //     evaluateModelId: "b4b349a1-4d31-4cbe-a1df-9e9a100cf670",
      //     evaluateModelName: "学习氛围",
      //     fatherModelId: "",
      //     lastUpdateTime: 1551074825000,
      //     score: 20,
      //     childModelList: [
      //       {
      //         childModelList: null,
      //         deleteFlag: false,
      //         evaluateModelDescription: "针对老师讲课的方式学生听课情况",
      //         evaluateModelId: "fb976dc5-65b8-4eec-b3e6-1f4a1c81c59b",
      //         evaluateModelName: "学生听课兴趣",
      //         fatherModelId: "b4b349a1-4d31-4cbe-a1df-9e9a100cf670",
      //         lastUpdateTime: 1551074825000,
      //         score: 20
      //       }
      //     ]
      //   },
      //   result: true
      // }
      if (ret.result) {
        this.setState({
          itemData: ret.data,
          visible: true,
          isDestroy: false
        });
      }
    }.bind(this));
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      isDestroy: true,
      itemData: {
        "evaluateModelId": "",//评价大项唯一标识，修改后保存不为空
        "evaluateModelName": "",//评价大项名称
        "evaluateModelDescription": "",//评价大项描述
        "childModelList": [{
          "evaluateModelName": "",//评价小项名称
          "evaluateModelDescription": "",//评价小项描述
          "score": 0//评价分数
        }]
      }
    });
  };

  delcon = (prtKey) => {
    ModalTip({
      tit: '操作提示',
      ctn: '确定删除？',
      ot: '确定',
      ct: '取消',
      okFun: () => {
        var req = {
          evaluateModelId: prtKey
        }
        Request('api/web/techJob/evaluate_model_delete', req, function (ret) {
          if (ret.result) {
            message.success('删除成功', 2);
            this.getData();
          }
        }.bind(this));
      },
      canFun: () => { }
    })
  };

}