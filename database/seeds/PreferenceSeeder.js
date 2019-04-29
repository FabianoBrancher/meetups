'use strict'

/*
|--------------------------------------------------------------------------
| PreferenceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Preference = use('App/Models/Preference')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class PreferenceSeeder {
  async run () {
    const preferences = [
      {
        "description":"Front-end"
      },
      {
        "description": "Back-end"
      },
      {
        "description": "Mobile"
      },
      {
        "description": "DevOps"
      },
      {
        "description": "Gestão"
      },
      {
        "description": "Marketing"
      }
    ]
    await Preference.createMany(preferences);
  }
}

module.exports = PreferenceSeeder
