#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import * as inquirer from 'inquirer';
import * as chalk from 'chalk';
import * as template from './utils/template';
import * as yargs from 'yargs';

const CHOICES = fs.readdirSync(path.join(__dirname,'..', 'templates'));
const QUESTIONS = [
{
    name: 'template',
    type: 'list',
    message: 'What module template would you like to generate?',
    choices: CHOICES,
    when: () => !yargs.argv['template']
},
{
    name: 'name',
    type: 'input',
    message: 'Module name:',
    when: () => !yargs.argv['name']
}];

export interface CliOptions {
    moduleName: string
    templateName: string
    templatePath: string
    tartgetPath: string
}
const CURR_DIR = process.cwd();
inquirer.createPromptModule()(QUESTIONS)
.then(answers => {
    answers = Object.assign({}, answers, yargs.argv);
    const projectChoice = answers['template'];
    const moduleName = answers['name'];
    const templatePath = path.join(__dirname, '..', 'templates', projectChoice);
    const tartgetPath = path.join(CURR_DIR, moduleName);
    if (!createProject(tartgetPath)) {
        return;
    }
    createDirectoryContents(templatePath, moduleName, moduleName);
    console.log(chalk.green(`Module ${moduleName} successfully generated with ${projectChoice} template!`));
});

function createProject(projectPath: string) {
    if (fs.existsSync(projectPath)) {
        console.log(chalk.red(`Folder ${projectPath} already exists. Delete or use another name.`));
        return false;
    }
    fs.mkdirSync(projectPath);
    
    return true;
}

const SKIP_FILES = ['node_modules', '.template.json'];
function createDirectoryContents(templatePath: string, filePath: string, moduleName: string) {
    const filesToCreate = fs.readdirSync(templatePath);
    filesToCreate.forEach(file => {
        const origFilePath = path.join(templatePath, file);
        const stats = fs.statSync(origFilePath);
        if (SKIP_FILES.indexOf(file) > -1) return;
        
        if (stats.isFile()) {
            let contents = fs.readFileSync(origFilePath, 'utf8');
            contents = template.render(contents, { moduleName });
            const writePath = path.join(CURR_DIR, filePath, `${moduleName}.${file}`);
            fs.writeFileSync(writePath, contents, 'utf8');
        } else if (stats.isDirectory()) {
            fs.mkdirSync(path.join(CURR_DIR, filePath, file));
            createDirectoryContents(path.join(templatePath, file), path.join(filePath, file), moduleName);
        }
    });
}
