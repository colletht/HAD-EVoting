//Basic Hello World Server
//(Press ctrl^c to stop server running in terminal)

const Express = require('express'); //Requires the express module (a class)
const app = Express(); //Instantiates an express object

//the client will send a get request to the "/" link when first joining 
// and we respond with "Hello World"
app.get('/', (request, response) => {
   response.send('Hello World');
   console.log('User connected!');  
});

//This starts the server and displays in the terminal which port the server is listening on
//Connect by typing "localhost:3000" on web browser
app.listen(3000, () => {
   console.log('Listening on port 3000...');
});