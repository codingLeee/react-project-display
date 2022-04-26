/*
 * @Author: JudyC 
 * @Date: 2017-09-15 16:31:20 
 * @Last Modified by: JudyC
 * @Last Modified time: 2017-09-18 19:52:51
 */
import React, { Component } from 'react';
import '../../css/components/classItem.css';

class ClassItem extends Component{
  constructor(){
    super();
    this.state = {
      className:''
    }
  }
  
  // componentWillMount(){
  //   switch(this.props.color){
  //     case 'normal':
  //       this.setState({
  //         className:'cjy-ci-item cjy-ci-normal'
  //       });
  //       break;
  //     case 'grey':
  //       this.setState({
  //         className:'cjy-ci-item cjy-ci-grey'
  //       });
  //       break;
  //     case 'blue':
  //       this.setState({
  //         className:'cjy-ci-item cjy-ci-blue'
  //       });
  //       break;
  //     case 'dsbd':
  //       this.setState({
  //         className:'cjy-ci-item cjy-ci-dsbd'
  //       });
  //       break;
  //     default:
  //       this.setState({
  //         className:'cjy-ci-item'
  //       });
  //   }
  // };

  render(){
    return (
      <div>
        {/* {
          this.props.color === 'dsbd'
          ? <div className={this.state.className}>{this.props.text}</div>
          : this.props.color==='normal'
            ? <div className={this.state.className} onClick={this.handleChoseClass.bind(this)}>{this.props.text}</div>
            : <div className={this.state.className} onClick={this.handleChoseClass.bind(this)}>{this.props.text}</div>
        } */}
        {
          this.props.color === 'grey'
          ? <div className="cjy-ci-item cjy-ci-grey">{this.props.text}</div>
          : this.props.color === 'dsbd'
            ? <div className="cjy-ci-item cjy-ci-dsbd">{this.props.text}</div>
            : this.props.color==='normal'
              ? <div className="cjy-ci-item cjy-ci-normal" onClick={this.handleChoseClass.bind(this)}>{this.props.text}</div>
              : <div className="cjy-ci-item cjy-ci-blue" onClick={this.handleChoseClass.bind(this)}>{this.props.text}</div>
        }
      </div>
    );
  }
  handleChoseClass(){
    let oprt = '';
    if(this.props.color==='normal'){
      oprt = 'add';
    }else if(this.props.color==='blue'){
      oprt = 'del';
    }
    this.props.handleClassChange(oprt,this.props.classInfo);
  }
}

export default ClassItem;