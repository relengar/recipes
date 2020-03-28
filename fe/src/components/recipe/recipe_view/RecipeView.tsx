import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import CreateShoppingList from '../../shoppingList/create_shopping_list/CreateShoppingList';
import { RouteComponentProps } from 'react-router-dom';
import { GET_RECIPE } from './recipe_view.query';
import { flattenSteps } from '../../util/helpers/flattenSteps';
import { CircularProgress } from '@material-ui/core';

interface Ingredient {
    id: number;
    original: string
    amount: number;
    unit: string;
}

function RecipeView({history}: RouteComponentProps) {
    const { id: recipeId } = useParams()
    const { data , loading } = useQuery(GET_RECIPE, { variables: { recipeId: parseInt(recipeId as string, 10) } });
    const { recipeById: recipe } = data ? data : { recipeById: null };

    return (
        <section className="section">
            {loading && <div className="has-text-centered"><CircularProgress /></div>}
            {
                recipe &&
                <>
                    <h1 className="title has-text-centered">{recipe.title}</h1>
                    <div className="columns is-centered">
                        <img src={recipe.image} alt={recipe.title}/>
                    </div>
                    <div className="columns is-centered">
                        <CreateShoppingList
                            recipeId={recipeId as string}
                            recipeTitle={recipe.title}
                            ingredients={recipe.extendedIngredients}
                            submitted={(resp: any) => history.push('/search')}
                        />
                    </div>
                    <div className="columns is-centered">
                        <ul>
                            {recipe.extendedIngredients.map(({id, original, amount, unit}: Ingredient) => (
                                <li key={id}>{original} - {parseFloat(amount.toPrecision(3))} {unit}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="container">
                        {
                            recipe.analyzedInstructions
                                .reduce(flattenSteps, [])
                                .map(({step}: {step: string}, i: number) => (
                                <div key={i} className="box has-text-centered">{step}</div>
                            ))
                        }
                    </div>
                </>
            }
        </section>
    );
}

export default RecipeView;