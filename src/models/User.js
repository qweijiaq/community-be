import mongoose from '../config/MongoDB'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: { type: String },
  password: { type: String }
})

const UserModel = mongoose.model('users', UserSchema)

export default UserModel
