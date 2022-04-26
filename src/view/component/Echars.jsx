/*
 * @Author: yrj 
 * @Date: 2019-02-26 13:59:41 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-2-26 14:29:20
 * 教学反思--我的考勤圆环
 */

import  React,{ Component } from "react";
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';


// 引入柱状图
import  'echarts/lib/chart/bar';

export default class Echars extends Component{

    componentDidMount() {
       
       // 基于准备好的dom，初始化echarts实例
       var myChart = echarts.init(document.getElementById('main'));
       // 绘制图表
       myChart.setOption({
           
            series: {
               
                type: 'pie',
                data: [{value:100,
                        name:'考勤异常',
                        itemStyle:{color:'rgb(255,91,64)'}
                        }],
                hoverAnimation:false,
                radius : ['75%', '100%'],
                label: {
                    normal: {
                        show:false,
                        fontSize: '10',
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '8',
                            fontWeight: 'bold',
                        }
                    }
                },
                labelLine:{
                    show:false
                    }
                }
                
          
       });
        
    }

    render(){
        return(
            <div id='main' style={{width:'108px',height:'108px'}}></div>
            
        )
    }
}