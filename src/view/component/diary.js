/*
 * @Author: 蒲飞 
 * @Date: 2017-09-12 13:49:33 
 * @Last Modified by: xiangting
 * @Last Modified time: 2019-03-27 10:08:28
 * 公共组件-笔记本
 */
import React, { Component } from 'react';
import { Button, Input, Select, message } from 'antd';
import _ from 'lodash';
import { G } from './../../js/g';
import { SVG } from './../../base.jsx';
import util from './../../js/_x/index';
const Request = util.util.request.request;
const Number = util.util.number
import DiaryNote from './diaryNote.jsx';
import './../../css/admin/mj_diary.css';
const Option = Select.Option;

class Diary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalNum: 0,   //总条数
      totalPage: 0, //总页数
      pageIndex: 0,
      currentPage: 1,   //当前页
      curriculumall: [],//note数据
      buttonColor: '#9C9B9B',//禁用按钮状态
      disabledPre: false,//翻页禁用
      disabledNext: false,//翻页禁用
      techClass: [],//教研本班级信息
      lisTechClass: [],//听课本班级信息
      devalue: '',//班级默认第一个班级名称
      classID: '',//班级第一个班级id
      weeks: 1,//第几周
      weeksList: [],
      weeksData: [],
      currentWeek: 1,
      clickIndex: 0,
      indexWeek: 0,//当前周
      teacherName: '',//授课老师名字
      weekTotal: [], //周次
    }
    this.classID = this.state.classID;
    this.teacherId = this.props.teacherId;
    this.handleSelectSystem = this.handleSelectSystem.bind(this);
    this.handleTeachNameChange = this.handleTeachNameChange.bind(this);
    this.handleChangePre = this.handleChangePre.bind(this);
    this.handleChangeNext = this.handleChangeNext.bind(this);
    this.getNoteData = this.getNoteData.bind(this);

    this.getWeekAndClassDataLis = this.getWeekAndClassDataLis.bind(this);
    this.getWeekAndClassData = this.getWeekAndClassData.bind(this);

    this.getCurriNote = this.getCurriNote.bind(this);
    this.getCurriListenNote = this.getCurriListenNote.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeWeek = this.handleChangeWeek.bind(this);
    this.getSearchMyNote = this.getSearchMyNote.bind(this);

    this.getLisNoteData = this.getLisNoteData.bind(this);
    this.getLisSearchMyNote = this.getLisSearchMyNote.bind(this);

    this.handleSearchLis = this.handleSearchLis.bind(this);
    this.handleChangeNextLis = this.handleChangeNextLis.bind(this);
    this.handleChangePreLis = this.handleChangePreLis.bind(this);
    this.handleChangeWeekLis = this.handleChangeWeekLis.bind(this);

    this.disabledNextPre = this.disabledNextPre.bind(this);
  }

  componentWillMount() {
    if (this.props.type == "research") {
      if (parseInt(this.props.curriculumallId) !== 0) {
        this.getCurriNote();
      } else if (parseInt(this.props.curriculumallId) == 0) {
        this.getWeekAndClassData();
      }
    } else {
      if (parseInt(this.props.curriculumallId) !== 0) {
        this.getCurriListenNote()
      } else if (parseInt(this.props.curriculumallId) == 0) {
        this.getWeekAndClassDataLis();
      }
    }

  };
  //上下页判断禁用
  disabledNextPre() {
    if (this.state.currentPage == 1 && this.state.totalPage == 1) {
      this.setState({
        disabledPre: true,//翻页禁用
        disabledNext: true,//翻页禁用
      })
    } else if (this.state.totalPage == 0) {
      this.setState({
        disabledPre: true,//翻页禁用
        disabledNext: true,//翻页禁用            
      })
    } else if (this.state.currentPage == 1 && this.state.totalPage !== 1) {
      this.setState({
        disabledPre: true,//翻页禁用
        disabledNext: false,//翻页禁用
      })
    } else if (this.state.currentPage == this.state.totalPage) {
      this.setState({
        disabledPre: false,//翻页禁用
        disabledNext: true,//翻页禁用            
      })
    } else {
      this.setState({
        disabledPre: false,//翻页禁用
        disabledNext: false,//翻页禁用
      })
    }
  };
  //随堂听-获取当前周次和班级并且获取听课本数据；从管理员查看听课本
  getWeekAndClassDataLis() {
    let req = {
      teacherId: this.teacherId
    };
    Request('api/web/teacher_listen_job/selectMyListenClass', req, function (ret) {
      if (ret.result) {
        let resData = ret.data;
        let devalue = '';
        let classID = '';
        let allClass = [];
        if (resData.listenClass.length == 0) {
          devalue = '';
          classID = '';
          allClass = [];
        } else {
          resData.listenClass.map((classes, index) => {
            allClass.push({
              classID: classes.classID,
              className: classes.className
            })
          })
          devalue = allClass[0].className || '';
          classID = resData.listenClass[0].classID || '';
        }
        let haveWeek = [];
        let cIndex = 1;
        if (resData.listenWeeks.length == 0) {
          haveWeek = [];
        } else {
          resData.listenWeeks.map((allWeeks, index) => {
            haveWeek.push(
              allWeeks.weeks
            )
          })
        }
        localStorage.setItem('weeks', JSON.stringify(haveWeek));
        localStorage.setItem('classID', JSON.stringify(classID));
        this.setState({
          weeksData: resData.listenWeeks,
          weeksList: haveWeek,
          techClass: allClass || [],
          devalue: devalue,
          classID: classID,
        });
        let req = {
          teacherId: this.teacherId,
          classID: classID,
        };
        this.getLisNoteData(req);
      }
    }.bind(this));
  };
  //教研本-获取当前周次和班级并且获取笔记本数据；从管理员查看教研本
  getWeekAndClassData() {
    let req = {
      teacherId: this.teacherId
    };
    Request('api/web/teacher_listen_job/selectMyTechClass', req, function (ret) {
    // let ret = {
    //   result: true,
    //   data: { techWeeks: [], techClass: [] }
    // }
    if (ret.result) {
      let resData = ret.data;
      let devalue = '';
      let classID = '';
      let allClass = [];
      if (resData.techClass.length == 0) {
        devalue = '';
        classID = '';
        allClass = [{ classID: '', className: '全部' }];
      } else {
        resData.techClass.map((classes, index) => {
          allClass.push({
            classID: classes.classID,
            className: classes.className
          })
        })
        devalue = allClass[0].className || '';
        classID = resData.techClass[0].classID || '';
      }
      let haveWeek = [];
      let cIndex = 1;
      if (resData.techWeeks.length == 0) {
        haveWeek = [];
      } else {
        resData.techWeeks.map((allWeeks, index) => {
          haveWeek.push(
            allWeeks.weeks
          )
        })
      }
      localStorage.setItem('weeks', JSON.stringify(haveWeek));
      localStorage.setItem('classID', JSON.stringify(classID));
      this.setState({
        weeksData: resData.techWeeks,
        weeksList: haveWeek,
        techClass: allClass || [],
        devalue: devalue,
        classID: classID,
      });
      let req = {
        teacherId: this.teacherId,
        classID: classID,
      };
      this.getNoteData(req);
    }
    }.bind(this));
  };
  //点击我的教研本跳转页面初始化加载
  getNoteData(req) {
    Request('api/web/teacher_listen_job/selectMyAllNote', req, function (ret) {
    // let ret = {
    //   result: true,
    //   data: {}
    // }
    if (ret.result) {
      let resData = ret.data;
      let resultdata = [];
      if (JSON.stringify(resData) !== "{}") {
        resultdata = resData.curriculumall;
        let weekdata = JSON.parse(localStorage.getItem('weeks'));
        var index = _.indexOf(weekdata, resultdata[0].weeks);
        this.setState({
          curriculumall: resultdata || [],
          totalNum: resData.totalNum || 0,   //总条数
          totalPage: resData.totalPage || 0, //总页数
          currentPage: resData.currentPage || 1,
          clickIndex: index,
          weeks: resultdata[0].weeks
        });
      } else {
        message.info('暂无数据！');
        this.setState({
          disabledNext: true,//翻页禁用
          disabledPre: true,//翻页禁用
          curriculumall: [],
          totalNum: 0,   //总条数
          totalPage: 0, //总页数
          currentPage: 1,
        })
      }
      this.disabledNextPre();
    }
    }.bind(this));
  };
  //点击我的听课本跳转页面初始化加载
  getLisNoteData(req) {
    let classid =JSON.parse(localStorage.getItem('classID'));
    // let req = {
    //   teacherId:this.teacherId,
    //   classID:classid,
    // };
    Request('api/web/teacher_listen_job/selectMyAllListenNote', req, function (ret) {
    // let ret = {
    //   result: true,
    //   data: {}
    // }
    if (ret.result) {
      let resData = ret.data;
      let resultdata = [];
      if (JSON.stringify(resData) !== "{}") {
        resultdata = resData.curriculumall;
        let weeks = resultdata[0].weeks
        let weekdata = JSON.parse(localStorage.getItem('weeks'));
        var index = _.indexOf(weekdata, weeks);
        this.setState({
          curriculumall: resultdata || [],
          totalNum: resData.totalNum || 0,   //总条数
          totalPage: resData.totalPage || 0, //总页数
          currentPage: resData.currentPage || 1,
          clickIndex: index,
          weeks: weeks
        });
      } else {
        message.info( '暂无数据！');
        this.setState({
          disabledNext: true,//翻页禁用
          disabledPre: true,//翻页禁用
          curriculumall: [],
          totalNum: 0,   //总条数
          totalPage: 0, //总页数
          currentPage: 1,
          // clickIndex:0
          //weeks:
        })
      }
      this.disabledNextPre();
    }
    }.bind(this));
  };
  //点击查看已点评跳转页面初始化加载
  getCurriNote() {
    let req = {
      teacherId: this.teacherId
    };
    Request('api/web/teacher_listen_job/selectMyTechClass', req, function (ret) {
    // let ret = {
    //   result: true,
    //   data: { techWeeks: [], techClass: [] }
    // }
    if (ret.result) {
      let resData = ret.data;
      let devalue = '';
      let classID = '';
      let allClass = [];
      if (resData.techClass.length == 0) {
        devalue = '';
        classID = '';
        allClass = [];
      } else {
        resData.techClass.map((classes, index) => {
          allClass.push({
            classID: classes.classID,
            className: classes.className
          })
        })
        devalue = allClass[0].className || '';
        classID = resData.techClass[0].classID || '';
      }
      let haveWeek = [];
      let cIndex = 1;
      if (resData.techWeeks.length == 0) {
        haveWeek = [];
      } else {
        resData.techWeeks.map((allWeeks, index) => {
          haveWeek.push(
            allWeeks.weeks
          )
        })
      }
      localStorage.setItem('weeks', JSON.stringify(haveWeek));
      localStorage.setItem('classID', JSON.stringify(classID));
      this.setState({
        weeksData: resData.techWeeks,
        weeksList: haveWeek,
        techClass: allClass || [],
        devalue: devalue,
        classID: classID,
      });
    }
    }.bind(this));

    let req2 = {
      teacherId: this.props.teacherId,
      curriculumallId: this.props.curriculumallId
    };
    Request('api/web/teacher_listen_job/selectMyCurriNote', req2, function (ret1) {
    // let ret1 = {
    //   result: true,
    //   data: {}
    // }
    if (ret1.result) {
      let resData = ret1.data;
      let resultdata = [];
      let classes = [];
      let devalue = '';
      let classID = '';
      if (JSON.stringify(resData) !== "{}") {
        resultdata = resData.curriculumall;
        let weeks = resultdata[0].weeks;
        let weekdata = JSON.parse(localStorage.getItem('weeks'));
        var index = _.indexOf(weekdata, resultdata[0].weeks);
        resultdata.map((data, index) => {
          devalue = data.className;
          classID = data.classID;
          classes.push({
            classID: data.classID,
            className: data.className
          })
        })
        this.setState({
          curriculumall: resultdata || [],
          totalNum: resData.totalNum || 0,   //总条数
          totalPage: resData.totalPage || 0, //总页数
          currentPage: resData.currentPage || 1,
          clickIndex: index,
          techClass: classes,
          devalue: devalue,
          classID: classID,
          weeks: weeks
        });
      } else {
        this.setState({
          disabledNext: true,//翻页禁用
          disabledPre: true,//翻页禁用
          curriculumall: [],
          totalNum: 0,   //总条数
          totalPage: 0, //总页数
          currentPage: 1,
          techClass: [],
          devalue: '',
          classID: ''
        })
      }
      this.disabledNextPre();
    }
    }.bind(this));
  };
  //点击查看笔记跳转页面初始化加载
  getCurriListenNote() {
    let req = {
      teacherId: this.teacherId
    };
    Request('api/web/teacher_listen_job/selectMyListenClass', req, function (ret) {
      if (ret.result) {
        let resData = ret.data;
        let devalue = '';
        let classID = '';
        let allClass = [];
        if (resData.listenClass.length == 0) {
          devalue = '';
          classID = '';
          allClass = [];
        } else {
          resData.listenClass.map((classes, index) => {
            allClass.push({
              classID: classes.classID,
              className: classes.className
            })
          })
          devalue = allClass[0].className || '';
          classID = resData.listenClass[0].classID || '';
        }
        let haveWeek = [];
        let cIndex = 1;
        if (resData.listenWeeks.length == 0) {
          haveWeek = [];
        } else {
          resData.listenWeeks.map((allWeeks, index) => {
            haveWeek.push(
              allWeeks.weeks
            )
          })
        }
        localStorage.setItem('weeks', JSON.stringify(haveWeek));
        localStorage.setItem('classID', JSON.stringify(classID));
        var index = _.findIndex(haveWeek, { key: G.currentWeek });
        this.setState({
          weeksData: resData.listenWeeks,
          weeksList: haveWeek,
          techClass: allClass || [],
          devalue: devalue,
          classID: classID,
        });
      }
    }.bind(this));

    let req2 = {
      teacherId: this.props.teacherId,
      curriculumallId: this.props.curriculumallId
    }
    Request('api/web/teacher_listen_job/selectMyCurriListenNote', req2, function (ret) {
      if (ret.result) {
        let resData = ret.data;
        let resultdata = [];
        let classes = [];
        let devalue = '';
        let classID = '';
        if (JSON.stringify(resData) !== "{}") {
          if (!resData.curriculumall.length == 0) {
            resultdata = resData.curriculumall;
            let weeks = resultdata[0].weeks;
            resultdata.map((data, index) => {
              devalue = data.className;
              classID = data.classID;
              classes.push({
                classID: data.classID,
                className: data.className
              })
            })
            let weekdata = JSON.parse(localStorage.getItem('weeks'));
            var index = _.indexOf(weekdata, weeks);
            this.setState({
              curriculumall: resultdata || [],
              totalNum: resData.totalNum || 0,   //总条数
              totalPage: resData.totalPage || 0, //总页数
              currentPage: resData.currentPage || 1,
              clickIndex: index,
              techClass: classes,
              devalue: devalue,
              classID: classID,
              weeks: weeks
            });
          } else {
            this.setState({
              disabledNext: true,//翻页禁用
              disabledPre: true,//翻页禁用
              curriculumall: [],
              totalNum: 0,   //总条数
              totalPage: 0, //总页数
              currentPage: 0,
              techClass: [],
              devalue: '',
              classID: '',
            })
          }

        } else {
          this.setState({
            disabledNext: true,//翻页禁用
            disabledPre: true,//翻页禁用
            curriculumall: [],
            totalNum: 0,   //总条数
            totalPage: 0, //总页数
            currentPage: 0,
            techClass: [],
            devalue: '',
            classID: '',
          })
        }
        this.disabledNextPre();
      }
    }.bind(this));
  };
  //教研本-搜索功能请求数据
  getSearchMyNote(req) {
    Request('api/web/teacher_listen_job/selectSearchMyNote', req, function (ret) {
      if (ret.result) {
        let resData = ret.data;
        if (!resData.curriculumall.length == 0) {
          let weekdata = JSON.parse(localStorage.getItem('weeks'));
          var index = _.indexOf(weekdata, resData.curriculumall[0].weeks);
          this.setState({
            curriculumall: resData.curriculumall || [],
            totalNum: resData.totalNum || 0,   //总条数
            totalPage: resData.totalPage || 0, //总页数
            currentPage: resData.currentPage,
            clickIndex: index,
            weeks: resData.curriculumall[0].weeks
          })
        } else {
          this.setState({
            disabledNext: true,//翻页禁用
            disabledPre: true,//翻页禁用
            curriculumall: [],
            totalNum: 0,   //总条数
            totalPage: 0, //总页数
            currentPage: 1,
          })
        }
        this.disabledNextPre();
      }
    }.bind(this));
  };
  //听课本-搜索功能请求数据
  getLisSearchMyNote(req) {
    Request('api/web/teacher_listen_job/selectSearchMyListenNote', req, function (ret) {
      if (ret.result) {
        let resData = ret.data;
        if (!resData.curriculumall.length == 0) {
          let weekdata = JSON.parse(localStorage.getItem('weeks'));
          var index = _.indexOf(weekdata, resData.curriculumall[0].weeks);
          this.setState({
            curriculumall: resData.curriculumall || [],
            totalNum: resData.totalNum || 0,   //总条数
            totalPage: resData.totalPage || 0, //总页数
            currentPage: resData.currentPage,
            clickIndex: index,
            weeks: resData.curriculumall[0].weeks
          })
        } else {
          this.setState({
            disabledNext: true,//翻页禁用
            disabledPre: true,//翻页禁用
            curriculumall: [],
            totalNum: 0,   //总条数
            totalPage: 0, //总页数
            currentPage: 1,
          })
        }
        this.disabledNextPre();
      }
    }.bind(this));
  };
  //教研本-下拉框选择班级
  handleSelectSystem(classes, value) {
    var index = _.findIndex(classes, { classID: value });
    if (index === -1) {
      return;
    } else {
    };
    this.setState({
      classID: classes[index].classID,
      devalue: classes[index].className,
    });

    let req = {
      teacherId: this.teacherId,//当前用户
      classID: classes[index].classID,//班级 Id
      currentPage: 1,   //当前页
      teacherName: this.state.teacherName,//输入框老师名字
      weeks: this.state.weeks //选择的周次

    };
    this.getSearchMyNote(req)
  };
  //听课本-下拉框选择班级
  handleSelectSystemLis(classes, value) {
    var index = _.findIndex(classes, { classID: value });
    if (index === -1) {
      return;
    } else {
    };
    this.setState({
      classID: classes[index].classID,
      devalue: classes[index].className,
    });
    let req = {
      teacherId: this.teacherId,//当前用户
      classID: classes[index].classID,//班级 Id
      currentPage: 1,   //当前页
      teacherName: this.state.teacherName,//输入框老师名字
      weeks: this.state.weeks //选择的周次    
    };
    this.getLisSearchMyNote(req)
  };
  //教研本-搜索功能
  handleSearch() {
    let req = {
      teacherId: this.teacherId,//当前用户
      classID: this.state.classID,//班级 Id
      currentPage: 1,   //当前页
      teacherName: this.state.teacherName,//输入框老师名字
      weeks: this.state.weeks //选择的周次    
    };
    Request('api/web/teacher_listen_job/selectSearchMyNote', req, function (ret) {
      if (ret.result) {
        let resData = ret.data;
        if (!resData.curriculumall.length == 0) {
          let weekdata = JSON.parse(localStorage.getItem('weeks'));
          var index = _.indexOf(weekdata, resData.curriculumall[0].weeks);
          this.setState({
            curriculumall: resData.curriculumall || [],
            totalNum: resData.totalNum || 0,   //总条数
            totalPage: resData.totalPage || 0, //总页数
            currentPage: resData.currentPage,
            clickIndex: index,
            weeks: resData.curriculumall[0].weeks
          })
        } else {
          message.info('请输入存在于教研计划中的授课者姓名！');
          this.setState({
            disabledNext: true,//翻页禁用
            disabledPre: true,//翻页禁用
            curriculumall: [],
            totalNum: 0,   //总条数
            totalPage: 0, //总页数
            currentPage: 1,
          })
        }
        this.disabledNextPre();
      }
    }.bind(this));
  };
  //听课本-搜索功能
  handleSearchLis() {
    let req = {
      teacherId: this.teacherId,//当前用户
      classID: this.state.classID,//班级 Id
      currentPage: 1,   //当前页
      teacherName: this.state.teacherName,//输入框老师名字
      weeks: this.state.weeks //选择的周次    
    };
    Request('api/web/teacher_listen_job/selectSearchMyListenNote', req, function (ret) {
      if (ret.result) {
        let resData = ret.data;
        if (!resData.curriculumall.length == 0) {
          let weekdata = JSON.parse(localStorage.getItem('weeks'));
          var index = _.indexOf(weekdata, resData.curriculumall[0].weeks);
          this.setState({
            curriculumall: resData.curriculumall || [],
            totalNum: resData.totalNum || 0,   //总条数
            totalPage: resData.totalPage || 0, //总页数
            currentPage: resData.currentPage,
            clickIndex: index,
            weeks: resData.curriculumall[0].weeks
          })
        } else {
          message.info('请输入存在于听课指标任务计划的授课者姓名！');
          this.setState({
            disabledNext: true,//翻页禁用
            disabledPre: true,//翻页禁用
            curriculumall: [],
            totalNum: 0,   //总条数
            totalPage: 0, //总页数
            currentPage: 1,
          })
        }
        this.disabledNextPre();
      }
    }.bind(this));
  };
  //教研本-上一页
  handleChangePre() {
    let offset = - 1;
    let req = {}
    if (offset + this.state.currentPage < 1) {
      return false;
    } else {
      if (offset + this.state.currentPage == 1) {
        this.setState({
          disabledPre: true,
          disabledNext: false
        });
      } else {
        this.setState({
          disabledPre: false,
          disabledNext: false
        });
      }
      let page = offset + this.state.currentPage
      req = {
        teacherId: this.teacherId,//当前用户
        classID: this.state.classID,//班级 Id
        currentPage: page,   //当前页
        teacherName: this.state.teacherName,//输入框老师名字
        weeks: this.state.weeks, //选择的周次  
      };
      Request('api/web/teacher_listen_job/selectSearchMyNote', req, function (ret) {
        if (ret.result) {
          let resData = ret.data;
          if (!resData.curriculumall.length == 0) {
            let weekdata = JSON.parse(localStorage.getItem('weeks'));
            var index = _.indexOf(weekdata, resData.curriculumall[0].weeks);
            this.setState({
              curriculumall: resData.curriculumall || [],
              totalNum: resData.totalNum || 0,   //总条数
              totalPage: resData.totalPage || 0, //总页数
              currentPage: resData.currentPage,
              clickIndex: index,
              weeks: resData.curriculumall[0].weeks
            })
          } else {
            this.setState({
              disabledNext: true,//翻页禁用
              disabledPre: true,//翻页禁用
              curriculumall: [],
              totalNum: 0,   //总条数
              totalPage: 0, //总页数
              currentPage: 1,
            })
          }
        }
      }.bind(this));
    };
  };
  //听课本-上一页
  handleChangePreLis() {
    let offset = - 1;
    let req = {}
    if (offset + this.state.currentPage < 1) {
      return false;
    } else {
      if (offset + this.state.currentPage == 1) {
        this.setState({
          disabledPre: true,
          disabledNext: false
        });
      } else {
        this.setState({
          disabledPre: false,
          disabledNext: false
        });
      }
      let page = offset + this.state.currentPage
      req = {
        teacherId: this.teacherId,//当前用户
        classID: this.state.classID,//班级 Id
        currentPage: page,   //当前页
        teacherName: this.state.teacherName,//输入框老师名字
        weeks: this.state.weeks, //选择的周次    
      };
      Request('api/web/teacher_listen_job/selectSearchMyListenNote', req, function (ret) {
        if (ret.result) {
          let resData = ret.data;
          if (!resData.curriculumall.length == 0) {
            let weekdata = JSON.parse(localStorage.getItem('weeks'));
            var index = _.indexOf(weekdata, resData.curriculumall[0].weeks);
            this.setState({
              curriculumall: resData.curriculumall || [],
              totalNum: resData.totalNum || 0,   //总条数
              totalPage: resData.totalPage || 0, //总页数
              currentPage: resData.currentPage,
              clickIndex: index,
              weeks: resData.curriculumall[0].weeks
            })
          } else {
            this.setState({
              disabledNext: true,//翻页禁用
              disabledPre: true,//翻页禁用
              curriculumall: [],
              totalNum: 0,   //总条数
              totalPage: 0, //总页数
              currentPage: 1,
            })
          }
        }
      }.bind(this));
    };
  };
  //教研本-下一页
  handleChangeNext() {
    let offset = 1;
    let req = {}
    if (offset + this.state.currentPage > this.state.totalPage) {
      return false;
    } else {
      if (offset + this.state.currentPage == this.state.totalPage) {
        this.setState({
          disabledNext: true,//翻页禁用
          disabledPre: false,
        });
      } else {
        this.setState({
          disabledNext: false,//翻页禁用
          disabledPre: false,
        });
      }
      let page = offset + this.state.currentPage
      req = {
        teacherId: this.teacherId,//当前用户
        classID: this.state.classID,//班级 Id
        currentPage: page,   //当前页
        teacherName: this.state.teacherName,//输入框老师名字
        weeks: this.state.weeks, //选择的周次  
      };
      Request('api/web/teacher_listen_job/selectSearchMyNote', req, function (ret) {
        if (ret.result) {
          let resData = ret.data;
          if (!resData.curriculumall.length == 0) {
            let weekdata = JSON.parse(localStorage.getItem('weeks'));
            var index = _.indexOf(weekdata, resData.curriculumall[0].weeks);
            this.setState({
              curriculumall: resData.curriculumall || [],
              totalNum: resData.totalNum || 0,   //总条数
              totalPage: resData.totalPage || 0, //总页数
              currentPage: resData.currentPage,
              clickIndex: index,
              weeks: resData.curriculumall[0].weeks
            })
          } else {
            this.setState({
              disabledNext: true,//翻页禁用
              disabledPre: true,//翻页禁用
              curriculumall: [],
              totalNum: 0,   //总条数
              totalPage: 0, //总页数
              currentPage: 1,
            })
          }
        }
      }.bind(this));
    };
  };
  //听课本-下一页
  handleChangeNextLis() {
    let offset = 1;
    let req = {}
    if (offset + this.state.currentPage > this.state.totalPage) {
      return false;
    } else {
      if (offset + this.state.currentPage == this.state.totalPage) {
        this.setState({
          disabledNext: true,//翻页禁用
          disabledPre: false,
        });
      } else {
        this.setState({
          disabledNext: false,//翻页禁用
          disabledPre: false,
        });
      }
      let page = offset + this.state.currentPage
      req = {
        teacherId: this.teacherId,//当前用户
        classID: this.state.classID,//班级 Id
        currentPage: offset + this.state.currentPage,   //当前页
        teacherName: this.state.teacherName,//输入框老师名字 
        weeks: this.state.weeks, //选择的周次 
      };
      Request('api/web/teacher_listen_job/selectSearchMyListenNote', req, function (ret) {
        if (ret.result) {
          let resData = ret.data;
          if (!resData.curriculumall.length == 0) {
            let weekdata = JSON.parse(localStorage.getItem('weeks'));
            var index = _.indexOf(weekdata, resData.curriculumall[0].weeks);
            this.setState({
              curriculumall: resData.curriculumall || [],
              totalNum: resData.totalNum || 0,   //总条数
              totalPage: resData.totalPage || 0, //总页数
              currentPage: resData.currentPage,
              clickIndex: index,
              weeks: resData.curriculumall[0].weeks
            })
          } else {
            this.setState({
              disabledNext: true,//翻页禁用
              disabledPre: true,//翻页禁用
              curriculumall: [],
              totalNum: 0,   //总条数
              totalPage: 0, //总页数
              currentPage: 1,
            })
          }
          this.disabledNextPre();
        }
      }.bind(this));

    };
  };
  //获取输入框授课者
  handleTeachNameChange(event) {
    this.setState({
      teacherName: event.target.value
    })
  };
  //点击周次选择
  handleChangeWeek(value, index) {
    this.setState({
      clickIndex: index,
      weeks: value
    });
    let req = {};
    req = {
      teacherId: this.teacherId,//当前用户
      classID: this.state.classID,//班级 Id
      currentPage: 1,   //当前页
      teacherName: this.state.teacherName,//输入框老师名字
      weeks: value, //选择的周次
    };
    this.getSearchMyNote(req);
  };
  //点击周次选择
  handleChangeWeekLis(value, index) {
    this.setState({
      clickIndex: index,
      weeks: value
    });
    let req = {};
    req = {
      teacherId: this.teacherId,//当前用户
      classID: this.state.classID,//班级 Id
      currentPage: 1,   //当前页
      teacherName: this.state.teacherName,//输入框老师名字 
      weeks: value, //选择的周次
    };
    this.getLisSearchMyNote(req);
  };

  render() {
    let classes = this.state.techClass || [];
    let devalue = this.state.devalue || ' ';
    return (
      <div className="pf-r-curricululinfo">
        <div className="pf-dia-curriculultitle">
          <div className='pf-dia-classselect'>
            <span className="pf-dia-titleword">班级筛选：</span>
            <div className="cjy-rselect-slctBox">
              <Select showSearch value={devalue} style={{ width: '160px' }} optionFilterProp="children" onChange={this.props.type == "research" ? this.handleSelectSystem.bind(this, classes) : this.handleSelectSystemLis.bind(this, classes)}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                {
                  classes.map((item, index) => (
                    <Option key={index} value={item.classID}>{item.className}</Option>
                  ))
                }
              </Select>
            </div>
          </div>
          <Button
            size='large'
            className="pf-dia-pagepre"
            onClick={this.props.type == "research" ? this.handleChangePre : this.handleChangePreLis}
            disabled={this.state.disabledPre}>上一页</Button>
          <Button
            size='large'
            className="pf-dia-pagenext"
            onClick={this.props.type == "research" ? this.handleChangeNext : this.handleChangeNextLis}
            disabled={this.state.disabledNext}>下一页</Button>
          <Button
            size="large" className="pf-dia-bigbutton"
            onClick={this.props.type == "research" ? this.handleSearch : this.handleSearchLis}>
            <span>查 询</span>
          </Button>
          <Input placeholder="授课者" value={this.state.teacherName} onChange={this.handleTeachNameChange} />
        </div>
        <div className="pf-dia-curriculul">
          <div className="pf-dia-currnote">
            <DiaryNote curriculumall={this.state.curriculumall} type={this.props.type}></DiaryNote>
          </div>
          <div className="pf-dia-middlesplit"></div>
          <div className="pf-dia-currweek">
            <ul>
              {
                this.state.weeksList.map((week, i) => <li key={i}><Button size='large'><a onClick={this.props.type == "research" ? this.handleChangeWeek.bind(this, week, i) : this.handleChangeWeekLis.bind(this, week, i)} className={this.state.clickIndex == i ? 'clicked' : ''}>第{Number.toChinese(week)}周</a></Button></li>)
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Diary;