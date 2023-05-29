import { getToken } from '@/utils/auth'
import { create } from 'zustand'
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
    setUserInfo: (user: UserState['userInfo']) => set(produce(state => (state.userInfo = user))),
    login: (user: UserState['userInfo']) => {
        return user
    },
    logout: () => {}
}))
