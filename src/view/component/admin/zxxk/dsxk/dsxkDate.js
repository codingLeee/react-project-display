/*
 * @Author: xq 
 * @Date: 2019-02-28 17:38:55 
 * @Last Modified by: xq
 * @Last Modified time: 2019-03-04 17:18:13
 * 定时巡课-时间和节次选择
 */
import  React,{ Component } from "react";
import { Tree ,Icon } from 'antd';
// import { setTimeout } from "timers";
import _x from '../../../../../js/_x/util/index';

import moment from 'moment';
import { DatePicker } from 'antd';

const { MonthPicker, RangePicker } = DatePicker;
const _format = _x.date.format;
const { TreeNode } = Tree;
class TimingPatrolDate extends Component {
    constructor(){
        super();
        this.state = {
            treeData:[],
            loading: false,
            visible: false,
            paramTime:'2099-99-99'   // 请求列表的入参时间
        }
        this.onSelect = this.onSelect.bind(this);
        this.getData = this.getData.bind(this);
        this.renderTreeNodes = this.renderTreeNodes.bind(this);
        // this.chengeDate = this.chengeDate.bind(this);
        this.changePicker = this.changePicker.bind(this);
    }
    range=(start, end)=>  {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
      }
      
      /**
       * 不可选择的日期 
       */
      disabledDate=(current)=>  {
        return current > moment().endOf('day');
      }

      /**
       * 日历选择
       */
      changePicker(value){
        let time = moment(value._d).format('YYYY-MM-DD')
        this.setState({
            paramTime:time
        })
        console.log('选择的日期是： ',time)
      }
      
     
    // /**
    //  * 时间切换
    //  * @param {number} n  1是前一天；2是后一天
    //  */
    // chengeDate(n){
    //     let now = new Date().getTime();
    //     console.log(now);
    //     if(n===1){
    //         // 回退
    //     } 
    //     if(n===2){
    //         // 前进
    //     }
    // }

    /**
     * 列表复选框
     * @param {array}  selectedKeys 选中项的id集合
     * @param {string} info         选中项的名称集合
     */
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }

    /**
     * 树节点递归函数
     */
      renderTreeNodes(data) {
        return data.map((item) => {
            if (item.list) {
              return (
                <TreeNode 
                    title={`${item.lessonName}（${item.num}/${item.cnt}）`} 
                    key={item.key} 
                    dataRef={item}
                    selectable={false}
                >
                  {
                    item.list.map((it,index)=>{
                        return (
                            <TreeNode 
                                title={`${it.strategyName}（${it.num}/${it.numAll}）`} 
                                key={it.key}>
                            </TreeNode>
                        )
                    })
                  }
                </TreeNode>
              );
            }
            return <TreeNode {...item} />;
          })
      }
    
    /**
     * 获取节次和时间
     */
    getData(){
        let data = [
            {
                cnt:213,
                lessonName:'第一节',
                title:'12',
                lessonOrderId:123,
                key:'12',
                marked:1,
                num:28,
                list:[
                    {
                        num:12,
                        numAll:113,
                        title:'123',
                        key:'123',
                        strategyName:'课前检查'
                    },
                    {
                        num:16,
                        numAll:100,
                        title:'124',
                        key:'124',
                        strategyName:'课前检查'
                    }
                ]
            },
            {
                cnt:213,
                lessonName:'第一节',
                lessonOrderId:123,
                key:'34',
                title:'34',
                marked:1,
                num:28,
                list:[
                    {
                        num:15,
                        numAll:200,
                        title:'345',
                        key:'345',
                        strategyName:'课前检查'
                    },
                    {
                        num:13,
                        numAll:13,
                        key:'346',
                        title:'346',
                        strategyName:'课前检查'
                    }
                ]
            }
        ];
        this.setState({
            treeData:data,
            defaultZk:data[0].list[0].key
        })
    }

    componentDidMount(){
        this.getData();
    }

    render(){
        let defaultZk = this.state.defaultZk;
        let treeData = this.state.treeData;
        let defaultTime = moment(new Date().getTime()).format('YYYY-MM-DD');
        return (
            <div className='xq-timing-right'>
                <div className='xq-timing-date'>
                {/*
                    <div className='xq-timing-date-prev' onClick={()=>this.chengeDate(1)}>  &lt; </div>
                */}
                    
                    <div className='xq-timing-date-info'>
                        <div className='xq-timing-date-t'>
                        <DatePicker
                            className='xq-date-picker'
                            format="YYYY-MM-DD"
                            disabledDate={this.disabledDate}
                            onOk={this.changePicker}
                            placeholder={defaultTime}
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        />
                        </div>
                        <div className='xq-timing-date-task'>
                            任务进行中:
                            <span>10</span> /
                            121
                        </div>
                    </div>
                    {/*
                        <div className='xq-timing-date-prev' onClick={()=>this.chengeDate(2)}>  &gt; </div>
                    */}
                </div>
                <div className='xq-timing-tree'>
                {
                    treeData.length
                    ?<Tree
                        defaultExpandedKeys={[defaultZk]}
                        showLine
                        defaultSelectedKeys={[defaultZk]}
                        >
                        {this.renderTreeNodes(treeData)}
                    </Tree>
                    :''
                }
                </div>
       
            </div>
        )
    }
}
export default TimingPatrolDate;