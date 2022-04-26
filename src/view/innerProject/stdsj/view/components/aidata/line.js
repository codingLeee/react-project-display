/*
 * @Author: zhengqi 
 * @Date: 2018-11-11 14:30:22 
 * @Last Modified by: zhengqi
 * @Last Modified time: 2018-11-16 15:39:54
 * 时长进度条 alipersInfo:刻度  lineType:刻度类型 1课堂行为 0老师行为
 */
import React, { Component } from 'react';
import { Tooltip } from 'antd';
import scale from './../../../img/scale.png';
import _x from './../../../js/_x/index'
const TimeLength = _x.util.date.TimeLength;

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let { alipersInfo, lineType, listTime } = this.props;
    let length = alipersInfo.length - 1;
    return (
      <div>
        <div className='zq-line-bc' style={{ height: lineType ? '16px' : '6px' }}>
          {
            listTime.map((item, i) => (
              <Tooltip overlayClassName='zq-line-tooltip' key={i} placement="top"
                title={<div><p>{item.tooltip}</p><p>{item.time}</p></div>}>
                <span key={i}
                  style={{
                    left: item.positionNum + '%', width: item.activeLong + '%',
                    backgroundColor: item.color, height: lineType ? '16px' : '6px',
                    zIndex: item.zIndex
                  }}></span>
              </Tooltip>
            ))
          }
        </div>
        <div className='zq-lin-alipers'>
          {
            alipersInfo.map((item, i) => {
              {/* return <div key={i} style={{ left: (100 / length) * i + '%' }}><img src={scale} alt="" /><span>{item}</span></div> */}
              return <div key={i} style={{ left: (100 / length) * i + '%', width: (100 / length) + '%'}}><i className="lxx-u-point"></i><span>{item}</span></div>
            }
            )
          }
        </div>
      </div>
    );
  }
}

export default Line;