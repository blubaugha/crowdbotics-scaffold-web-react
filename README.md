# crowdbotics-scaffold-web-react
Scaffolding for a React app built with Crowdbotics

### Installation
npm install

### How to run
node index

### Scaffolding Steps

1) Prompts user for project name
2) Generates a React app using create-react-app
3) Prompts the user to add login for Facebook, Twitter and Google
4) Builds the project
5) Deploys to Heroku using a buildpack
6) Opens the Heroku app in your default browser

### What the files contain:

- **index.js** - The main entry point. Takes user options and scaffolds a React project
- **user-input.js** - Gathers user input from the console
- **scaffolder.js** - Handles building the project, adding packages and deployment
- **settings.js** - Application settings for starter kits and available package list
