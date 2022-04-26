/*
 * @Author: JC.Liu 
 * @Date: 2019-02-24 21:17:49 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-20 11:05:29
 */
import React, { Component } from 'react';
import { G, findGlobalData } from './../../../js/g';
import { Layout, } from 'antd';
import { Route, Switch, Redirect, matchPath } from 'react-router-dom';
import { LeftMenu } from './../../../base';
import ZxxkIndex from './zxxk/index';
import TpkIndex from './tpk/index';
import JxfsIndex from './jxfs/index';
import Avatar from './../avatar';
import _ from 'lodash';
import './../../../css/index.scss';
import PerfectScrollbar from 'react-perfect-scrollbar';
const { Sider, Content } = Layout;


class Teacher extends Component {
	constructor() {
		super();
		this.state = {
			sider: "block",
		}
		if (!G.modelConfig || !G.modelConfig.length) {
			findGlobalData().then(res => {}).catch(() => {
				this.props.history.push("/login");
			});
		}
	}

	componentDidMount() {
		if (!G.modelConfig || !G.modelConfig.length) {
			findGlobalData();
		}

		// 判断path 是不是 教学反思，如果是教学反思 将左侧导航隐藏
		const path = this.props.location.pathname;
		const match = matchPath(path, { path: "/teacher/:group" })
		if (match && match.params.group) {
			if (match.params.group === "jxfs") {
				this.setState({
					sider: "none"
				})
			}
		}
	}

	/**
	 * @desc  根据 modelConfig 找到第一个可展示的模块
 	 * @param { array } model  模块配置
	 */
	findRedirect = (model) => {
		let FirstTarget = _.find(model, { display: true });
		// 如果这个目录下的第一个目录下还有子目录， /group/page/menu
		if (FirstTarget.children && FirstTarget.children.length) {
			// 展开 /group/page/menu
			return <Redirect to={`/teacher/${FirstTarget.path}/${FirstTarget.children[0].path}`} />
		} else {
			// 没有 /group/page
			return <Redirect to={`/teacher/${FirstTarget.path}`} />
		}
	}

	render() {
		const role = "teacher";
		const modelConfig = JSON.parse(sessionStorage.getItem("modelConfig"));

		return (
			<div className="JC-project">
				<div className="JC-header">
					<div className="JC-title">课堂生态平台</div>
					<div className="JC-headerNav">
						<ul>
							{
								modelConfig && modelConfig.length ?
									modelConfig.map((item, index) => {
										const path = this.props.location.pathname;
										const match = matchPath(path, { path: `/${role}/:group` });
										let paramPath = "";
										if (match) {
											paramPath = match.params.group;
										}

										if (item.display) {
											return <li
												onClick={() => {
													if (index + 1 === 3) {
														this.setState({ sider: "none" })
													} else {
														this.setState({ sider: "block" })
													}
													if (item.children && item.children.length) {
														this.props.history.push(`/${role}/${item.path}/${item.children[0].path}`)
													} else {
														this.props.history.push(`/${role}/${item.path}`)
													}
												}}
												key={index}
												className={paramPath === item.path ? "JC-navActive" : null}
											>
												{item.group}
											</li>
										}
									})
									: null
							}
						</ul>
					</div>
					<div className="JC-avatar">
						<Avatar />
					</div>
				</div>
				<div className="JC-content">
					<Layout>
						<Sider style={{ display: this.state.sider }} >
							<div className="JC-leftMenu">
								<div className="JC-sider">
									<LeftMenu role={role} />
								</div>
							</div>
						</Sider>
						<Content>
							<PerfectScrollbar>
								<div className="JC-content-wrap" >
									<Switch>
										{/* 二级目录 */}
										<Route path={`/${role}/zxxk`} component={ZxxkIndex} />
										<Route path={`/${role}/tpk`} component={TpkIndex} />
										<Route path={`/${role}/jxfs`} component={JxfsIndex} />
										{
											G.modelConfig && G.modelConfig.length ?
												this.findRedirect(G.modelConfig)
												: null
										}
									</Switch>
								</div>
							</PerfectScrollbar>
						</Content>
					</Layout>
				</div>
			</div>
		)
	}
}

export default Teacher;