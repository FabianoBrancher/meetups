'use strict'

const Meetup = use('App/Models/Meetup')

class SearchController {
    async filterByTitle({ request }) {
        const { title } = request.get()
        const { page } = request.get() || 1

        console.log('entrei aqui')
        console.log(title)
 
        const meetups = await Meetup.query()
            .where('title', 'like', `%${title}%`)
            .orderBy('created_at', 'desc')
            .paginate(page)
        return meetups
    }
}

module.exports = SearchController
