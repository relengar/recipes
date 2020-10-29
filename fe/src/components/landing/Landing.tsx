import React from 'react';
import mrCresoote from '../../assets/mr-creosote.jpeg';
import AddMyRecipeButton from '../recipe/myRecipe/addMyRecipeButton/AddMyRecipeButton';
import RemoveMyRecipeButton from '../recipe/myRecipe/removeMyRecipeButton/RemoveMyRecipeButton';

function Landing() {
    return (
        <section className="section">
            <div className="container has-text-centered"><img src={mrCresoote} alt="Just a mint leaf"/></div>
            <AddMyRecipeButton recipe={{}} />
            <RemoveMyRecipeButton recipeId="5f4fb3c2d83d6054c5190b60" />
        </section>
    )   
}

export default Landing;