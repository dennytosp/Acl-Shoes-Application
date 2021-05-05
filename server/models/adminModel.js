const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const adminSchema = new Schema({
    id: { type: ObjectId },
    userad: { type: String, required: true, unique: true },
    passad: { type: String, required: true, },
})

module.exports = mongoose.model('Admin', 
adminSchema)