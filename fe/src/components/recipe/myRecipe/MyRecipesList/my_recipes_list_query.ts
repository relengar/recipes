import { gql } from 'apollo-boost';

export const MY_RECIPES_LIST = gql`
    {
        myRecipes {
            id
            title
        }
    }
`