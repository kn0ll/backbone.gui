module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

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
    }

  });

  grunt.registerTask('default', ['coffee', 'requirejs']);

};
