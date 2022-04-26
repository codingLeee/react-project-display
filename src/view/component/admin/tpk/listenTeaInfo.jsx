/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: xiangting
 * @Last Modified time: 2019-03-26 10:46:31
 * 听评课-管理员部分-随堂听任务-教师课堂信息部分
 */
import React, { Component } from 'react';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
// import '../../../css/iconfont.css';

import './../../../../css/admin/mj_listenTeaInfo.css';

class ListenTeaInfo extends Component {

  render() {
    // console.log(this.props.data.teacherId);
    return (
      <div>
        {
          this.props.data.teacherId === '' || this.props.data.id === ''
            ?
            <div className='mj-lti-perCon mj-lti-perCon1'>
              {/* 头像 */}
              <div className='mj-lti-headImg'>
                <Avatar className='mj-lti-uhead' />
              </div>
              {/* 右侧 */}
              <div className='mj-lti-perInfo'>
                <p className={'mj-lti-num' + this.props.num}>{this.props.num < 3 ? this.props.num + 1 : this.props.num - 2}</p>
                <div>
                  <span>待上榜...</span>
                  <span></span>
                  <div className='mj-lti-clear'></div>
                </div>
              </div>
              <div className='mj-lti-perNone'></div>
            </div>
            :
            <div className={'mj-lti-perCon'}>
              {/* 头像 */}
              <div className='mj-lti-headImg'>
                {
                  this.props.thePer === 'mj'
                    ?
                    <Link to={`/admin/tpk/sttrw/TpkManaLisInfo/t${this.props.data.teacherName}/${this.props.data.teacherId}`}>
                      <Avatar className='mj-lti-uhead' />
                    </Link>
                    :
                    <Link to={`/admin/tpk/jyrw/reLessonDe/reId=${this.props.data.id}&reName=${this.props.data.teacherName}`}>
                      <Avatar className='mj-lti-uhead' />
                    </Link>
                }
              </div>
              {/* 右侧 */}
              <div className='mj-lti-perInfo'>
                <p className={'mj-lti-num' + this.props.num}>{this.props.num < 3 ? this.props.num + 1 : this.props.num - 2}</p>
                <div>
                  <span title={this.props.data.teacherName}>{this.props.data.teacherName||'-'}</span>
                  <span title={this.props.apply ? this.props.apply : this.props.finished + '/' + this.props.all}>{this.props.apply ? this.props.apply : this.props.finished + '/' + this.props.all}</span>
                  <div className='mj-lti-clear'></div>
                </div>
                {
                  this.props.thePer === 'mj'
                    ?
                    <Link to={`/admin/tpk/sttrw/ListenNote/f${this.props.data.teacherId}/${this.props.data.teacherName}`}>
                      <i className='mj-lti-link'>查看听课本</i>
                    </Link>
                    :
                    <Link to={`/admin/tpk/jyrw/reBook/${this.props.data.id}/${this.props.data.teacherName}`}>
                      <i className='mj-lti-link'>查看教研本</i>
                    </Link>
                }
              </div>
            </div>
        }
      </div>
    );
  }
}

export default ListenTeaInfo;