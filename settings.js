const settings = {
    starterKits: {
        createReactApp: {
            name: 'create-react-app',
            buildPack: 'https://github.com/mars/create-react-app-buildpack.git'
        }
    },
    git: {
        initialCommitMessage: 'Crowdbotics React Web UI Scaffolding'
    },
    packages: {
        login: [{
            name: 'Twitter',
            value: 'react-twitter-auth'
        }, {
            name: 'Google',
            value: 'react-google-login'
        }, {
            name: 'Facebook',
            value: 'react-facebook-login'
        }]
    }
};

module.exports = settings;