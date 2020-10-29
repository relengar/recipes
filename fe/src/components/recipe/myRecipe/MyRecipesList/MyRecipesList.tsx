import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { MY_RECIPES_LIST } from './my_recipes_list_query';
import { CircularProgress } from '@material-ui/core';

function MyRecipesList() {
    const { data, loading } = useQuery(MY_RECIPES_LIST)
    const recipes = data ? data.myRecipes : null

    return (

        <section>
            <h1 className="title has-text-centered is-centered">My Recipes</h1>
            {loading && <div className="container has-text-centered"><CircularProgress /></div>}
        {
            !loading && recipes && 
            recipes.map((recipe: any) => <div key={recipe.id}>{recipe.title}</div>)
        }
        </section>
    )
}

export default MyRecipesList;