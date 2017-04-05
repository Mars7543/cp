var mongoose = require("mongoose");

// JOB MODEL
var Job = mongoose.model("Job", new mongoose.Schema({
    title         : String,
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