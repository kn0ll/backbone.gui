module.exports = function(grunt) {

  grunt.initConfig({

    // `grunt watch` will recompile less on save
    watch: {
      files: ['less/**/*.less'],
      tasks: 'less'
    },

    // cleanup previous releases
    clean: ['dist/'],

    // jshint
    lint: {
      files: [
        'js/**/*.js'
      ]
    },

    // concat js and put in release dir
    concat: {
      dist: {
        dest: 'dist/backbone.gui.js',
        separator: ';',
        src: [
          'js/**/*.js'
        ]
      }
    },

    // minify the release file
    min: {
      'dist/backbone.gui.min.js': ['dist/backbone.gui.js']
    },

    // compile less
    less: {
      compile: {
        options: {
          paths: ['less']
        },
        files: {
          'dist/backbone.gui.css': 'less/component.less'
        }
      }
    },

    // minify compiled less file
    mincss: {
      'dist/backbone.gui.min.css': ['dist/backbone.gui.css']
    }

  });

  grunt.registerTask('release', [
    'clean',
    'concat',
    'min',
    'less',
    'mincss'
  ].join(' '));

};