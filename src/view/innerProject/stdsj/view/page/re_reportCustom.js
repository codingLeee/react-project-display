/*
 * @Author: lxx 
 * @Date: 2018-08-28 10:06:22 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-12 11:00:09
 * 报告中心-自定义报告
 */
import React from 'react';
import '../../css/znReport.css'
import ZnReportHead from './../components/report/znReportHead'
import ZnReportTable from './../components/report/znReportTable'
import TopMenu from './../components/base/topMenu';
import ReportMenu from './../components/base/reportMenu';
import {Container} from './../common';
import PerfectScrollbar from 'react-perfect-scrollbar';

class RepCustom extends React.Component {

  constructor(){
    super();
    this.state = {
      width:""
    }
  }

  componentDidMount(){
    // let box = this.tablebox.clientHeight;
    // this.setState({
    //   width: box - 222
    // })
  }
  // 置顶
  goTop = () => {
    this.node.scrollIntoView();
  }

  render() {
    // return (
    //   <Container>
    //   <TopMenu />
    //   <ReportMenu />
    //   <PerfectScrollbar>
    //   <div className='zq-report-container'>
    //   <div className="zn-bg" ref={(ref) => this.node = ref}>
    //       <ZnReportHead/>
    //       <ZnReportTable goTop={this.goTop} />
    //   </div>
    //   </div>
    //   </PerfectScrollbar>
    // </Container>
    // );
    return (
      <div className='zq-report-container'>
        <div className="zn-bg" ref={(ref) => this.node = ref}>
            <ZnReportHead/>
            <ZnReportTable goTop={this.goTop} />
        </div>
      </div>
    );
  }
}

export default RepCustom;
