import React from "react"
import { Table, Button } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import {Link} from "react-router-dom";
import axios  from "axios";

import zhCN from 'antd/es/locale/zh_CN';
let moment = require("moment");




export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],//列表数据
            sortedInfo: null,
            loading: false,
            visible: false,
        };
    }
    componentDidMount(){
        axios.post("/Api/article/getArticle")//获取所有文章
            .then((res)=>{
                let data = res.data.result;
                this.setState({data: data.map((value,index)=>{
                    value.key = index;
                    return value;
                    })});
            })
    }
    render() {
        let { sortedInfo} = this.state;
        sortedInfo = sortedInfo || {};
        const columns = [
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
                ellipsis: true,
            },{
                title: '发布时间',
                dataIndex: 'create_time',
                key: 'create_time',
                sorter: (a, b) => {
                    return moment(a.create_time, "YYYY/MM/DD HH:mm")._d - moment(b.create_time, "YYYY/MM/DD HH:mm")._d
                },
                sortOrder: sortedInfo.columnKey === 'create_time' && sortedInfo.order,
                ellipsis: true,
            },{
                title: '分类',
                dataIndex: 'classify',
                key: 'classify',
                filters: [
                    { text: '前端', value: '前端' },
                    { text: 'java', value: 'java' },
                ],
                onFilter: (value, record) => record.classify.includes(value),
                ellipsis: true,
            },{
                title: '点击量',
                dataIndex: 'pv',
                key: 'pv',
                sorter: (a, b) => {
                    return a.pv - b.pv
                },
                sortOrder: sortedInfo.columnKey === 'pv' && sortedInfo.order,
                ellipsis: true,
            },{
                title: '赞',
                dataIndex: 'good',
                key: 'good',
                sorter: (a, b) => {
                    return a.good - b.good
                },
                sortOrder: sortedInfo.columnKey === 'good' && sortedInfo.order,
                ellipsis: true,
            },{
                title: '踩',
                dataIndex: 'bad',
                key: 'bad',
                sorter: (a, b) => {
                    return a.bad - b.bad
                },
                sortOrder: sortedInfo.columnKey === 'bad' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: <Link to="/EditArticle"><Button  type="primary"> <PlusOutlined></PlusOutlined> 添加 </Button></Link>,
                key: 'action',
                render: (text, record) => (<span>
                    <Button type="link" onClick={()=>{console.log(record)}}>修改</Button>
                    <Button type="link" danger onClick={()=>{console.log(record)}}>删除</Button>
                </span>),
            }
        ];//列表配置项
        return <div style={{position: "relative"}}>
            <Table locale={zhCN} columns={columns} dataSource={this.state.data} pagination={{pageSize:8}}/>{/*列表组件*/}
        </div>
    }
}
