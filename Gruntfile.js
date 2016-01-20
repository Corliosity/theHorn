module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		config: grunt.file.readJSON('grunt_config.json'),

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
					'<%= config.source_files.javascript %>/startup.min.js' : ['source/tmp/concat/startup.js'],
					'<%= config.source_files.javascript %>/core.min.js' : ['source/tmp/concat/core.js'],
					'<%= config.source_files.javascript %>/jsapp-core.min.js' : ['source/tmp/concat/jsapp-core.js']
				}
			},
			prod : {
				files : {
					'<%= config.dest_files.javascript %>/startup.min.js' : ['source/tmp/concat/startup.js'],
					'<%= config.dest_files.javascript %>/core.min.js' : ['source/tmp/concat/core.js'],
					'<%= config.dest_files.javascript %>/jsapp-core.min.js' : ['source/tmp/concat/jsapp-core.js']
				}
			}
		},

		copy : {
			prod : {
				files : [
				{
					expand: true,
					src : '**/*.jade',
					cwd : 'source/',
					dest: 'dist/source/',
					ext: '.jade'
				},
				{
					expand: true,
					cwd: 'source/assets/',
					src: ['fonts/**/*', 'media/**/*'],
					dest: 'dist/source/assets/'
				},
				{
					expand: true,
					cwd: 'source/assets/js/app/',
					src: 'json/**/*',
					dest: 'dist/source/assets/js/app/'
				},
				{
					expand: true,
					src: ['server.js', 'package.json', 'Gruntfile.js', 'routing/**/*.js', 'api/**/*.js', 'db/**/*.js', 'bin/**'],
					dest: 'dist/'
				}]
			}
		},

		concat: {},

		compress: {
			prod : {
				options: {
					archive : './dist.zip',
					mode: 'zip'
				},
				files : [{
					src : ['dist/api/**/*.js', 'dist/bin/www', 'dist/db/**/*.js', 'dist/routing/**/*.js', 'dist/source/**', 'dist/Gruntfile.js', 'dist/package.json', 'dist/server.js']
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
								return 'script(type="text/javascript", src="assets/js/concat/startup.min.js")';
							}
						},
						{
							match : /<!--begin core-->[^<>]*<!--core end-->/gi,
							replacement : function() {
								return 'script(type="text/javascript", src="assets/js/concat/core.min.js")';
							}		
						},
						{
							match : /<!--begin jsapp-->[^<>]*<!--jsapp end-->/gi,
							replacement : function() {
								return 'script(type="text/javascript", src="assets/js/concat/jsapp-core.min.js")';
							}
						},
						{
							match : /<!--cssmain begin-->[^<>]*<!--cssmain end-->/gi,
							replacement : function() {
								return 'link(rel="stylesheet", href="assets/css/main.min.css")';
							}
						}
					]
				},
				files : [{
					expand : true,
					cwd : 'dist/source/',
					src: ['templates/**/*.jade'],
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
			beforeProd : {
				src : ['dist/', 'dist.zip']
			},
			prod : {
				src : ['source/tmp/', 'source/assets/js/concat/']
			},
			dev : {
				src : ['source/tmp/']
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
		'clean:beforeProd',
		'jshint',
		'getFilesForConcat',
		'concat',
		'uglify:prod',
		'compass:prod',
		'cssmin:prod',
		'copy',
		'replace:prod',
		'compress:prod',
		'clean:prod'
		]);

	grunt.registerTask('testing',[
		'jshint',
		'getFilesForConcat',
		'concat',
		'uglify:dev',
		'clean:dev'
		]);

	grunt.registerTask('getFilesForConcat', 'Dynamically Grab Files for Concat', function() {
			// Return configs
			var prefix = '/assets/js/';
			var targetPath = 'source/assets/js';

			var parseIncludesFileAndCreateGroups = function(includeFile) {
				var data = parseData(grunt.file.read('source/templates/concat/' + includeFile));

				return data;
			};

			var parseData = function(data) {

				var cleanData = data.replace(/(\n|\r)/g, '');
				var hash = [];

				// Just match a script tag with the attribute build-into
				var matches = cleanData.match(/(script\(type=\'[^\'']*\',\ssrc=\'[^\'']*'\))/g);

				if (matches) {
					for (var i = 0; i < matches.length; i++) {
						
						var scriptTag = matches[i];
						
						var srcMatch = scriptTag.match(/src=\'([^\'']*)\'/);

						if (!srcMatch)
							continue;
						
						var src = srcMatch[1];
						var offset = src.indexOf(prefix) + prefix.length;
						
						hash.push(targetPath + '/' + src.substring(offset));

					}
				}
				return hash;
			};

			grunt.file.expand('source/templates/concat/*').forEach(function(includeFileWithPath) {

				var concat = grunt.config.get('concat') || {};

				var tmp = includeFileWithPath.split('concat/');
				var jadeFile = tmp[1];
				tmp = jadeFile.split('.jade');
				var fileName = tmp[0];

				var concatList = parseIncludesFileAndCreateGroups(jadeFile);
				
				concat[fileName] = {
					src: [concatList],
					dest: 'source/tmp/concat/' + fileName + '.js'
				};

				grunt.config.set('concat', concat);

			});

		});

};