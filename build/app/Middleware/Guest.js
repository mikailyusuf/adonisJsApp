"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Guest {
    async handle({ auth, response }, next) {
        if (auth.isAuthenticated) {
            return response.redirect('/profile');
        }
        await next();
    }
}
exports.default = Guest;
//# sourceMappingURL=Guest.js.map