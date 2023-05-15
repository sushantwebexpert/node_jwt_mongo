/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const setUserInfo = (req = {}) => {
  return new Promise((resolve) => {
    let user = {
      _id: req._id,
      name: req.name,
      email: req.email,
      username: req.username,
      role: req.role,
      time: req.time,
      services: req.services,
      verified: req.verified
    }
    // Adds verification for testing purposes
    if (process.env.NODE_ENV !== 'production') {
      user = {
        ...user,
        verification: req.verification
      }
    }
    resolve(user)
  })
}

module.exports = { setUserInfo }
