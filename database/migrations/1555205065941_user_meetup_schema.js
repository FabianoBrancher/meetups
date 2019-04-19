'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserMeetupSchema extends Schema {
  up () {
    this.create('user_meetup', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('cascade')
      table
        .integer('meetup_id')
        .unsigned()
        .references('id')
        .inTable('meetups')
        .onDelete('cascade')

      table.timestamps()
    })
  }

  down () {
    this.drop('user_meetup')
  }
}

module.exports = UserMeetupSchema
