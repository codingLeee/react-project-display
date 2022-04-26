/*
 * @Author: JC.Liu 
 * @Date: 2019-02-22 17:18:45 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-18 14:00:06
 * 菜单配置
 */

export default function Menu(role, roleConfig) {
  // 超管
  let superUser = [{
    group: "生态大数据",
    icon: "",
    path: "stdsj",
    display: roleConfig.bigData ? true : false,
    children: [
      {
        modelName: "课堂秩序报表",
        icon: "",
        path: "ktzxbb",
        display: false,
        children: [
          {
            modelName: "学院报表",
            icon: "",
            path: "xybb",
            display: true,
            children: []
          }, {
            modelName: "违纪事件报表",
            icon: "",
            path: "wjsjbb",
            display: true,
            children: []
          }, {
            modelName: "任务报表",
            icon: "",
            path: "rwbb",
            display: true,
            children: []
          }, {
            modelName: "原始数据",
            icon: "",
            path: "yssj",
            display: true,
            children: []
          }
        ]
      }, {
        modelName: "课堂质量报表",
        icon: "",
        path: "ktzlbb",
        display: true,
        children: [
          {
            modelName: "学院报表",
            icon: "",
            path: "xybb",
            display: true,
            children: []
          }, {
            modelName: "教师报表",
            icon: "",
            path: "jsbb",
            display: true,
            children: []
          }, {
            modelName: "听课任务报表",
            icon: "",
            path: "tkrwbb",
            display: true,
            children: []
          }, {
            modelName: "原始数据",
            icon: "",
            path: "yssj",
            display: true,
            children: []
          }
        ]
      }, {
        modelName: "学生出勤报表",
        icon: "",
        path: "xscqbb",
        display: true,
        children: [{
          modelName: "学院报表",
          icon: "",
          path: "xybb",
          display: true,
          children: []
        }, {
          modelName: "原始数据",
          icon: "",
          path: "yssj",
          display: true,
          children: []
        }]
      }, {
        modelName: "教师考勤报表",
        icon: "",
        path: "jskqbb",
        display: true,
        children: [
          {
            modelName: "学院报表",
            icon: "",
            path: "xybb",
            display: true,
            children: []
          }, {
            modelName: "教师报表",
            icon: "",
            path: "jsbb",
            display: true,
            children: []
          }, {
            modelName: "考勤异常类型报表",
            icon: "",
            path: "kqyclxbb",
            display: true,
            children: []
          }, {
            modelName: "原始数据",
            icon: "",
            path: "yssj",
            display: true,
            children: []
          }
        ]
      }, {
        modelName: "报告中心",
        icon: "",
        path: "bgzx",
        display: true,
        children: [
          {
            modelName: "系统报告",
            icon: "",
            path: "xtbg",
            display: true,
            children: []
          }, {
            modelName: "自定义报告",
            icon: "",
            path: "zdybg",
            display: true,
            children: []
          }
        ]
      }
    ]
  }, {
    group: "在线巡课",
    icon: "",
    path: "zxxk",
    display: roleConfig.onlineLookClass ? true : false,
    children: [
      {
        modelName: "巡课设置",
        icon: "",
        path: "xksz",
        display: true,
        children: [
          {
            modelName: "计划设置",
            icon: "",
            path: "jhsz",
            display: true,
          },
          {
            modelName: "事件设置",
            icon: "",
            path: "sjsz",
            display: true,
          },
          {
            modelName: "定时巡课设置",
            icon: "",
            path: "dsxksz",
            display: true,
          }
        ]
      }, {
        modelName: "定时巡课",
        icon: "",
        path: "dsxk",
        display: true
      }, {
        modelName: "巡课统计",
        icon: "",
        path: "xktj",
        display: true
      }, {
        modelName: "智能巡课",
        path: "znxk",
        icon: "",
        display: true,
        children: [
          {
            modelName: "异常报警",
            icon: "",
            path: "ycbj",
            display: true
          }, {
            modelName: "设置",
            icon: "",
            path: "sz",
            display: true
          }
        ]
      }
    ]
  }, {
    group: "听评课",
    icon: "",
    path: "tpk",
    display: roleConfig.listenClass ? true : false,
    children: [
      {
        modelName: "教研任务",
        path: "jyrw",
        icon: "",
        display: true
      }, {
        modelName: "教研设置",
        path: "jysz",
        icon: "",
        display: true,
        children: [
          {
            modelName: "教研计划管理",
            icon: "",
            path: "jyjhgl",
            display: true
          }, {
            modelName: "教研组管理",
            icon: "",
            path: "jyzgl",
            display: true
          }, {
            modelName: "教研评价管理",
            icon: "",
            path: "jypjgl",
            display: true
          }
        ]
      }, {
        modelName: "随堂听任务",
        path: "sttrw",
        icon: "",
        display: true
      }, {
        modelName: "随堂听设置",
        path: "sttsz",
        icon: "",
        display: true,
        children: [
          {
            modelName: "听课员任务指标设置",
            icon: "",
            path: "tkyrwzbsz",
            display: true
          }, {
            modelName: "授课员审批权限设置",
            icon: "",
            path: "skyspqxsz",
            display: true
          }
        ]
      }
    ]
  }, {
    group: "教学检查",
    path: "jxjc",
    icon: "",
    display: roleConfig.teachCallBack ? true : false,
    children: [
      {
        modelName: "课程查课",
        path: "kcck",
        icon: "",
        display: true
      }, {
        modelName: "教师查课",
        path: "jsck",
        icon: "",
        display: true
      }, {
        modelName: "教室查课",
        path: "jshick",
        icon: "",
        display: true
      }
    ]
  }
  ];

  // 普管
  let admin = [{
    group: "生态大数据",
    icon: "",
    path: "stdsj",
    display: roleConfig.bigData ? true : false,
    children: [
      {
        modelName: "课堂秩序报表",
        icon: "",
        path: "ktzxbb",
        display: false,
        children: [
          {
            modelName: "学院报表",
            icon: "",
            path: "xybb",
            display: true,
            children: []
          }, {
            modelName: "违纪事件报表",
            icon: "",
            path: "wjsjbb",
            display: true,
            children: []
          }, {
            modelName: "任务报表",
            icon: "",
            path: "rwbb",
            display: true,
            children: []
          }, {
            modelName: "原始数据",
            icon: "",
            path: "yssj",
            display: true,
            children: []
          }
        ]
      }, {
        modelName: "课堂质量报表",
        icon: "",
        path: "ktzlbb",
        display: true,
        children: [
          {
            modelName: "学院报表",
            icon: "",
            path: "xybb",
            display: true,
            children: []
          }, {
            modelName: "教师报表",
            icon: "",
            path: "jsbb",
            display: true,
            children: []
          }, {
            modelName: "听课任务报表",
            icon: "",
            path: "tkrwbb",
            display: true,
            children: []
          }, {
            modelName: "原始数据",
            icon: "",
            path: "yssj",
            display: true,
            children: []
          }
        ]
      }, {
        modelName: "学生出勤报表",
        icon: "",
        path: "xscqbb",
        display: true,
        children: [{
          modelName: "学院报表",
          icon: "",
          path: "xybb",
          display: true,
          children: []
        }, {
          modelName: "原始数据",
          icon: "",
          path: "yssj",
          display: true,
          children: []
        }]
      }, {
        modelName: "教师考勤报表",
        icon: "",
        path: "jskqbb",
        display: true,
        children: [
          {
            modelName: "学院报表",
            icon: "",
            path: "xybb",
            display: true,
            children: []
          }, {
            modelName: "教师报表",
            icon: "",
            path: "jsbb",
            display: true,
            children: []
          }, {
            modelName: "考勤异常类型报表",
            icon: "",
            path: "kqyclxbb",
            display: true,
            children: []
          }, {
            modelName: "原始数据",
            icon: "",
            path: "yssj",
            display: true,
            children: []
          }
        ]
      }, {
        modelName: "报告中心",
        icon: "",
        path: "bgzx",
        display: true,
        children: [
          {
            modelName: "系统报告",
            icon: "",
            path: "xtbg",
            display: true,
            children: []
          }, {
            modelName: "自定义报告",
            icon: "",
            path: "zdybg",
            display: true,
            children: []
          }
        ]
      }
    ]
  }, {
    group: "在线巡课",
    icon: "",
    path: "zxxk",
    display: roleConfig.onlineLookClass ? true : false,
    children: [
      {
        modelName: "巡课设置",
        icon: "",
        path: "xksz",
        display: true,
        children: [
          {
            modelName: "计划设置",
            icon: "",
            path: "jhsz",
            display: true,
          },
          {
            modelName: "事件设置",
            icon: "",
            path: "sjsz",
            display: true,
          },
          {
            modelName: "定时巡课设置",
            icon: "",
            path: "dsxksz",
            display: true,
          }
        ]
      }, {
        modelName: "定时巡课",
        icon: "",
        path: "dsxk",
        display: true
      }, {
        modelName: "巡课统计",
        icon: "",
        path: "xktj",
        display: true
      }, {
        modelName: "智能巡课",
        path: "znxk",
        icon: "",
        display: true,
        children: [
          {
            modelName: "异常报警",
            icon: "",
            path: "ycbj",
            display: true
          }, {
            modelName: "设置",
            icon: "",
            path: "sz",
            display: true
          }
        ]
      }
    ]
  }, {
    group: "听评课",
    icon: "",
    path: "tpk",
    display: roleConfig.listenClass ? true : false,
    children: [
      {
        modelName: "教研任务",
        path: "jyrw",
        icon: "",
        display: true
      }, {
        modelName: "教研设置",
        path: "jysz",
        icon: "",
        display: true,
        children: [
          {
            modelName: "教研计划管理",
            icon: "",
            path: "jyjhgl",
            display: true
          }, {
            modelName: "教研组管理",
            icon: "",
            path: "jyzgl",
            display: true
          }, {
            modelName: "教研评价管理",
            icon: "",
            path: "jypjgl",
            display: true
          }
        ]
      }, {
        modelName: "随堂听任务",
        path: "sttrw",
        icon: "",
        display: true
      }, {
        modelName: "随堂听设置",
        path: "sttsz",
        icon: "",
        display: true,
        children: [
          {
            modelName: "听课员任务指标设置",
            icon: "",
            path: "tkyrwzbsz",
            display: true
          }, {
            modelName: "授课员审批权限设置",
            icon: "",
            path: "skyspqxsz",
            display: true
          }
        ]
      }
    ]
  }, {
    group: "教学检查",
    path: "jxjc",
    icon: "",
    display: roleConfig.teachCallBack ? true : false,
    children: [
      {
        modelName: "课程查课",
        path: "kcck",
        icon: "",
        display: true
      }, {
        modelName: "教师查课",
        path: "jsck",
        icon: "",
        display: true
      }, {
        modelName: "教室查课",
        path: "jshick",
        icon: "",
        display: true
      }
    ]
  }
  ]

  //  巡课员
  let superTeacher = [{
    group: "在线巡课",
    path: "zxxk",
    icon: "",
    display: roleConfig.onlineLookClass ? true : false,
    children: [{
      modelName: "实时巡课",
      path: "ssxk",
      icon: "",
      display: true
    }, {
      modelName: "定时巡课",
      path: "dsxk",
      icon: "",
      display: true
    }, {
      modelName: "巡课统计",
      path: "xktj",
      icon: "",
      display: true
    }, {
      modelName: "智能巡课",
      path: "znxk",
      icon: "",
      display: true,
      children: [
        {
          modelName: "异常报警",
          icon: "",
          path: "ycbj",
          display: true
        }, {
          modelName: "设置",
          icon: "",
          path: "sz",
          display: true
        }
      ]
    }]
  }, {
    group: "听评课",
    path: "tpk",
    icon: "",
    display: roleConfig.listenClass ? true : false,
    children: [
      {
        modelName: "我的任务",
        path: "wdrw",
        icon: "",
        display: true
      },
      {
        modelName: "我的教研课",
        path: "wdjyk",
        icon: "",
        display: true
      }, {
        modelName: "我的随堂听",
        path: "wdsst",
        icon: "",
        display: true
      }
    ]
  }, {
    group: "教学反思",
    path: "jxfs",
    icon: "",
    display: roleConfig.teachCallBack ? true : false,
    children: []
  }]

  // 老师
  let teacher = [{
    group: "在线巡课",
    path: "zxxk",
    icon: "",
    display: roleConfig.onlineLookClass ? true : false,
    children: [{
      modelName: "实时巡课",
      path: "ssxk",
      icon: "",
      display: true
    }, {
      modelName: "定时巡课",
      path: "dsxk",
      icon: "",
      display: true
    }, {
      modelName: "巡课统计",
      path: "xktj",
      icon: "",
      display: true
    }, {
      modelName: "智能巡课",
      path: "znxk",
      icon: "",
      display: true,
      children: [
        {
          modelName: "异常报警",
          icon: "",
          path: "ycbj",
          display: true
        }, {
          modelName: "设置",
          icon: "",
          path: "sz",
          display: true
        }
      ]
    }]
  }, {
    group: "听评课",
    path: "tpk",
    icon: "",
    display: roleConfig.listenClass ? true : false,
    children: [
      {
        modelName: "我的任务",
        path: "wdrw",
        icon: "",
        display: true
      },
      {
        modelName: "我的教研课",
        path: "wdjyk",
        icon: "",
        display: true
      }, {
        modelName: "我的随堂听",
        path: "wdsst",
        icon: "",
        display: true
      }
    ]
  }, {
    group: "教学反思",
    path: "jxfs",
    icon: "",
    display: roleConfig.teachCallBack ? true : false,
    children: []
  }]

  
  switch (role) {
    case 1:
      return superUser
    case 2:
      return admin
    case 3:
      return superTeacher
    case 4:
      return teacher
    default:
      return []
  }

}