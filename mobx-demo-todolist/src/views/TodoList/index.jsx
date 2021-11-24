import React, { Component } from "react";
import TodoListStore from "../../components/todo-list/TodoListStore2";
import TodoListView from "../../components/todo-list/TodoListView2";
import { Provider } from 'mobx-react';

export default class TodoList extends Component {

  render() {
    return (
      <Provider TodoListStore={TodoListStore}>
        <TodoListView/>
      </Provider>
    )
  }
}
