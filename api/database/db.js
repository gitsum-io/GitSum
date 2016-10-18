function DB() {
    var db = this;

    // Load Environment information
    var environment = require('../environment.json');

    // Require Mongoose
    var mongoose = require('mongoose/');

    // Connect Database
    db.connection = mongoose.connect(environment.credentials.mongodb.uri)
    db.schema = mongoose.Schema;

    // Expose mongoose
    db.mongoose = mongoose;
};

module.exports = new DB();
