//Basic Hello World Server
//(Press ctrl^c to stop server running in terminal)

// !! max number of questions and options is 4 !!

const Express = require('express') //Requires the express module (a class)
const app = Express() //Instantiates an express object

var routes = require('./controllers/simpoll');

app.use('/',routes);

// View engine setup.
const path = require('path') // to be able to use the path module
app.use(Express.static(path.join(__dirname, 'views'))) // to be able to path to the scripts and styles in pug files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');




//This starts the server and displays in the terminal which port the server is listening on
//Connect by typing "localhost:3000" on web browser
app.listen(3000, () => {
   console.log('Listening on port 3000...')
});  
