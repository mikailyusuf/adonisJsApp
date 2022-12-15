"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Post"));
class HomeController {
    async index({ view, auth, response }) {
        if (!auth.isAuthenticated) {
            return response.redirect('/login');
        }
        await auth.user?.load('followings');
        const followings = auth.user.followings.map(f => f.followingId);
        const userIds = [auth.user.id, ...followings ?? []];
        const posts = await Post_1.default.query().whereIn('user_id', userIds).preload('user').orderBy('created_at', 'desc');
        return view.render('welcome', { posts });
    }
}
exports.default = HomeController;
//# sourceMappingURL=HomeController.js.map