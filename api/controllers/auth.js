function AuthController() {
    var auth = this,
        user = require('../models/user'),
        jwt = require('jsonwebtoken');

    auth.authenticate = function(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;

        // Get current access token from user
        var query = user.data.findOne({email: email, password: password });

        query.exec(function(err, user) {
            if (err) {
                res.send(400, JSON.stringify(err));
            }

            var profile = {
                email: user.email,
                id: user._id
            };

            // TODO move app secret into config
            var token = jwt.sign(profile, 'appSecret1273hsdjfkshdkjf', {
                expiresIn: 1440
            });

            res.send(200, token);
            return next();
        });
    };
};

module.exports = new AuthController();
