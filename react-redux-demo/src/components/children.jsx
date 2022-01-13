/*
 * @Date: 2021-10-11 23:39:08
 * @Descripton: reducx 练习
 * @LastEditTime: 2021-10-12 23:47:24
 */
import React from "react";
export default function (props) {
  return (
    <div className="container">
      <button onClick={props.add}>add</button>
      <span> &nbsp;&nbsp;&nbsp; </span>
      <button onClick={props.dec}>dec</button>
    </div>
  )
}