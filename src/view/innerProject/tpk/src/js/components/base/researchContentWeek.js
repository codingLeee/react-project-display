/*
 * @Author: 蒲飞 
 * @Date: 2017-09-19 18:59:11 
 * @Last Modified by: 蒲飞
 * @Last Modified time: 2017-09-19 20:02:49
 */
import React, { Component } from 'react';
import '../../../css/components/base/researchContentWeek.css'

class ResearchContentWeek extends Component{  
  render(){
    let week=1;
    return (
      <div>
        <div className="pf-r-searchcontentweek">
          <div className="pf-r-searchline">
            <div className="pf-r-searchcircle"></div>
            <div className="pf-r-searchbigcircle"></div>                  
          </div>
          <span className="pf-r-searchcontenttitle">第{week}周</span>
        </div>
        <div className="pf-r-searchcontentweekcourse">
          <div className="pf-r-searchcourseline">
            <div className="pf-r-searchcourseweekinfo">星期一</div>
            <div className="pf-r-searchcoursecircle"></div>               
          </div>
          <div className="pf-r-searchcoursecard">
            <div className="pf-r-searchcourseinfo">
              <ul>
                <li>语文组教研活动</li>
                <li>第五节</li>
                <li>李老师</li>
                <li>语文</li>
                <li>高一二班</li>
              </ul>              
            </div>
            <div className="pf-r-searchcoursehandle">
              <a href="">看点评</a>
            </div>
          </div>
        </div>  
      </div>
      
    );
  }
}

export default ResearchContentWeek;