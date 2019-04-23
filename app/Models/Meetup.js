'use strict'

const Model = use('Model')

class Meetup extends Model {

  file () {
    return this.belongsTo('App/Models/File')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  users () {
    return this
      .belongsToMany('App/Models/User')
      .pivotTable('user_meetups')
      .pivotModel('App/Models/UserMeetup')
  }

  preferences () {
    return this
      .belongsToMany('App/Models/Preference')
      .pivotTable('meetup_preferences')
      .pivotModel('App/Models/MeetupPreference')
  }

}

module.exports = Meetup
