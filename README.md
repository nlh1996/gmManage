# gmManage

> 游戏GM后台管理，能远程控制docker容器.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

* components下是界面的主体结构，包含头部和左侧导航栏。
* right_view对应左侧导航的具体路由组件，包含项目的主要代码。
* http下对axios再封装，分默认请求和新建了docker api请求的实例。
* router下采用了路由懒加载的方式。

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
