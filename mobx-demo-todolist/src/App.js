/*
 * @Date: 2021-10-17 22:14:14
 * @Descripton: 
 * @LastEditTime: 2021-10-17 22:14:47
 */
import React, { Component } from 'react';
import './App.css';
import TodoListStore from "./components/todolist/store/TodoListStore";
import TodoListView from "./components/todolist/index";
import { Provider } from 'mobx-react';

export default class App extends Component {

  render() {
    return (
      <Provider TodoListStore={TodoListStore}>
        <TodoListView/>
      </Provider>
    )
  }
}