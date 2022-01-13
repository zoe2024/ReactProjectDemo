/*
 * @Date: 2021-09-23 22:42:38
 * @Descripton: 状态提升（将子组件的状态交给父组件管理） 
 * @LastEditTime: 2021-10-07 22:32:03
 */

import React, {
  Component, createRef
} from 'react';

import Children1 from "./Children1";
import Children2 from "./Children2";

export default class Parent extends Component {
  constructor() {
    super()
    this.iptRef = createRef(null)
  }
  state = {
    ipt: 1
  }
  handleIpt = () => {
    console.log(this.iptRef.current.value);
    this.setState({
      ipt: this.iptRef.current.value
    })
  }
  render() {
    return (
      <div>
        parent: &nbsp;&nbsp;
        <input ref={ this.iptRef } type="text" value={ this.state.ipt } onChange={ this.handleIpt } autoFocus />
        <Children1 money={this.state.ipt} />
        <Children2 money={this.state.ipt} /> 
      </div>
    )
  }
}