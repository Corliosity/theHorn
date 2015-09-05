module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			files : ['Gruntfile.js', 'server.js', 'routing/**/*.js', 'source/_assets/js/**/*.js'],
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
			jade : {
				files : ['source/**/*.jade'],
				tasks : ['jade']
			}
		}
	});

};