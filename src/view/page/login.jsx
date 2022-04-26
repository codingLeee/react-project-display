/*
 * @Author: JC.Liu 
 * @Date: 2019-03-15 11:17:47 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-27 16:30:10
 * 登录页
 */
import React, { Component } from 'react'
import { Form, message } from 'antd';
import _x from './../../js/_x/index';
import { connect } from 'react-redux';
import { saveUserInfo } from './../../redux/login.reducer';
import { SVG } from './../../base'
const Request = _x.util.request.request;


@connect(state => state.LoginReducer, { saveUserInfo })
class LoginComp extends Component {

  state = {
    erromess: '请填写您的用户名和密码',//错误信息
    showmess: true,//信息提示展示
    pass: window.localStorage.loginpass ? window.localStorage.loginpass : '',//密码
    name: window.localStorage.loginname ? window.localStorage.loginname : ''//name
  }

  componentDidMount() {
    //回避默认提示存储代码
    let pass = document.getElementById('pass');
    pass.type = 'password';

    //判断是否允许提交
    if (!(this.state.pass === '' || this.state.name === '')) {
      this.setState({
        showmess: false
      })
    }
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  //监听input
  changeInput = (e, which) => {
    let showmess = true;
    this.setState({
      [which]: e.target.value
    }, () => {
      console.log(this.state.name === '');
      if (this.state.name === '' || this.state.pass === '') {
        showmess = true
      } else { showmess = false }
      this.setState({
        showmess: showmess,
        erromess: '请填写您的用户名和密码'
      })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('发起登录')
    this.props.form.validateFields((err, v) => {
      console.log('记录用户名密码')
      //记录用户名和密码到local
      if (!window.localStorage) {
        return false;
      } else {
        //主逻辑业务
        window.localStorage.clear();
        let storage = window.localStorage;
        storage.loginpass = this.state.pass;
        storage.loginname = this.state.name;
      }

      if (!err) {
        let storage = window.localStorage;
        v.userName = v.userName ? v.userName : storage.loginname;
        v.password = v.password ? v.password : storage.loginpass;
        Request("login", {
          loginName: v.userName,
          loginPwd: v.password
        }, res => {
          // 登录接口 获取角色信息，根据拿到的用户身份，进行跳转到不同的身份页面
          // 1系统管理员  2管理员  3老师 4巡课员
          if (res.result) {
            this.props.saveUserInfo(res.data)
              .then(() => {
                //页面跳转
                this.props.history.push("/identity");
              })
          } else {
            // 登录失败 给失败提示
            console(123)
            message.error(res.message || "登录失败，请联系管理员!", 2000)
          }
        }, err => {
          if (err) {
            message.error("服务已断开，请联系管理员!", 2000)
            this.setState({
              showmess: true,
              erromess: '服务已断开，请联系管理员!'
            }, () => {
              setTimeout(() => {
                this.setState({
                  showmess: false,
                })
              }, 3000);
            })
          }
        })
      }
    });
  }

  render() {

    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;
    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <div className="JC-login">
        <div className='JC-login-title'></div>
        <div className='JC-login-con'>
          <div className='svg-log'><SVG type='logo' style={{ color: 'white', width: '100%', height: '100%' }} ></SVG></div>
          <div className='form-box'>
            <h1 >用户登录</h1>
            <input type='name' style={{ display: 'none' }} />
            <input type='password' style={{ display: 'none' }} />
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <Form.Item
                validateStatus={userNameError ? 'error' : ''}
                help={userNameError || ''}
              >
                {getFieldDecorator('userName', {
                  rules: [{ required: false, message: '请输入账号!' }],
                })(
                  <div className='inputbox'>
                    <span><SVG type='user' style={{ color: 'white', width: '18px', height: '18px' }}></SVG></span>
                    <span><input id='user' style={{ color: '#389fea' }} autoComplete="off" value={this.state.name} onChange={(e) => this.changeInput(e, 'name')} placeholder="请输入用户名" /></span>
                  </div>
                )}
              </Form.Item>
              <Form.Item
                validateStatus={passwordError ? 'error' : ''}
                help={passwordError || ''}
              >
                {getFieldDecorator('password', {
                  rules: [{ required: false, message: '请输入密码!' }],
                })(
                  <div className='inputbox'>
                    <span><SVG type='2' style={{ color: 'white', width: '18px', height: '18px' }}></SVG></span>
                    <span><input id='pass' style={{ color: '#fa8771' }} autoComplete="off" value={this.state.pass} onChange={(e) => this.changeInput(e, 'pass')} type="text" placeholder="请输入密码" /></span>
                  </div>
                )}
              </Form.Item>
              <Form.Item>
                <div className='inputbox buttonjiantou'>
                  <button
                    style={{ color: '#389fea' }}
                    htmltype="submit"
                    disabled={this.state.showmess ? 'disabled' : null}
                    className={this.state.showmess ? 'unablebutton' : null}
                  >登录</button>
                  <SVG type='1' style={{ color: '#389fea', width: '18px', height: '18px' }}></SVG>
                </div>
              </Form.Item>
            </Form>
            <div className='erromess'>
              {
                this.state.showmess ? <SVG type='untitled1' style={{ color: '#389fea', width: '18px', height: '18px' }}></SVG> : null
              }
              {
                this.state.showmess ? <span>{this.state.erromess}</span> : null
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Form.create()(LoginComp);