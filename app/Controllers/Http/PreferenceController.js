'use strict'

const User = use('App/Models/User')
const Preference = use('App/Models/Preference')

class PreferenceController {

    async index () {
        const preferences = Preference.query().fetch()
        return preferences
    }

    async store ({ request, auth}) {
        const {preferences} = request.post()
        const user = await User.findOrFail(auth.user.id)

        console.log(preferences)

        user.preferences = await user.preferences().sync(preferences)
        user.save()

        return user
    }
}

module.exports = PreferenceController
