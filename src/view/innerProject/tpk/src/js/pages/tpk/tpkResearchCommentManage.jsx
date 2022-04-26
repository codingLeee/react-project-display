/*
 * @Author: JudyC 
 * @Date: 2017-09-12 10:54:12 
 * @Last Modified by: JudyC
 * @Last Modified time: 2017-10-27 16:57:37
 */
import React, { Component } from 'react';
import {Button,Table,Modal} from 'antd';
import { info,warning,confirm,success } from '../../components/base/modal';
import ReAddScoreOption from '../../components/reAddScoreOption';
import _x from '../../base/_x/api/api.js';
import '../../../css/pages/tpkResearchCommentManage.css';

class TpkResearchCommentManage extends Component{
  constructor(){
    super();
    this.total = 2;
    this.state = { 
      visible: false,       //模态框显示与否
      isDestroy:false,      //模态框注销与否
      tableData:[],         //表格数据
      itemData: {
        "evaluateModelId":"",//评价大项唯一标识，修改后保存不为空
        "evaluateModelName":"",//评价大项名称
        "evaluateModelDescription":"",//评价大项描述
        "childModelList":[{
          "evaluateModelName":"",//评价小项名称
          "evaluateModelDescription":"",//评价小项描述
          "score":0//评价分数
        }]        
      },
      loading:false      //表格加载中
    };
    this.oprt = ''      //当前操作
    this.submitData = this.submitData.bind(this);
    this.delcon = this.delcon.bind(this);
    this.columns = [{
      title:'评价大项(总分<=100分)',
      dataIndex:'commentAmount',
      width:180,
      render:this.renderContent
    },{
      title:'评价子项',
      dataIndex:'commentChild',
      width:190
    },{
      title:'评价标准',
      dataIndex:'commentStandard',
      width:520
    },{
      title:'分值',
      dataIndex:'score',
      width:160
    },{
      title:'操作',
      dataIndex:'operation',
      width:50,
      render:this.renderContent
    }];
  };

  componentDidMount(){
    this.getData();
  };

  getData(){
    this.setState({
      loading:true
    });
    _x.util.request('/techJob/evaluateModelList',{},function(ret){
      if(ret.result){
        var comment = ret.data;
        var newTableData = [];
        comment.map((item1)=>{
          item1.childModelList.map((item2,index)=>{
            newTableData.push({
              key:item2.evaluateModelId,
              prtKey:item1.evaluateModelId,
              commentAmount:`${item1.evaluateModelName}(合计${item1.score}分)`,
              amount: (index % item1.childModelList.length) === 0 ? item1.childModelList.length : 0,
              commentChild:item2.evaluateModelName,
              commentStandard:item2.evaluateModelDescription,
              score:item2.score,
              operation:'icon'
            })
          })
        });
        this.setState({
          tableData:newTableData
        });
      }else{
        info('提示框',ret.message,2000);
      }
      this.setState({
        loading:false
      });
    }.bind(this));
  };
  
  renderContent = (value,row)=>{
    const obj = {
      children: value,
      props: {},
    };
    if(value === 'icon'){
      obj.children = <span>
                      <a href="javascript:;" className="cjy-rcm-aBox" onClick={()=>this.showModal('mod',row.prtKey)}><i className="iconfont" title="编辑">&#xe606;</i></a>
                      <a href="javascript:;" className="cjy-rcm-aBox" onClick={()=>this.delcon(row.prtKey)}><i className="iconfont" title="删除">&#xe626;</i></a>
                    </span>;
    }
    obj.props.rowSpan = row.amount;
    return obj;
  };

  render(){
    return (
      <div className="cjy-rcm-tableBox">
        <div className="cjy-rcm-headLine">
          <Button onClick={()=>this.showModal('add')}>添加评价项</Button>
          {
            this.state.isDestroy
            ? ''
            : <Modal className="cjy-rcm-modal" title={this.oprt} footer={null} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <ReAddScoreOption itemData={this.state.itemData} handleCancel={this.handleCancel} submitData={this.submitData}/>
              </Modal>
          }
        </div>
        <div className='cjy-trcm-table'>
          <Table columns={this.columns} dataSource={this.state.tableData} pagination={false} loading={this.state.loading} bordered/>
        </div>
      </div>
    );
  }

  /**
   * 提交数据
   */
  submitData = (req) => {
    _x.util.request('/techJob/evaluateModelSave',req,function(ret){
      if(ret.result){
        success('保存成功',2000);
        this.getData();
        this.setState({
          visible: false,
          isDestroy:true,
          itemData: {
            "evaluateModelId":"",//评价大项唯一标识，修改后保存不为空
            "evaluateModelName":"",//评价大项名称
            "evaluateModelDescription":"",//评价大项描述
            "childModelList":[{
              "evaluateModelName":"",//评价小项名称
              "evaluateModelDescription":"",//评价小项描述
              "score":0//评价分数
            }]        
          }
        })
      }else{
        info('提示框',ret.message);
      }
    }.bind(this));
  };

  showModal = (opr,prtKey) => {
    if(opr==='add'){
      this.oprt = '添加评分项';
      this.setState({
        visible: true,
        isDestroy:false,
      });
    }else if(opr==='mod'){
      this.oprt = '修改评分项';
      this.getOneComment(prtKey);
    }
  };

  /**
   * 获取修改前数据
   */
  getOneComment = (prtKey) => {
    var req = {
      evaluateModelId:prtKey
    }
    _x.util.request('/techJob/evaluateModelUpdateSearch',req,function(ret){
      if(ret.result){
        this.setState({
          itemData:ret.data,
          visible:true,
          isDestroy:false
        });
      }
    }.bind(this));
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      isDestroy:true,
      itemData: {
        "evaluateModelId":"",//评价大项唯一标识，修改后保存不为空
        "evaluateModelName":"",//评价大项名称
        "evaluateModelDescription":"",//评价大项描述
        "childModelList":[{
          "evaluateModelName":"",//评价小项名称
          "evaluateModelDescription":"",//评价小项描述
          "score":0//评价分数
        }]        
      }
    });
  };
  
  delcon = (prtKey) => {
    confirm('操作提示', '确定删除？', function(resolve){
      var req = {
        evaluateModelId:prtKey
      }
      _x.util.request('/techJob/evaluateModelDelete',req,function(ret){
        if(ret.result){
          success('删除成功',2000);
          this.getData();
        }
      }.bind(this));
      resolve(); //执行此方法弹出框才会关闭，用于需要等待的异步操作
      }.bind(this), function(resolve){
      //dosomething
      resolve(); //执行此方法弹出框才会关闭，用于需要等待的异步操作
    });
  };

}

export default TpkResearchCommentManage;