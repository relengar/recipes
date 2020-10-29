import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CURRENT_USER } from '../../../navbar/authModule/auth_module_query';
import { ADD_MY_RECIPE } from './add_my_recipe_query';
import { IconButton } from '@material-ui/core';
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import DeleteIcon from '@material-ui/icons/Delete';
// import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import * as _ from 'lodash';

interface AddMyRecipeButtonProps {
    recipe: any;
}

function deepMap<T extends Object, K extends keyof T>(src: T, functions: { mapper?: (key: string, val: any) => T[K], filter?: (key: string, val: any) => boolean }, accumulator?: any): any {
    const mapped: T = accumulator ? accumulator : {...src};
    const { mapper } = functions;
    return Object.fromEntries(Object.entries(src).filter(([key, val]) => functions.filter ? functions.filter(key, val) : true).map(([key, val]: [string, any]) => {
        if (val instanceof Array) {
            return [key, (mapped[(key as K)] as unknown) = val.map<T[K]>(v => deepMap(v, functions, mapped))];
        }
        if (val instanceof Object) {
            return [key, mapped[(key as K)] = deepMap(val, functions, mapped)];
        }
        const newVal = mapper ? mapper(key, val) : val;
        return [key, newVal];
    }))
}

function transformRecipe(recipeInput: any): any {
    const filter = (key: string) => key !== '__typename';
    const mapper = (key: string, val:any) => {
        if (key === 'analyzedInstructions') {
            return val.reduce(({steps}: any, item: any) => {
                return [
                    ...steps,
                    ...item.steps.map(({number, step}: { number: number, step: string }) => ({number, step}))
                ];
            }, { name: "" , steps: []})
        }
        return val;
    }
    const transformedRecipe = deepMap(recipeInput, {filter, mapper});
    delete transformedRecipe.id;
    return transformedRecipe;
}

function AddMyRecipeButton({ recipe }: AddMyRecipeButtonProps) {
    const { data: user } = useQuery(CURRENT_USER);
    const userId = user?.currentUser?.id

    const [ addMyRecipe ] = useMutation(ADD_MY_RECIPE, {
        refetchQueries: [{
            query: CURRENT_USER,
            variables: { userId },
        }]
    });

    // recipe = {
    //     title: 'Pad Thai 3',
    //     image: 'https://www.gimmesomeoven.com/wp-content/uploads/2019/01/Pad-Thai-Recipe-1.jpg',
    //     readyInMinutes: 30,
    //     instructions: 'Make Pad Thai.',
    //     analyzedInstructions: [{name: '', steps: [{number: 1, step: 'Make Pad Thai'}]}],
    //     extendedIngredients: [{
    //         id:"11297",
    //         original:"2 teaspoons chopped fresh parsley",
    //         amount:2,
    //         amountFill: 0,
    //         unit:"teaspoons"
    //     }],
    // }
    recipe = transformRecipe(recipe);

    return (
        <>
            {
                userId &&
                <IconButton aria-label="Add recipe" onClick={async () => {
                    console.log(recipe)
                    return addMyRecipe({variables: {recipe}}).then().catch(error => console.log(error))
                }}>
                    <FavoriteBorderIcon />
                </IconButton>
            }
        </>
    )
}

export default AddMyRecipeButton;