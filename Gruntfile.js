module.exports = function (grunt) {
    (require('time-grunt'))(grunt);
    require("load-grunt-tasks")(grunt);
    require('google-closure-compiler').grunt(grunt);

    grunt.initConfig({
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1,
                //rebase:true
            },
            target: {
                files: {
                    '.tmp/indy.clean.css': ['src/indy.css']
                }
            }
        },
        css_to_js: {
            options: {},
            dist: {
                files: {
                    '.tmp/indy.css.js': ['.tmp/indy.clean.css']
                }
            }
        },
        'closure-compiler': {
            dist: {
                files: {
                    '.tmp/output.min.js': ['bower_components/html2canvas/dist/html2canvas.js', 'src/indy.js']
                },
                options: {
                    compilation_level: 'SIMPLE_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5',
                    //create_source_map: 'dist/output.min.js.map'
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['.tmp/output.min.js', '.tmp/indy.css.js'],
                dest: 'dist/cm-widget.min.js',
            }
        },
        clean: {
            dist: {
                src: ['.tmp/']
            }
        }
    });


    grunt.registerTask('build', ['cssmin', 'css_to_js', 'closure-compiler', 'concat', 'clean:dist']);


};
