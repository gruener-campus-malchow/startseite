module.exports = function(grunt) {
	const sass = require('node-sass');
	
	grunt.initConfig({
		sass: {
			options: {
				implementation: sass,
			},
			dev: {
				options: {
					sourceMap: true,
				},
				files: [{
					src: 'src/scss/index.scss',
					dest: 'index.css',
				}],
			},
			build: {
				options: {
					outputStyle: 'compressed',
				},
				files: [{
					src: 'src/scss/index.scss',
					dest: 'index.css',
				}],
			}
		},
		
		uglify: {
			js: {
				files: {
					'index.js': ['src/js/*.js'],
				},
			},
		},
		
		watch: {
			js: {
				files: ['src/**/*.js'],
				tasks: ['uglify'],
			},
			css: {
				files: ['src/**/*.scss'],
				tasks: ['sass:dev'],
			},
		},
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask('build', ['uglify', 'sass:build']);
};
