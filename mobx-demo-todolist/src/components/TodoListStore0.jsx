import { observable, action, computed } from 'mobx'

class Todo {
    id = Math.random();
    @observable title;
    @observable finished = false;

    constructor(title) {
        this.title = title
    }
}

class TodoList {
    @observable todos = [];

    get completedTodosCount() {
        return this.todos.filter(todo => todo.finished).length;
    }

    @computed get report() {
        if (this.todos.length === 0) 
            return "任务已完成"
        return `下一个任务：${this.todos[0].title}`
    }

    @action.bound addTodo (title) {
        if (!title) return;
        this.todos.push(new Todo(title));
    }
}
const store = new TodoList();
store.todos.push(new Todo('修复谷歌浏览器页面显示问题'), new Todo('提交意见反馈代码'));
// store.todos[1].finished = true;

export default store;