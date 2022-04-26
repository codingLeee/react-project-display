import React, { Component } from 'react';
import { Tabs } from 'antd';
import MyInput from '../../../component/admin/jxjc/gwj_input'
import MyComments from '../../../component/admin/jxjc/gwj_comments'
import MyDiscipline from '../../../component/admin/jxjc/gwj_discipline'
import MyTable from '../../../component/admin/jxjc/gwj_table'
import '../../../../css/admin/gwj_tabs.css'
import { G } from '../../../../js/g'
import { commentPage } from '../../../../redux/checkOfRoom.reducer'
import { connect } from 'react-redux' 

const TabPane = Tabs.TabPane;
@connect( state => state,{
    commentPage
})
export default class RoomTabs extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage: 1,           
        }
    }

    componentDidMount(){
        this.props.commentPage({curriculumallId:this.props.curriculumallId,type:1,pageNumber:this.state.currentPage})
    }

    callback = (key) => {
        console.log(key);
    }

    render() {
        // console.log(this.props.checkOfRoomReducer.commentPage)
        let { commentPage } = this.props.checkOfRoomReducer;
        console.log(commentPage)
        commentPage = commentPage ? commentPage : {}
        console.log(commentPage)
        return (
            <div>
                <div className="gwj-tabs-box">
                    <Tabs defaultActiveKey="1" onChange={this.callback} tabBarStyle={{height:'80px',backgroundColor:'#eff3f5'}}>
                        <TabPane tab="教学检查" key="1">
                            { G.userInfo.roleType == 1 ? <MyInput curriculumallId={this.props.curriculumallId} /> : null }
                            { commentPage.page ? commentPage.page.map((item,index) => (
                                <MyComments key={index} item={item} curriculumallId={this.props.curriculumallId} />
                            )) : null}
                        </TabPane>
                        <TabPane tab="课堂秩序" key="2">
                            <MyDiscipline />
                        </TabPane>
                        <TabPane tab="教学反思" key="3">
                            tab3
                            {/* { G.userInfo.roleType == 2 ? <MyInput /> : null }
                            <MyComments /> */}
                        </TabPane>
                        <TabPane tab="课堂评分" key="4">
                            <MyTable />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}