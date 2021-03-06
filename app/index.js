'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var SizzleGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to Sizzle Generator!'
    ));

    var prompts = [{
      name: 'appName',
      message: 'Would you mind telling me your project base name?',
      default: this.appname
    }, {
      name: 'sublimeProjectFile',
      message: 'Would you like me to create a Project File for Sublime?',
      type: 'confirm',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;

      this.sublimeProjectFile = props.sublimeProjectFile;

      done();
    }.bind(this));
  },

  writing: {

    projectfiles: function () {
      this.template('_package.json', 'package.json');
      this.template('_config.json', 'config.json');
      this.template('editorconfig', '.editorconfig');
      this.template('_bower.json', 'bower.json');
      this.template('_secret.json', 'secret.json');

      // Optional goodies
      if(this.sublimeProjectFile) {
        this.template('_subl.sublime-project', this.appName.toLowerCase().split(' ').join('-') + '.sublime-project');
      }
    },

    gitfiles: function() {
      this.src.copy('gitignore', '.gitignore');
    },

    gruntfile: function() {
      this.src.copy('Gruntfile.js', 'Gruntfile.js');
    },

    ruby_gems: function() {
      this.src.copy('Gemfile', 'Gemfile');
    },

    app: function () {
      /*
       * Creating folders
       */
      
      // App
      this.dest.mkdir('app');
      // Styles
      this.dest.mkdir('app/styles');
      this.dest.mkdir('app/styles/modules');
      // Images
      this.dest.mkdir('app/images');
      this.dest.mkdir('app/images/inline');
      this.dest.mkdir('app/images/inline/svg');
      // Javascript
      this.dest.mkdir('app/scripts');

      /*
       * Copying app template files
       */

      // Misc
      this.template('app/index.html', 'app/index.html');
      this.template('app/robots.txt', 'app/robots.txt');
      this.copy('app/.htaccess', 'app/.htaccess');

      // JavaScript
      this.template('app/scripts/main.js', 'app/scripts/main.js');
      this.template('app/scripts/app.js', 'app/scripts/app.js');

      // Styles
      this.template('app/styles/application.scss', 'app/styles/application.scss');
      this.template('app/styles/_variables.scss', 'app/styles/_variables.scss');
      this.template('app/styles/_modules.scss', 'app/styles/_modules.scss');
      this.template('app/styles/_grid-settings.scss', 'app/styles/_grid-settings.scss');
      this.template('app/styles/_base.scss', 'app/styles/_base.scss');
      this.template('app/styles/_fonts.scss', 'app/styles/_fonts.scss');
      this.template('app/styles/modules/_banner.scss', 'app/styles/modules/_banner.scss');

      // Copy over the image files
      this.copy('app/favicon.ico', 'app/favicon.ico');
      this.copy('app/apple-touch-icon.png', 'app/apple-touch-icon.png');
      this.copy('app/images/yeoman-sizzle.png', 'app/images/yeoman-sizzle.png');

      // Fonts
      this.bulkDirectory('app/fonts', 'app/fonts');
    },

  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = SizzleGenerator;