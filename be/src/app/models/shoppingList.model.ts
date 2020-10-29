
import { Schema, model, Document } from 'mongoose';
import { UserInterface } from './user.model';

export interface ingredientInterface extends Document {
    apiId: number;
    amount: number;
    unit: string;
    original: string;
    amountFill: number
}

export interface shoppingListInterface {
    recipeId: number;
    recipeTitle: string;
    ingredients: ingredientInterface[],
    user: UserInterface
}

export const ingredientSchema = new Schema<ingredientInterface>({
    apiId:          { type: Number, required: true },
    amount:         { type: Number },
    unit:           { type: String },
    original:       { type: String },
    amountFill:     { type: Number, default: 0 }
})

const shoppingListSchema = new Schema<shoppingListInterface>({
    recipeId: {
        type: Number,
        required: true,
    },
    recipeTitle: { type: String },
    ingredients: [ingredientSchema],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

const shoppingListModel = model('ShoppingList', shoppingListSchema);
export default shoppingListModel;