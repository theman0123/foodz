module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "./frontend/styles/css/main.css": "./frontend/styles/less/main.less",
            "./frontend/styles/css/home.css": "./frontend/styles/less/home.less",
            "./frontend/styles/css/noteEntry.css": "./frontend/styles/less/noteEntry.less",
            "./frontend/styles/css/newNote.css": "./frontend/styles/less/newNote.less"// destination file and source file
        }
      }
    },
    watch: {
      styles: {
        files: [
            '/frontend/styles/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.registerTask('default', ['less', 'watch']);
};