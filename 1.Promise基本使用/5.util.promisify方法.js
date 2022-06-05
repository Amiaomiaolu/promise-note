// 传入错误优先的函数 返回一个promise版本

//引入util fs 模块
const util =require('util')
const fs =require('fs')

let mineReadFile =util.promisify(fs.readFile)

mineReadFile('./resource/content.txt').then((value)=>{
  console.log(value.toString);
},(reason)=>{
  console.log('ee');
}
)