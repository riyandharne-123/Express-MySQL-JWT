let db = require('../models');

const Roles = db.roles

let get = async (req, resp) => {
    const users = await Roles.findAll({
        include: {
            model: db.users,
            as: 'user'
        }
    });
    resp.status(200).json(users)
}

let show = async (req, resp) => {
    const role = await Roles.findOne({
        where: {
          id: req.params.id
        },
        include: {
            model: db.users,
            as: 'user'
        }
      });
    resp.status(200).json(role)
}

let create = async (req, resp) => {
    let data = req.body

    let role = await Roles.create({
        name: data.name,
        userId: data.user_id
    })

    resp.status(200).json(role)
}

let update = async (req, resp) => {
    let data = req.body

    const role = await Roles.update({
      name: data.name,
      userId: data.user_id,
    }, {
      where: {
        id: req.params.id
      }
    });

    const updatedRole = await Role.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: db.users,
        as: 'user'
    }
    });

    resp.status(200).json(updatedRole)
}

let destroy = async (req, resp) => {

    await Roles.destroy({
      where: {
        id: req.params.id
      }
    });
  
    const roles = await Roles.findAll({
        include: {
            model: db.users,
            as: 'user'
        }
    });
    resp.status(200).json(roles)
  }

  module.exports = {
    create,
    get,
    show,
    update,
    destroy
}