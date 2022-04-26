import React, { Component, useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { message } from 'antd';
import Loading from './view/page/loading';
import Admin from './view/page/admin/admin';
import Teacher from './view/page/teacher/teacher';
import Overview from './view/page/admin/stdsj/overview/index';
import Login from './view/page/login';
import Identity from './view/page/identity';
import Err from './view/page/error';
class RouterRelation extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* 还需要一个页面来判断 是否是sso 跳转过来的*/}
          <Route exact path="/" component={Comfirmation} />
          {/* loading 数据处理 */}
          <Route exact path="/loading" component={Loading} />
          {/* 登录页面 */}
          <Route exact path="/login" component={Login} />
          {/* 多重身份选择页面*/}
          <Route exact path="/identity" component={Identity} />
          {/* 老师 */}
          <Route path="/teacher" component={Teacher} />
          {/* 管理员 */}
          <Route path="/admin" component={Admin} />
          {/* 大数据 */}
          <Route path="/overview" component={Overview} />
          {/* 错误页面 */}
          <Route path="/error" component={Err} />

          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}


export default RouterRelation;

// hooks 组件
// 根路径进来可以直接获取到带来的参数
const Comfirmation = (props) => {
  const [data, getData] = useState([]);

  // 第二个参数为空数组，表示只执行一次，否则每次state改变都会执行
  useEffect(() => {
    const url = decodeURI(window.location.href.replace("?", ""));
    const re = /^&$/;
    if (re.test(url)) {
      const strs = url.split("&");
      if (strs && strs.length) {
        const token = strs[0].split("=")[1],
          orgCode = strs[1].split("=")[1];
        console.log("token:", token);
        console.log("orgCode:", orgCode);
        if (token && orgCode) {
          // 进入loading 页面， 
          // 根据token 和 orgCode 进行请求用户信息
          props.history.push("/login");
        } else {
          // 给个提示，然后进login页面
          // message.error("用户信息token或orgCode不存在，请重新尝试登录！" ,2);
          props.history.push("/login");
        }
      }
    } else {
      props.history.push("/login");
    }
  }, [])

  return false
}






