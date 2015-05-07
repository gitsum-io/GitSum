module.exports = function(grunt) {

	grunt.initConfig({
		
		// Read package file
		pkg: grunt.file.readJSON('package.json'),

		// -------------------------------------------------- Tasks

		// ------------------------- CSS tasks

		// Convert sass files to css
		sass: {
			build: {
				options: {
					loadPath: require('node-bourbon').includePaths,
					style: 'expanded'
				},
				files: {
					'<%= pkg.stylesDirectory %>/global.css': '<%= pkg.stylesDirectory %>/global.scss'
				}
			}
		},

		// Minify css files
		cssmin: {
			build: {
				files: {
					'<%= pkg.stylesDirectory %>/global.min.css': '<%= pkg.stylesDirectory %>/global.css'
				}
			}
		},

		// ------------------------- Javascript tasks

		// Check all js files for errors
		jshint: {
			all: [
				'<%= pkg.scriptsDirectory %>/controllers/*.js',
				'<%= pkg.scriptsDirectory %>/services/*.js',
				'<%= pkg.scriptsDirectory %>/app-routes.js',
				'<%= pkg.scriptsDirectory %>/app.js'
			]
		},

		// Minify all js files into app.min.js
		uglify: {
			build: {
				files: {
					'<%= pkg.scriptsDirectory %>/app.min.js': [
						'<%= pkg.scriptsDirectory %>/controllers/*.js',
						'<%= pkg.scriptsDirectory %>/services/*.js',
						'<%= pkg.scriptsDirectory %>/app-routes.js',
						'<%= pkg.scriptsDirectory %>/app.js'
					]
				}
			}
		},

		// ------------------------- Image tasks

		// SVG build system
		svgstore: {
			options: {
				formatting: {
					indent_size: 4
				}
			},
			default: {
				files: {
					'<%= pkg.imagesDirectory %>/icons.svg': ['<%= pkg.imagesDirectory %>/*.svg'],
				}
			}
		},

		// ------------------------- General tasks

		// Compile a list of all TODOs in project
		todo: {
			options: {
				marks: [
					{
						name: "TODO",
						pattern: /TODO/,
						color: "yellow"
					}
				],
				file: "tasks.todo",
			},
			src: [
				'server.js',
				'public/*',
				'app/**/*'
			]
		},

		// -------------------------------------------------- Operations 

		// Watch node server for changes
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					nodeArgs: ['--debug'],
					env: {
						PORT: '8080',
						NODE_ENV : 'development'
					}
				}
			}
		},
		
		// Watch files for changes
		watch: {
			options: {
				livereload: true
			},
			css: {
				files: [
					'<%= pkg.stylesDirectory %>/*.scss'
				],
				tasks: ['sass', 'cssmin']
			},
			js: {
				files: [
					'<%= pkg.scriptsDirectory %>/controllers/*.js',
					'<%= pkg.scriptsDirectory %>/services/*.js',
					'<%= pkg.scriptsDirectory %>/app-routes.js',
					'<%= pkg.scriptsDirectory %>/app.js'
				],
				tasks: ['jshint', 'uglify']
			},
			svg: {
				files: ['<%= pkg.imagesDirectory %>/*.svg'],
				tasks: ['svgstore']
			}
		},
		
		// Run watch and nodemon at the same time
		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			tasks: ['nodemon', 'watch']
		},
	});

	// Load modules
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-svgstore');
	grunt.loadNpmTasks('grunt-todo');

	// Register the nodemon task when we run grunt
	grunt.registerTask('default', ['sass', 'cssmin', 'jshint', 'uglify', 'concurrent', 'svgstore', 'todo']);  
};