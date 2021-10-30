const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('express-mysql', 'root', '', {
    'host': 'localhost',
    dialect: 'mysql',
    logging: false,
    pool: {max:5, min:0, idle:10000}
})

sequelize.authenticate()

const db = {};
db.sequelize = Sequelize;
db.sequelize = sequelize

db.users = require('./users')(sequelize, DataTypes);
db.roles = require('./roles')(sequelize, DataTypes);

db.users.hasOne(db.roles)
db.roles.belongsTo(db.users)

db.sequelize.sync({ force: false })

module.exports = db;