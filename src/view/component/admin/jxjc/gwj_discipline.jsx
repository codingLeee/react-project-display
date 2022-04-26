import React,{ Component } from 'react'
import '../../../../css/admin/gwj_discipline.css'

export default class MyDiscipline extends Component{
    render(){
        return(
            <div className="gwj-discipline-box">
                <div className="gwj-discipline">
                    <div>1</div>
                    <div>
                        <div><span>发生事件：</span>学生早退、学生迟到、老师早退</div>
                        <div><span>扣分：</span><span>2</span></div>
                        <div><span>备注：</span>老师无视教学规则，迟到23分钟，课堂秩序混乱，3名学生早退十分钟</div>
                        <div><span>记录人：</span><span>吴洋</span><span>记录时间：</span><span>2016-06-07 10:32:21</span><span>类型：</span><span>人脸巡课</span></div>
                    </div>
                </div>
            </div>
        );
    }
}