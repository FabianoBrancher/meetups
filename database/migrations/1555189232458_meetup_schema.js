'use strict'

const Schema = use('Schema')

class MeetupSchema extends Schema {
  up () {
    this.create('meetups', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('SET NULL')
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.string('image_url').notNullable()
      table.string('location').notNullable()
      table.timestamp('date').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('meetups')
  }
}

module.exports = MeetupSchema
