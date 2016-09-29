function UserModel() {
    var db = require('../database/db.js');

    var userSchema = new db.schema({
        first_name: String,
        last_name: String,
        email: String,
        password: String,
        avatar: String
    });

    db.mongoose.model('User', userSchema);
    var user = db.mongoose.model('User');
};

module.exports = new UserModel();
