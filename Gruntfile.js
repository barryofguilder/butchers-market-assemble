module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    site: grunt.file.readYAML('_config.yml'),

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

    clean: {
      options: {
        force: true
      },
      site: ['<%= site.dest %>/']
    },

    copy: {
      favicon: {
        files: [
          {expand: true, src: ['favicon.ico', 'apple-touch-icon.png'], dest: 'dist'},
        ]
      }
    },

    jshint: {
      all: ['Gruntfile.js']
    },

    less: {
      development: {
        src: 'less/bm-styles.less',
        dest: '<%= site.assets %>/css/bm-styles.css'
      },
      production: {
        options: {
          cleancss: true
        },
        src: 'less/bm-styles.less',
        dest: '<%= site.assets %>/css/bm-styles.css'
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
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean', 'jshint', 'less:development', 'assemble', 'copy', 'watch:site']);
};
