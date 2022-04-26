/*
 * @Author: JC.Liu 
 * @Date: 2019-02-23 22:34:10 
 * @Last Modified by: xiangting
 * @Last Modified time: 2019-03-15 16:31:58
 * 在线巡课 - 定时巡课(教师)
 */
import React, { Component } from 'react';
import TimingPatrolImgs from '../../../component/admin/zxxk/dsxk/dsxkImgs';
import TimingPatrolDate from '../../../component/admin/zxxk/dsxk/dsxkDate';
import '../../../../css/admin/xkTiming.scss';

export class XkInterval extends Component {
    render() {
        return (
            <div className='xq-timing-patrol-con clearfix'>
                <TimingPatrolImgs />
                <TimingPatrolDate />
            </div>
        )
    }
}
