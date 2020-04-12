/*
所有内容从这里开始写
*/
import React from "react"
import {Link, Route, Switch} from "react-router-dom"
import Css from "./style.less"
import { Layout, Menu, Avatar} from 'antd';
import Article from "@view/article/Article";
import DashBoard from "../view/dash_board/DashBoard";
import MediaLibrery from "../view/media_librery/MediaLibrery";
import Safety from "../view/safety/Safety";
import UserControl from "../view/user_control/UserControl";
import Visit from "../view/visit/Visit";

import {
    UserOutlined,
    DashboardOutlined,
    FileTextOutlined,
    LineChartOutlined,
    SafetyOutlined,
    CameraOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
const { Header, Content, Sider } = Layout;


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){

    }
    render() {
        return <Layout className={Css.fill}>
            <Header className="header">
                <div className="logo" />
                <div style={{float: "right"}}>
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </div>
            </Header>{/*头部*/}
            <Layout className={Css.fill}>
                <Sider breakpoint="lg" collapsedWidth="0" style={{height: "100%", float: "left"}}>
                    <SideBar> </SideBar>{/*侧边栏组件*/}
                </Sider>
                <Content className="site-layout-background" style={{height: "100%", padding: 24, minHeight: 280, overflow: "auto"}}>
                    <Route path="/dash_board" component={DashBoard}/>{/*路由匹配，这里不要开启精确匹配，否则无法使用子路由*/}
                    <Route path="/article" component={Article}/>
                    <Route path="/user_control" component={UserControl}/>
                    <Route path="/safety" component={Safety}/>
                    <Route path="/media_librery" component={MediaLibrery}/>
                    <Route path="/visit" component={Visit}/>
                </Content>
                <div style={{clear: "both"}}> </div>
            </Layout>
        </Layout>
    }
}




class SideBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            defaultPitchOn: [window.location.hash.split("/")[1]]=="EditArticle"?"article":[window.location.hash.split("/")[1]],
        }
    }
    componentDidMount(){
    }
    render(){
        return <Menu theme="dark" mode="inline" defaultSelectedKeys={this.state.defaultPitchOn}>
            <Menu.Item key="dash_board">
                <Link to="/dash_board/index">
                    <DashboardOutlined />
                    <span className="nav-text">仪表盘</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="article">
                <Link to="/article/index">
                    <FileTextOutlined />
                    <span className="nav-text">文章管理</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="visit">
                <Link to="/visit/index">
                    <LineChartOutlined />
                    <span className="nav-text">访问数据</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="user_control">
                <Link to="/user_control/index">
                    <UserOutlined />
                    <span className="nav-text">用户管理</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="safety">
                <Link to="/safety/index">
                    <SafetyOutlined />
                    <span className="nav-text">站点安全</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="media_librery">
                <Link to="/media_librery/index">
                    <CameraOutlined />
                    <span className="nav-text">媒体库</span>
                </Link>
            </Menu.Item>
        </Menu>
    }
}
