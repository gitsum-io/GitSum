function RepositoryModel() {
    var db = require('../database/db.js');

    var model = this;

    var schema = new db.schema({
        name: String,
        uri: String,
        uri_type: String,
        type: String
    });

    // Initialise model and expose
    model.data = db.connection.model('Repository', schema);
};

module.exports = new RepositoryModel();
