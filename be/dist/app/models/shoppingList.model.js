"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ingredientSchema = new mongoose_1.Schema({
    apiId: { type: Number, required: true },
    amount: { type: Number },
    unit: { type: String },
    original: { type: String },
    amountFill: { type: Number, default: 0 }
});
const shoppingListSchema = new mongoose_1.Schema({
    recipeId: {
        type: Number,
        required: true,
    },
    recipeTitle: { type: String },
    ingredients: [ingredientSchema],
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
});
const shoppingListModel = mongoose_1.model('ShoppingList', shoppingListSchema);
exports.default = shoppingListModel;
//# sourceMappingURL=shoppingList.model.js.map