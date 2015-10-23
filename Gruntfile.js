module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			files : ['Gruntfile.js', 'server.js', 'routing/**/*.js', 'source/assets/js/app/**/*.js', 'package.json'],
			options : {
				globals : {
					jQuery : true
				}
			}
		},

		uglify : {
			dev : {
				files : {
					'source/assets/js/concat/startup.min.js' : [
						'source/assets/js/lib/jquery/2.1.4/jquery.js',
						'source/assets/js/lib/modernizr/modernizr.js',
						'source/assets/js/lib/fastclick/fastclick.js',
						'source/assets/js/lib/jquery.cookie/jquery.cookie.js',
						'source/assets/js/lib/underscore/1.8.3/underscore.js'
					],
					'source/assets/js/concat/core.min.js' : [
						'source/assets/js/lib/foundation/foundation.min.js',
						'source/assets/js/lib/foundation/foundation5/foundation.topbar.js',
						'source/assets/js/lib/backbone/1.2.3/backbone.js',
						'source/assets/js/lib/backbone.marionette/2.4.3/backbone.marionette.min.js',
						'source/assets/js/lib/backbone/backbone.modelbinder/1.1.0/backbone.modelbinder.js'
					],
					'source/assets/js/concat/jsapp-core.min.js' : [
						'source/assets/js/app/app-config.js',
						'source/assets/js/app/views/mainView.js',
						'source/assets/js/app/views/titleView.js',
						'source/assets/js/app/views/homeView.js',
						'source/assets/js/app/views/player.js',
						'source/assets/js/app/views/episodeView.js',
						'source/assets/js/app/views/episodesList.js',
						'source/assets/js/app/models/applicationState.js',
						'source/assets/js/app/models/episode.js',
						'source/assets/js/app/collections/episodes.js',
						'source/assets/js/app/controller.js',
						'source/assets/js/app/router.js',
						'source/assets/js/app/app.js'
					]
				}
			},
			prod : {
				files : {
					'dist/source/assets/js/concat/startup.min.js' : [
						'source/assets/js/lib/jquery/2.1.4/jquery.js',
						'source/assets/js/lib/modernizr/modernizr.js',
						'source/assets/js/lib/fastclick/fastclick.js',
						'source/assets/js/lib/jquery.cookie/jquery.cookie.js',
						'source/assets/js/lib/underscore/1.8.3/underscore.js'
					],
					'dist/source/assets/js/concat/core.min.js' : [
						'source/assets/js/lib/foundation/foundation.min.js',
						'source/assets/js/lib/foundation/foundation5/foundation.topbar.js',
						'source/assets/js/lib/backbone/1.2.3/backbone.js',
						'source/assets/js/lib/backbone.marionette/2.4.3/backbone.marionette.min.js',
						'source/assets/js/lib/backbone/backbone.modelbinder/1.1.0/backbone.modelbinder.js'
					],
					'dist/source/assets/js/concat/jsapp-core.min.js' : [
						'source/assets/js/app/app-config.js',
						'source/assets/js/app/views/mainView.js',
						'source/assets/js/app/views/titleView.js',
						'source/assets/js/app/views/homeView.js',
						'source/assets/js/app/views/player.js',
						'source/assets/js/app/views/episodeView.js',
						'source/assets/js/app/views/episodesList.js',
						'source/assets/js/app/models/applicationState.js',
						'source/assets/js/app/models/episode.js',
						'source/assets/js/app/collections/episodes.js',
						'source/assets/js/app/controller.js',
						'source/assets/js/app/router.js',
						'source/assets/js/app/app.js'
					]
				}
			}
		},

		copy : {
			prod : {
				files : [{
					expand: true,
					src : '**/*.jade',
					cwd : 'source/',
					dest: 'dist/source/',
					ext: '.jade'
				},
				{
					expand: true,
					cwd: 'source/',
					src: ['fonts/**', 'media/**'],
					dest: 'dist/source/assets/'
				},
				{
					expand: true,
					src: ['server.js', 'package.json', 'Gruntfile.js', 'routing/**/*.js'],
					dest: 'dist/'
				}]
			}
		},

		compress: {
			prod : {
				options: {
					archive : './dist.zip',
					mode: 'zip'
				},
				files : [{
					src : './dist/**'
				}]
			}
		},

		compass: {                  // Task
			prod: {                   // Target
				options: {              // Target options
					sassDir: 'source/assets/sass',
					cssDir: 'source/assets/css',
					environment: 'production',
					output: 'compact'
				}
			},
			dev: {                    // Another target
				options: {
					sassDir: 'source/assets/sass',
					cssDir: 'source/assets/css'
				}
			}
		},

		cssmin : {
			prod : {
				files : {
					'dist/source/assets/css/main.min.css' : ['source/assets/css/**/*.css']
				}
			},
			dev : {
				files : {
					'source/assets/css/main.min.css' : ['source/assets/css/**/*.css']
				}
			}
		},

		replace : {
			prod : {
				options : {
					patterns :  [ 
						{
							match : /<!--begin startup-->[^<>]*<!--startup end-->/gi,
							replacement : function() {
								return 'script(type="text/javascript", src="source/assets/js/concat/startup.min.js")';
							}
						},
						{
							match : /<!--begin core-->[^<>]*<!--core end-->/gi,
							replacement : function() {
								return 'script(type="text/javascript", src="source/assets/js/concat/core.min.js")';
							}		
						},
						{
							match : /<!--begin jsapp-->[^<>]*<!--jsapp end-->/gi,
							replacement : function() {
								return 'script(type="text/javascript", src="source/assets/js/concat/jsapp.min.js")';
							}
						},
						{
							match : /<!--cssmain begin-->[^<>]*<!--cssmain end-->/gi,
							replacement : function() {
								return 'link(rel="stylesheet", src="source/assets/css/main.min.css")';
							}
						}
					]
				},
				files : [{
					expand : true,
					cwd : 'dist/source/',
					src: ['templates/*.jade'],
					dest: 'dist/source/'					
				}]
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

		clean : {
			prod : {
				src : ['dist/', 'dist.zip']
			}
		},

		watch : {
			jshint : {
				files : ['<%= jshint.files %>'],
				tasks : ['jshint', 'uglify:dev', 'preprocess:dev']
			},
			buildcss : {
				files : ['source/**/*.scss'],
				tasks : ['compass:dev', 'preprocess:dev']
			}
		}
	});

	grunt.registerTask('default', []);

	grunt.registerTask('buildsass', ['compass:dev']);

	grunt.registerTask('buildJS', ['uglify:dev']);

	grunt.registerTask('cleanJS', ['jshint']);

	grunt.registerTask('copyJade', ['copy']);

	grunt.registerTask('build',
		[
		'clean:prod',
		'jshint',
		'compass:prod',
		'cssmin',
		'uglify:prod',
		'copy',
		'replace:prod',
		'compress:prod'
		]);

};