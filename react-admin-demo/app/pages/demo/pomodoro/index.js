/*
 * @Date: 2021-09-25 21:33:04
 * @Descripton: 
 * @LastEditTime: 2021-09-26 11:38:18
 */
import React, { Component } from "react";
import './index.less'
import { Button, InputNumber } from 'antd';

const typeMap = {
  break: 1,
  work: 1,
}
/**
 * 时间输入框。单位 min分钟
 */
class TimeInput extends Component {
  render() {
    let type = this.props.type
    const handleTimeChange = function(value) {
      value = +value
      if(isNaN(value)) { return }
      typeMap[type] = value
      console.log({typeMap});
    }
    return (
      <div className="time-input">
        <InputNumber size="large" min={1} max={60} defaultValue={1} onChange={handleTimeChange} />
      </div>
    )
  }
}
class Break extends Component {
  render() { 
    return (
      <div className="break">
        break
        <TimeInput type="break"/>
      </div>
    )
  }
}
class Work extends Component {
  render() { 
    return (
      <div className="work">
        work
        <TimeInput type="work"/>
      </div>
    )
  }
}
class CountDown extends Component {
  render() {
    const restTime = this.props.restTime // 单位 s
    const restMin = parseInt(restTime / 60)
    const restSecond = restTime % 60
    return (
      <div className="count-down">
        <header>{ this.props.defaultType + '-ing' }</header>
        <div className="tip" style={{color: restMin <= 0 ? 'red' : ''}}>
          { restMin } <span>分钟</span>
          : 
          { restSecond } <span>秒</span>
        </div>
        <div className="operation">
          <Button onClick={() => this.props.stopTimer()}>stop</Button>
          <Button onClick={() => this.props.goTimer()}>go</Button>
          <Button onClick={() => this.props.resetTimer()}>reset</Button>
        </div>
      </div>
    )
  }
}

// 声明组件  并对外输出
export default class App extends Component {
  constructor(props) {
    super(props)
    let defaultType = 'work'
    let restTime = typeMap[defaultType] * 60
    this.state = {
      restTime,
      defaultType
    }
    this.timer = null
  }
  componentDidMount() {
    this.momeRestTime = this.state.restTime // 缓存倒计时时间，作为重置时的初始值
    this.goTimer()
  }
  componentDidUpdate() {
    let preRestTime = arguments[1].restTime
    if(preRestTime <= 1) {
      this.stopTimer()
      this.toggleType()
    }
  }
  componentWillUnmount() {
    this.timer = null
  }
  stopTimer = () => {
    clearInterval(this.timer)
    this.timer = null
  }
  goTimer = () => {
    if(this.timer) { this.stopTimer() }
    
    this.timer = setInterval(() => {
      this.setState({
        restTime: this.state.restTime - 1
      })
    }, 100);
  }
  resetTimer = () => {
    this.setState({
      restTime: this.momeRestTime
    })
  }
  toggleType = () => {
    let type = this.state.defaultType === 'work' ? 'break' : 'work'
    this.setState({
      defaultType: type,
      restTime: typeMap[type] * 60
    }, this.goTimer)
  }
  render() {
   return (
    <div className="container">
      <Break />
      <Work />
      <CountDown 
      defaultType={this.state.defaultType}
      restTime={this.state.restTime}
      stopTimer={this.stopTimer}
      goTimer={this.goTimer}
      resetTimer={this.resetTimer}
      />
    </div>
   )
  }
}
