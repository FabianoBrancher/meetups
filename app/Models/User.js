'use strict'

const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  meetups () {
    return this.belongsToMany('App/Models/Meetup').pivotTable('user_meetup')
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
