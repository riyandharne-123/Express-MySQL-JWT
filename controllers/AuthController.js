let db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = db.users;

let register = async (req, resp) => {
    let data = req.body

        const user = await Users.findOne({
            where: {
              email: data.email
            }
          });
        if(user) {
            resp.status(409).json({
                message: 'This email is already taken.'
            })
        } else {
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const password =  await bcrypt.hash(data.password, salt);
    
            let user = await Users.create({
                name: data.name,
                email: data.email,
                password: password
            })
    
            const newUser = await Users.findOne({
                where: {
                email: data.email
                }
            });
    
            const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
            resp.status(200).json({
                user: user,
                token: token
            })
        }
}

let login = async (req, resp) => {
    let data = req.body

    const user = await Users.findOne({
        where: {
          email: data.email
        }
      });
    if(!user) {
        resp.status(404).json({
            message: 'This user is not registered.'
        })
    } else {
        checkPassword = await bcrypt.compare(data.password, user.password)
        if(checkPassword) {
            const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
            resp.status(200).json({
                user: user,
                token: token
            })
        } else {
            resp.status(403).json('Wrong Credentials!')
        }
    }
}

let user = async (req, resp) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    const authUser = jwt.verify(token, process.env.TOKEN_SECRET);

    //console.log(authUser)

    const user = await Users.findOne({
        where: {
          id: authUser.user.id
        }
      });

    resp.status(200).json(user)
}

module.exports = {
    register,
    login,
    user
}