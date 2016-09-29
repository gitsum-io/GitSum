function RepositoryModel() {
    var db = require('../database/db.js');

    var repositorySchema = new db.schema({
        name: String,
        uri: String,
        uri_type: String,
        type: String
    });

    db.mongoose.model('Repository', repositorySchema);
    var repository = db.mongoose.model('Repository');
};

module.exports = new RepositoryModel();
