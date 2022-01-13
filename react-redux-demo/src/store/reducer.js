/*
 * @Date: 2021-10-12 22:46:57
 * @Descripton: 
 * @LastEditTime: 2021-10-12 23:06:21
 */
const reducer = (state = 0, action) => {
  let retState = null;
  switch (action.type) {
    case "ADD":
      retState = state + 1;
      break;
    case "DEC":
      retState = state - 1;
      break;
  
    default:
      retState = 0
      break;
  }
  return retState;
}

export default reducer;