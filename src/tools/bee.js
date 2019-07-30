// 通用函数库
var bee = (function(bee){

    //重新排列对象字段顺序
    bee.objectSortByGivenKeys = function(obj,keysArr,defaultValue){
        let newObj={};
        for(let i=0;i<keysArr.length;i++){
          newObj[keysArr[i]] = obj[keysArr[i]]===undefined?defaultValue:obj[keysArr[i]];
        }
        return newObj;
    }

    //重新排列（数组中）所有对象字段顺序
    bee.arraySortByGivenKeys = function(arr,keysArr,defaultValue){
        const newData=[];
        for(let i=0;i<arr.length;i++){
            newData.push(bee.objectSortByGivenKeys(arr[i],keysArr,defaultValue));
        }
        return newData;
    }

    //将字符串格式的json转义成js可用的对象
    bee.safeData = function(apiData){
        return typeof(apiData)=='string'?eval('(' + apiData + ')'):apiData;
    }

    //删除对象中值为空的key
    bee.effectiveKeys = function (obj){
        for(let key in obj){
            if(obj[key]===''){
                delete obj[key];
            }
        }
        return obj;
    }

    //替换对象中的指定的key
    bee.replaceKey = function(obj,map){
        let newObj={};
        let mapKeys = Object.keys(map);
        for(let key in obj){
            if(mapKeys.indexOf(key)>-1){
                newObj[map[key]] = obj[key]
            }else{
                newObj[key] = obj[key]
            }
        }
        return newObj;
    }

    //将对象格式的样式配置转换成css字符串形式。
    bee.objToCSS = function(obj,otherCssStr){
        let str = "";
        let arr = ["width","height","top","bottom","left","right","font-size","padding","border-radius","line-height"];
        for (let [key, value] of Object.entries(obj)) { 
            if(arr.indexOf(key)>-1 && ('number'===typeof(value) || value.indexOf('px')===-1) && !('string'===typeof(value)&&value.indexOf('%')!==-1)){
                str += (`${key}:${value}px;`);
            }else{
                str += (`${key}:${value};`);
            }
        }
        str += otherCssStr || '';
        return str;
    };

    //随机生成8位十六进制的字符串
    bee.guidGenerator = function() {
        function getStr(){
            let n = Math.random();  
            n = (1+n)*0x10000|0;
            n = n.toString(16);
            n = n.substring(1);
            return n;
        }
        return getStr()+'-'+getStr();
    }

    bee.isObject = function(obj){
        return Object.prototype.toString.call(obj)=== '[object Object]';
    }

    bee.getUrlParam = function(key){
        let arr = location.href.split("?")[1].split("&&");
        let obj = {};
        for(let i=0;i<arr.length;i++){
            let n = arr[i].split("=");
            obj[n[0]] = n[1];
        }
        return obj[key];
    }








    return bee;
})(bee||{})

export default bee;



