'use strict'

const Database = use('Database')
const User = use('App/Models/User')

class UserController {
  async store ({ request }) {

    const trx = await Database.beginTransaction()

    const data = request.only(['username', 'email', 'password'], trx)

    const user = await User.create(data, trx)

    trx.commit()

    return user
  }

  async update ({ params, request, response, auth }) {

    const user = await User.findOrFail(params.id)

    if (user.id !== auth.user.id) {
      return response.status(403).send({ error: { message: 'Não tem permissão para fazer isso.'}})
    }

    const {
      username,
      password,
      password_confirmation,
      preferences
    } = request.post()

    if (password && password !== password_confirmation) {
      return response.status(401).send({ error: { message: 'A senha não coincide'}})
    } else {
      user.password = password
    }

    await user.merge({ username })
    await user.preferences().sync(preferences)
    await user.save()
    user.preferences = await user.preferences().fetch()

    return user
  }

  async show ({ request, params, response }) {
    const user = await User.findOrFail(params.id)
    user.preferences = await user.preferences().fetch()

    return user
  }

}

module.exports = UserController
