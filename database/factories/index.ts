import Factory from '@ioc:Adonis/Lucid/Factory'
import Post from 'App/Models/Post'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export const UserFactory = Factory
  .define(User, ({ faker }) => {
      return {
    name:faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    details: faker.lorem.sentences(),
    avatar: faker.image.city(),
    email_verified_at:DateTime.local()
    }
  }).relation('posts',() => PostFactory)
  .build()


  export const PostFactory = Factory
  .define(Post, ({ faker }) => {
      return {
        caption:faker.lorem.paragraph(),
        image: faker.image.food()
    }
  }).relation('user',() => UserFactory)
  .build()