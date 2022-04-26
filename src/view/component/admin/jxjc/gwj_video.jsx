import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tree,Select  } from 'antd';
import { SVG } from '../../../../base';
import Player from '../../../publicComponent/player'
import '../../../../css/admin/gwj_video.css';
import { placeTree, getVideo, oldOrder } from '../../../../redux/checkOfRoom.reducer'
import _x from './../../../../js/_x/index';
import RoomTabs from './gwj_tabs'

const { TreeNode } = Tree;
const Option = Select.Option;
const Format = _x.util.date.format;
@connect( state => state,{
    placeTree, getVideo, oldOrder
})
export default class Video extends Component {
    constructor(props){
        super(props);
        this.state = {
            place_id:'',//教室id
            orderId:'',//节次数
            equipType:'',//设备类型
        }
    }

    componentDidMount(){
        this.props.placeTree();
    }
    /**
     * 选择教室id
     * @memberof Video
     */
    onSelect = (selectedKeys) => {
        this.setState({
            place_id: selectedKeys
        },function(){
            this.props.oldOrder({place_id:this.state.place_id})
        })
    }
    /**
     * 选择节次数
     * @memberof Video
     */
    changeCourse = (value) => {
        this.setState({
            orderId: value
        },function(){
            this.props.getVideo({place_id:this.state.place_id,orderId:this.state.orderId})
        })
    }
    
    changeCamera = (value) => {
        // console.log('***')
        this.setState({
            equipType:value
        })
    }

    renderTreeNodes = data => data.map((item) => {
        if (item.children) {
          return (
            <TreeNode title={item.name} key={item.id} dataRef={item}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode {...item}/>;
    })

    render() {
        // console.log(this.props.checkOfRoomReducer.videoInfo)
        let { placeTree,oldOrder,videoInfo } = this.props.checkOfRoomReducer;
        console.log(placeTree)
        let addrList = videoInfo.addrList == undefined ? [] : videoInfo.addrList;
        let cfp = videoInfo.cfp == undefined ? {} : videoInfo.cfp ;
        // console.log(cfp)
        // console.log(placeTree)
        return (
            <div>
                <div className="gwj-checkOfRoom-video">
                    <div className="gwj-video-header">
                        <div>教室列表</div>
                        <div>
                            <ul className="gwj-class-content">
                                <li><SVG type="weibiaoti1" /><span>{cfp.actureDate !== undefined ? Format(new Date(cfp.actureDate),'MM-dd') : ''}</span><span>{cfp.lessonStartTime !== undefined ? Format(new Date(cfp.lessonStartTime), 'HH:mm') + '-' : ''}{cfp.lessonEndTime !== undefined ? Format(new Date(cfp.lessonEndTime), 'HH:mm') : ''}</span></li>
                                {/* <li><SVG type="dizhi" /><span>基础教学楼</span></li> */}
                                <li><SVG type="laoshi" /><span>{cfp.teacherName !== undefined ? cfp.teacherName : ''}</span></li>
                                <li><SVG type="xueyuan" /><span>{cfp.gradeListName !== undefined ? cfp.gradeListName : ''}</span></li>
                                <li><SVG type="classroom" /><span>{cfp.className !== undefined ? cfp.className : ''}</span></li>
                                <li></li>
                                <li>
                                    <Select defaultValue='当前直播' style={{ width: 120 }} onChange={this.changeCourse}>
                                        { oldOrder.length ? oldOrder.map((item,index) => (
                                            <Option key={index} value={item.orderId}>{item.orderName}</Option>
                                        )) : null }
                                    </Select>
                                </li>
                                <li>
                                    <Select defaultValue="" style={{ width: 120 }} onChange={this.changeCamera}>
                                        { addrList.length ? addrList.map((item,index) => (
                                            <Option key={index} value={item.equipTypeNum}>{item.equipName}</Option>
                                        )) : null}
                                    </Select>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="gwj-video">
                        <div>
                            <Tree
                                showLine
                                defaultExpandedKeys={['0-0-0']}
                                onSelect={this.onSelect}    
                            >
                                {
                                    Object.keys(placeTree).length == 0 ? null : this.renderTreeNodes(placeTree)
                                }
                            </Tree>
                        </div>
                        <div>
                            <Player />
                        </div>
                    </div>
                </div>
                <RoomTabs curriculumallId={cfp.curriculumallId !== undefined ? cfp.curriculumallId : ''} />
            </div>
        );
    }
}