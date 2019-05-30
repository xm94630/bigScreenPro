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
                '/epimetheus': {
                    target: 'http://localhost:3000',
                    
                    //target: 'http://172.16.28.85:80',     // 德柱
                    
                    //target: 'http://172.18.1.118:8083',     // 苏州 志超
                    //pathRewrite: {'^/epimetheus' : ''}, 
                    
                    secure: false, 
                    //changeOrigin: true,                   // target是域名的话，需要这个参数
                },
            }
        },
        resolve: {
            //extensions: ['.js', '.vue', '.json'],
            alias: {
              '@': __dirname
            }
        },


    },

    // chainWebpack: config => {
    //     config
    //       .plugin('webpack-bundle-analyzer')
    //       .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    // }



}