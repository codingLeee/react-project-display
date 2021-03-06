/*
 * @Author: zhengqi 
 * @Date: 2018-08-28 16:52:39 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-01 11:09:40
 */
/*报表中心菜单*/

import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link, NavLink, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { SVG } from './../../common';
import { _x } from './../../../js/index';
import G from './../../../js/g';
import './../../../css/menu.css';
const SubMenu = Menu.SubMenu;
const { Header, Content, Sider } = Layout;
const goWith = _x.util.url.goWith;

let reportMenu = [
    {
        name: '课堂秩序报表',
        key: 'ktzxbb',
        children: [
            { name: '班级报表', key: 'ktzxbb_xybb', reqPath: '/bd/r_crc' },
            { name: '违纪事件报表', key: 'ktzxbb_wjsjbb', reqPath: '/bd/r_crr' },
            { name: '任务报表', key: 'ktzxbb_rwbb', reqPath: '/bd/r_crt' },
            { name: '原始数据', key: 'ktzxbb_yssj', reqPath: '/bd/r_crd' },
        ]
    },
    {
        name: '课堂质量报表',
        key: 'ktzlbb',
        children: [
            { name: '学院报表', key: 'ktzlbb_xybb', reqPath: '/bd/r_qrc' },
            { name: '教师报表', key: 'ktzlbb_jsbb', reqPath: '/bd/r_qrte' },
            { name: '听课任务报表', key: 'ktzlbb_tkrwbb', reqPath: '/bd/r_qrta' },
            { name: '原始数据', key: 'ktzlbb_yssj', reqPath: '/bd/r_qrd' },
        ]
    },
    {
        name: '学生出勤报表',
        key: 'xscqbb',
        children: [
            { name: '班级报表', key: 'xscqbb_xybb', reqPath: '/bd/r_src' },
            { name: '原始数据', key: 'xscqbb_yssj', reqPath: '/bd/r_srd' },
        ]
    },
    {
        name: '教师考勤报表',
        key: 'jskqbb',
        children: [
            { name: '学院报表', key: 'jskqbb_xybb', reqPath: '/bd/r_trc' },
            { name: '教师报表', key: 'jskqbb_jsbb', reqPath: '/bd/r_trt' },
            { name: '考勤异常类型报表', key: 'jskqbb_kqyclxbb', reqPath: '/bd/r_tra' },
            { name: '原始数据', key: 'jskqbb_yssj', reqPath: '/bd/r_trd' },
        ]
    },
    {
        name: '报告中心',
        key: 'bgzx',
        children: [
            { name: '系统报告', key: 'bgzx_xtbg', reqPath: '/bd/r_resy' },
            { name: '自定义报告', key: 'bgzx_zdybg', reqPath: '/bd/r_recu' }
        ]
    },
];

class ReportMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: [],
            childMenu: [],
            reportMenu: reportMenu,
        };

        this.rootSubmenuKeys = [];
    }

    /*报表菜单只展开一个*/
    onOpenChange = (openKeys) => {
        let latestOpenKey;
        // const latestOpenKey =openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        openKeys.map(key => {
            if (this.state.openKeys.indexOf(key) === -1) {
                latestOpenKey = key;
            }
        });
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    /*进入可视化*/
    handleEnter = () => {
        // let location = window.location;
        // let href1 = location.href.replace(location.pathname, '/bd/s_crt');
        // window.open(href1);
        let goWhere = {
            to: 'bd/s_crd',
            with: []
        }
        goWith(goWhere);
    }

    componentWillMount() {
        let pathname = this.props.history.location.pathname;
        if (G.baseinfo.role === 2) {
            reportMenu.splice(4, 1);
            this.setState({ reportMenu })
        }
        reportMenu.map(item => {
            this.rootSubmenuKeys.push(item.key);
            if (item.children) {
                let i = _.findIndex(item.children, { reqPath: pathname });
                if (i !== -1) {
                    this.setState({ openKeys: [item.key] });
                }
            }
        });

        _x.util.request.request('getVersion', {}, res => {
            if (res.result && res.data) {
                G.isVer = res.data;
                if (res.data === '1') {
                    // 高教
                    reportMenu[0].children[0].name = '学院报表';
                    reportMenu[2].children[0].name = '学院报表';
                    if (reportMenu[1].children[0].name !== '学院报表') {
                        reportMenu[1].children.splice(0, 0, { name: '学院报表', key: 'ktzlbb_xybb', reqPath: '/bd/r_qrc' });
                        reportMenu[3].children.splice(0, 0, { name: '学院报表', key: 'jskqbb_xybb', reqPath: '/bd/r_trc' });
                    }
                } else {
                    // 普教
                    reportMenu[0].children[0].name = '班级报表';
                    reportMenu[2].children[0].name = '班级报表';
                    if (reportMenu[1].children[0].name === '学院报表') {
                        reportMenu[1].children.splice(0, 1);
                        reportMenu[3].children.splice(0, 1);
                    }
                }
                this.setState({ reportMenu: reportMenu });
                sessionStorage.isVer = JSON.stringify(res.data);
            }
        });
    }


    /*********************打包*****************************/
    componentDidMount() {
        let configInfo = JSON.parse(sessionStorage.configInfo)[0];
        let childrenList = configInfo.childrenList;
        let childMenu = [];
        childrenList.map(item => {
            if (item.functionName === '生态大数据') {
                this.setState({ childMenu: item.childrenList });
                return;
            }
        });
    }

    render() {
        let childMenu = this.state.childMenu;
        let i1 = false, i2 = false;
        if (childMenu.length) {
            i1 = _.find(childMenu, { functionName: '可视化中心' }).functionEnableFlag;
            i2 = _.find(childMenu, { functionName: '报表中心' }).functionEnableFlag;
        }
        return (
            <div className='zq-rm-Container'>
                {
                    i1 ?
                        (G.baseinfo.role !== 2 ? <div className='zq-rc-enter' onClick={this.handleEnter}><span>可视化中心</span><SVG type='enter' /></div> : null) : null
                }
                {
                    i2 ?
                        <div style={{ paddingTop: '28px' }}>
                            <div className='zq-rc-report'>
                                <p>报表中心</p>
                                <img src={require('./../../../img/reportCenter.png')} alt="" />
                            </div>
                            <Menu
                                mode="inline"
                                openKeys={this.state.openKeys}
                                onOpenChange={this.onOpenChange}
                                style={{ width: 260 }}
                                className='zq-reportM'
                            >
                                {
                                    this.state.reportMenu.map(item => (
                                        <SubMenu key={item.key} title={item.name}>
                                            {
                                                item.children.map(child => (
                                                    <Menu.Item key={child.reqPath}><NavLink activeClassName="zq-reportM-active" to={child.reqPath}><span><SVG type="xztb" /></span>{child.name}</NavLink></Menu.Item>

                                                ))
                                            }
                                        </SubMenu>
                                    ))
                                }
                            </Menu>
                        </div> : null
                }
            </div>
            // </Sider>
        );
    }
    /*********************打包*****************************/

    /**************************本地调试***********************************/
    // render() {
    //     return (
    //         <div className='zq-rm-Container'>
    //             {
    //                 G.baseinfo.role !== 2 ?
    //                     <div className='zq-rc-enter' onClick={this.handleEnter}><span>可视化中心</span><SVG type='enter' /></div> : null
    //             }
    //             <div className='zq-rc-report'>
    //                 <p>报表中心</p>
    //                 <img src={require('./../../../img/reportCenter.png')} alt="" />
    //             </div>
    //             <Menu
    //                 mode="inline"
    //                 openKeys={this.state.openKeys}
    //                 onOpenChange={this.onOpenChange}
    //                 style={{ width: 260 }}
    //                 className='zq-reportM'
    //             >
    //                 {
    //                     this.state.reportMenu.map(item => (
    //                         <SubMenu key={item.key} title={item.name}>
    //                             {
    //                                 item.children.map(child => (
    //                                     <Menu.Item key={child.reqPath}><NavLink activeClassName="zq-reportM-active" to={child.reqPath}><span><SVG type="xztb" /></span>{child.name}</NavLink></Menu.Item>

    //                                 ))
    //                             }
    //                         </SubMenu>
    //                     ))
    //                 }
    //             </Menu>
    //         </div>
    //         // </Sider>
    //     );
    // }
    /**************************本地调试***********************************/
}

ReportMenu = withRouter(ReportMenu);
export default ReportMenu;