/*
 * @Author: lxx 
 * @Date: 2018-08-28 12:05:43 
 * @Last Modified by: zhengqi
 * @Last Modified time: 2018-12-17 13:28:21
 * 加载页
 */

import React from 'react';
import './../../css/loading.css';
import ReactLoading from "react-loading";
import { _x } from './../../js/index';

const RequestList = _x.util.request.requestMultiple;

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 2,
            isJump: false
        };
    }

    componentDidMount() {
        // 获取接口数据
        this.getPublicData();
        let redirectTimer = () => {
            setTimeout(() => {
                let tm = this.state.timer - 1;
                this.setState({
                    timer: tm
                });
                if (this.state.timer <= 0 && this.state.isJump) {
                    this.props.history.push('/bd/r_crc');
                } else {
                    redirectTimer()
                }
            }, 1000)
        }
        redirectTimer();
    }

    /**
     * 获取全局
     */
    getPublicData() {
        let reList = [
            /**********本地调试*************/
            // {
            //     method: 'api/web/user_setting/get_functions',
            //     params: {},
            //     success: (res) => {
            //         if (res.result && res.data) {
            //             sessionStorage.isShowdetail = JSON.stringify(true);
            //             G.configInfo = res.data;
            //             sessionStorage.configInfo = JSON.stringify(res.data);
            //         }
            //     }
            // },
            /**********本地调试*************/
            {
                method: 'get_projectinfo',
                params: {},
                success: (res) => {
                    if (res.result && res.data) {
                        let serverTitle = res.data.projectName;
                        sessionStorage.title = serverTitle ? serverTitle : G.title;
                        document.querySelector('title').innerHTML = serverTitle || G.title;
                    }
                }
            },
            /**********打包*************/
            {
                method: 'getBigDataFunction',
                params: { key: G.baseinfo.ukey },
                success: (res) => {
                    if (res.result && res.data.length) {
                        sessionStorage.configInfo = JSON.stringify(res.data);
                        G.configInfo = res.data;
                        let serverTitle = res.data[0].functionName;
                        document.querySelector('title').innerHTML = serverTitle || G.title;

                        res.data[0].childrenList.map(item => {
                            if (item.functionName === '生态大数据') {
                                // this.setState({ childMenu: item.childrenList });
                                let i = _.find(item.childrenList, { functionName: '报表中心' }).functionEnableFlag;
                                if (i) {
                                    sessionStorage.isShowdetail = JSON.stringify(true);
                                } else {
                                    sessionStorage.isShowdetail = JSON.stringify(false);
                                }
                                return;
                            }
                        });
                    }
                }
            },
            /**********打包*************/
            {
                method: 'api/web/common/college_dropdown',
                params: {},
                success: (res) => {
                    if (res.result && res.data) {
                        G.trgList = res.data;
                        sessionStorage.trgList = JSON.stringify(res.data);
                    }
                }
            },
            {
                method: 'api/web/common/grade_dropdown',
                params: {},
                success: (res) => {
                    if (res.result && res.data) {
                        G.grdList = res.data;
                        sessionStorage.grdList = JSON.stringify(res.data);
                    }
                }
            },
            {
                method: 'api/web/common/open_org',
                params: {},
                success: (res) => {
                    if (res.result && res.data) {
                        G.openTrgList = res.data;
                        sessionStorage.openTrgList = JSON.stringify(res.data);
                    }
                }
            },
            {
                method: 'api/web/public/get_course_type',
                params: {},
                success: (res) => {
                    if (res.result && res.data) {
                        G.typeList = res.data;
                        sessionStorage.typeList = JSON.stringify(res.data);
                    }
                }
            },
            {
                method: 'api/web/common/get_tea_eventType',
                params: {},
                success: (res) => {
                    if (res.result && res.data) {
                        G.eventList = res.data;
                        sessionStorage.eventList = JSON.stringify(res.data);
                    }
                }
            }
        ];
        RequestList(reList, () => {
            this.setState({
                isJump: true
            })
        })
    }

    render() {
        let msg = `生态大数据正在准备数据，请稍等...`;
        return (
            <div className="lxx-g-loadPage">
                <h3>{msg}</h3>
                <ReactLoading type="bars" color="#fff" />
            </div>
        );
    }
}

export default Loading;