/*
 * @Author: JC.Liu 
 * @Date: 2019-03-24 12:28:09 
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2019-03-25 11:23:34
 * 课堂秩序 - 学院报表
 */
import * as React from 'react';
import { Select, Table, Pagination, Input, DatePicker, Row, Col, Button } from 'antd';
import { GetTeachData } from './../../../../../redux/JC_xybb_action.ts';
import { connect } from 'react-redux';
import { SVG } from '../../../../../base';
import moment from 'moment';
import _x from '../../../../../js/_x/index';
import './../../../../../css/admin/bigData/zx_xybb.scss';
const Format = _x.util.date.format;

const { Option } = Select;

interface XyProps {
  [x: string]: any
}

interface XyState {
  a: number
}
@connect(state => state, { GetTeachData })
export class XybbCom extends React.Component<XyProps, XyState>{
  constructor(XyProps) {
    super(XyProps);
    this.state = {
      a: 1
    }
  }

  componentDidMount(): void {
    this.props.GetTeachData();
  }

  stimeChange = (date, time): void => {
    console.log(date, time);
  }

  public render() {
    const format = 'YYYY/MM/DD'
    const { XybbReducer, TeachMechanism } = this.props;
    const { dataSource, stime, etime } = XybbReducer;
    const columns = [{
      title: '教学结构',
      dataIndex: 'collegeName',
    }, {
      title: '违纪次数',
      dataIndex: 'count',
    }, {
      title: '违纪扣分',
      dataIndex: 'source',
    }];

    const tableData = dataSource && dataSource.length ? dataSource.map((item, index) => {
      return {
        rowKey: index,
        ...item
      }
    })
      : [];

    console.log(stime, etime);


    return (
      <div className='JC-zx-xybb'>
        <div className='JC-zx-header'>
          <Row gutter={24} >
            <Col span={4} >
              <span>教学机构：</span>
              <Select defaultValue={1} onChange={TeachMechanism} >
                <Option value={1} >value1</Option>
                <Option value={2} >value2</Option>
                <Option value={3} >value3</Option>
                <Option value={4} >value4</Option>
              </Select>
            </Col>
            <Col span={4} >
              <span>巡课机构：</span>
              <Select defaultValue={1} onChange={TeachMechanism} >
                <Option value={1} >value1</Option>
                <Option value={2} >value2</Option>
                <Option value={3} >value3</Option>
                <Option value={4} >value4</Option>
              </Select>
            </Col>
            <Col span={4}>
              <span>违纪类型：</span>
              <Select defaultValue={1} onChange={TeachMechanism} >
                <Option value={1} >value1</Option>
                <Option value={2} >value2</Option>
                <Option value={3} >value3</Option>
                <Option value={4} >value4</Option>
              </Select>
            </Col>
            <Col span={8}>
              <span>时间：</span>
              <DatePicker
                format={format}
                value={moment(stime, format)}
                style={{ width: "140px" }}
                onChange={this.stimeChange}
              />
              <span>~</span>
              <DatePicker
                format={format}
                value={moment(etime, format)}
                style={{ width: "140px" }}
                onChange={this.etimeChange}
              />
            </Col>
            <Col span={2}>
              <Button>查询</Button>
            </Col>
            <Col span={2} >
              <SVG type="dcbb" width={25} height={17} color="#3498db"></SVG>
              导出报表
            </Col>
          </Row>
        </div>
        <div className="JC-zx-content" >
          <Table
            rowKey="table"
            columns={columns}
            dataSource={tableData}
            pagination={false}
          // loading={}
          />
        </div>
        <div className='JC-zx-footer'>
          {/* {
            tableData && tableData.length ?
              <React.Fragment>
                <Input
                  className="kyl-kt-jumpZdPage"
                  disabled={!this.state.zxTableData.total || this.state.zxTableData.total < 20 ? true : false}
                  onChange={this.changeInput}
                  onPressEnter={this.handleChangePage} />
                <Pagination className="kyl-kt-fy"
                  showQuickJumper
                  defaultCurrent={1}
                  current={this.state.page}
                  total={this.state.zxTableData.total}
                  onChange={this.jumpPage}
                  pageSize={20}
                />
              </React.Fragment>
              : null
          } */}
        </div>
      </div>
    )
  }
};