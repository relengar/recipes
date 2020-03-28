import { ApolloError } from 'apollo-boost';
import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import './RecipesByIngredient.css'

type RecipesByIngredientProps = {
    loading: boolean,
    data: any,
    error: ApolloError | undefined,
    called: boolean
}


function renderIngredients(title: string, ingredientList: [{original: string}]): ReactNode {
    return ingredientList.length > 0 && (
        <div className="content has-text-centered">
        <strong>{title}</strong>
        <ul>{ingredientList.map(({original}, i) => <li key={i}><i>{original}</i></li>)}</ul>
        </div>
    )
}

export default function RecipesByIngredient({ called, loading, data, error }: RecipesByIngredientProps) {
    return (
        <div className="container has-text-centered">
        { called && loading && <CircularProgress size={50} /> }
        {   
            data && data.recipesByIngredients.length > 0 && !loading && !error &&
            <div>{data.recipesByIngredients.map(({ id, title, missedIngredients, usedIngredients }: any, i: number) => {
                return (
                    <div key={i} className="columns is-centered">
                        <div className="card recipe-by-ingredient column is-one-third box">
                            <header className="card-title has-text-centered">
                                <NavLink className="is-size-5" to={`/recipe/${id}`}>{title}</NavLink>
                            </header>
                            <div className="card-content"> 
                                {renderIngredients('Used Ingredients', usedIngredients)}
                                {renderIngredients('Missed Ingredients', missedIngredients)}
                            </div>
                        </div>
                    </div>
                )
            })}</div>
        }
        </div>
    );
}
