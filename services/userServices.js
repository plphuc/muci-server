import User from "../models/userModel.js"


const createUser = async (userBody) => {
  return User.create(userBody)
}

export {
  createUser
}