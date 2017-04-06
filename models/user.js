var mongoose = require("mongoose"),
    bcrypt  = require("bcrypt-nodejs");
    
// user schema
var userSchema = new mongoose.Schema({
    local           : {         // credentials that will be used for signing up and logging in
        email       : String,
        password    : String
    },
    
    firstName       : String, // First and Last Name
    lastName        : String,
    
    organization    : String,  // used to check whether the user is affiliated w/ a charity or is a programmer
    
    programmer      : {        // programmer info
        rating      : Number,
        description : {type: String, default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat facilisis sollicitudin. Quisque a sodales tortor. Donec libero augue, consequat vel bibendum quis, lacinia in mi. Donec vel sagittis sem. In consequat sem molestie metus dapibus, nec maximus urna cursus. Ut volutpat ornare sollicitudin. In facilisis molestie lacus ut ultrices. Praesent tincidunt neque in felis volutpat eleifend. Donec maximus tortor ut arcu imperdiet cursus. Phasellus lacinia, dui ut laoreet vestibulum, nunc nibh imperdiet lorem, sit amet mollis nulla nibh sed tortor."},
    },
    
    charity         : {        // charity info
        name        : String,
        description : {type: String, default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat facilisis sollicitudin. Quisque a sodales tortor. Donec libero augue, consequat vel bibendum quis, lacinia in mi. Donec vel sagittis sem. In consequat sem molestie metus dapibus, nec maximus urna cursus. Ut volutpat ornare sollicitudin. In facilisis molestie lacus ut ultrices. Praesent tincidunt neque in felis volutpat eleifend. Donec maximus tortor ut arcu imperdiet cursus. Phasellus lacinia, dui ut laoreet vestibulum, nunc nibh imperdiet lorem, sit amet mollis nulla nibh sed tortor."},
    }
});

// generates a hash
userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checks if password is valid
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};

// export model
module.exports = mongoose.model("User", userSchema);