function RepositoryModel() {
    var db = require('../database/db.js');

    var model = this;

    // Create schema
    var schema = new db.schema({
        name: {
            type: String,
            required: 'You must specify the Repo name.'
        },
        uri: {
            type: String,
            required: 'You must specify the Repo URI.'
        },
        uri_type: {
            type: String,
            required: 'URI type is required!'
        },
        type: {
            type: String,
            required: 'Repo type is required!'
        }
    },
    {
        timestamps: true
    });

    // Initialise model and expose
    model.data = db.connection.model('Repository', schema);
};

module.exports = new RepositoryModel();
