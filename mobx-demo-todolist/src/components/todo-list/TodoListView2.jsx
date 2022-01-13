import React, { Fragment } from "react";
import { inject, observer } from "mobx-react";

@inject("TodoListStore")
@observer
class TodoListView extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.TodoListStore;
  }
  state = {
    todoTitle: ""
  }
  handelTodoTitleChnage = (ev) => {
    this.setState({ todoTitle: ev.target.value })
  }
  submit = (ev) => {
    ev.preventDefault()
    console.log(this.state.todoTitle);
    this.store.addTodo(this.state.todoTitle)
    this.setState({ todoTitle: "" })
  }
  render() {
    return (
      <div>
        <header>
          <form onSubmit={this.submit}>
            <input type="text" name="ipt" id="ipt" onChange={this.handelTodoTitleChnage} value={this.state.todoTitle} autoFocus />
          </form>
        </header>
        <main>
          <ul>
            {this.store.todos.map(todo => (
                <li key={todo.id}>
                  <input type="checkbox" checked={todo.isFinshed} onChange={() => todo.isFinshed = !todo.isFinshed} />
                  {
                    todo.isFinshed ? <del>{todo.title}</del> : <span>{todo.title}</span>
                  }
                  <span style={{ marginLeft: "16px", cursor: "pointer" }} onClick={() => this.store.removeTodo(todo)}>X</span>
                </li>
            ))}
          </ul>
        </main>
        <footer>
          <span>{this.store.left} todo(s) is unFinshed</span>
        </footer>
      </div>
    )
  }
}

export default TodoListView
