let uinfos = uinfos = '{"rm":"系统管理员","roleLevel":1,"userId":"6281_SUPERUSER","key":"QWERT","nm":"超级管理员"}';
export let G = {
  modelConfig: [],
  userInfo: {
    // 角色类型
    roleType: "",
  },
  /**
   * 用户信息
   */
  baseinfo: {
    // // 用户名
    // uname: uinfos.nm,
    // // 用户ID 
    // userid: uinfos.userId,
    // // 登录的账号
    // loginName: uinfos.loginName,

    // utype: uinfos.rm,
    // // 关键字
    // ukey: uinfos.key,
    // // 老师账号
    // teacherid: uinfos.teacherId,
    // // 系统名
    // systemname: '课堂生态',
    // // 账号级别  1系统管理员 2管理员 3 教师 （听评课中）4 巡课员 还有在线巡课  
    // role: uinfos.roleLevel,
  },
  /**
   * 学期信息
   */
  semesters: [],
  /**
   * 当前学期
   */
  semester: {
    weeks: ['1', '2', '3', '4', '5']
  },
  /**
   * 学段学年年级信息
   */
  sections: [{
    name: "全部机构",
    id: "",
    children: [{
        id: "961CCD37800848A481CBF0B8B03D69CA",
        name: "管理学院",
        children: [{
            id: "2018012",
            name: "王一",
            crg_name: "管理学院",
            crg_id: "961CCD37800848A481CBF0B8B03D69CA"
          },
          {
            id: "2018013",
            name: "王二",
            crg_name: "管理学院",
            crg_id: "961CCD37800848A481CBF0B8B03D69CA"
          },
          {
            id: "2018014",
            name: "王三",
            crg_name: "管理学院",
            crg_id: "961CCD37800848A481CBF0B8B03D69CA"
          },
          {
            id: "2018015",
            name: "王四",
            crg_name: "管理学院",
            crg_id: "961CCD37800848A481CBF0B8B03D69CA"
          }
        ]
      },
      {
        id: "E4F3A12C3DC347978E6E1BCE7B2599E0",
        name: "计算机学院",
        children: [{
            id: "2018040",
            name: "吴一",
            crg_name: "计算机学院",
            crg_id: "E4F3A12C3DC347978E6E1BCE7B2599E0"
          },
          {
            id: "2018041",
            name: "吴二",
            crg_name: "计算机学院",
            crg_id: "E4F3A12C3DC347978E6E1BCE7B2599E0"
          },
          {
            id: "2018042",
            name: "吴三",
            crg_name: "计算机学院",
            crg_id: "E4F3A12C3DC347978E6E1BCE7B2599E0"
          },
        ]
      }
    ]
  }],
  funcs: [],
  rootpath: '',
  currentWeek: ""
}

// 同步内存与session全局数据
export const findGlobalData = function () {
  return new Promise((resolve, reject) => {
    if (!G.token || !Object.keys(G.baseinfo).length) {
      console.log("全局中没有token 并且 没有用户信息");
      // 全局中没有token 并且 没有用户信息
      if (!sessionStorage.getItem("G")) {
        console.log("缓存中没有token 并且 没有用户信息");
        reject();
      } else {
        // session找用户信息，
        G = JSON.parse(sessionStorage.getItem("G"));
        // 重新赋值给全局 g
        window.g = G;
      }
      resolve();
    }
  });
}


// 开发环境
if (process.env.NODE_ENV === 'development') {
  G.serverUrl = 'http://10.10.1.6:8087/cloud';
} else {
  if (window.location.origin.indexOf('localhost') != -1) {
    G.serverUrl = 'http://10.10.1.6:8087/cloud';
  } else {
    G.serverUrl = window.location.origin + "/cloud"
  }
}


window.g = G;