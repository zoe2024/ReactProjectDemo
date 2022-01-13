/*
 * @Date: 2021-10-17 16:43:23
 * @Descripton: mobx常用api
 * 1- observable
 * 2- 
 * @LastEditTime: 2021-10-17 17:50:01
 */
import {
  observable,
  computed,
  autorun
} from "mobx";

// const arr = observable([1,3,4])

// console.log(arr.pop(), isObservableArray(arr));

// const num = observable.box(1)
// num.set(2)
// console.log(num.get());

class Store {
  @observable array = []
  @observable obj = {}
  @observable map = new Map()

   string = "str"
   num = 123
  @observable bool = false
}

const store = new Store()

const fn = computed(() => store.num + "/ " + store.string)

console.log(fn.get());

autorun(() => {
  console.log("autorun",store.string);
})

store.string = "13"