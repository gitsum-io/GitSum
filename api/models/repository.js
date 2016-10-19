function RepositoryModel() {
    var db = require('../database/db.js');

    var model = this;

    // Create schema
    var schema = new db.schema({
        name: {
            type: String,
            required: 'You must specify the Repo name.'
        },
        owner: {
            type: String,
            required: 'You must specify the owner of the Repo.'
        },
        branch: {
            type: String
        }
    },
    {
        timestamps: true
    });

    // Initialise model and expose
    model.data = db.connection.model('Repository', schema);
};

module.exports = new RepositoryModel();
