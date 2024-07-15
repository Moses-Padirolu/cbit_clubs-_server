const mongoose = require("mongoose")

const HackathonSchema = new mongoose.Schema({
    club: String,
    name: String,
    date: String,
    description: String,
    participants: Number,
})

const Hackathon = mongoose.model("hackathons",HackathonSchema)
module.exports = Hackathon