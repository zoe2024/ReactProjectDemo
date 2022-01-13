/*
 * @Date: 2021-09-22 22:52:50
 * @Descripton: history
 * @LastEditTime: 2021-10-11 23:16:13
 */
import { useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'


// export default useRouterHistory(createHashHistory)()
const history = useRouterHistory(createHashHistory)({})
export default history
