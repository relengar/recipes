import { AuthService } from "./app/core/services/auth.service";
import * as Koa from "koa";
import * as logger from "koa-logger";
import { connectDB } from "./database";
import * as dotenv from "dotenv";
dotenv.config();
import { router } from "./app/router";
import { ApolloError, ApolloServer } from "apollo-server-koa";
import { buildSchema } from "type-graphql";
import { RecipeResolver } from "./app/spoontacular/resolvers/recipe-typed.resolver";
import { Container } from "typedi";
import { UserResolver } from "./app/user/resolvers/user.resolver";
import * as session from "koa-session";
import { ShoppingListResolver } from "./app/shoppingList/resolvers/shopping-list.resolver";

const PORT = process.env.PORT || 3000;

const app = new Koa();

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [RecipeResolver, UserResolver, ShoppingListResolver],
    container: Container,
    authChecker: (data) => !!data.context.user?.id,
  });

  const authService = Container.get(AuthService);

  const server = new ApolloServer({
    subscriptions: {
      onConnect: (connection, socket, context) => {
        try {
          return { user: authService.authenticateWebsocket(context) };
        } catch (error) {
          console.error(error);
          throw new ApolloError("Failed socket authentication", "403");
        }
      },
    },
    schema,
    context: (data) => {
      const { ctx, connection } = data;
      return {
        user: authService.authenticate(ctx) || connection?.context.user,
        ctx,
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

  await connectDB().catch((err) =>
    console.error("Problem connecting to the database: ", err)
  );
  app.keys = [process.env.COOKIE_SECRET];

  app.use(logger());
  app.use(router.routes()).use(router.allowedMethods());

  const appServer = app.listen(PORT, () =>
    console.log(`Listening on port ${PORT}`)
  );
  server.installSubscriptionHandlers(appServer);
}

bootstrap();
