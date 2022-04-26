/*
 * @Author: yrj 
 * @Date: 2019-02-26 13:59:41 
 * @Last Modified by: yrj
 * @Last Modified time: 2019-03-18 15:14:38
 * 教学反思--我的考勤
 */

import  React,{ Component } from "react";
import  "../../../../css/teacher/Edutitle.scss";
import Echars from "./Echars.jsx";
import {connect} from 'react-redux';
import {GETEDUDATA} from '../../../../redux/Edutitilereducer.js';

@connect(state=>state,{GETEDUDATA})
class Edutitle extends Component{
    
    componentDidMount = () => {
      
        this.props.GETEDUDATA()
    }
    

    render(){
       
        console.log(this.props.Edutitilereducer,"success");
        var {attendance, order,quality}=this.props.Edutitilereducer;
        
        return(
            <div className="Edubox clear">
                <div className="Edulist">
                    <span className="Ed_head">我的考勤</span>
                    <div className="strange clear">
                        <div className="str_r">
                        <p>调课换课：<span>{attendance.changing}</span></p>
                        <p>迟到：<span>{attendance.late}</span></p>
                        <p>早退：<span>{attendance.leaveel}</span></p>
                        <p>缺勤：<span>{attendance.Skipping}</span></p>
                        </div>
                        <div  className="str_l">
                            <div className="str_data">
                                <span>{attendance.late+attendance.leaveel+attendance.Skipping}</span>
                                <span>考勤异常</span>
                            </div>
                            <Echars/>
                        </div>
                    </div>
                </div>
                <div className="Edulist">
                    <span  className="Ed_head">课堂秩序</span>
                    <ul>
                        <li>
                            <p>课堂总数</p>
                            <span className="hui">{order.allclass}</span>
                        </li>
                        <li>
                            <p>异常数</p>
                            <span className="ju">{order.abnormal}</span>
                        
                        </li>
                        <li>
                            <p>违纪扣分</p>
                            <span className="huang">{order.violation}</span>
                        </li>
                    </ul>
                </div>
                <div className="Edulist">
                    <span  className="Ed_head">教学质量</span>  
                    <ul>
                        <li>
                            <p>教研评分</p>
                            <span className="hui">{quality.teaching}</span>
                        </li>
                        <li>
                            <p>教研课数</p>
                            <span className="ju">{quality.classnum}</span>
                        
                        </li>
                        <li>
                            <p>听过我的课</p>
                            <span className="huang">{quality.listen}</span>
                        </li>
                    </ul> 
                </div>
            </div>
        )
    }

}



export default Edutitle;