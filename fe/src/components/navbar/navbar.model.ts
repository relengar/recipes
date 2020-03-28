export type NavbarAuthProps = {
    loadUser: () => void,
}

export enum AuthType {
    LOGIN = 'LOGIN',
    SIGNUP = 'SIGNUP',
}