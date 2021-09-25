/*
 * @Date: 2021-09-22 22:52:50
 * @Descripton: 
 * @LastEditTime: 2021-09-25 21:35:18
 */
import React from 'react'
import { Router, Route, IndexRoute, hashHistory/* , Redirect */ } from 'react-router'
import { isLogin } from '@configs/common'
import { set, demo } from '@config'

import * as base from '@pages/base' // 基础
import * as sysSet from '@pages/set' // 设置中心-系统设置
import * as sysDemo from '@pages/demo' // 设置中心-系统设置
import * as menu from '@pages/menu' // 菜单

export default () => (
  <Router history={hashHistory}>
    <Route path="/" component={base.app} onEnter={isLogin}>
      <IndexRoute component={base.example} />
      <Route path="/desk$/index" component={base.example} />
      {/* <Route path="/socketReceive" component={base.socketReceive} /> */}
      {/** *菜单 开始 */}
      <Route path="/echarts" component={menu.echarts} />
      <Route path="/editor" component={menu.editor} />
      {/** *菜单 结束 */}
      {/** *系统设置 开始 */}
      <Route path={`/${set}/userManage`} component={sysSet.userManage} />
      <Route path={`/${set}/roleManage`} component={sysSet.roleManage} />
      <Route path={`/${set}/moduleManage`} component={sysSet.moduleManage} />
      {/** *系统设置 结束 */}
      {/** *demo 开始 */}
      <Route path={`/${demo}/demo1`} component={sysDemo.demo1} />
      <Route path={`/${demo}/demo2`} component={sysDemo.demo2} />
      <Route path={`/${demo}/demo3`} component={sysDemo.demo3} />
      <Route path={`/${demo}/demo-echarts`} component={sysDemo.demoEcharts} />
      <Route path={`/${demo}/pomodoro`} component={sysDemo.pomodoro} />
      {/** *demo 结束 */}
    </Route>
    <Route path="/login" component={base.login} />
    <Route path="*" component={base.notfound} />
  </Router>
)
