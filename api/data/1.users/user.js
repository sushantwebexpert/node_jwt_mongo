const faker = require('faker')
const ObjectID = require('mongodb').ObjectID

module.exports = [
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e995a'),
    name: 'Admin',
    email: 'admin@admin.com',
    username: 'customer123',
    password: '$2a$05$2KOSBnbb0r.0TmMrvefbluTOB735rF/KRZb4pmda4PdvU9iDvUB26',
    role: 'admin',
    time: 12,
    services: ['word_cloud_maker'],
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e995b'),
    name: 'Customer',
    email: 'customer@customer.com',
    username: 'customer456',
    password: '$2a$05$2KOSBnbb0r.0TmMrvefbluTOB735rF/KRZb4pmda4PdvU9iDvUB26',
    role: 'user',
    time: 48,
    services: ['word_cloud_maker'],
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
]
