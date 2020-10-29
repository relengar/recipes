import Router = require("koa-router");


const router = new Router();

router.get('/', (ctx) => {
    ctx.redirect('/graphql')
})

export {
    router,
};
