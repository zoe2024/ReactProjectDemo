import React, { useState } from "react";
import Children from "./children";
export default function () {
  return (
    <div className="container">
      parent-count: 0
      <Children />
    </div>
  )
}