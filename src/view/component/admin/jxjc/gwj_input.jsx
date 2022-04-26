import React,{ Component } from 'react'
import { connect } from 'react-redux';
import { Input ,Button } from 'antd';
import '../../../../css/admin/gwj_input.css'
import { addComment } from '../../../../redux/checkOfRoom.reducer'

const { TextArea } = Input;
@connect( state => state,{
    addComment
})
export default class MyInput extends Component{

    constructor(props){
        super(props);
        this.state = {
            inputValue:'请输入评论',//输入框中的值
        }
    }

    changeValue = (value) => {
        console.log(value)
        this.setState({
            inputValue: value
        })
    }

    submit = () => {
        //发送请求
        //请求接口
        this.props.addComment({curriculumallId:this.props.curriculumallId,description:this.state.inputValue}).then(result => {
            this.setState({
                inputValue:'请输入评论',
            })
        })
    }

    render(){
        console.log(this.props.curriculumallId)
        return(
            <div className="gwj-input">
                <TextArea rows={4} value={this.state.inputValue } onChange={(e) => { e.target.value.length > 1000 ? this.changeValue(e.target.value.slice(0,1000)) : this.changeValue(e.target.value)} }/>
                <Button type="primary" onClick={this.submit}>提交</Button>
            </div>
        );
    }
}