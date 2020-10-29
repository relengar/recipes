import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { IconButton } from '@material-ui/core';
import { CURRENT_USER } from '../../../navbar/authModule/auth_module_query';
import { REMOVE_MY_RECIPE } from './remove_my_recipe_query';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

function RemoveMyRecipeButton({recipeId}: { recipeId: string }) {
    const { data: user } = useQuery(CURRENT_USER);
    const userId = user?.currentUser?.id

    const [ removeRecipe ] = useMutation(REMOVE_MY_RECIPE, {
        refetchQueries: [{
            query: CURRENT_USER,
            variables: { userId },
        }]
    });

    return (
        <>
            {
                userId &&
                <IconButton aria-label="Add recipe" onClick={async () => {
                    return removeRecipe({variables: {recipeId: "5f50d5069f8d38f6fa1a73f7"}}).then().catch(error => console.log(error))
                }}>
                    <DeleteOutlineIcon />
                </IconButton>
            }
        </>
    )
}

export default RemoveMyRecipeButton;