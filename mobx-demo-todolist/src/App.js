/*
 * @Date: 2021-10-17 22:14:14
 * @Descripton: 
 * @LastEditTime: 2021-10-19 23:03:11
 */
import React, { Component } from 'react';
import './App.css';
import TodoListStore from "./components/TodoListStore2";
import TodoListView from "./components/TodoListView2";
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