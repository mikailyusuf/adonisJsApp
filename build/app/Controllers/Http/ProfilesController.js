"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
class ProfilesController {
    async index({ params, view, auth }) {
        const username = params.username;
        const user = await User_1.default.findBy('username', username);
        if (!user) {
            return view.render('errors.not-found');
        }
        await user.load('posts');
        await user.load('followings');
        await auth.user.load('followings');
        const followers = await user?.followers();
        return view.render('profile', { user, followers });
    }
    async edit({ view }) {
        return view.render('accounts/edit');
    }
    async update({ auth, request, response }) {
        const user = auth.user;
        const avatar = request.file('avatar');
        if (avatar) {
            const imageName = new Date().getTime().toString() + '.' + avatar.extname;
            await avatar.move(Application_1.default.publicPath('images'), {
                name: imageName
            });
            user.avatar = `images/${imageName}`;
        }
        user.details = request.input('details');
        await user?.save();
        return response.redirect(`/${user?.username}`);
    }
}
exports.default = ProfilesController;
//# sourceMappingURL=ProfilesController.js.map