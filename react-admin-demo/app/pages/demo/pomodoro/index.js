/*
 * @Date: 2021-09-25 21:33:04
 * @Descripton: 函数组件
 * @LastEditTime: 2021-10-23 09:52:27
 */
import React, { Component, useEffect, useState } from 'react';
import { Button, InputNumber } from 'antd';
import './index.less'

const TIME = 200
/**
 * 时间输入框。单位 min分钟
 */
const TimeInput = (props) => {
  const handleTimeChange = (value) => {
    if (!+value) { return }
    props.handleTimeChange(value)
  }
  return (
    <div className="time-input">
      <InputNumber size="large" min={1} max={60} defaultValue={2} onChange={handleTimeChange} />
    </div>
  )
}

const typeHoc = (Com, type) => props => (
  <div className={type}>
    {type}
    <Com handleTimeChange={(val) => { props.handleTimeChange(val, type); }} />
  </div>
)

const Break = typeHoc(TimeInput, 'break')
const Work = typeHoc(TimeInput, 'work')

const CountDown = (props) => {
  const restTime = props.restTime // 单位 s
  const restMin = parseInt(restTime / 60)
  const restSecond = restTime % 60
  return (
    <div className="count-down">
      <header>{ `${props.currentType}-ing` }</header>
      <div className="tip" style={{ color: restMin <= 0 ? 'red' : '' }}>
        { restMin } <span>分钟</span>
        :
        { restSecond } <span>秒</span>
      </div>
      <div className="operation">
        <Button onClick={() => props.stopTimer()}>stop</Button>
        <Button onClick={() => props.goTimer()}>go</Button>
        <Button onClick={() => props.resetTimer()}>reset</Button>
        <Button onClick={() => props.toggleType()}>toggle</Button>
      </div>
    </div>
  )
}

export default function App() {
  const [timerId, setTimerId] = useState(null);
  const [restTime, setRestTime] = useState(2 * 60);
  const [breakTime, setBreakTime] = useState(2);
  const [workTime, setWorkTime] = useState(2);
  const [currentType, setCurrentype] = useState('work');

  const stopTimer = () => {
    clearInterval(timerId)
    setTimerId(null)
  }
  const goTimer = () => {
    if (timerId) { stopTimer() }
    if (restTime === 0) {
      stopTimer()
      toggleType()
      return
    }
    const newTimerId = setInterval(() => {
      setRestTime(restTime - 1)
    }, TIME);
    setTimerId(newTimerId)
  }

  const resetTimer = () => {
    const restTimeMap = {
      work: workTime,
      break: breakTime,
    }
    const resetRestTime = restTimeMap[currentType] * 60;
    setRestTime(resetRestTime)
  }
  const toggleType = () => {
    const toggleType = currentType === 'work' ? 'break' : 'work';
    setCurrentype(toggleType)
  }

  const handleTimeChange = (val, setTimeType) => {
    setTimeType === 'break' ? setBreakTime(val) : setWorkTime(val)
    setCurrentype(setTimeType)
  }

  useEffect(() => {
    resetTimer()
  }, [breakTime, workTime, currentType])

  useEffect(() => {
    goTimer()
    return () => {
      setTimerId(null)
    }
  }, [restTime])

  return (
    <div className="container">
      <Break handleTimeChange={(val, type) => handleTimeChange(val, type)} />
      <Work handleTimeChange={(val, type) => handleTimeChange(val, type)} />
      <CountDown
        currentType={currentType}
        restTime={restTime}
        stopTimer={stopTimer}
        goTimer={goTimer}
        resetTimer={resetTimer}
        toggleType={toggleType}
      />
    </div>
  )
}
