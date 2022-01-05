import React, { useState, useCallback, useEffect } from "react";
export default function CallbackExample() {
  const [count, setCount] = useState(1);
  const [value, setValue] = useState(1);

  const callback = useCallback(() => {
    return count;
  }, [count]);

  return (
    <div>
      <h1>Parent: {count}</h1>
      <h1>Value: {value}</h1>
      <Child callback={callback} />
      <div>
        <button onClick={() => setCount(count + 1)}>Count + 1</button>
        <button onClick={() => setValue(value + 2)}>Value + 2</button>
      </div>
    </div>
  );
}

function Child({ callback }) {
  const [count, setCount] = useState(() => callback());
  useEffect(() => {
    setCount(callback());
  }, [callback]);

  return <h2>Child: {count}</h2>;
}
