import React,{ Component } from 'react'
import { SVG } from '../../../../base'
import _x from './../../../../js/_x/index';
import '../../../../css/admin/gwj_comments.css'

const Format = _x.util.date.format;
const MyComments = () => {
    class MyComments extends Component{
        render(){
            return(
                <div className="gwj-comments-box">
                    <div className="gwj-comments">
                        <div>
                            {/* 头像可能有男女之分，需判断 */}
                            <img src={require('../../../../icon/default_head.png')} />
                        </div>
                        <div className="gwj-comments-content">
                            <div>1</div>
                            <div>
                                <span><SVG type="teacher" />2</span>
                                {/* <span><SVG type="time" />{this.props.item.lastUpdateTime ? Format(new Date(this.props.item.lastUpdateTime),'yyyy-MM-dd HH:mm:ss') : ''}</span> */}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
    return <MyComments/>
}
export default  MyComments; 