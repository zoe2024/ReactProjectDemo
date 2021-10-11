/*
 * @Date: 2021-09-23 22:42:38
 * @Descripton: 状态提升（将子组件的状态交给父组件管理）
 * @LastEditTime: 2021-10-07 21:38:15
 */

import React, {
  Component,
} from 'react';

import Parent from './compontents/Parent';

export default class Demo1 extends Component {
  render() {
    return (
      <div>
        demo11
        <Parent />
      </div>
    )
  }
}
