var mongoose = require("mongoose");

var programmerSchema = new mongoose.Schema({
    rating      : {type: Number, default: 3},
    description : {type: String, default: "description."}, 
});

module.exports = mongoose.model("Programmer", programmerSchema);