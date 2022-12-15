"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Following_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Following"));
class FollowsController {
    async store({ params, response, auth }) {
        const follow = new Following_1.default();
        follow.userId = auth.user.id;
        follow.followingId = params.userId;
        await follow.save();
        return response.redirect().back();
    }
    async destroy({ params, auth, response }) {
        const follow = Following_1.default.query().where('user_id', auth.user.id).where('following_id', params.userId);
        await follow.delete();
        return response.redirect().back();
    }
}
exports.default = FollowsController;
//# sourceMappingURL=FollowsController.js.map