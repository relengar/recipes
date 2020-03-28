"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("./auth.service");
const spoontacular_service_1 = require("./spoontacular.service");
exports.default = {
    authService: new auth_service_1.AuthService(),
    spoonApi: new spoontacular_service_1.SpoontacularService()
};
//# sourceMappingURL=index.js.map