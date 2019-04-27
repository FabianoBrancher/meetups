'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')

Route.get('/files/:id', 'FileController.show')
Route.post('/files', 'FileController.store')

Route.get('meetups', 'MeetupController.index')
Route.get('/meetups/:id', 'MeetupController.show')

Route.group(() => {
  Route.get('/users/:id', 'UserController.show')
  Route.put('/users/:id', 'UserController.update')
  
  Route.put('meetups/:id', 'MeetupController.update')
  Route.post('/meetups/:id/subscribe', 'SubscribeController.store')
  Route.delete('/meetups/:id', 'MeetupController.destroy')
  
  Route.post('meetups', 'MeetupController.store')
}).middleware(['auth'])
