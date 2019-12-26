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

[GIN] 2019/12/16 - 09:05:12 | 200 |     137.395µs | 114.222.190.246 | POST     /v1/validate
,Deleting: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMzIn0.28hnB1WPN9BWhkX6Z6WZJuekTSSUv8BX2dExHHeXLTU 19121304034469 2019-12-16 09:05:10.376906591 +0000 UTC m=+281834.076199315
,[GIN] 2019/12/16 - 09:05:18 | 200 |     122.806µs | 114.222.190.246 | POST     /v1/validate
,[GIN] 2019/12/16 - 09:06:03 | 200 |      36.806µs | 114.222.190.246 | OPTIONS  /v1/login
,Added: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEifQ.mlK_3Ccku9maPJthWOu2t_rifcWj9eMQza6eB-7jXz0 1912110703338 --- 2019-12-16 09:06:03.841805934 +0000 UTC m=+281887.541098675
,[GIN] 2019/12/16 - 09:06:03 | 200 |    1.685268ms | 114.222.190.246 | POST     /v1/login
,Deleting: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEifQ.mlK_3Ccku9maPJthWOu2t_rifcWj9eMQza6eB-7jXz0 1912110703338 2019-12-16 09:06:03.841805934 +0000 UTC m=+281887.541098675
,[GIN] 2019/12/16 - 09:06:16 | 200 |     105.827µs | 114.222.190.246 | POST     /v1/validate
,[GIN] 2019/12/16 - 09:08:29 | 200 |      69.877µs | 114.222.190.246 | GET      /v1/getAccount
,[GIN] 2019/12/16 - 09:08:34 | 200 |      53.938µs | 114.222.190.246 | OPTIONS  /v1/register
,[GIN] 2019/12/16 - 09:08:34 | 200 |    2.663129ms | 114.222.190.246 | POST     /v1/register
,Register successful !!!
,[GIN] 2019/12/16 - 09:08:34 | 200 |       39.26µs | 114.222.190.246 | OPTIONS  /v1/login
,Added: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5MTIxNjA1MDgyOTEyNSJ9.JhDsXZ54YzruaWhVvZYFeazMGE25cNOpujEU7Y6UzyU 191216050834126 --- 2019-12-16 09:08:34.872831295 +0000 UTC m=+282038.572124041
,[GIN] 2019/12/16 - 09:08:34 | 200 |    1.974493ms | 114.222.190.246 | POST     /v1/login
,Deleting: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5MTIxNjA1MDgyOTEyNSJ9.JhDsXZ54YzruaWhVvZYFeazMGE25cNOpujEU7Y6UzyU 191216050834126 2019-12-16 09:08:34.872831295 +0000 UTC m=+282038.572124041
,[GIN] 2019/12/16 - 09:08:57 | 200 |      145.73µs | 114.222.190.246 | POST     /v1/validate
,[GIN] 2019/12/16 - 09:09:13 | 401 |      71.922µs | 114.222.190.246 | POST     /v1/validate
,[GIN] 2019/12/16 - 09:09:29 | 401 |      66.723µs | 212.129.149.224 | POST     /v1/validate

,[GIN] 2019/12/16 - 09:14:13 | 401 |      65.144µs | 114.222.190.246 | POST     /v1/validate
,[GIN] 2019/12/16 - 09:14:29 | 401 |      68.891µs | 212.129.149.224 | POST     /v1/validate


,[GIN] 2019/12/16 - 09:19:13 | 401 |      61.201µs | 114.222.190.246 | POST     /v1/validate
,[GIN] 2019/12/16 - 09:19:29 | 401 |      58.938µs | 212.129.149.224 | POST     /v1/validate


,[GIN] 2019/12/16 - 09:24:13 | 401 |      65.482µs | 114.222.190.246 | POST     /v1/validate

,[GIN] 2019/12/16 - 09:24:29 | 401 |      81.404µs | 212.129.149.224 | POST     /v1/validate


,[GIN] 2019/12/16 - 09:29:13 | 401 |      61.131µs | 114.222.190.246 | POST     /v1/validate
,[GIN] 2019/12/16 - 09:29:29 | 401 |      70.454µs | 212.129.149.224 | POST     /v1/validate


,[GIN] 2019/12/16 - 09:34:29 | 401 |      63.543µs | 212.129.149.224 | POST     /v1/validate

,[GIN] 2019/12/16 - 09:34:51 | 401 |      76.757µs | 212.129.149.224 | POST     /v1/validate

,[GIN] 2019/12/16 - 09:38:04 | 401 |       67.39µs | 114.222.190.246 | POST     /v1/validate
,Deleting: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNsYW0wMDIifQ.WGHrA84C2J1olH3tqzfRlJWlaEyNupZhthK4nQZ3TnY 19121211002950 2019-12-16 08:38:42.859812352 +0000 UTC m=+280246.559105025
,[GIN] 2019/12/16 - 09:39:29 | 401 |      68.304µs | 212.129.149.224 | POST     /v1/validate

,[GIN] 2019/12/16 - 09:43:04 | 401 |      85.946µs | 114.222.190.246 | POST     /v1/validate
