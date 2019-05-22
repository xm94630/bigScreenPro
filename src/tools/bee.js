// 通用函数库
let bee = {}
bee = (function(){
    //删除对象中值为空的key
    bee.effectiveKeys = function (obj){
        for(let key in obj){
            if(obj[key]===''){
                delete obj[key];
            }
        }
        return obj;
    }
    return bee;
})(bee)

export default bee;