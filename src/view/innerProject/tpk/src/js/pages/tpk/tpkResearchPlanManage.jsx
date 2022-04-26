/*
 * @Author: JudyC 
 * @Date: 2017-09-12 10:53:23 
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-02-27 19:43:18
 */
import React, { Component } from 'react';
import { Modal, Button, Table } from 'antd';
import ResearchSearch from '../../components/base/researchSearch';
import { Link } from 'react-router-dom';
import ResearchClass from '../../components/researchClass';
import { confirm, info,success } from '../../components/base/modal';
import _x from '../../base/_x/api/api.js';
import '../../../css/iconfont.css';
import '../../../css/pages/tpkResearchPlanManage.css';

class TpkResearchPlanManage extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,    //模态框状态
      tableData: [],     //表格数据
      loading:false,      //表格加载中
      current:1         //当前页数
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
            <a href="javascript:;" className="cjy-rpm-aBox" onClick={() => this.handleShowDetail(record.key)}><i title='详情' className="iconfont">&#xe62f;</i></a>
            <Link to={`/reSetup/reAddPlan/${record.key}`} className="cjy-rpm-aBox"><i className="iconfont" title='编辑'>&#xe606;</i></Link>
            <a href="javascript:;" className="cjy-rpm-aBox" onClick={() => this.delcon(record.key)}><i className="iconfont" title='删除'>&#xe626;</i></a>
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
      loading:true,
      current:n
    });
    var req = {
      pageNumber: n,
      pageSize: 20,
      keyword: this.keyword
    };
    _x.util.request('/research_lesson/setting/get_plan_list', req, function (ret) {
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
            planTime: `第${Number(item.startTime).toChinese()}周 到 第${Number(item.endTime).toChinese()}周`
          });
        });
        this.setState({
          tableData: newTableData
        });
      }else{
        info('提示框',ret.message,2000);
      }
      this.setState({
        loading:false
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
          <Button><Link to='/reSetup/reAddPlan'>新增教研计划</Link></Button>
          <ResearchSearch placeholder={'教研计划：输入关键字'} resChange={this.resChange} search={this.search} />
        </div>
        <div className='cjy-trpm-table'>
          <Table pagination={{ pageSize: 20, total: this.total, onChange: this.onChange.bind(this),itemRender:itemRender,current:this.state.current }} loading={this.state.loading} columns={this.columns} dataSource={this.state.tableData} />
          <div className="cjy-rpm-numInfo">每页20条,共{this.total}条数据</div>
        </div>
        {
          this.state.visible
          ? <Modal footer={false} className="cjy-rpm-modal" visible={true} title="教研计划详情" onCancel={this.handleOk}>
              <ResearchClass choseKey={this.choseKey} />
              <div className="ant-modal-footer">
                <Button className="ant-btn ant-btn-primary ant-btn-lg" onClick={this.handleOk}>关闭</Button>
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
    confirm('操作提示', '删除计划后，计划下的所有数据，包括点评等都将被删除，确定删除？', function (resolve) {
      var req = {
        id: key
      }
      _x.util.request('/research_lesson/setting/delete_plan', req, function (ret) {
        if (ret.result) {
          success('删除成功', 2000);
          this.getData(1);
        }
      }.bind(this));
      resolve(); //执行此方法弹出框才会关闭，用于需要等待的异步操作
    }.bind(this), function (resolve) {
      //dosomething
      resolve(); //执行此方法弹出框才会关闭，用于需要等待的异步操作
    });
  };

}

export default TpkResearchPlanManage;