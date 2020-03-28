export default {
    Mutation: {
        saveIngredients: <R>(_root: R, {ingredients}: any, { cache }: any) => {
            // let test = {recipesByIngredients: [
            //     recipesByIngredients[0],
            //     recipesByIngredients[1],
            //     recipesByIngredients[2],
            //     recipesByIngredients[3],
            //     // recipesByIngredients[4]
            // ] }
            cache.writeData({ data: {ingredients }});
        }
    }
}
