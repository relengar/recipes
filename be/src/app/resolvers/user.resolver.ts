import { UserInterface } from "../models/user.model";
import { ApolloError } from "apollo-server-koa";
import * as _ from 'lodash'

export default {
    Query: {
      user: async (parent, { id }, { models: { userModel }, user }) => {
        return await userModel.findById({ _id: id }).populate('friends', ['name', 'id']).exec();
      },
      currentUser: async (parent, data, { user }) => user,
      users: async (parent, params, { models: { userModel }, user }) => {
        const users = await userModel.find().populate('friends', ['name', 'id']);
        return user ? users.filter(({id}) => id !== user.id) : users;
      },
      myConnections: async (parent, data, { models: { userModel }, user }) => {
        const me = await userModel.findById(user?.id).populate('friends', ['name', 'id'])
        return me?.friends ?? []
      }
    },
    Mutation: {
      createUser: async (parent, userData, { models: { userModel }, authService, ctx }, info) => {
        // const user: UserInterface = await userModsel.create({ name, password });
        return await authService.register(ctx, userData);
      },
      logIn: async (parent, { name, password, profilePicUrl }, { authService, ctx }, info) => {
        return await authService.logIn(ctx, name, password);
      },
      logOut: (parent, data, { authService, ctx }) => {
        return authService.logOut(ctx);
      },
      addFriend: async (parent, { userId }, { user, models: { userModel } }) => {
        if(userId === user.id) {
          throw new ApolloError('Can\'t connect to your self', '400');
        }
        const [ me, friend ] = await Promise.all([ userModel.findById(user?.id), userModel.findById(userId) ]);
        const exists = me.friends.find((id: string) => id.toString() === userId.toString());

        let error: ApolloError;
        error = (!user || !me) && new ApolloError('Unauthorized', '403');
        error = !friend && new ApolloError(`No user found with id ${userId}`, '400');
        error = exists && new ApolloError(`Already connected to user ${userId}`, '400');
        if (error) {
          throw error;
        }

        me.friends = [ ...me.friends, friend ];

        await me.save();
        return true;
      },
      removeFriend: async (parent, { userId }, { user, models: { userModel } }) => {
        const [ me, friend ] = await Promise.all([ userModel.findById(user?.id), userModel.findById(userId) ]);

        let error: ApolloError;
        error = (!user || !me) && new ApolloError('Unauthorized', '403');
        error = !friend && new ApolloError(`No user found with id ${userId}`, '400');
        if (error) {
          throw error;
        }

        me.friends = me.friends.filter((friend: string) => friend.toString() !== userId.toString());
        await me.save()
        return true;
      },
      // toggleLikeRecipe: async (parent, { recipeId }, { user, models: { userModel } }) => {
      //   const myDbRecord: UserInterface = user && await userModel.findById(user?.id)
      //   if (!user?.id || !myDbRecord) {
      //     throw new ApolloError(`No user found with this id`, '403');
      //   }
        
      //   const isFavorite = myDbRecord.favoriteRecipes.some(id => id === recipeId)
      //   isFavorite ? _.remove(myDbRecord.favoriteRecipes, id => id === recipeId) : myDbRecord.favoriteRecipes.push(recipeId)

      //   await myDbRecord.save()
      //   return myDbRecord.favoriteRecipes;
      // }
    },
    // User: {
    //   posts: async ({ id }, args, { models: { postModel } }, info) => {
    //     const posts = await postModel.find({ author: id }).exec();
    //     return posts;
    //   },
    // },
  };
  