import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_MY_SHOPPING_LISTS } from '../my_shopping_lists/my-shopping-list.queries';
import { CREATE_SHOPPING_LIST } from './create_shopping_list.query';
import { CURRENT_USER } from '../../navbar/authModule/auth_module_query';

interface NewShoppingListProps {
    recipeId: string;
    recipeTitle: string;
    ingredients: ShoppingListIngredient[];
    submitted: Function;
}

interface ShoppingListIngredient {
    id: number;
    name: string;
    original: string;
    originalName: string;
    amount: number;
    unit: string;
}

function processInput<T>(object: T): Partial<T> {
    return Object.fromEntries(Object.entries(object).filter(([key]) => key !== '__typename'));
}

function CreateShoppingList({ recipeId, recipeTitle, ingredients, submitted }: NewShoppingListProps) {
    const { data: user } = useQuery(CURRENT_USER);
    const userId = user?.currentUser?.id
    const [ createList ] = useMutation(CREATE_SHOPPING_LIST, {
        refetchQueries: [{
            query: GET_MY_SHOPPING_LISTS,
            variables: { userId },
        }]
    });


    return (
        <>
            {
                userId &&
                <button
                    onClick={async() => {
                        return await createList({variables: { recipeTitle, recipeId: parseInt(recipeId, 10), ingredients: ingredients.map(processInput), userId }})
                            .then((id) => submitted(id))
                            .catch(err => console.log(err))
                    }}
                    className="button"
                    >
                    Create shopping list
                </button>
            }
        </>
    )
}

export default CreateShoppingList