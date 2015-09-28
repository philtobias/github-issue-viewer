## GitHub issue viewer for NPM repo using ReactJS

The application is a GitHub issues viewer. There are two main views, a Issue List view and an Issue Detail view.

This application is built using [ReactJS](https://facebook.github.io/react/) with [ReactJS Test Utils](https://facebook.github.io/react/docs/test-utils.html) and [Jasmine](http://jasmine.github.io) used for the unit tests.


### To simulate server and run unit tests

[install node](https://nodejs.org/download/)

```
npm i grunt-cli -g
npm i
grunt
```

Open Google Chrome to [http://localhost:8080](http://localhost:8080).

### To run only unit tests

```
grunt test
```

### Explanation of directories

- **assets** - contains css and js to run application  
- **tasks** - holds grunt tasks for simulating a server, running jshint, and unit tests  
- **test** - location of specs for unit tests  
