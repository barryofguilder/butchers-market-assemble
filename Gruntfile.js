module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    site: grunt.file.readYAML('_config.yml'),

    clean: {
      options: {
        force: true
      },
      site: ['<%= site.dest %>/']
    },

    jshint: {
      all: ['Gruntfile.js']
    },

    assemble: {
      options: {
        flatten: true,
        assets: '<%= site.assets %>',
        site: '<%= site %>',
        data: ['<%= site.data %>'],
        partials: '<%= site.includes %>',
        layoutdir: '<%= site.layouts %>',
        layout: '<%= site.layout %>'
      },
      example: {
        files: {'<%= site.dest %>/': ['<%= site.templates %>/*.hbs']}
      }
    },

    copy: {
      favicon: {
        files: [
          {expand: true, src: ['favicon.ico', 'apple-touch-icon.png'], dest: 'dist'},
        ]
      }
    },

    watch: {
      site: {
        files: ['templates/**/*.hbs'],
        tasks: ['jshint', 'assemble']
      }
    }
  });

  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean', 'jshint', 'assemble', 'copy', 'watch:site']);
};
