module.exports = function(grunt) {

	grunt.initConfig({
		// Configure nodemon
		nodemon: {
			dev: {
				script: 'app/server.js'
			}
		}
	});

	// Load nodemon
	grunt.loadNpmTasks('grunt-nodemon');

	// Register the nodemon task when we run grunt
	grunt.registerTask('default', ['nodemon']);  
};