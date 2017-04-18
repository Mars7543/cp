var mongoose = require("mongoose");

var programmerSchema = new mongoose.Schema({
    rating      : {type: Number, default: 3},
    appliedJobs : [
        {
            id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref : "Job"
            },
            
            description: String
        }
    ]
});

module.exports = mongoose.model("Programmer", programmerSchema);