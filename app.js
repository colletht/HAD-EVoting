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


// Sessions setup
var session = require('express-session')
app.use(session({
   secret: 'simpollisgreat'
}))

//the client will send a get request to the "/" link when first joining 
// and we respond by rendering the index view
//app.get('/', (req, res) => {
//   res.locals.title = 'SimPoll' // can set variables in the pug file this way
//   res.locals.session = req.session // adds the session variable to the pug file so we are able to access it
 //  res.render('index')
   //console.log('User connected!') 
//});




//testing for other pages
//app.get('/users/register', function(req, res){
//   res.locals.session = req.session // transfer session to new page
//   res.render('userRegister', { title: 'Register' })
//})


//Example of viewing a post request:

//to be able to view the body of requests
app.use(Express.json())
app.use(Express.urlencoded())

app.post('/users/register', function(req, res){
   console.log(req.body) // prints body of request
})




//This starts the server and displays in the terminal which port the server is listening on
//Connect by typing "localhost:3000" on web browser
app.listen(3000, () => {
   console.log('Listening on port 3000...')
});  
