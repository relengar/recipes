"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
async function connectDB() {
    const resp = await mongoose_1.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    mongoose_1.connection.once('open', () => console.log('Database connected'));
    return resp;
}
exports.connectDB = connectDB;
//# sourceMappingURL=database.js.map