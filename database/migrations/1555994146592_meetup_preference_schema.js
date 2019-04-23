'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MeetupPreferenceSchema extends Schema {
  up () {
    this.create('meetup_preferences', (table) => {
      table.increments()
      table
        .integer('meetup_id')
        .unsigned()
        .references('id')
        .inTable('meetups')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');    
      table
        .integer('preference_id')
        .unsigned()
        .references('id')
        .inTable('preferences')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');      
      table.timestamps()
    })
  }

  down () {
    this.drop('meetup_preferences')
  }
}

module.exports = MeetupPreferenceSchema
