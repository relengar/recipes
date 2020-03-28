import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './RandomRecipe.css'
import CreateShoppingList from '../../shoppingList/create_shopping_list/CreateShoppingList';
import { RouteComponentProps } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { CURRENT_USER } from '../../navbar/authModule/auth_module_query';

const RECIPE = gql`
    {
      randomRecipes {
        id
        title
        image
        analyzedInstructions {
          steps {
            number
            step
          }
        }
        extendedIngredients {
            id
            original
            amount
            unit
        }
      }
    }
`

function RandomRecipe({history}: RouteComponentProps) {
    const { data: user } = useQuery(CURRENT_USER);
    const { loading, error, data, refetch } = useQuery(RECIPE);
    const { randomRecipes: recipes } = data ? data : { randomRecipes: null };

    return (
        <section className="section">
            <h1 className="title has-text-centered">Random recipe</h1>
            <div>
                {loading && <div className="container has-text-centered"><CircularProgress /></div>}
                {error && <p>Error: {error}</p>}
                {
                    recipes
                    &&
                    <>
                        {recipes.map(({id, image, title, analyzedInstructions, extendedIngredients}: any) => {
                            return (
                                <div className="container has-text-centered" key={id}>
                                    <h4 className="subtitle">{title}</h4>
                                    <img className="random-recipe" src={image} alt={title}></img>
                                    <ul>{analyzedInstructions[0]?.steps.map(({ number, step }: any) => {
                                    return <li key={number}><p>{step}</p></li>
                                    })}</ul>
                                    {
                                        user?.currentUser && 
                                        <p>
                                            <CreateShoppingList
                                                recipeId={id}
                                                recipeTitle={title}
                                                ingredients={extendedIngredients}
                                                submitted={(resp: any) => history.push(`/shopping-lists/${user?.currentUser.id}`)}
                                            />
                                        </p>
                                    }
                                </div>
                            );
                        })}
                        <p>
                            <button className="button" onClick={() => refetch()}>Another</button>
                        </p>
                    </>
                }
            </div>
        </section>
    )
}


export default RandomRecipe;