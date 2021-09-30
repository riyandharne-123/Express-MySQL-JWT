const express = require('express')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const userRequest = require('./requests/userRequest')

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json())


const port = 8000;
require('./models')

let jwtMiddleware = require('./middleware/jwt')
let authController = require('./controllers/AuthController')
let userController = require('./controllers/UserController')

app.get("/", (res, resp) => {
    resp.send('Hello world');
});

//auth routes
app.post('/register', userRequest.register, authController.register);
app.post('/login', userRequest.login, authController.login);

//middleware protection
app.use(jwtMiddleware.authenticateToken);

//protected routes
app.get('/user', authController.user);
app.get('/get/users', userController.get);
app.get('/filter/users', userController.filter);
app.post('/create/users', userController.create);
app.get('/get/users/:id', userController.show);
app.put('/update/users/:id', userController.update);
app.delete('/delete/users/:id', userController.destroy);

app.listen(port, () => {
    console.log(`app started at http://localhost:${port}`)
})