import React from "react"
import {Route, Switch} from "react-router-dom"
import EditArticle from "@view/article/components/EditArticle/EditArticle";
import ShowArticleList from "@view/article/components/ShowArticleList/ShowArticleList";
export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <Switch>
                <Route path="/article/edit" component={EditArticle}/>{/*编辑，添加文章的组件*/}
                <Route path="/article/index" component={ShowArticleList}/>{/*展示，添加文章的组件*/}
            </Switch>
    }
}
