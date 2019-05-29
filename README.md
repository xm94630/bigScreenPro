# my-pro

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


[分支说明]
master  目前是完成table的大体功能。
epimetheus-fe-test-3.0.1 这个是对应上”利丰大屏“的测试环境
bee-20190524 这个版本陆续完成了永辉、雅诗兰黛、利丰大屏。做的过程中分出一些不同版本的组件，如 bar、new_bar。
[tag说明]
epimetheus-fe-release-3.0.1.0.1
这个是后端要求的格式，名字中不用出现“lifeng”这样子的说明。版本号是5位，这个tag是从“epimetheus-fe-test-3.0.1”这个测试版本拉取的。

[数据切换]
如何在前端的数据环境和真实（或者测试）的数据环境之间切换呢，需要修改几处：
1）vue.congfig 中，代理 target url 切换成 后端的。
2）大屏的配置json，要拷贝给后端，进行保存；同时，需要修改json中的所有数据源url为后端的。
   大屏的code也要和后端确认保持一致。
注意：切换到后端数据环境的时候，有的几个自己做的demo页就没有了，因为他们环境中是没有这个的，也很好理解吧。

[确保后端服务开启]
1 json配置的服务
2 下拉关联的接口
3 其他
另外，前端在使用promise的时候也要捕获错误，这样可以快速定位问题。

[上仿真环境、真实环境]
目前有一个名为 apiUrl.config 的配置文件，用来方便的控制切换，在上线的时候，一定要注意切换哦！

[如果后端要修改服务端口、部分的URL、path的话，前端需要修改的地方有]
1 webpack的配置，不仅仅是代理的目标、匹配原则等都需要改。
2 前端 apiUrl.config.js 也要注意看下
3 前端配置用的json中，也有部分的url，这个也需要检查下（放在后端的数据库中了）

[坑]
二维表的项目，如果连后端的接口，发现页面有报错，页面中下拉没有正常显示，通常就是后端的initview的接口中的数据有问题，而且那部分
多次出现错误，需要警惕。

[打包上线过程]
（前提，本项目我一直是在master上开发）
1 首先本项目切换到分支 epimetheus-fe-test-3.0.1，合并master，提交
2 build，生成目标文件
3 最终上线的是公司的git： http://***/FED/epimetheus-fe-build.git
4 公司git 切换到同名的分支，放入build文件，提交
5 以上述分支打tag，命名如：epimetheus-fe-release-3.0.1.0.1
6 把最终的tag告诉后端就行

[潜在问题]
1.模拟环境中没有问题、但是真实环境出现问题，问题来源有2者：
1）我这边的数据是js对象的格式，而后端几经周转变成了字符串的格式。后期要做通用函数处理下
2）后端数据格式变更，这个可能性不大，也需考虑。
3）配置json文件不同步！

2.时间组件的潜在问题：
目前是change的时候按照时间戳的形式给的，但是默认值如果是按照时间戳的话，是不能渲染成功的，需要转。而默认值给了日期字符串的形式，可以渲染，但是没有change的话，提交的就不是时间戳了。
这个问题，一定要抽空解决了。目前先这样子。

[接口访问出现问题排查方法]
看接口是在前端项目中使用的，还是在json配置中，如果在前端json中，直接修改json中的url就可以了。

[关于时间组件的提示]
在操作时间的时候，我们涉及两种时间的格式：
1)字符串形式的
new Date("1970-01-01").getTime()  //0
new Date("Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)").getTime()  //0
2）Date对象，也就是用时间组件得到的
选择1970年01月01日，得到的是时间戳为：-28800000
为了统一，我把Date对象得到的时间戳通过 ”+28800000“ 来补足。统一成”格林威治时间“。
需要注意。


[拖拽]
https://www.npmjs.com/package/vuedraggable
