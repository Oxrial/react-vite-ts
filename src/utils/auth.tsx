import Storage from '@/utils/Storage'

const TOKEN_KEY = 'token'

export const setToken = (value: any) => Storage.set(TOKEN_KEY, value)
export const getToken = () => Storage.get(TOKEN_KEY)
export const removeToken = () => Storage.remove(TOKEN_KEY)
export const hasToken = () => !!getToken()
