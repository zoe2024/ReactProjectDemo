/*
 * @Date: 2021-09-25 21:33:04
 * @Descripton: demoMobx
 * @LastEditTime: 2021-10-14 23:29:30
 */
import React, { Component } from 'react';
import './index.less'
import { Button, InputNumber } from 'antd';

const TIME = 3000
/**
 * 时间输入框。单位 min分钟
 */
class TimeInput extends Component {
  handleTimeChange = (value) => {
    value = +value
    if (isNaN(value)) { return }
    this.props.handleTimeChange(value)
  }
  render() {
    console.log('TimeInput-render');
    return (
      <div className="time-input">
        <InputNumber size="large" min={1} max={60} defaultValue={2} onChange={this.handleTimeChange} />
      </div>
    )
  }
}
class Break extends Component {
  handleTimeChange(val) {
    this.props.handleTimeChange(val)
  }
  render() {
    console.log('Break-render');
    return (
      <div className="break">
        break
        <TimeInput handleTimeChange={val => this.handleTimeChange(val)} type="break" />
      </div>
    )
  }
}
class Work extends Component {
  handleTimeChange(val) {
    this.props.handleTimeChange(val)
  }
  render() {
    console.log('Work-render');
    return (
      <div className="work">
        work
        <TimeInput handleTimeChange={val => this.handleTimeChange(val)} type="work" />
      </div>
    )
  }
}
class CountDown extends Component {
  componentWillReceiveProps() {
    console.log('CountDown-componentWillReceiveProps', arguments);
  }
  render() {
    const restTime = this.props.restTime // 单位 s
    const restMin = parseInt(restTime / 60)
    const restSecond = restTime % 60
    return (
      <div className="count-down">
        <header>{ `${this.props.currentType}-ing` }</header>
        <div className="tip" style={{ color: restMin <= 0 ? 'red' : '' }}>
          { restMin } <span>分钟</span>
          :
          { restSecond } <span>秒</span>
        </div>
        <div className="operation">
          <Button onClick={() => this.props.stopTimer()}>stop</Button>
          <Button onClick={() => this.props.goTimer()}>go</Button>
          <Button onClick={() => this.props.resetTimer()}>reset</Button>
          <Button onClick={() => this.props.toggleType()}>toggle</Button>
        </div>
      </div>
    )
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.timer = null
  }
  state = {
    restTime: 2 * 60,
    breakTime: 2,
    workTime: 2,
    currentType: 'work',
  }
  componentDidMount() {
    this.goTimer()
  }
  componentDidUpdate(pre, next) {
    if (next.restTime === 1) {
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
    if (this.timer) { this.stopTimer() }

    this.timer = setInterval(() => {
      this.setState({
        restTime: this.state.restTime - 1,
      })
    }, TIME);
  }

  resetTimer = () => {
    const restTimeMap = {
      work: this.state.workTime,
      break: this.state.breakTime,
    }
    const restTime = restTimeMap[this.state.currentType] * 60;
    this.setState({
      restTime,
    })
  }
  toggleType = () => {
    const toggleType = this.state.currentType === 'work' ? 'break' : 'work';
    const restTime = this.state.currentType === 'work' ? this.state.breakTime : this.state.workTime
    this.setState({
      currentType: toggleType,
      restTime: restTime * 60,
    }, this.goTimer)
  }
  handleTimeChange(val, setTimeType) {
    console.log('timeChange');
    this.setState({
      [`${setTimeType}Time`]: val,
      currentType: setTimeType,
      restTime: +val * 60,
    })
  }
  render() {
    console.log('App-render');
    return (
      <div className="container">
        <Break handleTimeChange={val => this.handleTimeChange(val, 'break')} />
        <Work handleTimeChange={val => this.handleTimeChange(val, 'work')} />
        <CountDown
          currentType={this.state.currentType}
          restTime={this.state.restTime}
          stopTimer={this.stopTimer}
          goTimer={this.goTimer}
          resetTimer={this.resetTimer}
          toggleType={this.toggleType}
        />
      </div>
    )
  }
}
