var mongoose = require("mongoose");

// charity schema
var charitySchema = new mongoose.Schema({
    name        : String,
    description : {type: String, default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat facilisis sollicitudin. Quisque a sodales tortor. Donec libero augue, consequat vel bibendum quis, lacinia in mi. Donec vel sagittis sem. In consequat sem molestie metus dapibus, nec maximus urna cursus. Ut volutpat ornare sollicitudin. In facilisis molestie lacus ut ultrices. Praesent tincidunt neque in felis volutpat eleifend. Donec maximus tortor ut arcu imperdiet cursus. Phasellus lacinia, dui ut laoreet vestibulum, nunc nibh imperdiet lorem, sit amet mollis nulla nibh sed tortor."},
});

// export model
module.exports = mongoose.model("Charity", charitySchema);