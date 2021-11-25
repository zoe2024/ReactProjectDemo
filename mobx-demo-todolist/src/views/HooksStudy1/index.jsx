/**
 * 技术博文学习-入门篇
 * 地址：https://juejin.cn/post/6994989737626828830#heading-8
 */
import React, {
  Component,
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import CallbackExample from "./CallbackExample"
import UseStateExample from "./UseStateExample"

/** React组件的更新机制对state只进行浅对比，也就是更新某个复杂类型数据时只要它的引用地址没变，就不会重新渲染组件。 */
function ComplexHookState() {
  const [friends, setFrineds] = useState(["zhangsan", "lisi"]);
  function addFriend() {
    friends.push("wangwu");
    // setFrineds(friends); // 这样就是直接指向原引用地址，不会导致组件的重新渲染，实际数据是已经发生了变化的
    setFrineds([...friends]);
  }

  return (
    <div>
      <h2>好友列表:</h2>
      <ul>
        {friends.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
      {/* // 正确的做法 */}
      <button onClick={(e) => setFrineds([...friends, "wangwu"])}>
        添加朋友
      </button>
      {/* // 错误的做法 */}
      <button onClick={addFriend}>添加朋友</button>
    </div>
  );
}

const set = new Set();
function Callback() {
  const [count, setCount] = useState(1);
  const [value, setValue] = useState(1);

  const callback = useCallback(() => {
    console.log(count);
  }, [count]);
  const countAdd = () => {
    setCount((old) => ++old);
    callback();
  };
  set.add(callback);
  console.log({ set });

  return (
    <div>
      <h1>Count: {count}</h1>
      <h1>Set.size: {set.size}</h1>
      <h1>Value: {value}</h1>
      <div>
        <button onClick={() => countAdd()}>Count + 1</button>
        <button onClick={() => setValue(value + 2)}>Value + 2</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <ComplexHookState />
      <Callback />
      <CallbackExample />
      <UseStateExample />
    </div>
  );
}

export default App;
