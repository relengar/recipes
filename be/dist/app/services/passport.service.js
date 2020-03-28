"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const passport = require("passport");
const models_1 = require("../models");
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    jsonWebTokenOptions: {},
};
passport.use(new passport_jwt_1.Strategy(options, async (payload, done) => {
    const user = await models_1.userModel.findById(payload.id);
    done(null, user);
}));
async function authenticate(ctx) {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (user) {
                ctx.user = user;
                resolve(true);
            }
            else if (err) {
                console.log(err);
                reject(false);
            }
        });
    });
}
//# sourceMappingURL=passport.service.js.map