module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			files : ['Gruntfile.js', 'server.js', 'routing/**/*.js'],
			options : {
				globals : {
					jQuery : true
				}
			}
		},

		uglify : {

		},

		concat : {

		},

		compass: {                  // Task
			dist: {                   // Target
				options: {              // Target options
					sassDir: 'sass',
					cssDir: 'css',
					environment: 'production'
				}
			},
			dev: {                    // Another target
				options: {
					sassDir: 'source/assets/sass',
					cssDir: 'source/assets/css'
				}
			}
		},

		jade : {
			debug : {
				options : {
					pretty : true,
				},
				files : [{
					expand: true,
					cwd : 'source',
					src : '*.jade',
					dest : 'dist/templates',
					ext : '.html'
				}]
			}
		},

		watch : {
			jshint : {
				files : ['<%= jshint.files %>'],
				tasks : ['jshint']
			},
			buildcss : {
				files : ['source/**/*.scss'],
				tasks : ['compass:dev']
			}
		}
	});

	grunt.registerTask('default', []);

	grunt.registerTask('buildsass', ['compass:dev']);

};