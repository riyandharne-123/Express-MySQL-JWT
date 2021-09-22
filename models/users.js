
module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define("users", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });
}