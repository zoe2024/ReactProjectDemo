/*
 * @Date: 2021-09-22 22:52:50
 * @Descripton: 
 * @LastEditTime: 2021-09-23 22:29:49
 */
import { useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'


// export default useRouterHistory(createHashHistory)()
const history = useRouterHistory(createHashHistory)({})
export default history
