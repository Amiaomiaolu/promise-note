## Promise 介绍与基本使用

### Promise 是什么？

1.抽象概念
Promise 是 JS 中进行异步编程的新解决方案
异步编程 fs 文件操作 数据库操作 AJAX 定时器
`require('fs').readFile('./index.html')`
旧方案是单纯使用回调函数

2.具体表达
从语法上 promise 是一个构造函数
从功能上 promise 对象用来封装一个异步操作并可以获取其成功/失败的结果值

### 为什么要用 Promise

#### 指定回调函数的方式更加灵活

旧的:必须在启动异步任务前指定

promise 启动异步任务 =》 返回 promise 对象 =》 给 promise 对象绑定回调函数 可以给异步任务结束后指定多个

#### 支持链式调用 可以解决回调地狱问题

什么是回调地狱？

     回调函数嵌套调用,

回调地狱的缺点

      不便于阅读
      不便于异常处理

解决方案

      promise链式调用

### Promise 的状态 PromiseState

实例对象中的一个属性 PromiseState
pending 未决定
resolved 成功
rejected fullfiled 失败
只有 pending 变成 resolved rejected 只能改变一次

### Promise 对象的值 PromiseResult

实例对象中的另一个属性 PromiseResult 保存异步任务 成功失败的结果
resolve
reject

## Promise API

### Promise构造函数 Promise(exutor){}

### Promise.prototype.then(onResolved,onRejected)=>{}

### Promise.resolve(value)=>{}

reason 失败的原因
返回一个失败的prmoise对象

### Promise.reject(reason)=>{}

reason 失败的原因
返回一个失败的prmoise对象

### Promise.all(promises)=>{}

promises 包含n个promise的数组

返回一个新的promise 只有所有的promise都成功才成功 只要有一个失败救直接失败

### Promise.race(promises)=>{}

promises 包含n个promise的数组

返回一个新的promise 第一个完成的promise的结果状态救最终的结果状态

## Promise 关键问题

### 如果改变promise的状态

   resolve(value) pending 变为 resolved

   reject(reason) pending 变为 rejected

   抛出异常 pending 变为rejected

### 一个promise指定多个成功/失败回调函数 都会调用吗

   当promise 改变为对应状态时都会调用

### 改变promise 状态和指定回调函数谁先谁后

   都有可能，正常情况下先指定回调再改变状态，但也可以先改状态再指定回调

   如何先改状态再指定回调

     1.在执行器中直接调用resolve()/reject()
     2.延迟更长时间才调用then()

   什么时候才能得到数据

     1.先指定的回调，那当状态发送改变时，回调函数就会调用，得到数据
     2。如果先改变的状态，那当指定回调时，回调函数就会调用，得到数据

 ### promise.then() 返回的新promise的结果状态由什么决定

 由then()指定的回调函数执行的结果决定

   如何抛出异常 新promise变为 rejected reason为抛出的异常

   如果返回的是非promise的任意值，新的promise 变为resolved value为返回的值

   如果返回的是另一个新promise 此promise的结果就会成为新promise的结果


### promise如果串联多个操作任务

 promise 的then()返回一个新的promise 可以开成then()的链式调用

 通过then()的链式调用串联多个同异步任务

### promise异常传透

 当使用promise的then链式调用时，可以在最后指定失败的回调

 前面任何操作出了异常，都会传到最后失败的回调中处理

### 中端promise链

当使用promise的then链式调用时，在中间中断，不再调用后面的回调函数

在回调函数中返回一个pendding状态的promise对象

## Promise 自定义封装

## async 与 await

### async 函数

函数返回值为 promise 对象

async function main(){
//如果返回值是一个非 Promise 类型的数据
// return 521 //返回成功的结果值是 521

      //如果返回的是一个Promise类型的数据
          return new Promise((resolve,reject)=>{
            resolve('ok') //返回成功 值为ok
            reject('Error') //返回失败 值为Error
          })
      //抛出异常
      //  throw "oh No" //返回失败 值是oh No
    }
    let result =main()
    console.log(result);

### await 表达式

     await右侧的表达式一般为promise 对象 但也可以是其他值
     如果表达式时promise对象 await返回的时promise成功的值
     如果表达式时其他值 直接将此值作为await的返回值

     await必须写在async函数 async函数中可以没await
     await的promise 失败了就会抛出异常 需要通过 try catch

      async function main() {
        let p = new Promise((resolve, reject) => {
          // resolve('ok')
          reject('error')
        })
        //右侧为promise的情况
        let res = await p

        //右侧为其他类型的情况
        let res2 = await 20
        console.log(res2); //返回20

        //右侧为promise失败的情况 抛出异常
        try{
           let res2 = await p
        }catch(e){
          console.log(e);
        }
      }

### async 与 await 结合

async function main(){
try{
let data1 =await mineReadFile('./1.Promise 基本使用/resource/context.txt')
let data2 =await mineReadFile('./1.Promise 基本使用/resource/context.txt')
let data3 =await mineReadFile('./1.Promise 基本使用/resource/context.txt')
console.log(data1+data2+data3);
}catch(e){
console.log(e);
}}
main()

### async 与 awaiw 结合发送 ajax

      btn.addEventListener('click', async function () {
        let xinxi = sendAJAX('http://127.1.0.0:8000')
        console.log('xinxi')
      })
