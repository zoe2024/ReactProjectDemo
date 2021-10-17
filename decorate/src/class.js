/*
 * @Date: 2021-10-17 09:55:57
 * @Descripton: es6-class 
 * @LastEditTime: 2021-10-17 10:26:32
 */
class Animal {
  name = "animal";
  say() {
    console.log(`I am ${this.name}`);
  }
}

class Dog extends Animal {
  name = "dog"
}

// const dog = new Dog()
// dog.say()
