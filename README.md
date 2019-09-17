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
master  当前项目就在此分支上直接开发，不再单独拉分支了。
epimetheus-fe-test-3.0.1 这个是对应上”利丰大屏“的测试环境
bee-20190524 这个版本陆续完成了永辉、雅诗兰黛、利丰大屏、香奈儿。做的过程中分出一些不同版本的组件，如 bar、new_bar。
bee-20190529 这个版本要开始一个重要的改版，把后端的条件查询的控制拿到前端来处理！(20190917补充，一直到至今都在此分支上开发，今天重新合并到mater。)
[tag说明]
v3.1.1.0.5 
该版本是最新的tag，最新的新版永辉、DSV、迪卡侬大屏都是在这个版本上完成的。除了新增组件之后，还有以下重要的调整：
1）报表组件，移除了“报表初始化”接口，新增了前端的resultColumnList字段配置。这个会对之前的报表产生影响。未来要对旧的报表，添加resultColumnList字段才可以。
2）在大屏首页添加版本号码，这个方便观察线上的版本。
3）其他诸多的产品、代码上的优化，不再细说。

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
目前有一个名为 bee.config 的配置文件，用来方便的控制切换，在上线的时候，一定要注意切换哦！

[如果后端要修改服务端口、部分的URL、path的话，前端需要修改的地方有]
1 webpack的配置，不仅仅是代理的目标、匹配原则等都需要改。
2 前端 bee.config.js 也要注意看下
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
new Date('Wed Jun 05 2019 00:00:00 GMT+0800 (中国标准时间)').getTime()  //1559664000000
new Date('2019-06-05').getTime()  //1559692800000 这种格式的要比上面的大28800000。
new Date("1970-01-01").getTime()  //0

2）Date对象，也就是用时间组件得到的
选择1970年01月01日，得到的是时间戳为：-28800000
为了统一，我把Date对象得到的时间戳通过 ”+28800000“ 来补足。统一成”格林威治时间“。
需要注意。
3）补充，实践证明，通过时间组件选择的时间戳，是中国的时区，就用这个就行，无需处理成”格林威治时间“。
所以要把+28800000，这个去了。

[拖拽]
https://www.npmjs.com/package/vuedraggable

【大屏bug排查】
问题1 没有报错，但是组件没有显示，或者部分显示
1）这种多半是代码没有更新。可以进入大屏的列表页面看看效果：如果还是老的UI，就可以证明，至少线上的是旧版本。（我之后又在上面显示了版本号码，更加方便定位）。
如果是这个问题，直接让实施找运维重新部署下。
2）另外考虑是缓存问题
3）另外是不是自己打包出错了：可以找关键词，比如最新的组件什么。
问题2 大屏有报错，接口是通的，返回的code是100
这个就比较明朗了，直接看让配好数据库就行了
