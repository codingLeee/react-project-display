/*
 * @Author: JC.Liu 
 * @Date: 2019-02-28 10:43:47 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-19 15:19:29
 * 播放器组件 
 */
import React, { Component } from 'react'

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.playAndPause = false
  }

  componentDidMount() {
    // 实例化播放器
    this.renderPlayer()
  }

  renderPlayer = (urlArr) => {
    var videoObject = {
      autoLoad: false,
      autoplay: false,
      container: '#JC_player',//“#”代表容器的ID，“.”或“”代表容器的class
      variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
      loaded: 'loadedHandler', //当播放器加载后执行的函数
      flashplayer: true,//如果强制使用flashplayer则设置成true
      loop: false,
      live: false,
      playCorrect: true, //是否需要错误修正，这是针对rtmp的
      debug: false,//是否开启调试模式
      volume: 0.5,
      video: "rtmp://10.20.5.133:1936/vod|/file/local://D:/fms_TRMS/data/file/20190308/multi/18/5991d59450864aa398c53c55a076462a.mp4"
    };

    (function (win, that) {
      let num = 1
      win.player = new win.ckplayer(videoObject);
      win.loadedHandler = function () {
        win.player.addListener('definitionChange', win.definitionChangeHandler); //监听清晰度切换事件
        win.player.addListener('buffer', win.bufferHandler); //监听缓冲状态
        win.player.addListener('duration', win.durationHandler); //监听播放时间
        win.player.addListener('play', win.playHandler);  // 监听视频的播放
        win.player.addListener('error', win.errorHandler); //监听视频加载出错
        win.player.addListener('time', win.timeHandler); //监听视频加载出错
        // 监听视频已加载的字节
        win.player.addListener('bytes', win.bytesHandler);
        // 监听视频播放结束
        win.player.addListener('ended', win.endedHandler);
        // 监听时候暂停
        win.player.addListener('paused', win.pausedHandler);
        // 监听控制栏消失
        win.player.addListener('controlBar', win.controlBarHandler);
        // 自定义监听 
        // win.player.addListener('editorKeyWorld', win.editorKeyWorld);
        // 监听全屏
        win.player.addListener('full', win.fullHandler);
        // 监听时间的跳转
        win.player.addListener('seekTime', win.seekTimeHandler);
      }

      // 监听时间的跳转
      win.seekTimeHandler = function seekTimeHandler() {
        win.player.videoPlay()
      }

      // 监听全屏 
      win.fullHandler = function fullHandler(e) {
        console.log(e);
        // 全屏时将编辑按钮定位到全屏右下角的位置
        that.setState({
          editorPos: e
        })
      }

      // 监听控制栏消失
      win.controlBarHandler = function controlBarHandler(e) {
        that.editorBtNShow(e)
      }
      // 监听是否暂停
      win.pausedHandler = function pausedHandler() {
        that.pause = true;
        that.playAndPause = true
        setTimeout(() => {
          that.playAndPause = false
        }, 80);
      }
      // 监听视频播放结束
      win.endedHandler = function endedHandler() {
        // 播放结束后  刷新播放器
        that.props.refresh();
      }

      // 监听视频已加载的字节
      win.bytesHandler = function bytesHandler(e) {
        console.log(e);
      }

      // 监听时间
      win.timeHandler = function timeHandler(e) {
        that.time(e)
        // win.player.videoPlay()
        // console.log("time：", that.time);
      }

      // 监听错误
      win.errorHandler = function errorHandler(e) {
        // message.error("加载失败!", 3)
        that.props.refresh(that.t)
      }

      //正在播放
      win.playHandler = function playHandler() {
        // win.player.deleteElement('editorKeyWorld')
        // win.player.videoZoom(1.35)
        console.log("正在播放");
        win.player.videoProportion(4, 3)
        that.setState({
          disable: false
        });

        if (!that.playAndPause) {
          win.player.videoPlay();
        }

        // 视频能播放的情况下，回调将this.index 计数器重置
        // that.props.canPlayCallBack();
        if (num >= 2) {
          // 控制条的显示影藏
          win.player.changeControlBarShow(false);
          win.player.changeControlBarShow(true);
        }

        // num >=10 必须是在播放的情况下  同时是断流的标识  则seek到错误时间点 并初始化标识和刷新组件的计数器
        // num >= 15 && 
        if (that.props.playerFlag === "disconnect") {
          that.props.canPlayCallBack();
          setTimeout(() => {
            console.log("错误时间点：", that.props.freshTime);
            // 如果存在之前断流的时间点，跳转该时间点
            if (that.props.freshTime) {
              console.log("跳转到错误时间点:", that.props.freshTime);
              win.player.videoSeek(that.props.freshTime)
            }
          }, 300);
        }
      }

      // 当获取BUFFER之后自动执行多次播放事件，从而改善视频丢帧情况
      win.bufferHandler = function bufferHandler(e) {
        console.log(e);
        num++;
        // if (num < 15) {
        //   setTimeout(() => {
        //     win.player.videoPlay()
        //   }, 100);
        // }
      }

      // 在切换清晰度后将播放器暂停再播放，以解决卡顿
      win.definitionChangeHandler = function definitionChangeHandler(e) {
        if (e) {
          console.log("切换后执行播放");
          var timer = setTimeout(() => {
            for (var i = 1; i < 15; i++) {
              win.player.videoPause()
              win.player.videoPlay();
            }
            clearTimeout(timer)
          }, 1000);
        }

        // 切换高标清同时切换下载类型
        console.log("切换：", e);
        if (e === 0) {
          console.log('切换高清')
          that.props.playFlag("difinition");
          that.props.videoRelotion("hd");
        }
        if (e === 1) {
          console.log('切换标清')
          that.props.playFlag("difinition");
          that.props.videoRelotion("ld");
        }
      }

      win.durationHandler = function durationHandler(e) {
        console.log('监听总时间：', e)
        that.totalTime = e;
      }

    })(window, this)

  }

  render() {
    return (
      <div style={{ background: "#fff" }} >
        <div id="JC_player" style={{ width: 1000, height: 600 }} ></div>
      </div>
    )
  }
}

