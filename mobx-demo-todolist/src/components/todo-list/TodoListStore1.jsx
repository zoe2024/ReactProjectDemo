import { observable, action, computed } from 'mobx'

class Todo {
    id = Math.random();
    title = "";
    isFinshed = false;
    constructor(title) {
        this.title = title;
    }
}

class TodoListStore {
    @observable todos = []
    @computed get left() {
        return this.todos.filter(i => !i.isFinshed).length
    }
    @action.bound
    addTodo(val) {
        this.todos.push(new Todo(val))
        console.log(this.left);
    }
}

const store = new TodoListStore();

export default store;
