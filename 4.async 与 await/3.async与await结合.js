
const fs =require('fs')
const util =require('util')
const mineReadFile=util.promisify(fs.readFile)

//回调函数的方法

 fs.readFile('./1.Promise基本使用/resource/context.txt',(err,data1)=>{
   if(err)throw err;
   fs.readFile('./1.Promise基本使用/resource/context.txt',(err,data2)=>{
    if(err)throw err;
    fs.readFile('./1.Promise基本使用/resource/context.txt',(err,data3)=>{
      if(err)throw err;
      console.log(data1+data2+data3);
    })
  })
 })
//async 与await

async function main(){
  try{
  let data1 =await mineReadFile('./1.Promise基本使用/resource/context.txt')
  let data2 =await mineReadFile('./1.Promise基本使用/resource/context.txt')
  let data3 =await mineReadFile('./1.Promise基本使用/resource/context.txt')
  console.log(data1+data2+data3);
}catch(e){
  console.log(e);
}}
main()