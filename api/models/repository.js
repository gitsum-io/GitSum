function RepositoryModel() {
    var db = require('../database/db.js');

    var model = this;

    model.schema = new db.schema({
        name: String,
        uri: String,
        uri_type: String,
        type: String
    });

    db.mongoose.model('Repository', model.schema);
    model.db = db.mongoose.model('Repository');
};

module.exports = new RepositoryModel();
