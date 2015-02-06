var mongoose = require('mongoose');

// TODO: rename this to user (was using person as I had test data in my db)

module.exports = mongoose.model('Person', {
    name : {
    	type : String, 
    	default : ''
    }
});