/*
 * @Author: JudyC 
 * @Date: 2017-09-12 10:53:23 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-19 14:59:06
 */
import React, { Component } from 'react';
import { Modal, Button, Table, message, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { ModalTip } from './../../../../../base';
import { SVG } from './../../../../../base';
import util from './../../../../../js/_x/index.js';
const toChinese = util.util.number.toChinese;
const Request = util.util.request.request;
import ResearchSearch from './../../../../component/admin/tpk/researchSearch';
import ResearchClass from './../../../../component/admin/tpk/researchClass';
import './../../../../../css/admin/mj_tpkResearchPlanManage.css';

export default class PlanCtro extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,    //模态框状态
      tableData: [],     //表格数据
      loading: false,      //表格加载中
      current: 1         //当前页数
    };
    this.choseKey = ''; //要查询的计划id
    this.keyword = '';  //查询关键字
    this.total = 0;     //页面总数
    this.delcon = this.delcon.bind(this);
    this.handleOk = this.handleOk.bind(this);

    this.columns = [
      {
        title: '计划名称',
        dataIndex: 'planName',
        width: 400
      }, {
        title: '教研员数',
        dataIndex: 'researchNumber',
        width: 170
      }, {
        title: '教研课程数',
        dataIndex: 'lessonNumber',
        width: 160
      }, {
        title: '计划持续时间',
        dataIndex: 'planTime',
        width: 260
      }, {
        title: '操作',
        render: (text, record) => (
          <span>
            <a href="javascript:;" className="cjy-rpm-aBox" onClick={() => this.handleShowDetail(record.key)}>
              <SVG type='icon-chakanxq' />
            </a>
            <Link to={`/admin/tpk/jysz/reAddPlan/${record.key}`} className="cjy-rpm-aBox">
              <SVG type='bianji' />
            </Link>
            <a href="javascript:;" className="cjy-rpm-aBox" onClick={() => this.delcon(record.key)}>
              <SVG type='shanchu1' />
            </a>
          </span>
        ),
        width: 100
      }
    ]
  };

  componentDidMount() {
    this.getData(1);
  }

  /**
   * 获取当前页数据
   * @param {Number} n 页数
   */
  getData(n) {
    this.setState({
      loading: true,
      current: n
    });
    var req = {
      pageNumber: n,
      pageSize: 20,
      keyword: this.keyword
    };
    Request('api/web/research_lesson/setting/get_plan_list', req, function (ret) {
      // const ret = {
      //   message: null, result: true, total: 2,
      //   data: [
      //     { endTime: 3, id: "6ce72d27-f5a6-4d46-869b-c2eb777e9656", lessonNumber: 10, planName: "BBB", researchNumber: 2, startTime: 1 }
      //   ]
      // }
      if (ret.result) {
        this.total = ret.total;
        var planData = ret.data;
        var newTableData = [];
        planData.map((item) => {
          newTableData.push({
            key: item.id,
            planName: item.planName,
            researchNumber: item.researchNumber,
            lessonNumber: item.lessonNumber,
            planTime: `第${toChinese(item.startTime)}周 到 第${toChinese(item.endTime)}周`
          });
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

  render() {
    // 分页样式
    function itemRender(current, type, originalElement) {
      if (type === 'prev') {
        return <a>上一页</a>;
      } else if (type === 'next') {
        return <a>下一页</a>;
      }
      return originalElement;
    }
    return (
      <div className="cjy-rpm-tableBox">
        <div className="cjy-rpm-headLine">
          <Button><Link to='/admin/tpk/jysz/reAddPlan'>新增教研计划</Link></Button>
          <ResearchSearch
            placeholder={'教研计划：输入关键字'}
            resChange={this.resChange}
            search={this.search} />
        </div>
        <div className='cjy-trpm-table'>
          <Table
            pagination={false}
            loading={this.state.loading}
            columns={this.columns}
            dataSource={this.state.tableData}
          />
          <div className='ll-buttom'>
            <span className='ll-buttomSpan'>
              {`每页20条数据，共${this.total}条`}
            </span>
            <Pagination
              defaultCurrent={1}
              total={this.total}
              className='ll-PageStyle ll-Pg'
              itemRender={itemRender}
              pageSize={20}
              current={this.state.current}
              onChange={(page) => this.onChange(page)}
            />
          </div>
        </div>
        {
          this.state.visible
            ? <Modal
              footer={false}
              className="cjy-rpm-modal"
              visible={true}
              title="教研计划详情"
              onCancel={this.handleOk}>
              <ResearchClass choseKey={this.choseKey} />
              <div className="ant-modal-footer">
                <Button
                  className="ant-btn ant-btn-primary ant-btn-lg"
                  onClick={this.handleOk}>关闭</Button>
              </div>
            </Modal>
            : ''
        }
      </div>
    );
  }

  onChange(page) {
    //数据请求
    this.getData(page);
  };

  /**
 * 教研员输入框变化
 */
  resChange = (value) => {
    this.keyword = value;
  };

  /**
   * 查询按钮
   */
  search = () => {
    this.getData(1);
  }

  /**
   * 查看图标
   */
  handleShowDetail = (key) => {
    this.choseKey = key;
    this.setState({
      visible: true
    });
  };

  /**
   * 确定按钮
   */
  handleOk = () => {
    this.setState({
      visible: false,
    });
  };


  /**
   * 删除操作
   */
  delcon = (key) => {
    // confirm('操作提示', '删除计划后，计划下的所有数据，包括点评等都将被删除，确定删除？', function (resolve) {
    //   var req = {
    //     id: key
    //   }
    //   Request('/research_lesson/setting/delete_plan', req, function (ret) {
    //     if (ret.result) {
    //       success('删除成功', 2000);
    //       this.getData(1);
    //     }
    //   }.bind(this));
    //   resolve(); //执行此方法弹出框才会关闭，用于需要等待的异步操作
    // }.bind(this), function (resolve) {
    //   resolve(); //执行此方法弹出框才会关闭，用于需要等待的异步操作
    // });
    ModalTip({
      tit: '操作提示',
      ctn: '删除计划后，计划下的说有数据，包括点评等都将被删除，确定删除？',
      ot: '确定',
      ct: '取消',
      okFun: () => {
        var req = {
          id: key
        }
        // Request('api/web/research_lesson/setting/delete_plan', req, function (ret) {
        let ret = {
          result: true
        }
        if (ret.result) {
          message.success('删除成功', 2);
          this.getData(1);
        }
        // }.bind(this));
      },
      canFun: () => { }
    })
  };

}