const mongoose = require("mongoose")

const ClubMembersSchema = new mongoose.Schema({
    club: String,
    name: String,
    roll: String,
    year: String,
    branch: String,
    contact: String,
    position: String,
    passcode: String,
})

const Members = mongoose.model("clubmembers",ClubMembersSchema)
module.exports = Members


	 		