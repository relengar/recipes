import React from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { GET_SHOPPING_LIST } from './view_shopping_list.query';
import { useParams } from 'react-router-dom';
import { GET_RECIPE } from '../../recipe/recipe_view/recipe_view.query';
import { flattenSteps } from '../../util/helpers/flattenSteps';
import { CircularProgress } from '@material-ui/core';
import MyIngredients from './my_ingredients/MyIngredients';
import './ViewShoppingList.css'
import { CURRENT_USER } from '../../navbar/authModule/auth_module_query';

function ViewShoppingList() {
    const { id } = useParams();
    const [ getRecipe, { data: recipeData, loading: loadingRecipe } ] = useLazyQuery(GET_RECIPE)
    const { data: user } = useQuery(CURRENT_USER);
    const { data, loading } = useQuery(GET_SHOPPING_LIST, {
        variables: { id },
        onCompleted: ({getShoppingListById: { recipeId }}) => getRecipe({variables: { recipeId }})
    });
    const userId = user?.currentUser.id

    const shoppingList = data?.getShoppingListById;
    const recipe = recipeData?.recipeById;

    return (
        <section className="section">
            {loading && <div className="container has-text-centered"><CircularProgress /></div>}
            {
                shoppingList &&
                <>
                    <h1 className="title has-text-centered">{shoppingList.recipeTitle}</h1>
                    <div className="columns">
                        <div className="column has-text-centered"><a href="#recipe-instructions">Recipe instructions</a></div>
                    </div>
                    <div className="columns is-two-thirds is-centered">
                        <MyIngredients
                            userId={userId}
                            ingredients={shoppingList.ingredients}
                            listId={shoppingList.id}
                        />
                    </div>
                    <div className="container">
                        {loadingRecipe && <div className="container has-text-centered"><CircularProgress /></div>}
                        {
                            recipe &&
                            <>
                                <div className="columns is-centered">
                                    <img className="is-one-quarter" src={recipe.image} alt={recipe.title}/>
                                </div>
                                <div id="recipe-instructions" className="container">
                                    {
                                        recipe.analyzedInstructions
                                            .reduce(flattenSteps, [])
                                            .map(({step}: {step: string}, i: number) => (
                                            <div key={i} className="instruction box has-text-centered">{step}</div>
                                        ))
                                    }
                                </div>
                            </>
                        }
                    </div>
                </>
            }
        </section>
    );
}

export default ViewShoppingList;