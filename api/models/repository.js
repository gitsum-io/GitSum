function RepositoryModel() {
    var db = require('../database/db.js');

    var model = this;

    // Create schema
    var schema = new db.schema({
        name: {
            type: String,
            required: '{PATH} is required!'
        },
        uri: {
            type: String,
            required: '{PATH} is required!'
        },
        uri_type: {
            type: String,
            required: '{PATH} is required!'
        },
        type: {
            type: String,
            required: '{PATH} is required!'
        },
    });

    // Initialise model and expose
    model.data = db.connection.model('Repository', schema);
};

module.exports = new RepositoryModel();
