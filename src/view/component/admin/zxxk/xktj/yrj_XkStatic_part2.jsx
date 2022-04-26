/*
 * @Author: yrj 
 * @Date: 2019-03-01 09:51:46 
 * @Last Modified by: yrj
 * @Last Modified time: 2019-03-20 09:30:45
 * 在线巡课 - 巡课统计_part2
 */

import React, { Component } from 'react';
import '../../../../../css/admin/yrj_xkStatic_part2.scss' ;
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import 'echarts/lib/chart/pie';
import tea from '../../../../../icon/default_head.png';
import nodata from './../../../../../icon/nodata1.png'
import {SVG} from '../../../../../base';
import {connect} from 'react-redux';
import {Loading} from '../../../../../base'
import{ PAGECHANGE } from './../../../../../redux/checkOfRangePicker.js';

 


@connect(state=>state , {PAGECHANGE})
export default class XkStatic_part2 extends Component {

    /**
    * @desc leftclickbutton变化时情况
    * @param 测试参数
    */

     
    constructor(props){
        super(props);
      
    }

    PageSizeChange(changetype){

    this.props.PAGECHANGE(changetype,this.props.CheckOfRangePicker)

    }


    render(){                         
      
        return(
            <div className='xkStatic-part2'>
            <div className='geli'></div>
                <div className='p2_left'>
                    <P2_echarts />
                </div>
                <div className='p2_right'>

                <div className='teacher_mes_showbox'>
                {this.props.CheckOfRangePicker.loadingdom?<div className='loadingbox'><Loading style={{width:'30px',height:'30px'}} tit='正在查找数据...' /></div>:null}
                <ul className='teacher_mes_box'>

                {
                this.props.CheckOfRangePicker.datalist[0]==['']?<div className='nodata'><img src={nodata} /></div>:this.props.CheckOfRangePicker.datalist.map((item,i) => (
               <li key={i}>
               <div className='teacher_pic'>
               <img src={tea}/>
               </div>
               <div className='teacher_mes'>
               <span>{item.name}</span>
               <span>{item.scool}</span>
               <div className='small_tb'>{item.teachernum}</div>
               </div>
               </li>
               ))
               
               }
                
                </ul>

                </div>
               {
                this.props.CheckOfRangePicker.pageNumber<=1?null:<div className='leftclickbutton' onClick={this.PageSizeChange.bind(this,'left')}><SVG type="xiangzuo" style={{width:'20px',height:'26px',color:'white'}}/></div>
               }
            
               {
                this.props.CheckOfRangePicker.pageNumber>=this.props.CheckOfRangePicker.maxpage?null:<div className='rightclickbutton' onClick={this.PageSizeChange.bind(this,'right')}><SVG type="xiangzuo" style={{width:'20px',height:'26px',color:'white'}} /></div>
               }
               
                </div>
               
            </div>
        )
    }
    
}



class P2_echarts extends Component {
    /**
     * @description 饼状图配置
     */
    initPie() {
        const option = {  
        graphic:[{
                type:'text',
                left:'center',
                top:'center',
                style:{
                    text:'90%',
                    fill:'#03e197',
                    fontSize:30,
                  
                }
            }],
            
        series: [{
            
          type: 'pie',
          name:'巡课任务完成度',
          slient:'true',
          hoverAnimation:false,
          radius: ['75%', '100%'], 
          label: {
              position: 'center',
             
          },
          
          data: [{
                  value: 90,
                  tooltip: {
                    show: false
                    },
                    label: {
                        normal: {
                            textStyle: {
                                color:'#03e197' 
                                } 
                            },
                             emphasis:{
                                textStyle: {
                                color:'#03e197' 
                                }   
                             }

                    },
                    itemStyle:{
                        normal:{color:'#00cc88'},
                        emphasis:{color:'#00cc88'}
                    }
              
              },
              {
                  value: 10,
                  itemStyle:{
                      normal:{color:'#ebebeb'},
                      emphasis:{color:'#ebebeb'}
                    },
               
                  
              }
          ]
      }]
        }
        return option;
      }

    render(){
        return(
            <div className='echarts_box'>
            <ReactEcharts className='echarts_ok'  option={this.initPie()}  style={{width:'160px',height:'160px'}} />
            <p>巡课任务完成度</p>
            </div>
        );
    }
}
