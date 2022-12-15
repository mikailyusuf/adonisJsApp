"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/', 'HomeController.index').middleware('auth');
Route_1.default.on('/signup').render('auth/signup').middleware('guest');
Route_1.default.on('/login').render('auth/login').middleware('guest');
Route_1.default.post('/signup', 'AuthController.signup');
Route_1.default.post('/login', 'AuthController.login');
Route_1.default.post('/logout', 'AuthController.logout');
Route_1.default.post('/verify-email', 'EmailVerifyController.index').middleware('auth');
Route_1.default.get('/verify-email/:email', 'EmailVerifyController.confirm').as('verifyEmail');
Route_1.default.get('/accounts/edit', 'ProfilesController.edit').middleware('auth');
Route_1.default.post('/accounts/edit', 'ProfilesController.update').middleware('auth');
Route_1.default.post('/follow/:userId', 'FollowsController.store').middleware('auth');
Route_1.default.delete('/follow/:userId', 'FollowsController.destroy').middleware('auth');
Route_1.default.get('/posts/create', 'PostsController.create').middleware('auth');
Route_1.default.post('/posts/create', 'PostsController.store').middleware('auth');
Route_1.default.get('/:username', 'ProfilesController.index').middleware('auth');
//# sourceMappingURL=routes.js.map