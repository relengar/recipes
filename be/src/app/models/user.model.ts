import { Schema, model, Document } from 'mongoose';

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
}

const userSchema = new Schema({
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
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' , default: []}]
})

const userModel = model<UserInterface>('User', userSchema);

export default userModel;