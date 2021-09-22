let db = require('../models');
const bcrypt = require('bcrypt');

const Users = db.users;

let show = async (req, resp) => {
    const user = await Users.findAll({
        where: {
          id: req.params.id
        }
      });
    resp.status(200).json(user)
}

let get = async (req, resp) => {
    const users = await Users.findAll();
    resp.status(200).json(users)
}

let create = async (req, resp) => {
    let data = req.body

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password =  await bcrypt.hash(data.password, salt);

    let user = await Users.create({
        name: data.name,
        email: data.email,
        password: password
    })

    resp.status(200).json(user)
}

let update = async (req, resp) => {
    let data = req.body
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password =  await bcrypt.hash(data.password, salt);

    const user = await Users.update({
      name: data.name,
      email: data.email,
      password: password,
    }, {
      where: {
        id: req.params.id
      }
    });

    const updatedUser = await Users.findAll({
      where: {
        id: req.params.id
      }
    });

    resp.status(200).json(updatedUser)
}

let destroy = async (req, resp) => {

  await Users.destroy({
    where: {
      id: req.params.id
    }
  });

  const users = await Users.findAll();
  resp.status(200).json(users)
}

module.exports = {
    create,
    get,
    show,
    update,
    destroy
}