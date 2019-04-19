'use strict'

const Model = use('Model')

class Meetup extends Model {
  users () {
    return this.belongsToMany('App/Models/User').pivotTable('user_meetup')
  }
}

module.exports = Meetup
