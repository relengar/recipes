import { gql } from 'apollo-boost';

export const ALL_USERS = gql`
    {
        users {
            id
            name
            friends {
                id
        }
    }
    }
`

export const MY_FREINDS = gql`
    {
        myConnections {
            id
            name
        }
    }
`

export const ADD_FRIEND = gql`
    mutation AddFriend($userId: String!) {
        addFriend(userId: $userId)
    }
`

export const REMOVE_FIREND = gql`
    mutation RemoveFriend($userId: String!) {
        removeFriend(userId: $userId)
    }
`