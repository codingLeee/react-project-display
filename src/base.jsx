/*
 * @Author: JC.Liu 
 * @Date: 2019-02-26 14:49:08 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-15 14:48:57
 */
import React, { Component } from 'react';
import { Menu, Modal, Icon } from 'antd';
import { G } from './js/g';
import { withRouter, NavLink, matchPath } from 'react-router-dom';
import _ from 'lodash';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const MenuItem = Menu.Item;

/**
 * 字体图标
 */
export class SVG extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let style = {
			...this.props.style,
			cursor: "pointer"
		};
		// if (this.props.width) style.width = this.props.width;
		// if (this.props.height) style.height = this.props.height;
		// if (this.props.color) style.color = this.props.color;
		/**增加点击事件 */
		let clickHandle = () => {
			if (this.props.onClick) {
				this.props.onClick();
				return this.props.onClick;
			} else {
				return () => { }
			}
		}

		// return (
		// 	<img className={this.props._className | ""} onClick={clickHandle} src={this.props.type} alt={this.props.title | ""} style={{ ...style }} />
		// );
		return (
			<svg title="" aria-hidden="true" className="icon" onClick={clickHandle} style={style} >
				<use xlinkHref={`#icon-${this.props.type}`}>
					<title>{this.props.title | ""}</title>
				</use>
			</svg>
		)
	}
}

class LeftM extends Component {
	constructor() {
		super();
		this.state = {
			openKeys: [],
			selectedKeys: [],
			overview: false,
			path: ""
		}
		this.rootSubmenuKeys = [];
	}

	componentDidUpdate(props, state) {
		const path = this.props.location.pathname;
		if (path !== state.path) {
			this.setState({
				path
			})
			const match1 = matchPath(path, { path: `/${this.props.role}/:group` }),
				match2 = matchPath(path, { path: `/${this.props.role}/:group/:menu` }),
				match3 = matchPath(path, { path: `/${this.props.role}/:group/:menu/:page` });
			if (match3) {
				// 有三级目录  选出 openKeys 和 selectedKeys
				let group = match3.params.group,
					menu = match3.params.menu,
					page = match3.params.page;
				this.setState({
					openKeys: [`${group}_${menu}`],
					selectedKeys: [`${group}_${menu}_${page}`]
				})
			} else if (match2) {
				// 有二级目录 选中 selectedKeys
				let group = match2.params.group,
					menu = match2.params.menu;
				this.setState({
					openKeys: [],
					selectedKeys: [`${group}_${menu}`]
				})
			} else if (match1) {
				// 只有一级目录 无需选中
				this.setState({
					openKeys: [],
					selectedKeys: []
				})
			}
		}
	}

	/**
	 * @desc menuItem 的点击事件 用于选中左侧的菜单
	 * @param {object} item 
	 * @param {string} key 
	 * @param {array}  keyPath
	 */
	menuItemClick = ({ item, key, keyPath }) => {
		this.setState({
			selectedKeys: [`${key}`]
		})
	}

	/**
	 * @desc menu 展开函数
	 * @param {array}  选中过的展开项
	 */
	onOpenChange = (openKeys) => {
		const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
		if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			this.setState({
				openKeys: latestOpenKey ? [latestOpenKey] : [],
			});
		} else {
			this.setState({
				openKeys
			});
		}
	}

	/**
	 * @desc 根据path来渲染左侧menu
	 *
	 */
	renderMenu = () => {
		const path = this.props.location.pathname;
		const match = matchPath(path, { path: `/${this.props.role}/:group` });
		let model = [];
		if (G.modelConfig && G.modelConfig.length) {
			G.modelConfig.map((item, index) => {
				if (item.display) {
					model.push(item)
				}
			})
		}

		if (match && match.params) {
			const group = match.params.group;
			let target = _.find(model, { path: group });
			return <div>
				{
					// 大数据的可视化中心
					group === "stdsj" ?
						<div className="JC-stdsj">
							<div className="JC-overview" onClick={() => { 
								window.open("/overview");
							}}>
								<span>可视化中心</span><SVG type="jinru" color="#31a9ff" width="26px" height="26px" />
							</div>
							<div className="JC-tabCenter">
								<p>报告中心</p>
								<img src={require("./icon/reportCenter.png")} alt="报告中心" />
							</div>
						</div>
						: null
				}
				<Menu
					style={{ background: "#e3e6e9" }}
					mode="inline"
					onOpenChange={this.onOpenChange}
					openKeys={this.state.openKeys}
					selectedKeys={this.state.selectedKeys}
				>
					{
						target && target.children && target.children.length ?
							// 头部导航
							target.children.map((item, index) => {
								// 二级目录
								if (item.children && item.children) {
									// 有三级目录
									return <SubMenu key={`${group}_${item.path}`} title={item.modelName}>
										{
											item.children.map((it, idx) => {
												return <MenuItem key={`${group}_${item.path}_${it.path}`} onClick={this.menuItemClick}>
													<NavLink key={index} to={`/${this.props.role}/${group}/${item.path}/${it.path}`} activeClassName="JC-menuNavLink">
														<span className="JC-leftMenuSpan" >
															<SVG type="xztb" width={20} height={20} color="#1890ff" />
														</span>
														{it.modelName}
													</NavLink>
												</MenuItem>
											})
										}
									</SubMenu>
								} else {
									// 有二级导航 
									return <MenuItem key={`${group}_${item.path}`} onClick={this.menuItemClick}>
										<NavLink to={`/${this.props.role}/${group}/${item.path}`}>{item.modelName}</NavLink>
									</MenuItem>
								}
							})
							:
							// 只有一级导航
							null
					}
				</Menu>
			</div>
		}
	}

	render() {
		return (
			<div>
				{this.renderMenu()}
			</div>
		)
	}
}

export const LeftMenu = withRouter(LeftM);




/**
 * @desc  全局modal提示框
 * @param {object} obj
 * @param {string} tit  提示标题
 * @param {string} ctn  提示的内容 接收传入的是 React Component
 * @param {string} oT   ok 按钮的文字展示
 * @param {string} cT   取消按钮的文字展示
 * @param {string} className  class名
 * @param {string} okFun  点击ok按钮执行函数 
 * @param {string} canFun 点击取消按钮执行函数
 */
export const ModalTip = (obj) => {
	const { tit = "提示", ctn = "", oT = "确认", cT = "取消", className = "", okFun = () => { }, canFun = () => { }, } = obj
	Modal.confirm({
		title: tit,
		content: ctn,
		okText: oT,
		className: className ? `${className} JC-modal` : "JC-modal",
		cancelText: cT,
		onOk: okFun,
		onCancel: canFun
	})
}


/**
 * @desc  全局loading代码
 */

export class Loading extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		let style = {
			...this.props.style,
			cursor: "pointer"
		};
		let tit = this.props.tit;

		return (
			<div className='all-loading'>
				<Icon type="loading-3-quarters" style={style} tit={tit ? tit : '正在查找数据...'} />
				<p>{tit ? tit : '正在查找数据...'}</p>
			</div>
		)
	}
}