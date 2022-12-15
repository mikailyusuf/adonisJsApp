"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostFactory = exports.UserFactory = void 0;
const Factory_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Factory"));
const Post_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Post"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const luxon_1 = require("luxon");
exports.UserFactory = Factory_1.default
    .define(User_1.default, ({ faker }) => {
    return {
        name: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        details: faker.lorem.sentences(),
        avatar: faker.image.city(),
        email_verified_at: luxon_1.DateTime.local()
    };
}).relation('posts', () => exports.PostFactory)
    .build();
exports.PostFactory = Factory_1.default
    .define(Post_1.default, ({ faker }) => {
    return {
        caption: faker.lorem.paragraph(),
        image: faker.image.food()
    };
}).relation('user', () => exports.UserFactory)
    .build();
//# sourceMappingURL=index.js.map