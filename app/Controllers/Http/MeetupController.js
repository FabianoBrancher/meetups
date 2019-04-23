'use strict'

const Database = use('Database')

const Meetup = use('App/Models/Meetup')
// const UserMeetup = use('App/Models/UserMeetup')

class MeetupController {
  async index ({ request }) {
    const { page } = request.get()
    const meetups = Meetup.query()
      .with('users')
      .paginate(page)

    return meetups
  }

  async store ({ request, auth }) {
    const { users, ...data } = request.all()

    const trx = await Database.beginTransaction()

    const meetup = await Meetup.create({ ...data, user_id: auth.user.id }, trx)

    // if (preferences && preferences.length > 0) {
    //   await meetup.preferences().attach(preferences)
    //   meetup.preferences = await meetup.preferences().fetch()
    // }

    await trx.commit()

    return meetup
  }

  async show ({ params, request, response, view }) {}

  async update ({ params, request, response }) {}

  async destroy ({ params, request, response }) {}
}

module.exports = MeetupController
