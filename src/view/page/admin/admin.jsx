/*
 * @Author: JC.Liu 
 * @Date: 2019-02-24 21:19:13 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-27 16:48:58
 */
import React, { Component } from 'react';
import { G, findGlobalData } from './../../../js/g';
import { Layout, } from 'antd';
import { Route, Switch, Redirect, matchPath, } from 'react-router-dom';
import { LeftMenu } from './../../../base';
import JxjcIndex from './jxjc/index';
import TpkIndex from './tpk/index';
import ZxxkIndex from './zxxk/index';
import BigData from './stdsj/index';
import Avatar from './../avatar';
import PerfectScrollbar from 'react-perfect-scrollbar';
import _ from 'lodash';

const { Sider, Content } = Layout;
const role = "admin";
class Admin extends Component {
	constructor() {
		super();
		this.state = {
			sider: "block",
		}
		if (!G.modelConfig || !G.modelConfig.length) {
			findGlobalData().then(res => { }).catch((err) => {
				this.props.history.push("/login");
			});
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
			return <Redirect to={`/admin/${FirstTarget.path}/${FirstTarget.children[0].path}`} />
		} else {
			// 没有 /group/page
			return <Redirect to={`/admin/${FirstTarget.path}`} />
		}
	}


	render() {
		return (
			<React.Fragment>
				<div className="JC-project" >
					<div className="JC-header">
						<div className="JC-title">课堂生态平台</div>
						<div className="JC-headerNav">
							<ul>
								{
									G.modelConfig && G.modelConfig.length ?
										G.modelConfig.map((item, index) => {
											const path = this.props.location.pathname;
											const match = matchPath(path, { path: `/${role}/:path` });
											let paramPath = "";
											if (match) {
												paramPath = match.params.path;
											}

											if (item.display) {
												return <li
													key={index}
													onClick={() => {
														if (item.children && item.children.length) {
															this.props.history.push(`/${role}/${item.path}/${item.children[0].path}`);
														} else {
															this.props.history.push(`/${role}/${item.path}`)
														}
													}}
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
							<Sider style={{ display: this.state.sider }}>
								<div className="JC-leftMenu">
									<div className="JC-sider">
										<LeftMenu role={role} />
									</div>
								</div>
							</Sider>
							<Content>
								<PerfectScrollbar>
									<div className="JC-content-wrap">
										<Switch>
											{/* 二级目录 */}
											<Route path={`/${role}/zxxk`} component={ZxxkIndex} />
											<Route path={`/${role}/tpk`} component={TpkIndex} />
											<Route path={`/${role}/jxjc`} component={JxjcIndex} />
											<Route path={`/${role}/stdsj`} component={BigData} />
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
			</React.Fragment>
		)
	}
}

export default Admin;
