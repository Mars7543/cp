var mongoose = require("mongoose");

// charity schema
var charitySchema = new mongoose.Schema({
    name        : String,
    description : {type: String, default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate, turpis sed consectetur hendrerit, libero ipsum venenatis ipsum, hendrerit semper neque augue vel arcu. Etiam auctor, urna vitae fermentum interdum, risus leo porta augue, vitae suscipit urna magna elementum lacus. Suspendisse rhoncus, urna quis tempus vehicula, nulla purus accumsan neque, fringilla placerat ligula purus ut est. Vestibulum malesuada libero ac auctor mollis. Vivamus finibus egestas odio sit amet facilisis. Phasellus nec lorem in ex tincidunt vulputate. Praesent ut tempus mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus vulputate enim ac orci venenatis iaculis."},
});

// export model
module.exports = mongoose.model("Charity", charitySchema);