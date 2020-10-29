import { Schema, Document } from 'mongoose';
import { ingredientSchema, ingredientInterface } from './shoppingList.model';

export interface stepInterface {
    number: number;
    step: string;
}

const stepSchema = new Schema({
    number: Number,
    step: String,
})

const instructionSchema = new Schema({
    name: String,
    steps: [stepSchema],
})

export interface RecipeInterface extends Document{
    title: string;
    image: string;
    readyInMinutes: number;
    instructions: string;
    summary: string;
    analyzedInstructions: {name: string, steps: stepInterface[]}[]
    extendedIngredients: ingredientInterface[]
    originalRecipeId: {
        type: Number,
        required: true,
    },
}

export interface myIngredientInterface {
    apiId?: number;
    amount: number;
    unit: string;
    original: string;
}

const myIngredientSchema = new Schema<myIngredientInterface>({
    apiId:          { type: Number },
    amount:         { type: Number },
    unit:           { type: String },
    original:       { type: String },
})

export const recipeSchema = new Schema<RecipeInterface>({
    title: {
        type: String,
        required: true
    },
    extendedIngredients: [myIngredientSchema],
    analyzedInstructions: [instructionSchema]
})