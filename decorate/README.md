<!--
 * @Date: 2021-10-17 09:19:39
 * @Descripton: 
 * @LastEditTime: 2021-10-17 22:06:06
-->
# 修饰器语法基础

## 项目初始化
1. 初始化webpack环境，安装bebel插件
yarn add webpack webpack-cli babel-core babel-preset-env babel-loader
2. 安装es6类成员语法转换插件
yarn add babel-plugin-transfrom-class-properties 
3. 安装支持decorate语法的插件
yarn add babel-plugin-transfrom-decorators-legacy
4. 基于react使用mobx
yarn add react react-dom prop-types mobx-react
yarn add babel-preset-react

## mobx常用api
1. 将数据转为可观测的数据
   obversable 
2. 观察数据变化的方式
   computed
   autorun
   reaction
   when
   
   action runInAction 

## 工具函数
obverse spy toJs trace


## 组件优化
1. 细粒度拆分视图组件
2. 使用专用组件处理列表
3. 尽可能晚的解构可观察数据

## 总结
1. 使用mobx组件的基础js语法
   1.1 class
   1.2 decorator
2. mobx基础api使用
  observable

3. 利用mobx-react使用mobx维护react

4. 提升开发体验，优化渲染性能
