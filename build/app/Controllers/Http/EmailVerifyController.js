"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const luxon_1 = require("luxon");
class EmailVerifyController {
    async index({ response, auth }) {
        auth.user?.sendVerificationEmail();
        return response.redirect('/welcome');
    }
    async confirm({ response, params, request }) {
        if (request.hasValidSignature()) {
            const user = await User_1.default.findByOrFail('email', params.email);
            user.email_verified_at = luxon_1.DateTime.local();
            await user.save();
            return response.redirect(`/${user.username}`);
        }
        return 'Signature is missing or URL was tampered.';
    }
}
exports.default = EmailVerifyController;
//# sourceMappingURL=EmailVerifyController.js.map