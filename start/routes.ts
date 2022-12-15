/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index').middleware('auth')
// Route.on('/welcome').render('welcome')


Route.on('/signup').render('auth/signup').middleware('guest')
Route.on('/login').render('auth/login').middleware('guest')

Route.post('/signup', 'AuthController.signup')
Route.post('/login', 'AuthController.login')

Route.post('/logout', 'AuthController.logout')
Route.post('/verify-email', 'EmailVerifyController.index').middleware('auth')
Route.get('/verify-email/:email', 'EmailVerifyController.confirm').as('verifyEmail')


Route.get('/accounts/edit', 'ProfilesController.edit').middleware('auth')
Route.post('/accounts/edit', 'ProfilesController.update').middleware('auth')

Route.post('/follow/:userId', 'FollowsController.store').middleware('auth')
Route.delete('/follow/:userId','FollowsController.destroy').middleware('auth')


Route.get('/posts/create', 'PostsController.create').middleware('auth')
Route.post('/posts/create', 'PostsController.store').middleware('auth')

// Route.on('').middleware('auth')
Route.get('/:username','ProfilesController.index').middleware('auth')
