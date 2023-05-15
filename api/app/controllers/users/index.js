const { createUser } = require('./createUser')
const { deleteUser } = require('./deleteUser')
const { getUser } = require('./getUser')
const { getAllUsers } = require('./getAllUsers')
const { getUsers } = require('./getUsers')
const { updateUser } = require('./updateUser')

module.exports = {
  createUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUsers,
  updateUser
}
