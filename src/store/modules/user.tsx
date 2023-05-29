import { getToken } from '@/utils/auth'
import { create } from 'zustand'
interface User {
    username: string
}
interface UserState {
    userInfo: User | object
    token: () => any
}
const userOrigin: UserState = {
    userInfo: {},
    token: getToken()
}
export const useUser = create((set, get) => ({
    ...userOrigin,
    login: () => set(() => ({ userInfo: { name: 'INIT' } })),
    getUserInfo: () => {
        return get()?.userInfo
    }
}))
