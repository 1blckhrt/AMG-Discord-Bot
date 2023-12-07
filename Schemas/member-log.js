const { model, Schema } = require("mongoose");

const memberLog = new Schema({
    Guild: String,
    logChannel: String,
    memberRole: String,
    botRole: String
});

module.exports = model("memberLog", memberLog)