// 封装一个函数 mineReadFile
// 参数：path 文件路径
//返回 promise对象

function mineReadFile(path){

     return new Promise((resolve,reject)=>{
       //读取文件
       require('fs').readFile(path,(err,data)=>{
         if(err)reject(err)
         resolve(data)
       })
     })
}

mineReadFile('./resouse/content.txt').then((value)=>{
   console.log(value.toString());
},(reason)=>{
  console.log(reason);
})