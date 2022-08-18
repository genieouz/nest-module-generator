#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var inquirer = require("inquirer");
var chalk = require("chalk");
var template = require("./utils/template");
var yargs = require("yargs");
var CHOICES = fs.readdirSync(path.join(__dirname, '..', 'templates'));
var QUESTIONS = [
    {
        name: 'template',
        type: 'list',
        message: 'What module template would you like to generate?',
        choices: CHOICES,
        when: function () { return !yargs.argv['template']; }
    },
    {
        name: 'name',
        type: 'input',
        message: 'Module name:',
        when: function () { return !yargs.argv['name']; }
    }
];
var CURR_DIR = process.cwd();
inquirer.createPromptModule()(QUESTIONS)
    .then(function (answers) {
    answers = Object.assign({}, answers, yargs.argv);
    var projectChoice = answers['template'];
    var moduleName = answers['name'];
    var templatePath = path.join(__dirname, '..', 'templates', projectChoice);
    var tartgetPath = path.join(CURR_DIR, moduleName);
    if (!createProject(tartgetPath)) {
        return;
    }
    createDirectoryContents(templatePath, moduleName, moduleName);
    console.log(chalk.green("Module ".concat(moduleName, " successfully generated with ").concat(projectChoice, " template!")));
});
function createProject(projectPath) {
    if (fs.existsSync(projectPath)) {
        console.log(chalk.red("Folder ".concat(projectPath, " already exists. Delete or use another name.")));
        return false;
    }
    fs.mkdirSync(projectPath);
    return true;
}
var SKIP_FILES = ['node_modules', '.template.json'];
function createDirectoryContents(templatePath, filePath, moduleName) {
    var filesToCreate = fs.readdirSync(templatePath);
    filesToCreate.forEach(function (file) {
        var origFilePath = path.join(templatePath, file);
        var stats = fs.statSync(origFilePath);
        if (SKIP_FILES.indexOf(file) > -1)
            return;
        if (stats.isFile()) {
            var contents = fs.readFileSync(origFilePath, 'utf8');
            contents = template.render(contents, { moduleName: moduleName });
            var writePath = path.join(CURR_DIR, filePath, "".concat(moduleName, ".").concat(file));
            fs.writeFileSync(writePath, contents, 'utf8');
        }
        else if (stats.isDirectory()) {
            fs.mkdirSync(path.join(CURR_DIR, filePath, file));
            createDirectoryContents(path.join(templatePath, file), path.join(filePath, file), moduleName);
        }
    });
}
//# sourceMappingURL=index.js.map