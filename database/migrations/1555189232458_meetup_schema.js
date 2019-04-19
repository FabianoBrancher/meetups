'use strict'

const Schema = use('Schema')

class MeetupSchema extends Schema {
  up () {
    this.create('meetups', table => {
      table.increments()
      table
        .integer('owner_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('cascade')
        .onUpdate('set null')
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.timestamp('date').notNullable()
      table.string('image').notNullable()
      table.string('location').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('meetups')
  }
}

module.exports = MeetupSchema
