'use strict'

const Meetup = use('App/Models/Meetup')
const User = use('App/Models/User')

class SubscribeController {

    async store ({params, response, auth}) {
        const meetup = await Meetup.findOrFail(params.id)

        const isRegistered = await Meetup
            .query()
            .where('id', params.id)
            .with('users')
            .whereHas('users', builder => builder.where('user_id', auth.user.id))
            .fetch()
        
        if (isRegistered.toJSON().length > 0) {
            return response.status(401).send({ error: { message: 'Você já está inscrito nesta Meetup.'}})
        }

        await meetup.users().attach(auth.user.id)
        await meetup.save()

        meetup.users = await meetup.users().fetch()

        return meetup
    }

    async destroy ({ params, response, auth }) {
        const meetup = await Meetup.findOrFail(params.id)

        const isRegistered = await Meetup
            .query()
            .where('id', params.id)
            .with('users')
            .whereHas('users', builder => builder.where('user_id', auth.user.id))
            .fetch()
    
        if (isRegistered.toJSON().length > 0) {
            
            await meetup.users().detach(auth.user.id)
            await meetup.save()

            return response.status(200).send({ success: { message: 'Você cancelou a sua inscrição neste meetup.'}})
        }

        return response.status(200).send({ error: { message: 'Você não está inscrito nesta Meetup.'}})
    }
}

module.exports = SubscribeController
