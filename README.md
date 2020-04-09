# blog_admin


## 注意

请各位大佬阅读完此文件（很短） 请使用dev分支进行开发

## 项目概况

we-blog的 后台管理 项目，要求兼容IE11
再3个项目中，React的项目是最难以起步，也是我起步最差的一项。因为我发现React的cli无法满足我的项目需求（主要是webpack的配置不尽人意）
加之这也是我第一次使用React实战。所以我自己从0手动配置这一个项目。

## 技术栈

`*React` 	 `*Atnd`  	`*react-router-dom`	  `*axios`    `less`

## 环境要求
   + node ：12+


## 项目结构
该项目的结构非常简单

> public 	//开放目录，该文件夹中存放index.html文件以及所有图片
> >
> > index.html
> >
> > img     //存放图片
> >
> > index.html  //入口html文件
>
> src
>
> > assets 	//静态资源文件加，存放图片，字体等静态资源
> >
> > components  //可复用组件存放目录
> >
> > views //页面组件存放目录
> >
> > App.jsx     //所有页面的根容器（以及携带路由根容器HashRouter）
> >
> > index.jsx  //入口文件
>
> .babelrc   //babel（js代码兼容）配置文件
>
> .gitignore    //git上传忽略文件配置
>
> .eslintrc   //语法规范文件
>
> package.json 	// 项目信息文件
>
> postcss.config.js     //postcss（css压缩和自动添加浏览器前缀）配置文件
>
> webpack.config.js     //webpack配置文件

## 推荐工具

- webStorm	IDE
- vsCode IDE
- postman 接口测试

## 分支

- master // 主干
- dev // 开发

请使用dev分支进行开发，凡是直接提交到master的代码最终都将会被驳回 我将会对dev与master的区别代码进行阅读，发现小bug我将修改，发现大bug请提交者修改（请各位大佬写注释，饶过小弟一命）我会将最新的master部署到服务器上

## Run

安装依赖

```shell
npm install
```

运行

```shell
npm run dev
```

