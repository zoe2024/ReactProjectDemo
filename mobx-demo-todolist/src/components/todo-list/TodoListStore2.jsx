import { action, computed, observable } from "mobx";

class Todo {
  id = Math.random();
  @observable title = "";
  @observable isFinshed = false
  constructor(title) {
    this.title = title
  }
}

class TodoListStore {
  @observable todos = [];

  @computed get left() {
    return this.todos.filter(i => !i.isFinshed).length;
  }
  @action.bound addTodo = (taskName) => {
    this.todos.unshift(new Todo(taskName))
  }
  @action.bound removeTodo(todo) {
    this.todos.remove(todo)
  }
}

const store = new TodoListStore();

export default store;
