"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
    friends: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: [] }]
});
const userModel = mongoose_1.model('User', userSchema);
exports.default = userModel;
//# sourceMappingURL=user.model.js.map