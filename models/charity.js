var mongoose = require("mongoose");

// charity schema
var charitySchema = new mongoose.Schema({
    name        : String,
    description : {type: String, default: "description."},
});

// export model
module.exports = mongoose.model("Charity", charitySchema);