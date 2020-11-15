import * as Koa from "koa";
import * as logger from "koa-logger";
import { connectDB } from "./database";
import * as models from "./app/models";
import * as dotenv from "dotenv";
dotenv.config();
import { router } from "./app/router";
import { ApolloServer, PubSub } from "apollo-server-koa";
import schemas from "./app/schemas";
import resolvers from "./app/resolvers";
// import spoonApi from './app/services/spoontacular.service';
import services from "./app/services";

export const pubsub = new PubSub();

const PORT = process.env.PORT || 3000;

const app = new Koa();
const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: ({ ctx }) => {
    return {
      user: services.authService.authenticate(ctx),
      ...services,
      ctx,
      models,
    };
  },
});

server.applyMiddleware({
  app,
  cors: {
    origin: process.env.CORS,
    credentials: true,
  },
});

connectDB()
  .then(() => {
    app.keys = [process.env.COOKIE_SECRET];
    app.use(logger());
    app.use(router.routes()).use(router.allowedMethods());

    const appServer = app.listen(PORT, () =>
      console.log(`Listening on port ${PORT}`)
    );
    server.installSubscriptionHandlers(appServer);
  })
  .catch((err) => console.log("Problem connecting to the database: ", err));
