// Response object
// TODO

function Response() {

    var response = this;

    response.message = '';

    if (response.message != '') {
        
    } else {
        res.send(500, '{"message": "Internal server error"}');
        console.log("Response message not provided!");
    }
}

module.exports = new RepositoryModel();
