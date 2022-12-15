"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Post"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class PostsController {
    async create({ view }) {
        return view.render('posts/create');
    }
    async store({ response, request, auth }) {
        const req = await request.validate({
            schema: Validator_1.schema.create({
                caption: Validator_1.schema.string({}),
                image: Validator_1.schema.file({
                    size: '4mb',
                    extnames: ['jpg', 'png', 'jpeg']
                })
            }),
            messages: {
                "caption.required": "Caption is required",
                "image.required": "Image is required",
            }
        });
        const post = new Post_1.default();
        const imageName = new Date().getTime().toString() + '.' + req.image.extname;
        await req.image.move(Application_1.default.publicPath('images'), {
            name: imageName
        });
        post.image = `images/${imageName}`;
        post.caption = req.caption;
        post.userId = auth.user.id;
        await post.save();
        return response.redirect(`/${auth.user.username}`);
    }
}
exports.default = PostsController;
//# sourceMappingURL=PostsController.js.map