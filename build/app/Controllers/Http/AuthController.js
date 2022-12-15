"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class SignupController {
    async signup({ request, response }) {
        const req = await request.validate({
            schema: Validator_1.schema.create({
                name: Validator_1.schema.string(),
                email: Validator_1.schema.string({}, [
                    Validator_1.rules.email(),
                ]),
                username: Validator_1.schema.string(),
                password: Validator_1.schema.string({}),
            }), messages: {
                'name.required': "Name is required to sign up",
                'email.required': "Email is required to sign up",
                'password.required': "Password is required to Sign up",
                'username.required': "Username is required to Sign up"
            }
        });
        const user = new User_1.default();
        user.email = req.email;
        user.name = req.name;
        user.password = req.password;
        user.username = req.username;
        await user.save();
        user.sendVerificationEmail();
        return response.redirect('/profile');
    }
    async login({ auth, request, response }) {
        const req = await request.validate({
            schema: Validator_1.schema.create({
                email: Validator_1.schema.string({}, [
                    Validator_1.rules.email()
                ]),
                password: Validator_1.schema.string({}, [
                    Validator_1.rules.minLength(8)
                ])
            }),
            messages: {
                'email.required': 'Email field is required',
                'password.required': 'Password filed is required',
                'password.minLenght': 'Password must be at least 8 characters'
            }
        });
        const email = req.email;
        const password = req.password;
        try {
            const user = await auth.use('web').attempt(email, password);
            return response.redirect(`/${user.username}`);
        }
        catch {
            return response.badRequest('Invalid credentials');
        }
    }
    async logout({ response, auth }) {
        await auth.logout();
        response.redirect('/welcome');
    }
}
exports.default = SignupController;
//# sourceMappingURL=AuthController.js.map