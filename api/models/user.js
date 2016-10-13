function UserModel() {
    var db = require('../database/db.js'),
        validator = require('validator'),
        bcrypt = require('bcrypt'),
        SALT_WORK_FACTOR = 10;

    var model = this;

    // Create schema
    var schema = new db.schema({
        first_name: {
            type: String,
            required: 'At least give us your first name!'
        },
        last_name: {
            type: String
        },
        email: {
            type: String,
            unique: true,
            required: 'Email address is required!',
            validate: [ validator.isEmail, 'Invalid email supplied!' ]
        },
        password: {
            type: String,
            required: 'Password is required!'
        },
        avatar: {
            type: String
        }
    },
    {
        timestamps: true
    });

    // Inject middleware to hash the password once it's passed
    schema.pre('save', function(next) {
        var user = this;

        // Only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) return next();

        // Generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err);

            // Hash the password along with our new salt
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);

                // Override the cleartext password with the hashed one
                user.password = hash;
                next();
            });
        });
    });

    // Initialise model and expose
    model.data = db.connection.model('User', schema);
};

module.exports = new UserModel();
