/*
 * @Date: 2021-10-17 10:26:45
 * @Descripton: 修饰器
 * 1. 修饰类
 * 2.修饰类成员(类方法)
 * @LastEditTime: 2021-10-17 17:45:04
 */
// "use static"
/**
 * 修饰类
 * @param {*} target 类 
 */
function log(target) {
  // console.log({target});
  const keys = Object.getOwnPropertyDescriptors(target.prototype);
  for (const key of Object.keys(keys)) {
    if(key === "constructor") continue;
    const func = keys[key].value;
    if(typeof func === "function") {
      Object.defineProperty(target.prototype, key, {
        value(...args) {
          console.log("before -- ", key)
          const ret = func.apply(this, args)
          // console.log("after -- ", key)
          return ret
        }
      })
    }
  }
}
/**
 * 修饰类成员
 * @param {*} target 类
 * @param {*} key 类成员的key值
 * @param {*} descriptor 类成员的描述符
 */
function readonly (target, key, descriptor) {
  console.log("readonly-===");
  descriptor.writable = false;
}

/**
 * 修饰类方法
 * @param {*} target 类
 * @param {*} key 类成员的key值
 * @param {*} descriptor 类成员的描述符
 */
 function validateNum (target, key, descriptor) {
  const func = descriptor.value;
  // console.log('类方法');
  descriptor.value = function(...args) {
    for (let num of args) {
      if (typeof num !== "number") {
        // console.error(`"${num}" is not a number`)
        throw new Error(`"${num}" is not a number`)
      }
    }
    return func.apply(this, args)
  }
}


@log
class Numberic {
  @readonly PI = 3.1415926;

  @validateNum
  add(...nums) {
    return nums.reduce( (p, n) => (p + n), 0)
  }
}

const sumAdd = new Numberic().add
// console.log(sumAdd(1,5));

new Numberic().PI = 9
const pi = new Numberic()
pi.PI = 12
// console.log(pi);
