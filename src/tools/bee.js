// 通用函数库
var bee = (function(){

    //删除对象中值为空的key
    bee.effectiveKeys = function (obj){
        for(let key in obj){
            if(obj[key]===''){
                delete obj[key];
            }
        }
        return obj;
    }

    //将对象格式的样式配置转换成css字符串形式。
    bee.ObjToCSS = function(obj,otherCssStr){
        let str = "";
        let arr = ["width","height","top","bottom","left","right","font-size"];
        for (let [key, value] of Object.entries(obj)) {
            if(arr.indexOf(key)>-1 && ('number'===typeof(value) || value.indexOf('px')===-1)){
                str += (`${key}:${value}px;`);
            }else{
                str += (`${key}:${value};`);
            }
        }
        str += otherCssStr || '';
        return str;
    };








    return bee;
})(bee)

export default bee;



