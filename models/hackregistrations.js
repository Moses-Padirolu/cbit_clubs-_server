const mongoose = require("mongoose")

const HackathonRegistrionSchema = new mongoose.Schema({
    club: String,
    name: String,
    roll: String,
    year: String,
    branch: String,
})

const HackRegistors = mongoose.model("hackregistrations",HackathonRegistrionSchema)
module.exports = HackRegistors