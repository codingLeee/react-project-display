/*
 * @Author: JudyC 
 * @Date: 2017-09-11 18:14:14 
 * @Last Modified by: JudyC
 * @Last Modified time: 2017-12-20 17:11:09
 */
import React, { Component } from 'react';
import _ from 'lodash';
import {Input,Form,InputNumber,Button} from 'antd';
import { info } from '../components/base/modal';
import '../../css/components/reAddScoreOption.css';

const FormItem = Form.Item;
const { TextArea } = Input;

let uuid = 0;
class ReAddScoreOption extends Component {
  constructor(){
    super();
    this.state = {
      datas:[]
    };
    this.total = 0;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  };

  componentWillMount(){
    this.setState({
      datas:this.props.itemData
    });
    uuid = this.props.itemData.childModelList.length - 1;
  }

  componentDidMount(){
    this.props.form.setFieldsValue({
      'evaluateModelName':this.state.datas.evaluateModelName
    });
    this.state.datas.childModelList.map((item,idx)=>{
      this.props.form.setFieldsValue({
        ["evaluateModelName-"+idx]:item.evaluateModelName,
        ["evaluateModelDescription-"+idx]:item.evaluateModelDescription,
        ["score-"+idx]:item.score
      });
    });
  };

  /**
   * 删除键
   */
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      info('提示框','请至少保留一个评分子项',2000);
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  /**
   * 增加键子项键
   */
  add = () => {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.total>100){
      info('提示框','评价总分不能超过100分！');
    }else{
      const { form } = this.props;
      const keys = form.getFieldValue('keys');
      var evaluateModelNameArray = [];
      this.props.form.validateFields((err, values) => {
        if (!err) {
          keys.map((k,index)=>{
            evaluateModelNameArray.push(this.props.form.getFieldValue("evaluateModelName-"+k).trim());
          });
          var sortArray = evaluateModelNameArray.sort();
          var isRepeat = false;
          for(let i=0;i<sortArray.length;i++){
            if(sortArray[i]===sortArray[i+1]){
              isRepeat = true;
              break;
            }
          }
          if(isRepeat){
            info('提示框','评价子项名重复',2000);
          }else{
            var commit = true;
            if(values.evaluateModelName.trim()===''){
              info('提示框','请填写评价大项名');
              commit = false;
              return false;
            }else{
              var evaluateModelName = values.evaluateModelName.trim();
              commit = true;
            }
            var childModelList = [];
            _.forIn(values, (val, key) => {
              var items = key.split('-');
              if(items.length > 1){
                if(!childModelList[items[1]]){
                  childModelList[items[1]] = {};
                }
                if(typeof(val)==='string'){
                  if(val.trim()===''&&items[0]==='evaluateModelName'){
                    info('提示框','请填写评价子项名');
                    commit = false;
                    return false;
                  }else{
                    commit = true;
                    childModelList[items[1]][items[0]] = val.trim();
                  }
                }else{
                  childModelList[items[1]][items[0]] = val;
                }
              }
            });
  
            childModelList = childModelList.filter(t => t!==undefined && t!==null);
            var commentData = {
              evaluateModelId:this.props.itemData.evaluateModelId,
              evaluateModelName:evaluateModelName,
              evaluateModelDescription:'',
              childModelList:childModelList
            };
            if(commit){
              this.props.submitData(commentData);
            };
          }
        }
      });
    }
  };

  /**
   * 取消按钮
   */
  handleCancel = () => {
    this.props.handleCancel();
  }

  render() {
    const { getFieldDecorator,getFieldValue } = this.props.form;
    var initialKey = [];
    this.props.itemData.childModelList.map((item,index)=>{
      initialKey.push(index);
    });
    getFieldDecorator('keys', { initialValue: initialKey });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <div className="cjy-raso-childOpt" key={k}>
          <div className="cjy-raso-titleLine">
            <i className="iconfont cjy-raso-foldBtn" onClick={()=>this.remove(k)}>&#xe67d;</i>
            &nbsp;
            <span>评分子项：</span>
            <FormItem>
                {getFieldDecorator('evaluateModelName-' + k, {
                  rules: [{ required: true, message: '请输入评分子项' },
                          {transform: (value) => {transformedValue: value?value.trim():''}}
                          // {pattern:/^[\w\u4e00-\u9fa5]+$/gi,message:'包含了特殊字符'}
                        ],
                })(
                  <Input className="cjy-raso-childName" maxLength="30"/>
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('score-' + k, {
                  rules: [{ required: true, message: '请输入评分' },
                          { pattern: /^[1-9]\d*$/, message: '请输入正确评分' }]
                })(
                  <InputNumber className="cjy-raso-score" maxLength="3"/>
                )}
              &nbsp;
              <span>分</span>
            </FormItem>
          </div>
          <FormItem  className="cjy-raso-scoreStanBox">
            <span>评分标准：</span>
            {getFieldDecorator('evaluateModelDescription-' + k, {})
            (
              <TextArea className="cjy-raso-scoreStan" maxLength="200" placeholder="输入请勿超过200字"/>
            )}
          </FormItem>
      </div>
      );
    });

    this.total = 0;
    keys.forEach((k,index)=>{
      this.total+= (getFieldValue("score-"+k)||0);
    });
        
    return (
      <Form className="cjy-raso-addScore" onSubmit={this.handleSubmit}>
        <FormItem className="cjy-raso-ScorePrtBox">
            <span>评分大项：</span>
            {getFieldDecorator('evaluateModelName', {
              rules: [{ required: true,message: '请输入评分大项' },
                      // {pattern:/^[\w\u4e00-\u9fa5]+$/gi,message:'包含了特殊字符'}
                    ],
            })(
              <Input maxLength="30"/>
            )}
            <span className="cjy-raso-totalNum"><span>{this.total}</span>分</span>
        </FormItem>
        <div className="cjy-raso-scoreChildBox">
          {formItems}
        </div>
        <div className="cjy-raso-addBtnBox">
          <a href="javascript:;" onClick={this.add}><i className="iconfont">&#xe602;</i>&nbsp;&nbsp;添加新子项</a>
        </div>
        <FormItem className="cjy-raso-footer">
          <Button className="cjy-raso-btn cjy-raso-save" htmlType="submit">保存</Button>
          <Button className="cjy-raso-btn cjy-raso-cancel" onClick={this.handleCancel}>取消</Button>
        </FormItem>
      </Form>
    );
  }
}
export default Form.create()(ReAddScoreOption);