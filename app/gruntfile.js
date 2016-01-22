module.exports = function(grunt) {

  // set the base path so we can fide the package.json
  // package.json is in the parent directory
  grunt.file.setBase('../');

  // Configure Tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify:{
      build: {
        files: {
          'dist/js/scripts.js': [
            'js/jquery/jquery.js',
            'js/main.js'
          ]
        }
      },
      dev: {
        options: {
          beautify: true,
          mange: false,
          compress: false,
          preserveComments: 'all'
        },
        files: {
          'dist/js/scripts.js': [
            'js/jquery/jquery.js',
            'js/main.js'
          ]
        }
      }
    },
    sass : {
      build: {
        options : {
          outputStyle: 'compressed'
        },
        files : {
          'dist/css/styles.css' : 'scss/application.scss'
        }
      },
      dev: {
        options : {
          outputStyle: 'nested'
        },
        files : {
          'dist/css/styles.css' : 'scss/application.scss'
        }
      }
    },
    jshint: {
      files: ['gruntfile.js', 'js/main.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    csslint: {
      options: {
        csslintrc: '../.csslintrc'
      },
      src: ['dist/css/*.css']
    },
    htmllint: {
     options: {
       format: "none",
       htmllintrc: '../.htmllintrc'
     },
     src: [ 'index.html' ]
    },
    modernizr: {
      dist: {
        "dest" : 'dist/js/modernizr-custom.js',
        "cache" : true,
        "uglify" : true,
        "crawl" : true
      }
    },
    watch : {
      options: {
        // Use browser extension when working on MAMP
        // grunt watch must be running for the browser extention to connect to the live reload server
        // You can specify a port in the options or include the livereload script on the site
        livereload: true
      },
      js: {
        files: ['js/**/*.js'],
        tasks: ['uglify:dev', 'modernizr:dist']
      },
      css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass:dev']
      }
    },
    clean: {
      js: 'dist/js/*.js',
      css: 'dist/css/*.css'
    }
  });

  // Load plugins
  grunt.loadNpmTasks( 'grunt-modernizr' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-csslint');
  grunt.loadNpmTasks( 'grunt-htmllint' );
  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-sass' );

  // reset the base path to allow us to reference files relative to the app directory
  // This way we can keep the gruntfile.js and the node_modules/package.json in the parent directory
  // Must come after loading the npm dependencies
  grunt.file.setBase('app/');

  // Register tasks
  grunt.registerTask( 'default', [ 'uglify:dev','sass:dev','modernizr:dist' ]);
  grunt.registerTask( 'build',   [ 'uglify:build','sass:build','modernizr:dist' ]);
  grunt.registerTask( 'lint:js',  [ 'jshint' ]);
  grunt.registerTask( 'lint:css', [ 'csslint' ]);
  grunt.registerTask( 'lint:html', [ 'htmllint' ]);


};
