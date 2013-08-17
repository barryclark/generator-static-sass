'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var StaticMinimalGenerator = module.exports = function StaticMinimalGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(StaticMinimalGenerator, yeoman.generators.Base);

StaticMinimalGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'projectName',
    message: 'What would you like to call your project?',
  }];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;

    cb();
  }.bind(this));
};

StaticMinimalGenerator.prototype.app = function app() {

  // Create asset directories
  this.mkdir('scss');
  this.mkdir('css');
  this.mkdir('js');
  this.mkdir('images');

  this.template('Gruntfile.js', 'Gruntfile.js');

    // Copy in a base index.html and scss templates
  this.template('index.html', 'index.html')
  this.template('scss/_reset.scss', 'scss/_reset.scss')
  this.template('scss/_variables.scss', 'scss/_variables.scss')
  this.template('scss/style.scss', 'scss/style.scss')

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

StaticMinimalGenerator.prototype.projectfiles = function projectfiles() { 
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

StaticMinimalGenerator.prototype.runtime = function runtime() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore', '.gitignore');
};
