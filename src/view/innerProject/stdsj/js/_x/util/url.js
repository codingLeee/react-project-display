
const getQueryString = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let w = window.location.href.slice(window.location.href.indexOf('/'));
  var r = w.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}



// 打开新标签页
const goWith = (pr = { to: 'index', with: [] }) => {
  let url = window.location.href;
  let href = url.slice(0, url.indexOf('#') + 2);
  console.log(href);
  href += pr.to + '/' + pr.with.join('/');
  window.open(href);
}
export default { getQueryString, goWith };