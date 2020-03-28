import { gql } from 'apollo-boost';

export const SIGNUP = gql`
    mutation SignUp($name: String!, $password: String!) {
        createUser(password: $password, name: $name) {
            id
            name
        }
    }
`

export const LOGIN = gql`
    mutation LogIn($name: String!, $password: String!) {
        logIn(password: $password, name: $name) {
            id
            name
        }
    }
`

export const CURRENT_USER = gql`
    query CurrentUser {
        currentUser {
            id
            name
        }
    }
`;

export const LOGOUT= gql`
    mutation LogOut {
        logOut
    }
`
