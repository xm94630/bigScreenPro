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
table   待删除
epimetheus-fe-test-3.0.1 这个是对应上”利丰大屏“的测试环境

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


