const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path')
const DIST_Dir = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_Dir, 'team.html')

const generateHtml = require('./util/generateHtml');
const { resolve } = require('path');
const employees = [];

function start() {
  // makeManager function
  function makeManager() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'managerName',
        message: 'What is the name of the manager?'
      },
      {
        type: 'input',
        name: 'managerId',
        message: 'What is the id of the manager?'
      },
      {
        type: 'input',
        name: 'managerEmail',
        message: 'What is the email of the manager?'
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: 'What is the office number of the manager?'
      },
    ])
    .then(res => {
      const manager = new Manager(res.managerName, res.managerId, res.managerEmail, res.officeNumber)
      employees.push(manager);
      cycleQuestion()
    })
  }

  // makeEngineer function
  function makeEngineer() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'engineerName',
        message: 'What is the name of the engineer?'
      },
      {
        type: 'input',
        name: 'engineerId',
        message: 'What is the id of the engineer?'
      },
      {
        type: 'input',
        name: 'engineerEmail',
        message: 'What is the email of the engineer?'
      },
      {
        type: 'input',
        name: 'github',
        message: 'What is the GitHub username of the engineer?'
      },
    ])
    .then(res => {
      const engineer = new Engineer(res.engineerName, res.engineerId, res.github)
      employees.push(engineer);
      cycleQuestion()
    })
  }  
  // makeIntern function
  function makeIntern() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'internName',
        message: 'What is the name of the intern?'
      },
      {
        type: 'input',
        name: 'internId',
        message: 'What is the id of the intern?'
      },
      {
        type: 'input',
        name: 'internEmail',
        message: 'What is the email of the intern?'
      },
      {
        type: 'input',
        name: 'school',
        message: 'What is the school of the intern?'
      },
    ])
    .then(res => {
      const intern = new Intern(res.internName, res.internId, res.internEmail, res.school)
      employees.push(intern);
      cycleQuestion()
    })
  }

  function cycleQuestion() {
    inquirer.prompt([
      {
        type: 'list',
        name: 'teamMember',
        message: 'What team member would you like to make next?',
        choices: ['Engineer', 'Intern', 'Done']
      }
    ])
  .then(res => {
    switch(res.teamMember){
      case 'Engineer':
        makeEngineer();
        break;
      case 'Intern':
        makeIntern();
        break;
      case 'Done':
        buildHtml();
      }
    })
  }

  // buildHtml function 
  function buildHtml() {
    if(!fs.existsSync(DIST_Dir)) {
      fs.mkdirSync(DIST_Dir);
    }
    fs.writeFileSync(distPath, generateHtml(employees), 'utf-8')
  }

  makeManager();
}

start();