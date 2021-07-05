export type LoginParamsType = {
    clientId: number
    email: string
    password: string
}
export type authMeParamsType = {
    tokenType: string,
    accessToken: string
}
export type LoginResponseType = {
    data: {
        tokenType: string,
        expiresAt: string,
        accessToken: string,
        refreshToken: string
    }
}
export type AuthResponseType = {
    data: {
        name: string
        email: string
    }
}
export const login = async (data: LoginParamsType): Promise<LoginResponseType> => {
    const res = await fetch('https://tager.dev.ozitag.com/api/auth/user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify(data)
    })
    return await res.json()
}
export const authMe = async (token:string): Promise<AuthResponseType> => {
    const res = await fetch('https://tager.dev.ozitag.com/api/tager/user/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        },
    })
    return await res.json()
}
