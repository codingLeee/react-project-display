/*
 * @Author: Yrj
 * @Date: 2019-02-28 22:34:10 
 * @Last Modified by: yrj
 * @Last Modified time: 2019-03-20 09:18:14
 * 在线巡课 - 巡课统计_part1
 */

import React, { Component } from 'react';
import './../../../../../css/admin/yrj_xkStatic.scss' ;
import { Button , DatePicker , Select , Input , message } from 'antd';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import {connect} from 'react-redux';
import{ BUTTON_SUBMIT,RECORDRANGE,SELECTDATA,ONSEARCH,SEARCHGETDATA,CLEARTYPE} from './../../../../../redux/checkOfRangePicker.js';


const {  RangePicker } = DatePicker;
const Option = Select.Option;


@connect(state=>state ,{ BUTTON_SUBMIT,RECORDRANGE,SELECTDATA,ONSEARCH,SEARCHGETDATA,CLEARTYPE})
class XkStatic_part1 extends Component {

/**
 * @desc select数据联动
 */
getSelectArry(selectid,colltoken){
  let subtoken=[];
  colltoken=[
    {colloge:'英语学院',id:'1',subject:[{sub:'英语专业1',id:'1-1'}, {sub:'英语专业2',id:'1-2'}, {sub:'英语专业3',id:'1-3'}]},
    {colloge:'数学学院',id:'2',subject:[{sub:'数学专业1',id:'2-1'}, {sub:'数学专业2',id:'2-2'}, {sub:'数学专业3',id:'2-3'}]}
  ];



  if(!(selectid==='0')){
    colltoken=colltoken.filter(item => item.id===selectid)
    colltoken.map((item,key)=>{
      subtoken= item.subject;
    })

    subtoken= [{sub:'全部专业',id:colltoken[0].id+'-0'}].concat(subtoken)
    console.log(subtoken)
  }else{
    colltoken.map((item,key)=>{
      subtoken[key]=item.subject;
    })
    subtoken= subtoken[0].concat(subtoken[1]);
    subtoken= [{sub:'全部专业',id:'0'}].concat(subtoken);
  }
 
 this.setState({
  subtoken:subtoken,
  selectshow:subtoken[0].id
 })

 return subtoken[0].id
 

}

/**
 * @desc 父级Select变化
 * @param 测试参数
 */
SelecthandleChange(selectid,value) {
 
  this.setState({
    faselectshow:selectid
  })
 let secondid= this.getSelectArry(selectid);
this.props.SELECTDATA(selectid,secondid);
}
/**
 * @desc 子级Select2变化
 * @param 测试参数
 */
SelecthandleChange1(selectid,value) {
  
  this.setState({
    selectshow:selectid
  })
 
  this.props.SELECTDATA(this.state.faselectshow,selectid);
}



/**
 * @desc 日历禁止选择日期
 * @param antd参数
 */
disabledDate(current) {
  return current && current > moment().endOf('day');
}

/**
 * @desc RangePicker变化
 * @param antd参数
 */
 rangePickeronChange(dates,dateStrings) {
   this.props.RECORDRANGE(dateStrings)
}

/**
 * @desc 搜索输入
 * @param antd参数
 */
Onsearch(e) {
  this.props.ONSEARCH(e.target.value);
}

/**
 * @desc 开始搜索
 * @param antd参数
 */
searchData(){
  let state=this.props.CheckOfRangePicker;
  this.props.SEARCHGETDATA(state)
}

/**
* @param { Number } typeid
* @desc 	左侧5个按钮点击事件
*/
clickHandle(typeid){
     
      
if (typeid==5) {
  //颜色修改，日历展示
  this.setState({
  buttonid:typeid,
  showrange:true,
  })
  //清楚查询的id类型
  this.props.CLEARTYPE();
}else{
  let state=this.props.CheckOfRangePicker;
  //颜色修改
  this.setState({
    buttonid:typeid,
    showrange:false
    })

//数据拉取
  this.props.BUTTON_SUBMIT(typeid,state);
  } 
  }
    
//初始化页面
  componentDidMount = (typeid=2) => {
    this.getSelectArry('0');
    this.props.BUTTON_SUBMIT(2);
  }

//state

  state={
    buttonid:2,
    selectdata:[
      {colloge:'英语学院',id:'1',subject:[{sub:'英语专业1',id:'1-1'}, {sub:'英语专业2',id:'1-2'}, {sub:'英语专业3',id:'1-3'}]},
      {colloge:'数学学院',id:'2',subject:[{sub:'数学专业1',id:'2-1'}, {sub:'数学专业2',id:'2-2'}, {sub:'数学专业3',id:'2-3'}]}
    ],
    subtoken:[{sub:'全部专业',id:'0'}],
    faselectshow:'0',
    selectshow:'0'
     
  }
    
  render() {
     // console.log(this.props.CheckOfRangePicker,'render');
      let buttontid=this.state.buttonid;//按钮上色
      let showrange=this.state.showrange;//展示日历
      const id =  Math.random();//日历bug
      
    
      return (
        
        <div className='xkStatic-part1'>
        <div id={id} >
            <span className='tit'>巡课量统计 :</span>
            
            <Button className={buttontid==1?'antclick':null} onClick={this.clickHandle.bind(this,1)} >本日</Button>
            <Button className={buttontid==2?'antclick':null} onClick={this.clickHandle.bind(this,2)}>本周</Button>
            <Button className={buttontid==3?'antclick':null} onClick={this.clickHandle.bind(this,3)}>本月</Button>
            <Button className={buttontid==4?'antclick':null} onClick={this.clickHandle.bind(this,4)}>本学期</Button>
            <Button className={buttontid==5?'antclick':null} onClick={this.clickHandle.bind(this,5)}>自定义</Button> 
           
            {
            showrange?<RangePicker disabledDate={this.disabledDate.bind(this)} onChange={this.rangePickeronChange.bind(this)} locale={locale} className='picker' />:<div className='picker_zw'></div>
            }
            
            <Select value={this.state.faselectshow} key="allcoll" getPopupContainer={()=>document.getElementById(id)}  onChange={this.SelecthandleChange.bind(this)}  className=" fl">
              <Option key='0'>全部学院</Option>
              {
                this.state.selectdata.map((item,key)=>(
                  <Option key={item.id}>{item.colloge}</Option>
                ))
              }
            </Select>

            <Select value={this.state.selectshow} key="allsub" getPopupContainer={()=>document.getElementById(id)} onChange={this.SelecthandleChange1.bind(this)}className='select fl'>
            
            {
              this.state.subtoken.map((item,key)=>(
               
                 <Option key={item.id}>{item.sub}</Option>
                ))
              }
            </Select>

            <Input placeholder="学院/专业/教师" onChange={this.Onsearch.bind(this)}  className="fl input" />

            <Button type="primary" onClick={this.searchData.bind(this)}  className='uessearch fl'>查询</Button>
           

           

        </div>
        </div>
      
  
      )
    }
  }

  




  export default XkStatic_part1;