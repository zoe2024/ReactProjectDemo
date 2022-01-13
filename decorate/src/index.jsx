/*
 * @Date: 2021-10-17 09:28:54
 * @Descripton:  主入口文件
 * @LastEditTime: 2021-10-17 21:04:58
 */

/*
import './class'
import './decorate'

import './decorate'

import './mobx-api' 
*/
import { observable, action } from "mobx";
import React, { Component } from 'react';

import ReactDom from "react-dom";
// import PropTypes from 'prop-type';

class Store {
  @observable cache = {
    queue: []
  }
}

const store = new Store();
class Bar extends Component {
  // static propTypes = {
  //   queue: PropTypes.array
  // }
  render() {
    const queue = this.props.queue
    return <span>{queue.length}</span>
  }
}

class Page extends Component {
  render() {
    return (
      <div>
        {/* 2345 */}
        <Bar queue={store.cache.queue} />
      </div>
    )
  }
}
ReactDom.render(<Page />, document.querySelector("#root"))