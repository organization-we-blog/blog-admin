/*添加文章的界面*/
import React from "react"
import {Link} from "react-router-dom"
import { Input, Button, Checkbox , Select,  Upload} from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import { UploadOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import axios from "axios"

import Css from "./EditArticle.less"//导入css

export default class EditArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classifyList:[],//所有分类
            tagList:[],//所有标签
            showAddClassifyInput:["none","inline-block"],//两个样式之间的切换
            showAddTagInput : ["none","inline-block"],//两个样式之间的切换
            formData: {
                title: "",//标题
                synopsis: "",//简介
                filepath: "",//后台存入的内容文件名
                classify: "",//分类
                tag: [],//标签
            }
        };
    }

    componentDidMount(){//生命周期函数
        this.init();
    }

    render() {
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
                    if(info.file.response.code === 1){//且后台返回的数据义状态码为1时
                        let formData = that.state.formData;
                        formData.filepath = info.file.response.datas[0].filepath;//返回后台存入的文件名
                        that.setState(formData);//将上传到后台的文件的文件名保存到formData.filepath中
                    }
                }
            },
        };

        return <div style={{position: "relative",width: "100%",height:"100%"}}>
            <div style={{width: "65%",height:"100%",float:"left"}}>
                标题：
                <Input placeholder="请输入标题" onChange={(e)=>{this.titleInputChange(e)}} />{/*标题框*/}
                简介：
                <TextArea rows={4} onChange={(e)=>{this.synopsisInputChange(e)}} />{/*简介框*/}
                内容文件：
                <Upload {...props}  >{/*文件上传模块*/}
                    <Button style={{margin:"50px auto"}}>
                        <UploadOutlined /> {/*上传内容文件*/}
                    </Button>
                </Upload>
                <Button style={{margin:"50px 30px",float:"right"}} type="primary" size="large" onClick={()=>{this.addArticle()}}>{/*保存按钮*/}
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
                <Select defaultValue={this.state.classifyList[0]?this.state.classifyList[0].value : "无"} style={{ width: 120 }} onChange={(classifyID)=>{this.classifySelectChange(classifyID)}}>{/*分类选择框*/}
                    {/*将classifyList中的元素设置为选项*/}
                    {this.state.classifyList.map(function (item,index) {
                            return <Option value={item._id} key={index}>{item.value}</Option>/*遍历显示*/
                    })}
                </Select>
                <Input ref="classifyInput" placeholder="分类名" className={Css.addClassifyBox} style={{display: this.state.showAddClassifyInput[0]}} />{/*添加分类的文本框和一系列按钮*/}
                <Button icon={<PlusOutlined />} size="small" style={{display: this.state.showAddClassifyInput[1]}} onClick={()=>{this.cutShowAddClassifyInput()}} />{/*添加按钮*/}
                <Button icon={<CheckOutlined />} size="small" style={{display: this.state.showAddClassifyInput[0]}} onClick={()=>{this.addClassif()}} />{/*确认添加按钮*/}
                <Button icon={<CloseOutlined />} danger size="small" style={{display: this.state.showAddClassifyInput[0]}} onClick={()=>{this.cutShowAddClassifyInput()}} />{/*取消添加按钮*/}
                <br/><br/><br/><br/><br/>
                标签：
                {this.state.tagList.map((item,index)=> {{/*将tagList中的元素设置为选项*/}
                    return <Checkbox onChange={(e)=>{this.narCheckboxChange(e,item._id)}} key={index}>{item.value}</Checkbox>/*遍历显示*/
                })}
                <Input ref="tagInput" placeholder="标签名" className={Css.addTagBox} style={{display: this.state.showAddTagInput[0]}} />{/*添加标签的文本框和一系列按钮*/}
                <Button icon={<PlusOutlined />} size="small" style={{display: this.state.showAddTagInput[1]}} onClick={()=>{this.cutShowAddTagInput()}} />{/*添加按钮*/}
                <Button icon={<CheckOutlined />} size="small" style={{display: this.state.showAddTagInput[0]}} onClick={()=>{this.addTag()}} />{/*确认添加按钮*/}
                <Button icon={<CloseOutlined />} danger size="small" style={{display: this.state.showAddTagInput[0]}} onClick={()=>{this.cutShowAddTagInput()}} />{/*取消添加按钮*/}
            </div>
        </div>
    }


    init(){//初始化
        axios.post('/Api/article/getTagAndClassify')//获取所有分类和标签
            .then((res)=>{
                let {classify,tag} = res.data.datas[0];
                this.setState({
                    classifyList:classify,
                    tagList:tag
                });
                let formData = this.state.formData;
                formData.classify=this.state.classifyList[0]._id;//默认选中第一个分类
                this.setState({formData});//将默认分类添加到formData.classify中（初始化）
            });
    }
    synopsisInputChange(e){//将简介框中最新的文本更新到formData.synopsis
        let formData = this.state.formData;
        formData.synopsis = e.target.value;
        this.setState({formData});
    };
    titleInputChange(e){//将简介框中最新的文本更新到formData.synopsis
        let formData = this.state.formData;
        formData.title = e.target.value;
        this.setState({formData});
    };
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
    classifySelectChange(classifyID) {//将最新选中的分类更新到formData
        let formData = this.state.formData;
        formData.classify =classifyID;
        this.setState({formData:formData});
    }
    narCheckboxChange(e,tagID){//将最新选中的标签更新到formData
        let formData = this.state.formData;
        let of = formData.tag.indexOf(tagID);
        if(e.target.checked){//选中
            if(of === -1){//formData.tag数组中不含有该选项
                formData.tag.push(tagID);//向formData.tag数组中添加该选项
            }
        }else {//未选中
            if(of !== -1){//formData.tag数组中含有该选项
                formData.tag.splice(of,1);//从formData.tag数组中删除该选项
            }
        }
        this.setState({formData:formData});//更新
    }
    addClassif(){//添加分类
        axios.post('/Api/article/addClassify',{classValue:this.refs.classifyInput.state.value})
            .then((res)=>{
                this.init();
                this.refs.classifyInput.state.value = "";//清空
            });
        this.cutShowAddClassifyInput();//切换显示状态
    }
    addTag(){//添加标签
        axios.post('/Api/article/addTag',{tagValue:this.refs.tagInput.state.value})
            .then((res)=>{
                this.init();
                this.refs.tagInput.state.value = "";//清空
            });
        this.cutShowAddTagInput();//切换显示状态
    }
    addArticle (){//添加文章
        axios.post('/Api/article/addArticle',this.state.formData)
            .then((response)=>{
                if(response.data.code === 1){
                    alert("添加成功");
                }
            })
    };
};
