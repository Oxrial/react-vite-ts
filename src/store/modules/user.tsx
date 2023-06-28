import { getToken } from '@/utils/auth'
import { create } from 'zustand'
/**
 * produce 内部暂时存储着我们的目标对象（以 state 为例）
 * 暴露一个 draft（草稿）, 在 draft 上作修改
 * 接收修改后的draft，immer 基于传入的 state 照着draft 的修改 返回一个新的 state
 */
import { produce } from 'immer'

interface User {
    username: string
    userpwd: any
}
interface UserState {
    userInfo: User | null
    token: () => any
}
interface UserAction {
    login: (user: UserState['userInfo']) => void
    logout: () => void
    setUserInfo: (user: UserState['userInfo']) => void
}
const userOrigin: UserState = {
    userInfo: null,
    token: getToken()
}
export const useUser = create<UserState & UserAction>(set => ({
    ...userOrigin,
    setUserInfo: (user: UserState['userInfo']) => set(produce(draftState => (draftState.userInfo = user))),
    login: (user: UserState['userInfo']) => {
        return user
    },
    logout: () => {}
}))
