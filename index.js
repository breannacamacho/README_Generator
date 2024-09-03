// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

// Generates the body of the README, adding in the named values where assigned

// !!! If you edit this code, you will need to add any named values that will be used into the list below. The function will not execute if it tries to add a value it does not recognise!!!
const generateMarkdown = ({
  projectName,
  projectDescription,
  projectLicense,
  githubRepo,
  githubName,
  userName,
  userEmail,
  usageInstructions,
},
underscore,
) =>
// Template Markdown document, used as a base for the README file generated. Adding "`" to the body of this text may cause issues with the generateMarkdown function
  `<h3 align="center">${projectName}</h3>
    <p align="center"> ${projectDescription}
    <br />
    <a href="${githubRepo}/issues">Report Bug</a>
    <a href="${githubRepo}/issues">Request Feature</a>
  </p>


<div align="center">

[![License ${projectLicense}](https://img.shields.io/badge/License-${underscore}-yellow.svg)](https://opensource.org/licenses/${projectLicense})

</div>

  <details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#usage">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#questions">Questions/Contact</a></li>
  </ol>
</details>

## Usage
// If desired, use the following code to generate a screenshot of your application in use. Add the source pathway to the 'src=""', in between the quotes
//  <a href="${githubRepo}">
//     <img src="" alt="" width="600" height="400">
//   </a>

${usageInstructions}

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License

This project is licensed under the ${projectLicense} license.

See LICENSE.txt for more information.

## Questions
If you have any questions about this project, you can contact:

${userName}: ${userEmail}
Github Profile: https://github.com/${githubName}

Project Link: [${githubRepo}](${githubRepo})
`;

// Creates an array of questions for user input, values are saved and passed into generateMarkdown() later
inquirer
  .prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is your project's name?",
    },
    {
      type: "input",
      name: "projectDescription",
      message:
        "Tell us about your project. What does it do? What resources and languages does it utilize? What motivated you to make this project?",
    },
    {
        type: "input",
        name: "usageInstructions",
        message:
          "Tell us about how to use your project. Do you need to install any features before you can start? Do you need to clone the repository to a personal terminal?",
      },
    {
      type: "list",
      name: "projectLicense",
      message:
        "Does your project use a license? (Use the arrow keys to scroll options, and the Enter key to submit)",
      choices: [
        "N/A",
        "BSD-3-clause",
        "MIT",
        "GPL-License",
        "Apache-2-0",
        "ISC-license",
      ],
    },
    {
      type: "input",
      name: "githubRepo",
      message: "What is the URL your project's repo in Github?",
    },
    {
      type: "input",
      name: "userName",
      message: "Now tell us about yourself. What is your name?",
    },
    {
      type: "input",
      name: "userEmail",
      message: "What is you professional email address?",
    },
    {
      type: "input",
      name: "githubName",
      message: "What is your GitHub username?",
    },
  ])
  .then((answers) => {
    console.log(answers);
    // Pass inquirer answers to generateMarkdown

    // Converts dashes in license name to underscore values, for proper generation of a badge at the top of the document
    const underscore = answers.projectLicense.split("-").join("_");
    // Generates the Markdown document, with the input from the inquiry propmpts above
    const markdown = generateMarkdown(answers, underscore);
    // Write the Markdown to a file
    fs.writeFile("yourRepo.md", markdown, (err) =>
      err ? console.log(err) : console.log(`Your README has been created! You can find it on the sidebar labelled yourRepo.md!`)
    );
  });