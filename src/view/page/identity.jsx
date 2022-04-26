/*
 * @Author: JC.Liu 
 * @Date: 2019-03-18 10:37:06 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-27 16:35:45
 * 多重身份进行选择页面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, message } from 'antd';
import _ from 'lodash';
import { G } from './../../js/g';
import Menu from './../../menu';
import { SVG } from './../../base'
@connect(state => state.LoginReducer, {})
class Identity extends Component {

  componentDidMount() {
    // 选择身份页面如果没有角色信息就跳回登录页重新登录。
    if (!this.props.role) {
      //清除缓存
      if (!window.sessionStorage) {
        return false;
      } else {
        //不保存失败
        window.sessionStorage.clear();
      }
      //修改提示
      // message.error("请确认您的用户名或密码输入正确!", 3000);
      
      this.setState({
        showmess: true,
        erromess: '请确认您的用户名或密码输入正确!'
      })
      console.log("没有身份");
      this.props.history.push('/login');
      return
    }

    if (this.props.role && this.props.role.length === 1) {
      this.checkRoleOneOrTwo(this.props, this.props.role[0]);
    }
  }

  /**
   * @desc  点击身份进入不同的身份页面
   * @param { object } obj  this.props 主要是获取用户登录信息
   * @param { string } roleId 用户点击的身份id
   */
  btnClick = (obj, roleId) => {
    const { role } = obj
    let t = _.find(role, { roleId });

    this.checkRoleOneOrTwo(obj, t)
  }


  checkRoleOneOrTwo = (obj, t) => {
    console.log(t)
    const { accountId = "", photo = "", sex = null, token = "", orgCode = "", userId = "" } = obj
    new Promise((resolve, reject) => {
      // 将用户信息存在全局 G 中
      G.baseinfo = {
        // 用户名
        uname: t.roleName,
        // 老师账号  此接口返回的该id 还存在问题，后面根据接口来看
        teacherid: '2018015',//userId
        // 账号级别  1 超管 2 普管 3 巡课员(有在线巡课) 4 教师 
        roleLevel: t.roleLevel,
        // 系统名
        systemname: '课堂生态',
        // 性别 0 女 1 男 
        sex,
        // 用户头像图片地址
        photo,
        // 用于展示的账号+用户名     510900_SUPERUSER
        accountId,
      }
      G.token = token;
      G.orgCode = orgCode;
      // 根据点击的角色进行模块配置
      this.screenFunc(t.roleLevel, t.function);
      
      resolve();
    }).then(() => {
      // 跳去loading页去获取全局请求信息
      this.props.history.push("/loading");
    })
  }

  /**
   * @desc 根据身份下进行模块筛选
   * @param { number }  roleLevel  身份等级，1 超管 2 普管 3 巡课员(有在线巡课) 4 教师
   * @param { array } funcArr  所选身份功能模块
   */
  screenFunc = (roleLevel, funcArr) => {
    let moduleConfig = {}
    switch (roleLevel) {
      case 1:
        // 超管
        moduleConfig = {
          // 生态大数据 
          bigData: _.find(funcArr, { functionId: "22" }) ? true : false,
          // 在线巡课
          onlineLookClass: _.find(funcArr, { functionId: "23" }) ? true : false,
          // 听评课
          listenClass: _.find(funcArr, { functionId: "24" }) ? true : false,
          // 教学检查
          teachCallBack: _.find(funcArr, { functionId: "26" }) ? true : false,
        }
        break;
      case 2:
        // 普管
        moduleConfig = {
          // 生态大数据 
          bigData: _.find(funcArr, { functionId: "22" }) ? true : false,
          // 在线巡课
          onlineLookClass: _.find(funcArr, { functionId: "23" }) ? true : false,
          // 听评课
          listenClass: _.find(funcArr, { functionId: "24" }) ? true : false,
          // 教学检查
          teachCallBack: _.find(funcArr, { functionId: "26" }) ? true : false,
        }
        break;
      case 3:
        // 巡课员
        moduleConfig = {
          // 在线巡课
          onlineLookClass: _.find(funcArr, { functionId: "23" }) ? true : false,
          // 听评课
          listenClass: _.find(funcArr, { functionId: "24" }) ? true : false,
          // 教学反思
          teachCallBack: _.find(funcArr, { functionId: "27" }) ? true : false,
        }
        break;
      case 4:
        // 老师
        moduleConfig = {
          // 听评课
          listenClass: _.find(funcArr, { functionId: "24" }) ? true : false,
          // 教学反思
          teachCallBack: _.find(funcArr, { functionId: "27" }) ? true : false,
        }
        break;
      default:
        break;
    }
    // 配置功能模块项
    G.modelConfig = Menu(roleLevel, moduleConfig);
    sessionStorage.setItem("modelConfig", JSON.stringify(G.modelConfig));
  }

  render() {


    return (
      <div className="JC-identity">
        <div className='svg-log'><SVG type='logo' style={{ color: 'white', width: '100%', height: '100%' }} ></SVG></div>
        <div className="JC-chioce">
          {
            this.props.role && this.props.role.length > 1 ?
              this.props.role.map((item, index) => {
                return <Button key={index} onClick={() => this.btnClick({ ...this.props }, item.roleId)} >{item.roleName}</Button>
              })
              : null
          }
        </div>
      </div>
    )
  }
}
export default Identity;
