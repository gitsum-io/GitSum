function UserModel() {
    var db = require('../database/db.js');

    var model = this;

    model.schema = new db.schema({
        first_name: String,
        last_name: String,
        email: String,
        password: String,
        avatar: String
    });

    db.mongoose.model('User', model.schema);
    model.user = db.mongoose.model('User');
};

module.exports = new UserModel();
