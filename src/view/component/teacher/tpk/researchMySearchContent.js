/*
 * @Author: 蒲飞 
 * @Date: 2017-09-19 10:01:59 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-13 15:55:26
 * 我的教研课--教研课查询--查询的内容
 */
import React, { Component } from 'react';
import { Button, Anchor, Spin, Table, Icon, Timeline } from 'antd';
import ResearchContentWeek from './researchContentWeek';
import './../../../../css/teacher/mj_researchMySearchContent.css';
import util from './../../../../js/_x/index.js';
const toChinese = util.util.number.toChinese;

class ResearchMySearchContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isredselected: true,//1未完成的评课   
      isgreenselected: true,//2已完成的评课
      isorangeselected: true,//3未开始的评课
      isblueselected: true,//4我的教研授课
      statusType: [true, true, true, true],//教研课状态类型
    };

    this.selectedColor = this.selectedColor.bind(this);
  }

  onhandlechangecolor(val, e) {
    switch (val) {
      case 1:
        this.setState({
          isredselected: !this.state.isredselected
        });
        break;
      case 2:
        this.setState({
          isgreenselected: !this.state.isgreenselected
        });
        break;
      case 3:
        this.setState({
          isorangeselected: !this.state.isorangeselected
        });
        break;
      case 4:
        this.setState({
          isblueselected: !this.state.isblueselected
        });
        break;
    };
    var switchStatus = [
      val == 1 ? !this.state.isredselected : this.state.isredselected,
      val == 2 ? !this.state.isgreenselected : this.state.isgreenselected,
      val == 3 ? !this.state.isorangeselected : this.state.isorangeselected,
      val == 4 ? !this.state.isblueselected : this.state.isblueselected
    ];
    this.setState({
      statusType: switchStatus
    });
  }
  //周次的点击事件
  handleClick(index, week) {
    this.props.handleClicks(index);
    document.getElementById(`week${week}`).scrollIntoView();
  }
  //匹配状态颜色
  selectedColor(status) {
    var className = '';
    switch (status) {
      case 1:
        return className = 'zq-r-red';
      case 2:
        return className = 'zq-r-green';
      case 3:
        return className = 'zq-r-orange';
      case 4:
        return className = 'zq-r-blue';
    };
  }

  render() {
    return (
      <div>
        <div className="pf-r-searchcontent">
          <div className="pf-t-schtypes pf-r-searchtypes">
            <ul className="pf-t-schtitltleft">
              <li onClick={this.onhandlechangecolor.bind(this, 1)}>
                <span className={this.state.isredselected ? 'pf-t-schtitletype zq-r-redselected' : 'pf-t-schtitletype zq-r-grayselected'} >
                </span>
                <span className="pf-t-schtype">未完成的评课</span>
              </li>
              <li onClick={this.onhandlechangecolor.bind(this, 2)}>
                <span className={this.state.isgreenselected ? 'pf-t-schtitletype zq-r-greenselected' : 'pf-t-schtitletype zq-r-grayselected'}>
                </span>
                <span className="pf-t-schtype">已完成的评课</span>
              </li>
              <li onClick={this.onhandlechangecolor.bind(this, 3)}>
                <span className={this.state.isorangeselected ? 'pf-t-schtitletype zq-r-orangeselected' : 'pf-t-schtitletype zq-r-grayselected'}>
                </span>
                <span className="pf-t-schtype">未开始的评课</span>
              </li>
              <li onClick={this.onhandlechangecolor.bind(this, 4)}>
                <span className={this.state.isblueselected ? 'pf-t-schtitletype zq-r-blueselected' : 'pf-t-schtitletype zq-r-grayselected'}>
                </span>
                <span className="pf-t-schtype">我的教研授课</span>
              </li>
            </ul>
          </div>
          {/* 没有数据提示 */
            this.props.result ? '' : <div className='zq-r-noresult'><span className='iconfont'>&#xe613;</span>未查询到相关数据</div>
          }{/*加载提示*/
            this.props.isloading ? <div className='zq-r-loading'><Spin /></div> : ''
          }
          <div className="pf-r-searchinfo">
            <div className='zq-r-line'></div>
            <div className='pf-r-searchleft'>
              <ul id='weeks'>
                {
                  this.props.weeks.map((week, i) => <li key={i} className='zq-weekbox' id={"weekindex" + i} onClick={this.handleClick.bind(this, i, week)}>
                    <span className={this.props.clickIndex == i ? 'clicked' : ''}>第{toChinese(week)}周</span>
                  </li>)
                }
              </ul>
            </div>
            <div className='pf-r-searchright' id='content' onScroll={this.props.handleScroll}>
              {/* flag标识--true为我的教研课，false为随堂听 */
                this.props.weeks.map((week, i) => <ResearchContentWeek key={i} data={week} allCourse={this.props.allCourse} statusType={this.state.statusType} selectedColor={this.selectedColor} flag={true}></ResearchContentWeek>)
              }
            </div>
          </div>
        </div>
      </div >

    );
  }
}

export default ResearchMySearchContent;