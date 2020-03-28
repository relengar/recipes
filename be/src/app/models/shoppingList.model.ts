
import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema({
    apiId:          { type: Number, required: true },
    amount:         { type: Number },
    unit:           { type: String },
    original:       { type: String },
    amountFill:     { type: Number, default: 0 }
})

const shoppingListSchema = new Schema({
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