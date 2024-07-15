const mongoose = require("mongoose")

const RegistrationSchema = new mongoose.Schema({
    club: String,
    name: String,
    roll: String,
    year: String,
    branch: String,
    contact: String,
    position: String,
    passcode: String,
})

const Registration = mongoose.model("clubregistration",RegistrationSchema)
module.exports = Registration