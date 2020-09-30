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

var managerQuestions = [
    {
      type: "input",
      name: "managerName",
      message: "What is your name?",
      //default: false,
    },
    {
      type: "input",
      name: "managerId",
      message: "What is your id?",
      //default: false,
    },    
    {
      type: "input",
      name: "managerEmail",
      message: "What's your email?",
    //   validate: function (value) {
    //     var pass = value.match(
    //       /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
    //     );
    //     if (pass) {
    //       return true;
    //     }
  
    //     return 'Please enter a valid phone number';
    //   },
    },
    {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is your office number?",
        //default: false,
    },
    // {
    //     type: "list",
    //     name: "memberChoice",
    //     message: "Which type of team member would you like to add?",
    //     choices: [
    //         "Engineer",
    //         "Intern",
    //         "I don't want to add any more team members"
    //     ]
    // }
    
   
  ];
   

  var engineerQuestions = [
          // 2.Engineer
    {
        type: "input",
        name: "engineerName",
        message: "What is your engineer's name?",
        //default: false,
    },
    {
        type: "input",
        name: "engineerId",
        message: "What is your engineer's id?",
        //default: false,
    },    
    {
        type: "input",
        name: "engineerEmail",
        message: "What's your engineer's email?",
      //   validate: function (value) {
      //     var pass = value.match(
      //       /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
      //     );
      //     if (pass) {
      //       return true;
      //     }
    
      //     return 'Please enter a valid phone number';
      //   },
    },
    {
        type: "input",
        name: "engineerGithub",
        message: "What is your engineer's Github username?",
        //default: false,
    }
  ];

var internQuestions =[
    // 3.Intern
        
    {
        type: "input",
        name: "internName",
        message: "What is your intern's name?",
        //default: false,
    },
    {
        type: "input",
        name: "internId",
        message: "What is your intern's id?",
        //default: false,
    },    
    {
        type: "input",
        name: "internEmail",
        message: "What's your intern's email?",
    //   validate: function (value) {
    //     var pass = value.match(
    //       /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
    //     );
    //     if (pass) {
    //       return true;
    //     }

    //     return 'Please enter a valid phone number';
    //   },
    },
    {
        type: "input",
        name: "internSchool",
        message: "What is your intern's school name?",
        //default: false,
    }
];

createEmployee(managerQuestions);

//making this function recursive to create different type of employees dynamically..stating with a manager.
function createEmployee(questions) {

    inquirer.prompt(questions).then((answers) => {
        console.log('\nQuestions:');
        console.log(JSON.stringify(answers, null, '  '));
      });

}



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// 1. Manager
//      What is your name?
//      What is your id?
//      What is your email?
//      What is your office number?
//  Ask all manager questions; 
//  Then ask manager to include employees (Eng., Itrn. )?
//  can create a function that asks questions regardless of type
// function askquestion(questions)
//  if Eng => ask eng.questions
//  if Itnr => ask int.questions
//  when no more employee then stop asking.
//  when done asking, then use answer to build org. chart.

// 2. Engineer
//      What is your name?
//      What is your id?
//      What is your email?
//      What is your github username?
// 
// 3. Intern
//      What is your name?
//      What is your id?
//      What is your email?
//      What is the name of your school?
// 


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above to target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
