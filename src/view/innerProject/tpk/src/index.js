import React from 'react';
import ReactDOM from 'react-dom';
import Frame from './js/pages/frame';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TpkTeacherTasks from './js/pages/tpk/tpkTeacherTasks';
import _x from './js/base/_x/api/api';
import { loadGlobal, getBaseinfo, Global } from './js/base/g';
import './css/app.css';

_x.base.init();
getBaseinfo(window.location.hostname === "localhost");
_x.util.request.setConfig(Global.baseinfo.serviceroot);
loadGlobal();
/*
if(!Global.loaded){
  _x.env.one(document, _x.env.loaded, function(event){
    console.log(event);
  })
}
*/
/*
_x.util.request('/techJob/evaluateModelUpdateSearch', {
  'evaluateModelId': '33cca3d7-8bd9-45eb-8b3b-ee49b57cddfc'
}, function(ret){
  if(ret.result){
    //do something
  }
});
_x.util.requestMultiple([{
  method: '/techJob/evaluateModelUpdateSearch',
  parmas: {
    'evaluateModelId': '33cca3d7-8bd9-45eb-8b3b-ee49b57cddfc'
  }},{
  method: '/techJob/evaluateModelUpdateSearch',
  parmas: {
    'evaluateModelId': '33cca3d7-8bd9-45eb-8b3b-ee49b57cddfc'
  }}], function(ret1,ret2){
    if(ret1.result && ret2.result){
      //do something
    }
  });

  Modal.confirm('删除确认', '你确定要删除该记录吗？', function(resolvere){
    //dosomething ;
    setTimeout(function() {
      resolvere();
    }, 3000);
  });

  Modal.info('信息提示', '提示用户注意信息', function(resolvere){
    //dosomething ;
    setTimeout(function() {
      resolvere();
    }, 3000);
  });
  var tipModal = warning('这是警告提示');

  setTimeout(function() {
    modal.destroy();
  }, 4000);

*/
_x.env.one(document, _x.env.loaded, function () {
  ReactDOM.render(
    <Router basename={window.location.pathname + "#"}>
      <Frame />
    </Router>,
    document.getElementById('root'));
});

export default class TPK extends React.Component {
  render() {
    return (
      <div>
        <Frame />
      </div>
    )
  }
}
