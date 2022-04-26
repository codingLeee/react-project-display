/*
 * @Author: JudyC 
 * @Date: 2017-09-12 15:16:38 
 * @Last Modified by: JudyC
 * @Last Modified time: 2017-11-28 17:25:54
 */
import React, { Component } from 'react';
import {Tree} from 'antd';
import '../../css/components/researchTree.css';

const TreeNode = Tree.TreeNode;

class ResearchTree extends Component{
  render(){
    return (
      <div className="cjy-rt-treeBox">
        <Tree onSelect={this.onSelect.bind(this)} showLine>
          {
            this.props.treeData == null 
            ? ''
            : this.props.treeData.map((item1)=>{
              return(
                <TreeNode title={item1.name} key={item1.id} level="1">
                  {
                    item1.children.map((item2)=>{
                      return(
                        <TreeNode title={item2.name} key={item2.id} level="2">
                          {
                            item2.children.map((item3)=>{
                              return(<TreeNode grade={item1.name} title={item3.name} key={item3.id} level="3"/>)
                            })
                          }
                        </TreeNode>
                      )
                    })
                  }
                </TreeNode>
              )
            })
          }
        </Tree>
      </div>
    )
  }

  onSelect(selectedKeys, info){
    this.props.handleChangeGrade(selectedKeys,info.node.props.grade+info.node.props.title,info.node.props.level);
  }
}

export default ResearchTree;