"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const logger = require("koa-logger");
const database_1 = require("./database");
const models = require("./app/models");
const dotenv = require("dotenv");
dotenv.config();
const router_1 = require("./app/router");
const apollo_server_koa_1 = require("apollo-server-koa");
const schemas_1 = require("./app/schemas");
const resolvers_1 = require("./app/resolvers");
// import spoonApi from './app/services/spoontacular.service';
const services_1 = require("./app/services");
exports.pubsub = new apollo_server_koa_1.PubSub();
const PORT = process.env.PORT || 3000;
const app = new Koa();
const server = new apollo_server_koa_1.ApolloServer({
    typeDefs: schemas_1.default,
    resolvers: resolvers_1.default,
    context: ({ ctx }) => {
        return {
            user: services_1.default.authService.authenticate(ctx),
            ...services_1.default,
            ctx,
            models,
        };
    }
});
server.applyMiddleware({ app, cors: {
        origin: process.env.CORS,
        credentials: true,
    } });
database_1.connectDB().then(() => {
    app.keys = [process.env.COOKIE_SECRET];
    app.use(logger());
    app.use(router_1.router.routes()).use(router_1.router.allowedMethods());
    const appServer = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    server.installSubscriptionHandlers(appServer);
});
//# sourceMappingURL=main.js.map