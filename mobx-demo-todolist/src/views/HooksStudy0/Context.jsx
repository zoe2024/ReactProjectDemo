import { createContext, useContext, useReducer } from "react";
export const TestContext = createContext({});
const TAG_1 = "TAG_1";

const reducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case TAG_1:
      return { ...state, ...payload };
      dedault: return state;
  }
};

const A = (props) => {
  const [data, dispatch] = useReducer(reducer, { info: "本文作者" });
  return (
    <TestContext.Provider value={{ data, dispatch }}>
      <B></B>
    </TestContext.Provider>
  );
};

let B = () => {
  const { dispatch, data } = useContext(TestContext);
  let handleClick = () => {
    dispatch({
      type: TAG_1,
      payload: {
        info: "闲D阿强",
      },
    });
  };
  return (
    <div>
      <input type="button" value="测试context" onClick={handleClick} />
      {data.info}
    </div>
  );
};

export default A;
