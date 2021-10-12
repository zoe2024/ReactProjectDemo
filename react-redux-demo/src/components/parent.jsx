import React, { useEffect, useState } from "react";
import Children from "./children";
import { createStore } from 'redux';
import reducer from "../store/reducer";

const store = createStore(reducer)

export default function () {
  const [count, setCount] = useState(store.getState())
  const unSub = store.subscribe(() => {
    setCount(store.getState())
  })
  useEffect(() => {
    return () => {
      unSub()
    }
  })
  return (
    <div className="container">
      parent-count: {count}
      <Children 
      add={() => store.dispatch({ type: "ADD" })} 
      dec={() => store.dispatch({ type: "DEC" })} />
    </div>
  )
}