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
        partials: '<%= site.partials %>',
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

    concat: {
      options: {
        separator: '\n;\n'
      },
      vendorStyles: {
        src: [
          // Fotorama, for carousel
          'bower_components/fotorama/fotorama.css'
        ],
        dest: '<%= site.assets %>/css/vendor.css',
      },
      vendorScripts: {
        src: [
          // jQuery
          'bower_components/jquery/dist/jquery.js',

          // Bootstrap, commenting out the unused features
          'bower_components/bootstrap/js/transition.js',
          //'bower_components/bootstrap/js/alert.js',
          'bower_components/bootstrap/js/button.js',
          //'bower_components/bootstrap/js/carousel.js',
          //'bower_components/bootstrap/js/collapse.js',
          //'bower_components/bootstrap/js/dropdown.js',
          //'bower_components/bootstrap/js/modal.js',
          //'bower_components/bootstrap/js/tooltip.js',
          //'bower_components/bootstrap/js/popover.js',
          //'bower_components/bootstrap/js/scrollspy.js',
          //'bower_components/bootstrap/js/tab.js',
          //'bower_components/bootstrap/js/affix.js',

          // Fotorama, for carousel
          'bower_components/fotorama/fotorama.js',

          // jQuery Stellar, for parallax
          'bower_components/jquery.stellar/jquery.stellar.js',

          // jQuery Validation, for feedback form validation
          'bower_components/jquery-validation/dist/jquery.validate.js'
        ],
        dest: '<%= site.assets %>/js/vendor.js',
      }
    },

    connect: {
      server: {
        options: {
          livereload: true,
          base: '<%= site.dest %>',
          open: {
            appName: 'Google Chrome'
          }
        }
      }
    },

    copy: {
      code: {
        files: [
          {expand: true, flatten: true, src: ['code/*.php'], dest: '<%= site.assets %>'}
        ]
      },
      favicon: {
        files: [
          {expand: true, src: ['favicon.ico', 'apple-touch-icon.png'], dest: 'dist'},
        ]
      },
      fonts: {
        files: [
          {expand: true, flatten: true, src: ['bower_components/bootstrap/fonts/*.*'], dest: '<%= site.assets %>/fonts'}
        ]
      },
      images: {
        files: [
          {expand: true, src: ['images/**/*.*'], dest: '<%= site.assets %>'},
          {expand: true, flatten: true, src: [
              'bower_components/fotorama/fotorama.png',
              'bower_components/fotorama/fotorama@2x.png'
            ], dest: '<%= site.assets %>/css'}
        ]
      },
      scripts: {
        files: [
          {expand: true, flatten: true, src: ['js/bm-scripts.js'], dest: '<%= site.assets %>/js'}
        ]
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'js/**/*.js']
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
      options: {
        livereload: true,
      },
      assemble: {
        files: ['templates/**/*.hbs', '<%= site.data %>'],
        tasks: ['assemble']
      },
      less: {
        files: 'less/**/*.less',
        tasks: ['less:development']
      },
      images: {
        files: 'images/**/*.*',
        tasks: ['copy:images']
      },
      scripts: {
        files: 'js/**/*.js',
        tasks: ['jshint', 'copy:scripts']
      },
    }
  });

  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean', 'jshint', 'less:development', 'assemble', 'concat', 'copy', 'connect', 'watch']);
};
