/*
 * @Date: 2021-10-17 22:14:14
 * @Descripton: 
 * @LastEditTime: 2021-11-24 20:58:52
 */
import React, { Component } from 'react';
import './App.css';
import TodoList from "./views/TodoList";
import HooksStudy0 from "./views/HooksStudy0";

export default class App extends Component {

  render() {
    return (
      <div className="container">
        {/* <TodoList /> */}
        <HooksStudy0 />
      </div>
    )
  }
}
