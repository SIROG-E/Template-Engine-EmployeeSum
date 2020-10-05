// npm packages
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
// output
const OUTPUT_DIR = path.resolve(__dirname, "output");
// team
const outputPath = path.join(OUTPUT_DIR, "team.html");

// creation of html
const render = require("./lib/htmlRenderer");
// const { emitKeypressEvents } = require("readline");

// 1. Manager
var managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the manager's name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is the manager's id?",
    },
    {
        type: "input",
        name: "email",
        message: "What's the manager's email?",
        validate: function (value) {
            var pass = value.match(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );

            if (pass) {
                return true;
            }

            return 'Please enter a valid email address';
        }        
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?",
    },

];

// 2. Engineer
var engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your engineer's name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is your engineer's id?",
    },
    {
        type: "input",
        name: "email",
        message: "What's your engineer's email?",
        validate: function (value) {
            var pass = value.match(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );

            if (pass) {
                return true;
            }

            return 'Please enter a valid email address';
        }
    },
    {
        type: "input",
        name: "github",
        message: "What is your engineer's Github username?",
    }
];

// 3. Intern
var internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your intern's name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is your intern's id?",
    },
    {
        type: "input",
        name: "email",
        message: "What's your intern's email?",
        validate: function (value) {
            var pass = value.match(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );

            if (pass) {
                return true;
            }
                return 'Please enter a valid email address';
        }        
    },
    {
        type: "input",
        name: "school",
        message: "What is your intern's school name?",
    }
];

var employeeTypeQuestions = [
    {
        type: 'list',
        name: 'type',
        message: 'Which team member would you like to add?',
        choices: ["Engineer", 'Intern', new inquirer.Separator(), 'Done'],
    }
];

var employees = [];

var employeeType;

createTeam();

function createTeam() {
    inquirer.prompt(managerQuestions).then((answers) => {
        // Add manager

        var manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        employees.push(manager);

    }).then((result) => {
        addEmployees();
    });
}


function addEmployees() {
    inquirer.prompt(employeeTypeQuestions).then((employeeAnswer) => {

        employeeType = employeeAnswer.type;

        if (employeeAnswer.type === "Done") {

            renderEmployees();
            //return;
        } else {

            var employeeQuestions;
            switch (employeeAnswer.type) {
                case "Engineer":
                    employeeQuestions = engineerQuestions;
                    break;
                case "Intern":
                    employeeQuestions = internQuestions;
                    break;
            }

            inquirer.prompt(employeeQuestions).then((answers) => {
                var newEmployee;

                switch (employeeType) {
                    case "Engineer":
                        newEmployee = new Engineer(answers.name, answers.id, answers.email, answers.github);
                        break;
                    case "Intern":
                        newEmployee = new Intern(answers.name, answers.id, answers.email, answers.school);
                        break;
                }

                employees.push(newEmployee);

                addEmployees();
            });

        }
    });
}

function renderEmployees() {

    var html = render(employees);

    createFileWithContents(html);
}

function createFileWithContents(contents) {

    if (!fs.existsSync(OUTPUT_DIR)) {
        //Create folder

        fs.mkdirSync(OUTPUT_DIR);
    }

    //save html
    fs.writeFile(outputPath, contents, function (err) {
        if (err) {
            console.log("The file was not saved!");
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}
