import React from "react";
import { debounce } from "lodash";
import { useMutation, useSubscription } from "@apollo/react-hooks";
import { UPDATE_INGREDIENTS } from "./my_ingredients.query";
import IngredientSlider from "./ingredientSlider/IngredientSlider";
import { INGREDIENTS_SUBSCRIPTION } from "../view_shopping_list.query";

interface MyIngredientsProps {
  ingredients: any[];
  listId: string;
  userId: string;
}

function processIngredient(ingredient: any) {
  const requiredFields = ["amount", "original", "id", "amountFill", "unit"];
  return Object.fromEntries(
    Object.entries(ingredient).filter(([key]) =>
      requiredFields.some((field) => field === key)
    )
  );
}

function getVariables(
  amountFill: number,
  ingredient: any,
  userId: string,
  listId: string
) {
  return {
    variables: {
      userId,
      id: listId,
      ingredients: [{ ...processIngredient(ingredient), amountFill }],
    },
  };
}

function mapIngredientUpdates(ingredients: any[], updates: any[]) {
  console.log(ingredients);
  if (!updates?.length) {
    return ingredients;
  }
  const resp = ingredients.map((ingredient) => {
    const update = updates.find(({ id }) => id === ingredient.id);
    return {
      ...ingredient,
      ...update,
      forceRender: update ? new Date().getTime() : 0,
    };
  });
  return resp;
}

function MyIngredients({
  ingredients: ingredientsInput,
  listId,
  userId,
}: MyIngredientsProps) {
  const [updateIngredients] = useMutation(UPDATE_INGREDIENTS);
  const update = debounce(updateIngredients, 300);

  const { data, loading, error } = useSubscription(INGREDIENTS_SUBSCRIPTION, {
    variables: { userId, shoppingListId: listId },
    onSubscriptionData: ({ subscriptionData }: any) => {
      console.log("data: ", subscriptionData);
      //   TODO Change subscription structure
      setIngredeints(
        mapIngredientUpdates(
          ingredientsInput,
          subscriptionData.data.shoppingListIngredients.ingredients
        )
      );
    },
  });

  console.log(data, loading, error);

  const [ingredients, setIngredeints] = React.useState(ingredientsInput);

  return (
    <ul>
      {Array.from(ingredients).map(
        (
          { amount, amountFill, unit, original, forceRender }: any,
          i: number
        ) => (
          <li className="columns" key={i + (forceRender ?? 0)}>
            <div className="column">
              {original}: {amountFill}
            </div>
            <div className="column">
              <IngredientSlider
                amount={amount}
                amountFill={amountFill}
                unit={unit}
                update={(v) =>
                  update(
                    getVariables(v as number, ingredients[i], userId, listId)
                  )
                }
              />
            </div>
            <div className="column">
              {amountFill} {unit}
            </div>
          </li>
        )
      )}
    </ul>
  );
}

export default MyIngredients;
