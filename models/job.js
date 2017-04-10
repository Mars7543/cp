var mongoose = require("mongoose");

// JOB MODEL
module.exports = mongoose.model("Job", new mongoose.Schema({
    description   : String,
    charityName   : String,
    applicants    : [
        {
            type  : mongoose.Schema.Types.ObjectId,
            ref   : "User"
        }
    ], 
    status        : {type: Number, default: 1}
}));