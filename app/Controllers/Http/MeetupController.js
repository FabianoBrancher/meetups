'use strict'

const Env = use('Env')
const Database = use('Database')
const Meetup = use('App/Models/Meetup')

class MeetupController {
  async index ({ request }) {
    const { page } = request.get()
    const meetups = Meetup.query()
      .with('users', builder => builder.select('id', 'username','email'))
      .paginate(page)

    return meetups
  }

  async store ({ request, auth }) {
    let {
      title,
      description,
      image_url,
      location,
      date,
      preferences
    } = request.post()

    if (!image_url) {
      image_url = `${Env.get('APP_URL')}/files/1`
    }

    const meetup = await Meetup.create({
      title,
      description,
      image_url,
      location,
      date, 
      user_id: auth.user.id 
    })
   
    if (preferences && preferences.length > 0) {
      await meetup.preferences().attach(preferences)
      meetup.preferences = await meetup.preferences().fetch()
    }

    return meetup
  }

  async show ({ params, request, response, view }) {
    const meetup = await Meetup.findOrFail(params.id)

    meetup.users = await meetup.users().fetch()
    meetup.subscribers = await meetup.users().count()

    return meetup
  }

  async update ({ params, request, response, auth }) {
    const meetup = await Meetup.findOrFail(params.id)

    if (meetup.user_id !== auth.user.id) {
      return response.status(401).send({ error: { message: 'Você não é o dono desta Meetup.'}})
    }

    const {
      title,
      description,
      location,
      date,
      file_id,
      preferences
    } = request.post()

    await meetup.merge({title, description, location, date, file_id})
    await meetup.preferences().sync(preferences)
    await meetup.save()
    meetup.preferences = await meetup.preferences().fetch()

    return meetup
  }

  async destroy ({ params, response, auth }) {
    const meetup = await Meetup.findOrFail(params.id)

    if (meetup.user_id !== auth.user.id) {
      return response.status(401).send({ error: { message: 'Você não é o dono desta Meetup.'}})
    }

    await meetup.delete()

    return response.status(200).send({ success: { message: 'Meetup excluído.'}})
  }
}

module.exports = MeetupController
