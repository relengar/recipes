"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router();
exports.router = router;
router.get('/', (ctx) => {
    ctx.body = 'The recipes api';
});
//# sourceMappingURL=router.js.map