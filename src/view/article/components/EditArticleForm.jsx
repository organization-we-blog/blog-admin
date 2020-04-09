import React from "react"
import {Link} from "react-router-dom"
import { Input, Button, Checkbox , Select,  Upload} from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import { UploadOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import axios from "axios"

export default class EditArticleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classifyList:[],
            tagList:[],
            showAddClassifyInput:["none","inline-block"],
            showAddTagInput : ["none","inline-block"],
            formData: {
                title: "",//标题
                synopsis: "",//简介
                filepath: "",//后台存入的内容文件名
                classify: "",//分类
                tag: [],//标签
            }
        };
    }
    init(){//初始化函数
        axios.post('/Api/article/newArticleGetTagAndClassify')//获取所有分类和标签
            .then((res)=>{
                this.setState({
                    classifyList:res.data.result[0].classify,
                    tagList:res.data.result[0].tag
                });
                let formData = this.state.formData;
                formData.classify=this.state.classifyList[0];
                this.setState({formData});//将默认分类添加到formData.classify中（初始化）
            });
    }
    componentDidMount(){//生命周期函数
        this.init();
    }
    cutShowAddClassifyInput(){//变化添加分类按钮和文本框、确认，取消按钮的显示状态
        let t1 = this.state.showAddClassifyInput;
        this.setState({
            showAddClassifyInput:[t1[1],t1[0]]//显示状态互换
        })
    }
    cutShowAddTagInput(){//变化添加标签按钮和文本框、确认，取消按钮的显示状态
        let t1 = this.state.showAddTagInput;
        this.setState({
            showAddTagInput:[t1[1],t1[0]]//显示状态互换
        })
    }



    render() {
        let classifySelectChange = (value) => {//将最新选中的分类更新到formData
            let formData = this.state.formData;
            formData.classify = this.state.classifyList[value];
            this.setState({formData:formData});
        };
        let narCheckboxChange = (e,index) => {//将最新选中的标签更新到formData
            let formData = this.state.formData;
            let of = formData.tag.indexOf(this.state.tagList[index]);
            if(e.target.checked){//选中
                if(of === -1){//formData.tag数组中不含有该选项
                    formData.tag.push(this.state.tagList[index]);//向formData.tag数组中添加该选项
                }
            }else {//未选中
                if(of !== -1){//formData.tag数组中含有该选项
                    formData.tag.splice(of,1);//从formData.tag数组中删除该选项
                }
            }
            this.setState({formData:formData});//更新
        };
        let titleInputChange = (e) =>{//将标题框中最新的文本更新到formData.title
            let formData = this.state.formData;
            formData.title = e.target.value;
            this.setState({formData});
        };
        let synopsisInputChange = (e) =>{//将简介框中最新的文本更新到formData.synopsis
            let formData = this.state.formData;
            formData.synopsis = e.target.value;
            this.setState({formData});
        };

        //添加分类的函数
        let  addClassif = ()=>{
            axios.post('/Api/article/addClassify',{classValue:this.refs.classifyInput.state.value})
                .then((res)=>{
                    this.init()
                    this.refs.classifyInput.state.value = "";//清空
                });
            this.cutShowAddClassifyInput();//切换显示状态
        };
        //添加标签的函数
        let  addTag = ()=>{
            axios.post('/Api/article/addTag',{tagValue:this.refs.tagInput.state.value})
                .then((res)=>{
                    this.init();
                    this.refs.tagInput.state.value = "";//清空
                });
            this.cutShowAddTagInput();//切换显示状态
        };

        let that = this;
        const props = {//文件上传模块的配置
            name: 'file',//上传时的字段名
            action: '/Api/article/fileSubmit',//上传路径
            accept: ".txt,.md,.html",//允许上传的文件后缀名
            headers: {
                authorization: 'authorization-text',//请求头
            },
            onChange(info) {//上传状态改变时的回调
                if(info.file.status === "done"){//当状态为上传成功时
                    if(info.file.response.status_code === 200){//且后台返回的自定义状态码为200时
                        let formData = that.state.formData;
                        formData.filepath = info.file.response.result.filepath;//返回后台存入的文件名
                        that.setState(formData);//将上传到后台的文件的文件名保存到formData.filepath中
                    }
                }
            },
        };

        let addArticle = ()=>{
            axios.post('/Api/article/addArticle',this.state.formData)
                .then((response)=>{
                    if(response.statusCode === 200){
                        console.log("添加成功");
                    }
                })
        };



        return <div style={{position: "relative",width: "100%",height:"100%"}}>
            <div style={{width: "65%",height:"100%",float:"left"}}>
                标题：
                <Input placeholder="请输入标题" onChange={(e)=>{titleInputChange(e)}} />{/*标题框*/}
                简介：
                <TextArea rows={4} onChange={(e)=>{synopsisInputChange(e)}} />{/*简介框*/}
                <Upload {...props}  >{/*文件上传模块*/}
                    <Button style={{margin:"50px auto"}}>
                        <UploadOutlined /> 上传内容文件
                    </Button>
                </Upload>
                <Button style={{margin:"50px 30px",float:"right"}} type="primary" size="large" onClick={()=>{addArticle()}}>{/*保存按钮*/}
                    添加
                </Button>
                <Link to="/article">
                    <Button style={{margin:"50px 30px",float:"right"}} type="primary" danger size="large">{/*退出按钮*/}
                        取消
                    </Button>
                </Link>
            </div>
            <div style={{width: "30%",height:"100%",float:"right"}}>
                <br/>
                分类：
                <Select defaultValue="0" style={{ width: 120 }} onChange={classifySelectChange}>{/*分类选择框*/}
                    {/*将classifyList中的元素设置为选项*/}
                    {this.state.classifyList.map(function (value,index) {
                            return <Option value={index+""} key={index}>{value}</Option>
                    })}
                </Select>
                <Input ref="classifyInput" placeholder="分类名" style={{width:"100px",margin:"0 0 0 10px",display: this.state.showAddClassifyInput[0]}} />{/*添加分类的文本框和一系列按钮*/}
                <Button icon={<PlusOutlined />} size="small" style={{margin:"0 10px",display: this.state.showAddClassifyInput[1]}} onClick={()=>{this.cutShowAddClassifyInput()}} />
                <Button icon={<CheckOutlined />} size="small" style={{margin:"0 10px",display: this.state.showAddClassifyInput[0]}} onClick={()=>{addClassif()}} />
                <Button icon={<CloseOutlined />} danger size="small" style={{margin:"0 10px",display: this.state.showAddClassifyInput[0]}} onClick={()=>{this.cutShowAddClassifyInput()}} />
                <br/><br/><br/><br/><br/>
                标签：
                {this.state.tagList.map(function (value,index) {{/*将tagList中的元素设置为选项*/}
                    return <Checkbox onChange={(e)=>{narCheckboxChange(e,index)}} key={index}>{value}</Checkbox>
                })}
                <Input ref="tagInput" placeholder="标签名" style={{width:"100px",margin:"0 0 0 10px",display: this.state.showAddTagInput[0]}} />{/*添加标签的文本框和一系列按钮*/}
                <Button icon={<PlusOutlined />} size="small" style={{margin:"0 10px",display: this.state.showAddTagInput[1]}} onClick={()=>{this.cutShowAddTagInput()}} />
                <Button icon={<CheckOutlined />} size="small" style={{margin:"0 10px",display: this.state.showAddTagInput[0]}} onClick={()=>{addTag()}} />
                <Button icon={<CloseOutlined />} danger size="small" style={{margin:"0 10px",display: this.state.showAddTagInput[0]}} onClick={()=>{this.cutShowAddTagInput()}} />
            </div>
        </div>
    }
};
