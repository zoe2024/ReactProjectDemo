/*
 * @Date: 2021-09-23 22:42:38
 * @Descripton: 状态提升（将子组件的状态交给父组件管理） 
 * @LastEditTime: 2021-10-07 22:11:23
 */

import React, {
  Component
} from 'react';


export default class Children1 extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        RMB: &nbsp;{this.props.money * 1} 
      </div>
    )
  }
}