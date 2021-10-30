const express = require('express')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const userRequest = require('./requests/userRequest')
const roleRequest = require('./requests/roleRequest')

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json())


const port = 8000;
require('./models')

let jwtMiddleware = require('./middleware/jwt')
let authController = require('./controllers/AuthController')
let userController = require('./controllers/UserController')
let roleController = require('./controllers/RoleController')

app.get("/", (res, resp) => {
    resp.send('Hello world');
});

//auth routes
app.post('/register', userRequest.register, authController.register);
app.post('/login', userRequest.login, authController.login);

//middleware protection
app.use(jwtMiddleware.authenticateToken);

//user routes
app.get('/user', authController.user);
app.get('/get/users', userController.get);
app.get('/filter/users', userController.filter);
app.post('/create/users', userRequest.user, userController.create);
app.get('/get/users/:id', userController.show);
app.put('/update/users/:id', userRequest.user, userController.update);
app.delete('/delete/users/:id', userController.destroy);

//role routes
app.get('/get/roles', roleController.get);
app.post('/create/roles', roleRequest.role, roleController.create);
app.get('/get/roles/:id', roleController.show);
app.put('/update/roles/:id', roleRequest.role, roleController.update);
app.delete('/delete/roles/:id', roleController.destroy);


app.listen(port, () => {
    console.log(`app started at http://localhost:${port}`)
})

module.exports = app