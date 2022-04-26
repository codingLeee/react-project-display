import React, { Component } from 'react';
import { Table,Button,InputNumber } from 'antd';
import '../../../../css/admin/gwj_form.css'

export default class MyTable extends Component{

    constructor(props){
        super(props);
        this.state = {
            scoreArr : [0,0,0,0,0,0],
        }
    }

    onChange = (index,value) => {
        let scoreArr = this.state.scoreArr;
        scoreArr[index] = value;
        this.setState({
            scoreArr : scoreArr
        },function(){
            console.log(this.state.scoreArr)
        })
    }

    submit = () => {
        //提交分数
        console.log("提交");
        this.setState({
            scoreArr : [0,0,0,0,0,0],
        })
    }
      
    render(){
        const columns = [{
            title: '评价大项',
            dataIndex: 'major',
            render: (value,row,index) => {
                console.log(index)
                const obj = {
                    children: value,
                    props: {},
                  };
                  if (index === 0) {
                    obj.props.rowSpan = 4;
                  }
                  if (index === 1) {
                    obj.props.rowSpan = 0;
                  }
                  if (index === 2) {
                    obj.props.colSpan = 0;
                  }
                  if (index === 3) {
                    obj.props.rowSpan = 0;
                  }
                  return obj;
            }
        },{
            title: '评价子项',
            dataIndex: 'subitem',
        },{
            title: '评价标准',
            dataIndex: 'standard'
        },{
            title: '分值',
            dataIndex: 'score'
        },{
            title: '得分',
            key: 'value',
            // render: () => (
            //     <InputNumber defaultValue={0} onChange={this.onChange} />
            // )
            render: (text, row, index) => {
                if(index === 0){
                    return <InputNumber min={0} max={30} value={this.state.scoreArr[index]} onChange={(value) => this.onChange(index,value)} />
                }
                if(index >= 1 && index <= 3){
                    return <InputNumber min={0} max={20} value={this.state.scoreArr[index]} onChange={(value) => this.onChange(index,value)} />
                }
                if(index >= 4 && index <= 5){
                    return <InputNumber min={0} max={5} value={this.state.scoreArr[index]} onChange={(value) => this.onChange(index,value)} />
                }
                
            }
        }];
        let dataSource = [{
            key: '0',
            major: '教师效果评价(合计90分)',
            subitem: '教学效果',
            standard: '因材施教，启发引导，精神饱满，指导耐心',
            score: '30',
        },{
            key: '1',
            major: '教师效果评价(合计90分)',
            subitem: '教学能力',
            standard: '老师教学能力较强，教学方法多样',
            score: '20',
        },{
            key: '2',
            major: '教师效果评价(合计90分)',
            subitem: '教学内容',
            standard: '鼓励创新，手法先进，方法多样，管理得力',
            score: '20',
        },{
            key: '3',
            major: '教师效果评价(合计90分)',
            subitem: '教学态度',
            standard: '教学态度好，对学生有耐心',
            score: '20',
        },{
            key: '4',
            major: '学生听课状态(合计5分)',
            subitem: '学生状态',
            standard: '学生听课认真，紧跟老师授课过程',
            score: '5',
        },{
            key: '5',
            major: '教室卫生情况(合计5分)',
            subitem: '教室情况',
            standard: '教室卫生等级分为：优、良、中、差',
            score: '5',
        }]
        return(
            <div className="gwj-table-box">
                <Button type="primary" onClick={this.submit} className="gwj-table-button">提交</Button>
                <Table 
                className="gwj-table"
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                />
            </div>
        );
    }
}