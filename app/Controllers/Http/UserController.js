'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  async update ({ params, request, response, auth }) {
    const user = await User.findOrFail(params.id)


    console.log(request.body)

    const data = {
      username,
      email,
      password,
      password_confirmation,
      preferences
    } = request.post()

    
    

  }
}

module.exports = UserController
