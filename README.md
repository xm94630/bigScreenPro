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

[数据切换]
如何在前端的数据环境和真实的数据环境之间切换呢，需要修改几处：
1）vue.congfig 中，代理 target url 切换成 后端的。
2）大屏的配置json，要拷贝给后端，进行保存；同时，需要修改json中的所有数据源url为后端的。
   大屏的code也要和后端确认保持一致。
注意：切换到后端数据环境的时候，有的几个自己做的demo页就没有了，因为他们环境中是没有这个的，也很好理解吧。
