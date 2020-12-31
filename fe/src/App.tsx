import React, { Suspense, lazy } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  ApolloCache,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
} from "@apollo/client";
import { recipe } from "./resolvers";
import { link } from "./websocketSetup";
import { IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
import NavBar from "./components/navbar/NavBar";

const landingPreload = import("./components/landing/Landing");
const recipeViewPreload = import("./components/recipe/recipe_view/RecipeView");
const randomRecipe = import("./components/recipe/random_recipe/RandomRecipe");
const friendsList = import("./components/friends/FriendsList");
const myShoppingLists = import(
  "./components/shoppingList/my_shopping_lists/MyShoppingLists"
);
const viewShoppingList = import(
  "./components/shoppingList/view_shopping_list/ViewShoppingList"
);
const recipeSearch = import("./components/recipe/recipe_search/RecipeSearch");

const Landing = lazy(() => landingPreload);
const RecipeView = lazy(() => recipeViewPreload);
const RandomRecipe = lazy(() => randomRecipe);
const FriendsList = lazy(() => friendsList);
const MyShoppingLists = lazy(() => myShoppingLists);
const ViewShoppingList = lazy(() => viewShoppingList);
const RecipeSearch = lazy(() => recipeSearch);

const cache = new InMemoryCache({
  // fragmentMatcher: new IntrospectionFragmentMatcher({}),
});
const init = {
  data: {
    ingredients: [],
  },
};
// cache.writeData(init);

const client = new ApolloClient({
  link: (link as unknown) as ApolloLink,
  cache,
  resolvers: recipe,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <NavBar />
        <Suspense
          fallback={
            <section className="section">
              <div className="container has-text-centered">Loading ... </div>
            </section>
          }
        >
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/random" component={RandomRecipe} />
            <Route exact path="/search" component={RecipeSearch} />
            <Route
              exact
              path="/shopping-lists/:userId"
              component={MyShoppingLists}
            />
            <Route exact path="/recipe/:id" component={RecipeView} />
            <Route
              exact
              path="/shopping-list/:id"
              component={ViewShoppingList}
            />
            <Route exact path="/connections" component={FriendsList} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
