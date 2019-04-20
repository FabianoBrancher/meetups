'use strict'

const Model = use('Model')

class Meetup extends Model {

  user () {
    return this.belongsTo('App/Model/User')
  }

  users () {
    return this
      .belongsToMany('App/Models/User')
      .pivotTable('user_meetup')
      .pivotModel('App/Models/UserMeetup')
  }
}

module.exports = Meetup
