/** 
 * 技术博文学习
 * 地址： 
 */

import React, {
  Component,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import Context from "./Context";

class CompClass extends Component {
  showMessage = () => {
    console.log(
      "类组件点击的这一刻setTimeout，props中info为setTimeout" + this.props.info
    );
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
    console.log(
      `当前props中的info为${this.props.info},一致就说明准确的关联到了此时的render结果`
    );
  };

  render() {
    return (
      <div onClick={this.handleClick}>
        <div>点击类组件</div>
      </div>
    );
  }
}

function CompFunction(props) {
  const showMessage = () => {
    console.log("函数组件点击的这一刻setTimeout，props中info为 " + props.info);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
    console.log(
      `当前props中的info为${props.info},一致就说明准确的关联到了此时的render结果`
    );
  };

  return <div onClick={handleClick}>点击函数组件</div>;
}

let B = (props) => {
  const { info } = props;
  const [count, setCount] = useState(0);
  useEffect(() => {
    setInterval(() => {
      //这才是dispatch函数正确的使用方式
      setCount((old) => {
        return old + 1;
      });
    }, 1000);
  }, []);
  useEffect(() => {
    setInterval(() => {
      console.log("info为：" + info + " count为：" + count);
    }, 1000);
  }, []);
  return <div></div>;
};
/** 函数组件的闭包陷阱 */
let B1 = (props) => {
  const { info } = props;
  const [count, setCount] = useState(0);
  const refInfoFromProps = useRef();
  const refCountFromProps = useRef();
  refInfoFromProps.current = info;
  refCountFromProps.current = count;
  useEffect(() => {
    setInterval(() => {
      //这才是dispatch函数正确的使用方式
      setCount((old) => {
        return old + 1;
      });
    }, 1000);
  }, []);
  useEffect(() => {
    setInterval(() => {
      console.log(
        "改进版B1组件info为：" +
          refInfoFromProps.current +
          " count为：" +
          refCountFromProps.current
      );
    }, 1000);
  }, []);
  return <div></div>;
};

let A = (props) => {
  const [info, setInfo] = useState(0);
  useEffect(() => {
    setInterval(() => {
      //这才是dispatch函数正确的使用方式
      setInfo((old) => {
        return old + 1;
      });
    }, 1000);
  }, []);
  return (
    <div>
      <B info={info}></B>
      <B1 info={info}></B1>
      {info}
    </div>
  );
};
/** 如果是由React引发的事件处理（比如通过onClick引发的事件处理），调用setState不会同步更新this.state，除此之外的setState调用会同步执行this.state */
function TestAsync() {
  const [info1, setInfo1] = useState(0);
  const [info2, setInfo2] = useState(0);
  const ref1 = useRef();
  const ref2 = useRef();
  ref1.current = info1;
  ref2.current = info2;
  useEffect(() => {
    setTimeout(() => {
      setInfo1(ref1.current + 1);
      setInfo1(ref1.current + 1);
      setInfo1(ref1.current + 1);
      console.log("info1-start:" + ref1.current); // info1:0
      console.log("info2-start:" + ref2.current); // 同步输出 info2:3
      console.log("info1-end:" + ref1.current); // 同步输出 info2:3
      setInfo2(ref2.current + 1);
      setInfo2(ref2.current + 1);
      setInfo2(ref2.current + 1);
      console.log("info2-end:" + ref2.current); // 同步输出 info2:3
    });
  }, []);
  return <div>同步异步验证： {info1}</div>;
}

/** useEffect和LayoutEffect
 * 因为useEffect是异步的，当通过设置running关闭定时器和设置lapse为“0”时，并没有第一时间关闭定时器，而是阴差阳错的出现了一种情况：lapse已经设置为零，定时器还没关闭就要关闭的这一霎，又一次的执行了，便出现了这种问题。而用同步执行的LayoutEffect就没有这个问题
 */
function TestEffectApi() {
  const [lapse, setLapse] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (running) {
      const startTime = Date.now() - lapse;
      const intervalId = setInterval(() => {
        setLapse(Date.now() - startTime);
      }, 2);
      console.log(intervalId);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [running]);

  function handleRunClick() {
    setRunning((r) => !r);
  }

  function handleClearClick() {
    setRunning(false);
    setLapse(0);
  }

  return (
    <div>
      <label>{lapse}ms</label>
      <button onClick={handleRunClick}>{running ? "暂停" : "开始"}</button>
      <button onClick={handleClearClick}>暂停并清0</button>
    </div>
  );
}

/**
 * refs
 */

const RefA = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => {
    return {
      test: () => {
        console.log("ref-ok：使用forwardRef转发ref");
      },
    };
  });
  const [info, setInfo] = useState(0);
  return <div>RefA-info：{info}</div>;
});
/** 不使用forwardRef */
const RefA1 = (props) => {
  const { testRef } = props;
  useImperativeHandle(testRef, () => {
    return {
      test: () => {
        console.log("RefA1-ok： 不使用forwardRef转发");
        setInfo((old) => ++old);
      },
    };
  });
  const [info, setInfo] = useState(0);
  return (
    <div>
      <div onClick={() => testRef.current.test()}>子组件中触发ref</div>
      RefA1-info：{info}
    </div>
  );
};

function TestRef() {
  const ref = useRef(null);
  const ref1 = useRef(null);
  return (
    <div>
      <div
        onClick={() => {
          ref.current.test();
        }}
      >
        <RefA ref={ref}></RefA>
      </div>
      <div style={{ width: "100%", border: "1px solid blue" }}>
        <div
          onClick={() => {
            ref1.current.test();
          }}
        >
          父组件中触发ref
        </div>
        <RefA1 testRef={ref1}></RefA1>
      </div>
    </div>
  );
}

function App() {
  const [info, setInfo] = useState(0);
  return (
    <div>
      <div
        onClick={() => {
          setInfo(info + 1);
        }}
      >
        父组件的info信息: {info}
      </div>
      <CompClass info={info} />
      <CompFunction info={info} />
      <div>
        A组件
        {/* <A /> */}
      </div>

      <TestAsync />
      <TestEffectApi />
      <TestRef />
      <div>
        Context： <Context />
      </div>
    </div>
  );
}

export default App;
