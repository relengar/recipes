"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user_model_1 = require("../models/user.model");
const apollo_server_koa_1 = require("apollo-server-koa");
class AuthService {
    constructor() {
        this.privKey = this.processKey(process.env.JWT_PRIV_KEY);
        this.pubKey = this.processKey(process.env.JWT_PUB_KEY);
        this.algorithm = process.env.JWT_ALG;
        this.authCookieName = 'uid';
    }
    authenticate(ctx) {
        var _a;
        const token = (_a = ctx) === null || _a === void 0 ? void 0 : _a.cookies.get(this.authCookieName);
        if (!token) {
            return null;
        }
        const algorithm = this.algorithm;
        const user = jwt.verify(token, this.pubKey, { algorithms: [algorithm] });
        return user;
    }
    async logIn(ctx, username, password) {
        const user = await user_model_1.default.findOne({ name: username });
        if (!user) {
            throw new apollo_server_koa_1.ApolloError('User not found', '404');
        }
        await this.checkPassword(password, user.password);
        const token = this.makeToken(user);
        this.setTokenCookie(ctx, token);
        return user;
    }
    logOut(ctx) {
        ctx.cookies.set(this.authCookieName, '', { expires: new Date(), httpOnly: true, path: '/', signed: true });
        return true;
    }
    async register(ctx, userData) {
        const existingUser = await user_model_1.default.findOne({ name: userData.name });
        if (existingUser) {
            throw new apollo_server_koa_1.ApolloError('User already exists', '409');
        }
        const hash = await this.hashPassword(userData.password);
        const user = await user_model_1.default.create({ ...userData, password: hash });
        const token = this.makeToken(user);
        this.setTokenCookie(ctx, token);
        return user;
    }
    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
    async checkPassword(password, hash) {
        const isValid = await bcrypt.compare(password, hash);
        if (!isValid) {
            throw new apollo_server_koa_1.ApolloError('Invalid password', '401');
        }
        return isValid;
    }
    makeToken(data) {
        const algorithm = this.algorithm;
        return jwt.sign({ ...data.toObject(), id: data._id }, this.privKey, { algorithm, expiresIn: 64000 * 1000 * 7 });
    }
    processKey(key) {
        const beginKey = 'KEY-----';
        const endKey = '-----END';
        return key
            .replace(/\n/g, '')
            .replace(beginKey, `${beginKey}\n`)
            .replace(endKey, `\n${endKey}`);
    }
    setTokenCookie(ctx, token) {
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        ctx.cookies.set(this.authCookieName, token, { expires, httpOnly: true, path: '/', signed: true });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map