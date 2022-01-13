/*
 * @Date: 2021-10-17 10:28:21
 * @Descripton: es5实现类的继承和多态 
 * @LastEditTime: 2021-10-17 10:28:21
 */
function Animal() {}

function Dog() {}

// todo 实现继承： dog instanceof Animal ===> true

Object.defineProperties(Animal.prototype, {
  name: {
    value() {
      return "animal"
    }
  },
  say: {
    value() {
      console.log(`I am ${this.name()}`);
      return `I am ${this.name()}`
    }
  }
})


Dog.prototype = Object.create(Animal.prototype, {
  constructor: {
    value: Dog,
    enumerable: false
  },
  name: {
    value() {
      return "dog"
    }
  },
})



// const dog = new Dog()

// document.write(dog instanceof Animal)
// dog.say()
// console.log(Dog.prototype.constructor);