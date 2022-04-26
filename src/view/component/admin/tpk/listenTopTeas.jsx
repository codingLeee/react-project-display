/*
 * @Author: Minj 
 * @Date: 2017-09-11 10:27:54 
 * @Last Modified by: MinJ
 * @Last Modified time: 2019-03-07 10:09:24
 * 听评课-管理员部分-随堂听任务-随堂听开展情况教师头像部分列表
 */
import React, { Component } from 'react';
import { Radio } from 'antd';

import ListenTeaInfo from './../../../component/admin/tpk/listenTeaInfo';

// import '../../css/iconfont.css';
import './../../../../css/admin/mj_listenTopTeas.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class ListenTopTeas extends Component {
	render() {
		return (
			<div className='mj-ltt-teacherCon'>
				<div>
					<span className='mj-ltt-title'>申请数最多</span>
					<div>
						{
							this.props.applySort.map((value, index) => (
								<ListenTeaInfo key={index} data={value} num={index} apply={value.cnt} thePer='mj'></ListenTeaInfo>
							))
						}
						<div className='mj-ltt-clear'></div>
					</div>
				</div>

				<div className='mj-ltt-teacherConOth'>
					<span className='mj-ltt-title'>听课数最多</span>
					<div>
						{
							this.props.listenSort.map((value, index) => (
								<ListenTeaInfo key={index} data={value} num={index} apply={value.cnt} thePer='mj'></ListenTeaInfo>
							))
						}
						<div className='mj-ltt-clear'></div>
					</div>
				</div>

				<div className='mj-ltt-teacherConOth'>
					<span className='mj-ltt-title'>热度最高的老师</span>
					<div>
						{
							this.props.hotSort.map((value, index) => (
								<ListenTeaInfo key={index} data={value} num={index} apply={value.cnt} thePer='mj'></ListenTeaInfo>
							))
						}
						<div className='mj-ltt-clear'></div>
					</div>
				</div>
			</div>
		);
	}
}

export default ListenTopTeas;