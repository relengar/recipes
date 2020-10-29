import React from 'react';
import RecipesByIngredient from './recipes_by_ingredient/RecipesByIngredient';
import './RecipeSearch.css'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { GET_CACHED_INPUT, SET_CACHE, AUTOCOMPLETE, SEARCH } from './queries'

const DEFAULT_INGREDIENT_OPTIONS = [
    'eggs',
    'ham',
    'milk',
];

function setOptions(
    loading: boolean,
    variables: { query: string },
    data: { predictIngredient: { name: string }[] }
): string[] {
     if (loading) {
        return [];
    } else if (data && data.predictIngredient.length > 0) {
        return data.predictIngredient.map(({name}) => name);
    }
    if (variables) {
        return variables.query.length > 0 ? []: DEFAULT_INGREDIENT_OPTIONS;
    }
    return DEFAULT_INGREDIENT_OPTIONS;
}

function RecipeSearch() {
    const { data } = useQuery(GET_CACHED_INPUT, {
        onCompleted: cache => cache?.ingredients?.length > 0 && search({variables: { ingredients: cache?.ingredients }})
    })
    const [ predict, { data: ingredients, loading, variables } ] = useLazyQuery(AUTOCOMPLETE);
    const [ search, { loading: loadingRecipes, data: recipes, error, called } ] = useLazyQuery(SEARCH, {
        onCompleted: () => {
            updateCache({ variables: formik.values});
        }
    });
    const [ updateCache ] = useMutation(SET_CACHE);

    const formik = useFormik({
        initialValues: {
          ingredients: data?.ingredients as string[],
        },
        onSubmit: values => {
            search({variables: values})
        },
    });

    return (
        <section className="section">
            <h1 className="title has-text-centered">Search for recipes by Ingredients</h1>
            <div className="columns is-centered">
                <div className="column is-one-third">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="">
                            <Autocomplete
                                onChange={(_, value: string[]) => formik.setFieldValue('ingredients', value)}
                                id="ingredient"
                                disableClearable
                                multiple
                                defaultValue={formik.values.ingredients ? formik.values.ingredients : []}
                                filterOptions={options => {
                                    return options.filter(option => !formik.values.ingredients || !formik.values.ingredients.some(opt => opt === option))
                                }}
                                options={setOptions(loading, (variables as { query: string }), ingredients)}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        onChange={({target}) => predict({ variables: { query: target.value } })}
                                        id="ingredients"
                                        label="Ingredients"
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                        InputProps={{ ...params.InputProps, type: 'search' }}
                                    ></TextField>
                                )}
                                renderOption={option => (
                                    <React.Fragment>
                                        <div id="ingredients">{option}</div>
                                    </React.Fragment>
                                )}
                            />
                        </div>
                        <p className="has-text-centered">
                            <button type="submit" className="button is-medium is-fullwidth is-info">Search</button>
                        </p>
                    </form>
                </div>
            </div>
            <RecipesByIngredient
                loading={loadingRecipes}
                data={recipes}
                error={error}
                called={called}
            />
        </section>
    )
}

export default RecipeSearch;
