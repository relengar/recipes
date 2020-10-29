import { Schema, model, Document } from 'mongoose';
import { recipeSchema, RecipeInterface } from './recipe.model';

interface BaseUserInterface extends Document {
    name: string;
    profilePicUrl: string;
    password: string;
}

export interface UserInterface extends BaseUserInterface {
    name: string;
    profilePicUrl: string;
    password: string;
    friends: BaseUserInterface[];
    favoriteRecipes: RecipeInterface[]
}

const userSchema = new Schema<UserInterface>({
    name: {
        type: String,
        required: true
    },
    profilePicUrl: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' , default: []}],
    favoriteRecipes: [recipeSchema],
})

const userModel = model<UserInterface>('User', userSchema);

export default userModel;