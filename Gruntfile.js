module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({

    coffee: {
      compile: {
        files: grunt.file.expandMapping(['src/**/*.coffee'], 'js/', {
          rename: function(destBase, destPath) {
            return destBase + destPath.replace(/\.coffee$/, '.js').replace(/src\//, '');
          }
        }),
        options: {
          bare: true
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          mainConfigFile: 'js/backbone.gui.js',
          out: 'dist/backbone.gui.js',
          optimize: 'none',
          wrap: true
        }
      }
    },

    watch: {
      coffee: {
        files: 'src/**/*.coffee',
        tasks: ['coffee']
      }
    }

  });

  grunt.registerTask('default', ['coffee', 'requirejs', 'watch']);

};