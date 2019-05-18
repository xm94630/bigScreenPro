module.exports={

    //注意，以后记得把这个配置上
    //这样子，我们的前端页面中的内容走的就是相对路径，而不是以网站的根目录去走
    publicPath: './',
    outputDir: 'datas_build',  
    assetsDir: 'static',

    runtimeCompiler:true,
    configureWebpack: {
        devServer: {
            proxy: {
                '/koa': {
                    target: 'http://localhost:3000',       //前端代理目标地址（通常是 3000端口 的koa服务，方便前端自己调试）
                    //target: 'http://172.16.28.46:9090',   //后端接口地址   （解决和后端联调的跨域问题，暂时用不到，因为后端直接设置了允许跨域的请求头）
                    
                    //pathRewrite: {'^/api' : ''},      
                    //changeOrigin: true,                   // target是域名的话，需要这个参数
                    secure: false,                          // 设置支持https协议的代理
                },
                '/2': {
                    target: 'http://localhost:3000',
                    //target: 'http://172.16.28.85:8080',     // 德柱
                    secure: false, 
                },
            }
        },
        resolve: {
            //extensions: ['.js', '.vue', '.json'],
            alias: {
              '@': __dirname
            }
        },
        
    }


}