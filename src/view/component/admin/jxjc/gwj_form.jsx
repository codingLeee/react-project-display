import React, { Component } from 'react';
import { Form,Button } from 'antd';
import '../../../../css/admin/gwj_form.css'

export default class MyForm extends Component{
    render(){
        return(
            <div className="gwj-form">
                <Button type="primary" className="gwj-form-button">提交</Button>
                <Form>
                    111
                </Form>
            </div>
        );
    }
}