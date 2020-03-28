import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { NavLink, useParams } from 'react-router-dom';
import { GET_MY_SHOPPING_LISTS } from './my-shopping-list.queries'
import { CircularProgress } from '@material-ui/core';
import './MyShoppingLists.css'

function MyShoppingLists() {
    const { userId } = useParams()
    const { data, loading } = useQuery(GET_MY_SHOPPING_LISTS, { variables: { userId } });

    return (
        <section className="section">
            <h1 className="title has-text-centered is-centered">My shopping lists</h1>
            <div className="container">
                { loading &&  <div className="is-centered"><CircularProgress /></div>}
                {
                    data && data.getUserShoppingLists &&
                    data.getUserShoppingLists.map((list: any) => (
                        <div key={list.id} className="columns is-centered">
                            <NavLink to={`/shopping-list/${list.id}`}>
                                <div className="box column recipe is-full">
                                    <div className="subtitle has-text-centered has-text-dark is-size-4">{list.recipeTitle}</div>
                                    <div className="has-text-centered">
                                        <ul>
                                            {list.ingredients.map(({amount, unit, original}: any, i: number) => (
                                                <li className="columns ingredient has-text-weight-meduim" key={i}>
                                                    <span className="column has-text-left is-three-fifths">{original}</span>
                                                    <i className="column is-two-fifths has-text-right">{amount} {unit}</i>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default MyShoppingLists;